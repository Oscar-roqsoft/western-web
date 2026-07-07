<template>

    <div>
    
        <p class="text-gray-500 text-sm">
            {{ label }}
        </p>
    
        <p class="font-semibold break-all">
            {{ value }}
        </p>
    
    </div>
    
    </template>
    
    <script setup>
    
    defineProps({
    
        label:String,
    
        value:[String,Number]
    
    })
    
    </script>