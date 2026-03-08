<template>

    <BaseModal>
    
    <div class="text-center">
    
    <h2 class="font-bold text-lg mb-2">
    Logout
    </h2>
    
    <p class="text-sm text-gray-500 mb-4">
    Are you sure you want to logout?
    </p>
    
    <div class="flex gap-3">
    
    <button
    class="flex-1 border py-2 rounded-lg"
    @click="$emit('close')"
    >
    Cancel
    </button>
    
    <button
    class="flex-1 bg-red-500 text-white py-2 rounded-lg"
    >
    Logout
    </button>
    
    </div>
    
    </div>
    
    </BaseModal>
    
    </template>
    
    <script setup>
    // import BaseModal from "./BaseModal.vue"
    </script>