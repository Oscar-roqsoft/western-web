<template>
    <BaseModal>
    
    <!-- Header -->
    <div class="modal-header">
    
    <h2 class="modal-title">
    {{ title }}
    </h2>
    
    <button class="close-btn" @click="$emit('close')">
    <X size="20"/>
    </button>
    
    </div>
    
    
    <p class="modal-desc">
    {{ description }}
    </p>
    
    
    <!-- PIN INPUT -->
    <div class="pin-wrapper">
    
    <input
    v-for="(digit,index) in pin"
    :key="index"
    ref="inputs"
    maxlength="1"
    inputmode="numeric"
    class="pin-box"
    v-model="pin[index]"
    @input="handleInput(index)"
    @keydown="handleKey(index,$event)"
    />
    
    </div>
    
    
    <!-- Buttons -->
    <div class="modal-actions">
    
    <button
    class="btn-secondary"
    @click="$emit('close')"
    >
    Cancel
    </button>
    
    <button
    class="btn-primary flex justify-center items-center"
    @click="nextStep"
    >
       
       <span v-if="!isCreating">Continue</span>
       <Spinner v-else stroke="#fff" />
    </button>
    
    </div>
    
    </BaseModal>
</template>

<script setup>

    import { ref, computed, nextTick, onMounted } from "vue"
    import { X } from "lucide-vue-next"
    // import BaseModal from "./BaseModal.vue"
    import { createPin,updatePin } from '@/composables/requests/pin'; // Adjust path as needed



    const pinia = useStore()
    const notify = useNotify()
    
    const hasPin = ref(pinia.state.user.isPinSet) // simulate if user already has pin
    
    const step = ref(1)
    
    const pin = ref(["","","",""])

    const oldPin = ref("")
    const firstPin = ref("")
    
    const inputs = ref([])

    const isCreating = ref(false)
    
    
    const title = computed(()=>{
    
        if(!hasPin.value && step.value===1) return "Create PIN"
        if(!hasPin.value && step.value===2) return "Confirm PIN"
        
        if(hasPin.value && step.value===1) return "Enter Current PIN"
        if(hasPin.value && step.value===2) return "New PIN"
        if(hasPin.value && step.value===3) return "Confirm PIN"
    
    })
    
    
    const description = computed(()=>{
    
    if(!hasPin.value) return "Create a 4-digit security PIN."
    return "Enter your PIN to continue."
    
    })
    
    
    const clearPin = ()=>{
      pin.value = ["","","",""]
    }
    
    
    const focusFirst = ()=>{
    nextTick(()=>{
    inputs.value[0]?.focus()
    })
    }
    
    
    onMounted(()=>{
    focusFirst()
    })
    
    
    const handleInput = (index)=>{
    
    pin.value[index] = pin.value[index].replace(/[^0-9]/g,"")
    
    if(pin.value[index] && index < 3){
    inputs.value[index+1].focus()
    }
    
    }
    
    
    const handleKey = (index,e)=>{
    
    if(e.key === "Backspace" && !pin.value[index] && index>0){
    inputs.value[index-1].focus()
    }
    
    }
    
    
    const getPin = ()=>{
      return pin.value.join("")
    }
    
    
    const nextStep = async()=>{
    
        const value = getPin()
        
        if(value.length !== 4) return

        try{

            // NO PIN FLOW
            if(!hasPin.value){
            
                if(step.value === 1){
                
                    firstPin.value = value
                    clearPin()
                    step.value = 2
                    focusFirst()
                
                }else{
                    
                    if(value !== firstPin.value){
                        notify.error("PIN does not match")
                        return
                    }
                    
                    isCreating.value = true

                    const payload ={
                        userId:pinia.state.user.id,
                        pin:value
                    }

                   const data = await createPin(payload)
                   if(data.success){
                     notify.success(data.message)
                     pinia.state.user.isPinSet = true
                     pin.value = ["","","",""]
                   }else{
                     notify.error(data.message)
                   }

                   isCreating.value = false
                    
                }
            
            }
            // UPDATE PIN FLOW
            else{
            
                if(step.value === 1){
                
                    // verify current pin
                    oldPin.value = value
                    step.value = 2
                    clearPin()
                    focusFirst()
            
                }else if(step.value === 2){
                
                    firstPin.value = value
                    step.value = 3
                    clearPin()
                    focusFirst()
                
                }else{
            
                    if(value !== firstPin.value){
                        notify.error("PIN mismatch")
                        return
                    }
                    
                    isCreating.value = true

                    const payload ={
                        userId:pinia.state.user.id,
                        currentPin:oldPin.value ,
                        newPin:value
                    }

                    console.log(payload)

                   const data = await updatePin(payload)

                   if(data.success){
                     notify.success(data.message)
                     pin.value = ["","","",""]
                   }else{
                     notify.error(data.message)
                   }

                   isCreating.value = false
                    
                }
                    
            }

        }catch(e){
          console.log(e)
        }
        
        
    }
    
    
</script>

<style scoped> 
.modal-header{
display:flex;
justify-content:space-between;
align-items:center;
margin-bottom:8px;
}

.modal-title{
font-size:18px;
font-weight:600;
}

.close-btn{
border:none;
background:none;
cursor:pointer;
padding:6px;
border-radius:6px;
}

.close-btn:hover{
background:#f3f4f6;
}

.modal-desc{
font-size:13px;
color:#6b7280;
margin-bottom:20px;
}

.pin-wrapper{
display:flex;
justify-content:center;
gap:12px;
margin-bottom:20px;
}

.pin-box{
width:50px;
height:50px;
font-size:22px;
text-align:center;
border:1px solid #e5e7eb;
border-radius:10px;
outline:none;
transition:0.2s;
}

.pin-box:focus{
border-color:#6366f1;
box-shadow:0 0 0 2px rgba(99,102,241,0.15);
}

.modal-actions{
display:flex;
gap:10px;
}

.btn-primary{
flex:1;
background:#6366f1;
color:white;
border:none;
padding:10px;
border-radius:8px;
cursor:pointer;
font-weight:500;
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