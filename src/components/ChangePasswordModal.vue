

<template>

<BaseModal>

    <!-- Header -->
    <div class="modal-header">

    <h2 class="modal-title">
    Change Password
    </h2>

    <button
    class="close-btn"
    @click="$emit('close')"
    >
    <X size="20"/>
    </button>

    </div>


    <!-- Description -->
    <p class="modal-desc">
    Update your account password to keep your account secure.
    </p>


    <!-- Form -->
    <div class="form-group">

    <label class="label">
    Current Password
    </label>

    <div class="input-wrap">

    <input
    v-model.trim="form.currentPassword"
    :type="showCurrent ? 'text' : 'password'"
    placeholder="Enter current password"
    class="input"
    />

    <button
    class="eye"
    @click="showCurrent = !showCurrent"
    >
    <Eye v-if="!showCurrent" size="18"/>
    <EyeOff v-else size="18"/>
    </button>

    </div>

    </div>


    <div class="form-group">

    <label class="label">
    New Password
    </label>

    <div class="input-wrap">

    <input
     v-model.trim="form.newPassword"
    :type="showNew ? 'text' : 'password'"
    placeholder="Enter new password"
    class="input"
    :class="errors.newPassword ? 'border-red-500' : 'border-gray-300'"
    />

    <p v-if="errors.newPassword" class="text-red-500 text-xs mt-1">
        {{ errors.newPassword }}
    </p>

    <button
    class="eye"
    @click="showNew = !showNew"
    >
    <Eye v-if="!showNew" size="18"/>
    <EyeOff v-else size="18"/>
    </button>

    </div>

    </div>


    <div class="form-group">

    <label class="label">
    Confirm Password
    </label>

    <div class="input-wrap">

    <input
     v-model.trim="form.password_confirmation"
    :type="showConfirm ? 'text' : 'password'"
    placeholder="Confirm password"
    class="input"
     :class="errors.password_confirmation ? 'border-red-500' : 'border-gray-300'"
    />
    <p v-if="errors.password_confirmation" class="text-red-500 text-xs mt-1">
        {{ errors.password_confirmation }}
    </p>

<button
class="eye"
@click="showConfirm = !showConfirm"
>
<Eye v-if="!showConfirm" size="18"/>
<EyeOff v-else size="18"/>
</button>

</div>

</div>


<!-- Actions -->
<div class="modal-actions">

<button
class="btn-secondary"
@click="$emit('close')"
>
Cancel
</button>

<button @click="updatePassword" class="btn-primary text-xs flex justify-center items-center">
     
     <span v-if="!isUpdating"  >Update Password</span>
     <Spinner v-else stroke="#fff" />
</button>

</div>

</BaseModal>

</template>

<script setup>

    import { ref } from "vue"
    
    import {
    X,
    Eye,
    EyeOff
    } from "lucide-vue-next"
    import { updateUserPassword } from '@/composables/requests/user'; // Adjust path as needed

    
    // import BaseModal from "./BaseModal.vue"

    const pinia =  useStore()
    const notify = useNotify()
    
    const showCurrent = ref(false)
    const showNew = ref(false)
    const showConfirm = ref(false)
    const isUpdating = ref(false)

    const form = reactive({
        currentPassword:"",
        newPassword:"",
        password_confirmation:"",
    })
    
    const errors = reactive({
        newPassword:"",
        password_confirmation:"",
    })

     /* ---------------- VALIDATION ---------------- */
    
    const validateForm = ()=>{
   
        errors.newPassword=""
        errors.password_confirmation=""
        
        let valid = true
        
        if(!form.newPassword){
            errors.newPassword="Password is required"
            valid=false
        }else if(form.newPassword.length < 6){
            errors.newPassword="Password must be at least 6 characters"
            valid=false
        }
        
        if(form.newPassword !== form.password_confirmation){
            errors.password_confirmation="Passwords do not match"
            valid=false
        }
        
    
        
        return valid
    }

    const updatePassword = async()=>{

        if(!validateForm()) return

        isUpdating.value =  true

        const payload ={
            userId: pinia.state.user.id,
            currentPassword:form.currentPassword,
            newPassword:form.newPassword,
        }

        try{

            const data = await updateUserPassword(payload)

            console.log(data)

            if(data.success){
                
                    notify.success(data.message)
            }else{

                notify.error(data.message)

            }

        }catch(e){

        notify.error("failed")

        }
        isUpdating.value =  false
         
    }
    
</script>

<style scoped>
.modal-header{
display:flex;
align-items:center;
justify-content:space-between;
margin-bottom:6px;
}

.modal-title{
font-size:18px;
font-weight:600;
}

.close-btn{
border:none;
background:none;
cursor:pointer;
padding:4px;
border-radius:6px;
}

.close-btn:hover{
background:#f3f4f6;
}

.modal-desc{
font-size:13px;
color:#6b7280;
margin-bottom:18px;
}

.form-group{
margin-bottom:14px;
}

.label{
font-size:13px;
font-weight:500;
margin-bottom:6px;
display:block;
}

.input-wrap{
position:relative;
}

.input{
width:100%;
padding:10px 38px 10px 12px;
border:1px solid #e5e7eb;
border-radius:8px;
font-size:14px;
outline:none;
transition:0.2s;
}

.input:focus{
border-color:#6366f1;
box-shadow:0 0 0 2px rgba(99,102,241,0.15);
}

.eye{
position:absolute;
right:10px;
top:50%;
transform:translateY(-50%);
background:none;
border:none;
cursor:pointer;
color:#6b7280;
}

.modal-actions{
display:flex;
gap:10px;
margin-top:18px;
}

.btn-primary{
flex:1;
background:#6366f1;
color:white;
border:none;
padding:10px;
border-radius:8px;
font-weight:500;
cursor:pointer;
}

.btn-primary:hover{
background:#4f46e5;
}

.btn-secondary{
flex:1;
border:1px solid #e5e7eb;
background:white;
padding:10px;
border-radius:8px;
cursor:pointer;
}
</style>