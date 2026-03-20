<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 p-4">
    
    <div class="w-full max-w-md">
    
    <!-- Logo -->
    <div class="text-center mb-8">
    <NuxtLink to="/">
    <img src="/logo/8.png" class="h-16 mx-auto"/>
    </NuxtLink>
    </div>
    
    <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
    
    <!-- Header -->
    <div class="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5">
        <h3 class="text-white text-xl font-bold">
        
        {{ step === 1 ? "Forgot Password" : step === 2 ? "Verify Code" : "Reset Password" }}
        
        </h3>
    </div>
    
    <div class="p-7">
    
        <!-- STEP 1 : EMAIL -->
    
        <div v-if="step === 1">
        
            <p class="text-sm text-gray-500 mb-5">
            Enter your email address and we will send you a password reset code.
            </p>
            
            <div class="mb-5">
            <label class="block text-sm font-medium text-gray-700 mb-2">
            Email Address
            </label>
            
            <input
            v-model="email"
            type="email"
            placeholder="name@example.com"
            class="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
        
        </div>
    
        <button
        @click="send_Code()"
        class="w-full py-3 flex justify-center items-center gap-2 rounded-lg bg-blue-600 text-white font-semibold"
        >
        
        Send Reset Code
        <Spinner v-if="isloading"/>
        
        </button>
    
    </div>
    
    <!-- STEP 2 : OTP -->
    
    <div v-if="step === 2">
    
    <p class="text-gray-600 mb-6 text-sm">
    Enter the code sent to
    <span class="font-semibold">{{ email }}</span>
    </p>
    
    <div class="flex justify-between gap-2 mb-6">
    
    <input
    v-for="(digit,index) in otp"
    :key="index"
    maxlength="1"
    v-model="otp[index]"
    @input="moveNext(index)"
    @keydown="movePrevious($event,index)"
    class="otp-input w-12 h-12 text-center text-xl border rounded-lg"
    />
    
    </div>
    
    <button
    @click="verifyOtp"
    class="w-full py-3 flex justify-center items-center gap-2 bg-blue-600 text-white rounded-lg font-semibold"
    >
    
    Verify Code
    <Spinner v-if="loading"/>
    
    </button>
    
    <button
    @click="resendOtp"
    class="w-full mt-3 text-sm text-blue-600 hover:underline"
    >
    Resend Code
    </button>
    
    </div>
    
    <!-- STEP 3 : NEW PASSWORD -->
    
    <div v-if="step === 3">
    
    <div class="mb-5">
    <label class="block text-sm font-medium text-gray-700 mb-2">
    New Password
    </label>
    
    <input
    v-model="password"
    type="password"
    class="w-full px-4 py-2.5 border rounded-lg"
    />
    
    </div>
    
    <div class="mb-5">
    <label class="block text-sm font-medium text-gray-700 mb-2">
    Confirm Password
    </label>
    
    <input
    v-model="confirmPassword"
    type="password"
    class="w-full px-4 py-2.5 border rounded-lg"
    />
    
    </div>
    
    <button
    @click="resetPassword"
    class="w-full py-3 flex justify-center items-center gap-2 bg-blue-600 text-white rounded-lg font-semibold"
    >
    
    Reset Password
    <Spinner v-if="isReseting"/>
    
    </button>
    
    </div>
    
    </div>
    </div>
    
    <div class="text-center mt-6 text-xs text-gray-500">
    © Copyright 2026 Qfs Web3 — All Rights Reserved.
    </div>
    
    </div>
    </div>
    </template>

<script setup>

import { ref } from "vue"
import { sendCode, verifyCode,updatePassword } from '@/composables/requests/auth'

definePageMeta({
layout:"custom2"
})

const notify = useNotify()

const step = ref(1)

const email = ref("")
const password = ref("")
const confirmPassword = ref("")

const loading = ref(false)
const isloading = ref(false)
const isReseting = ref(false)
const resendText = ref('Resend Code')

const otp = ref(["","","","",""])

/* SEND RESET CODE */

const sendResetCode = async()=>{

    resendText.value = "Sending ..."

    try{

    const data = await sendCode({email:email.value})

    if(data.success){

    notify.success(data.message)
    step.value = 2

    }else{

    notify.error(data.message)

    }

    }catch(e){

    notify.error("Failed to send code")

    }

    resendText.value = "Resend Code"


}

const send_Code = async()=>{
    isloading.value = true
    await sendResetCode()
    isloading.value = false
}


/* VERIFY OTP */

const verifyOtp = async()=>{

    const code = otp.value.join("")

    if(code.length !== 5){

    notify.error("Enter valid code")
    return

    }

    loading.value = true

    try{

    const data = await verifyCode({
    email:email.value,
    otp:code
    })

    if(data.success){

    notify.success(data.message)
    step.value = 3

    }else{

    notify.error(data.message)

    }

    }catch(e){

    notify.error("Invalid code")

    }

    loading.value = false

}


/* RESET PASSWORD */

const resetPassword = async()=>{

    if(password.value !== confirmPassword.value){

         notify.error("Passwords do not match")
    return

    }

    isReseting.value = true

    try{

    const data = await updatePassword({

    email:email.value,
    newPassword:password.value

    })

    if(data.success){

    notify.success(data.message)
    navigateTo("/login")

    }else{

    notify.error(data.message)

    }

    }catch(e){

    notify.error("Reset failed")

    }

    isReseting.value = false

}


/* OTP navigation */

const moveNext = (index)=>{

const inputs = document.querySelectorAll(".otp-input")

if(index < inputs.length - 1 && otp.value[index] !== ""){

inputs[index+1].focus()

}

}

const movePrevious = (event,index)=>{

const inputs = document.querySelectorAll(".otp-input")

if(event.key === "Backspace" && otp.value[index] === ""){

if(index > 0){

inputs[index-1].focus()

}

}

}

const resendOtp = async()=>{

await sendResetCode()

}

</script>