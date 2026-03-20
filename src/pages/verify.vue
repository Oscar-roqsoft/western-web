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
    
                <div>
    
                <p class="text-gray-600 mb-6 text-sm">
                    We sent a verification code to
                    <span class="font-semibold">{{ form.email }}</span>
                </p>
                
                <div class="flex justify-between gap-2 mb-6">
                
                    <input
                        v-for="(digit,index) in otp"
                        :key="index"
                        maxlength="1"
                        v-model="otp[index]"
                        @input="moveNext(index)"
                        @keydown="movePrevious($event,index)"
                        class="otp-input w-12 h-12 text-center text-xl border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    
                    </div>
                    
                    <button
                    @click="verifyOtp"
                    class="w-full py-3 flex justify-center items-center gap-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                    Verify Account
                    <Spinner v-if="isVerifying"  stroke="#fff" />
                

                    </button>
                
                    <button
                    @click="resendOtp"
                    class="w-full mt-3 text-sm text-blue-600 hover:underline"
                    >
                      {{ resendText}}
                    </button>
                
                </div>


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
    const isVerifying = ref(false)

    const resendText = ref("Resend Code")
    
    const otp = ref(["","","","",""])
    
    const form = reactive({
    name:"",
    email:"",
    phone:"",
    password:"",
    password_confirmation:"",
    country:"",
    refer:"NB"
    })
    
   
    
    
  
    
  
    
    
    /* ---------------- OTP INPUT ---------------- */
    
    const moveNext = (index)=>{
    
    const inputs = document.querySelectorAll(".otp-input")
    
    if(index < inputs.length - 1 && otp.value[index] !== ""){
    inputs[index+1].focus()
    }
    
    }

    const movePrevious = (event,index)=>{

        const inputs = document.querySelectorAll(".otp-input")

        if(event.key === "Backspace"){

            if(otp.value[index] === "" && index > 0){
                inputs[index - 1].focus()
            }else{
                otp.value[index] = ""
            }

        }

    }
    
    
    /* ---------------- VERIFY OTP ---------------- */
    
    const verifyOtp = async ()=>{
    
        const code = otp.value.join("")
        
        if(code.length !== 5){
        notify.error("Enter valid OTP")
        return
        }

        isVerifying.value = true

        const payload = {
            email:pinia.state.email,
            otp:code
        }
        
        try{
        
            const data = await verifyCode(payload)
        
            if(data.success){
                notify.success(data.message)
                pinia.setUser(data.data)
                navigateTo("/dashboard")
            }else{
                notify.success(data.message)
            }
            
            isVerifying.value = false
        }catch(e){
        
        notify.error("Invalid OTP")
        
        }
    
    }
    
    
    /* ---------------- RESEND OTP ---------------- */
    
    const resendOtp = async ()=>{

        resendText.value = ref("Sending ...")
        const payload ={email:pinia.state.email}
        console.log(payload)
        try{
            const data = await sendCode(payload)
        
            if(data.success){
                notify.success(data.message)
                resendText.value = ref("Sent")
                resendText.value = ref("Resend Code")
            }else{
                notify.success(data.message)
            }

            resendText.value = ref("Resend Code")
        }catch(e){
        }
    
    }
    
</script>