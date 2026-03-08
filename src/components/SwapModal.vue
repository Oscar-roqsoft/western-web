<template>

    <BaseModal>
    
    <div class="flex justify-between items-center mb-4">
    
    <h2 class="font-bold text-lg">
    Swap Tokens
    </h2>
    
    <button @click="$emit('close')">
    <X class="w-5 h-5"/>
    </button>
    
    </div>
    
    <SwapForm/>
    
    </BaseModal>
    
    </template>
    
    
    <script setup>
    
    import BaseModal from "./BaseModal.vue"
    import SwapForm from "./SwapForm.vue"
    import { X } from "lucide-vue-next"
    
    </script>