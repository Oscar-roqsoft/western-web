<template>
    <div
      class="group relative flex gap-6 p-6 rounded-2xl
             bg-gray-200 transition-all duration-500
             hover:bg-gray-800 hover:-translate-y-2
             hover:shadow-xl hover:shadow-black/40 hover:text-gray-300"
    >
      <!-- Step Number -->
      <div
        class="flex-shrink-0 w-14 h-14 rounded-xl
               bg-primary/10 text-primary
               flex items-center justify-center
               font-bold text-lg
               transition group-hover:bg-primary group-hover:text-white"
      >
        {{ step }}
      </div>
  
      <!-- Content -->
      <div>
        <h3
          class="text-lg font-semibold text mb-2
                 transition-colors group-hover:text-primary"
        >
          {{ title }}
        </h3>
  
        <p class="text-sm text-gray-500 hover:text-gray-300 leading-relaxed">
          {{ text }}
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    step: String,
    title: String,
    text: String,
    icon: String, // optional for future icons
  })
  </script>
  