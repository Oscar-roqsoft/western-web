<template>

    <div class="bg-white rounded-2xl border overflow-hidden">
    
        <div class="h-72 bg-gray-100">
    
            <img
                :src="image"
                class="w-full h-full object-cover"
            >
    
        </div>
    
        <div class="p-5">
    
            <h3 class="font-semibold">
                {{ title }}
            </h3>
    
            <a
                :href="image"
                target="_blank"
                class="text-blue-600 text-sm mt-2 inline-block"
            >
                View Full Image
            </a>
    
        </div>
    
    </div>
    
    </template>
    
    <script setup>
    
    defineProps({
    
        title:String,
    
        image:String
    
    })
    
    </script>