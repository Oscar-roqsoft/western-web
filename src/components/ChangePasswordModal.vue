

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
:type="showNew ? 'text' : 'password'"
placeholder="Enter new password"
class="input"
/>

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
:type="showConfirm ? 'text' : 'password'"
placeholder="Confirm password"
class="input"
/>

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

<button class="btn-primary">
Update Password
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
    
    import BaseModal from "./BaseModal.vue"
    
    const showCurrent = ref(false)
    const showNew = ref(false)
    const showConfirm = ref(false)
    
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