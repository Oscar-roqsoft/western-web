<template>

    <BaseModal>
    
    <div class="flex justify-between mb-4">
    
    <h2 class="font-bold text-lg">
    Send Crypto
    </h2>
    
    <button @click="$emit('close')">
    <X class="w-5 h-5"/>
    </button>
    
    </div>
    
    
    <input
    placeholder="Recipient Address"
    class="w-full border rounded-lg p-2 mb-3"
    />
    
    
    <input
    placeholder="Amount"
    type="number"
    class="w-full border rounded-lg p-2 mb-4"
    />
    
    
    <button
    class="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
    >
    Send
    </button>
    
    </BaseModal>
    
    </template>
    
    
    <script setup>
    
    // import BaseModal from "./BaseModal.vue"
    import { X } from "lucide-vue-next"
    
    </script>