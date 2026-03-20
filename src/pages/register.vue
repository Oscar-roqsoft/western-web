<template>
    <div class="auth-gradient min-h-screen flex items-center justify-center p-4">
        <div class="w-full max-w-xl md:px-4">
        
            <!-- Logo -->
            <div class="text-center mb-6">
                <NuxtLink to="/">
                <img src="/logo/8.png" alt="Logo" class="h-16 mx-auto" />
                </NuxtLink>
            </div>
        
            <div class="bg-blue rounded-xl shadow-lg overflow-hidden">
            
                <!-- HEADER -->
                <div class="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                    <h3 class="font-bold text-xl text-white">
                    {{ showOtp ? "Verify Your Email" : "Create an Account" }}
                    </h3>
                </div>
        
                <div class="p-6">
        
                    <!-- ================= REGISTER FORM ================= -->
                    
                    <form  @submit.prevent="register">
                    
                    <!-- FULL NAME -->
                    <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span class="text-red-500">*</span>
                    </label>
                    
                    <div class="relative">
                    <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">👤</div>
                    
                    <input
                    v-model="form.name"
                    type="text"
                    placeholder="Enter Full Name"
                    class="pl-10 w-full px-4 py-2 border rounded-lg"
                    :class="errors.name ? 'border-red-500' : 'border-gray-300'"
                    />
                    </div>
                    
                    <p v-if="errors.name" class="text-red-500 text-xs mt-1">
                    {{ errors.name }}
                    </p>
                    </div>
                    
                    
                    <!-- EMAIL -->
                    <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span class="text-red-500">*</span>
                    </label>
                    
                    <div class="relative">
                    <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">✉️</div>
                    
                    <input
                    v-model="form.email"
                    type="email"
                    placeholder="name@example.com"
                    class="pl-10 w-full px-4 py-2 border rounded-lg"
                    :class="errors.email ? 'border-red-500' : 'border-gray-300'"
                    />
                    </div>
                    
                    <p v-if="errors.email" class="text-red-500 text-xs mt-1">
                    {{ errors.email }}
                    </p>
                    </div>
                    
                    
                    <!-- PHONE -->
                    <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number <span class="text-red-500">*</span>
                    </label>
                    
                    <div class="relative">
                    <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">📞</div>
                    
                    <input
                    v-model="form.phone"
                    type="tel"
                    placeholder="Enter Phone Number"
                    class="pl-10 w-full px-4 py-2 border rounded-lg"
                    :class="errors.phone ? 'border-red-500' : 'border-gray-300'"
                    />
                    </div>
                    
                    <p v-if="errors.phone" class="text-red-500 text-xs mt-1">
                    {{ errors.phone }}
                    </p>
                    </div>
                    
                    
                    <!-- PASSWORD -->
                    <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                    Password <span class="text-red-500">*</span>
                    </label>
                    
                    <input
                    v-model="form.password"
                    type="password"
                    placeholder="Create Password"
                    class="w-full px-4 py-2 border rounded-lg"
                    :class="errors.password ? 'border-red-500' : 'border-gray-300'"
                    />
                    
                    <p v-if="errors.password" class="text-red-500 text-xs mt-1">
                    {{ errors.password }}
                    </p>
                    </div>
                    
                    
                    <!-- CONFIRM PASSWORD -->
                    <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password <span class="text-red-500">*</span>
                    </label>
                    
                    <input
                    v-model="form.password_confirmation"
                    type="password"
                    placeholder="Confirm Password"
                    class="w-full px-4 py-2 border rounded-lg"
                    :class="errors.password_confirmation ? 'border-red-500' : 'border-gray-300'"
                    />
                    
                    <p v-if="errors.password_confirmation" class="text-red-500 text-xs mt-1">
                    {{ errors.password_confirmation }}
                    </p>
                    </div>
                    
                    
                    <!-- COUNTRY -->
                    <div class="mb-5">
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Country <span class="text-red-500">*</span>
                    </label>
                    
                    <select
                    v-model="form.country"
                    class="w-full px-4 py-3 border rounded-xl"
                    :class="errors.country ? 'border-red-500' : 'border-gray-300'"
                    >
                    <option disabled value="">Select Country</option>
                    <option>Nigeria</option>
                    <option>Ghana</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    </select>
                    
                    <p v-if="errors.country" class="text-red-500 text-xs mt-1">
                    {{ errors.country }}
                    </p>
                    </div>
                    
                    <input type="hidden" v-model="form.refer" />
                    
                    <!-- SUBMIT -->
                    <button
                    type="submit"
                    class="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
                    >
                    <span >Register</span>
                    <Spinner v-if="isAuthenticating"  stroke="#fff" />
                    </button>
                    
                    
                    <!-- Login -->
                    <div class="text-center mt-6 text-sm text-gray-600">
                    Do you have an account?
                    
                    <NuxtLink
                    to="/login"
                    class="text-primary-600 font-medium hover:text-primary-700"
                    >
                    Sign In
                    </NuxtLink>
                    
                    </div>
                    
                    </form>
                    
            
                    <!-- ================= OTP SECTION ================= -->
            
        
        
                </div>
            </div>
    
            <div class="mt-6 text-center">
                <p class="text-xs text-gray-600">
                © Copyright 2026 Qfs Web3 — All Rights Reserved.
                </p>
            </div>
        
        </div>
    </div>
    </template>
    
    
    <script setup>
    import { reactive, ref } from "vue"
    import { NSpin } from "naive-ui";
    import { signUp,sendCode,signIn,verifyCode } from '@/composables/requests/auth'; // Adjust path as needed


    
    const notify = useNotify()
    
    definePageMeta({
    layout:"custom2"
    })

    const pinia = useStore()
    
    const showOtp = ref(false)
    const isAuthenticating = ref(false)
    const isVerifying = ref(false)
    const isResending = ref(false)

    const resendText = ref("Resend Code")
    
    const otp = ref(["","","","","",""])
    
    const form = reactive({
    name:"",
    email:"",
    phone:"",
    password:"",
    password_confirmation:"",
    country:"",
    refer:"NB"
    })
    
    const errors = reactive({
    name:"",
    email:"",
    phone:"",
    password:"",
    password_confirmation:"",
    country:""
    })
    
    
    /* ---------------- VALIDATION ---------------- */
    
    const validateForm = ()=>{
    
    errors.name=""
    errors.email=""
    errors.phone=""
    errors.password=""
    errors.password_confirmation=""
    errors.country=""
    
    let valid = true
    
    if(!form.name){
    errors.name="Full name is required"
    valid=false
    }
    
    if(!form.email){
    errors.email="Email is required"
    valid=false
    }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)){
    errors.email="Invalid email format"
    valid=false
    }
    
    if(!form.phone){
    errors.phone="Phone number is required"
    valid=false
    }
    
    if(!form.password){
    errors.password="Password is required"
    valid=false
    }else if(form.password.length < 6){
    errors.password="Password must be at least 6 characters"
    valid=false
    }
    
    if(form.password !== form.password_confirmation){
    errors.password_confirmation="Passwords do not match"
    valid=false
    }
    
    if(!form.country){
    errors.country="Please select a country"
    valid=false
    }
    
    return valid
    }
    
    
    /* ---------------- REGISTER ---------------- */
    const register = async ()=>{
    
        if(!validateForm()) return
        
        isAuthenticating.value = true
        const payload = {
            name:form.name,
            email:form.email,
            phone:form.phone,
            password:form.password,
            country:form.country
        }

        // console.log(payload)
        
        try{
        
            const data = await signUp(payload)


            if(data.success){
                
                pinia.state.isAuthenticated = true
                notify.success(
                "Registration Successful",
                "OTP has been sent to your email"
                )
                pinia.state.email = form.email
                navigateTo("/verify")
            }else{
                notify.error(data.message)
            }
        
        
        
        }catch(e){
        
        notify.error(
        "Registration Failed",
        e || "Something went wrong"
        )
        
        console.log(e)
        
        }
        
        isAuthenticating.value = false
    
    }
    
    
    /* ---------------- OTP INPUT ---------------- */
    
    const moveNext = (index)=>{
    
    const inputs = document.querySelectorAll(".otp-input")
    
    if(index < inputs.length - 1 && otp.value[index] !== ""){
    inputs[index+1].focus()
    }
    
    }
    
    
  
    
</script>