<template>
    <div
      class="group rounded-xl p-6
             bg-gray-900 transition-all duration-500
             hover:bg-gray-800 hover:-translate-y-2
             hover:shadow-xl hover:shadow-black/40"
    >
      <h3
        class="text-lg font-semibold text-white mb-3
               transition-colors group-hover:text-primary"
      >
        {{ title }}
      </h3>
  
      <div class="w-10 h-0.5 bg-primary mb-4
                  transition-all duration-500
                  group-hover:w-16" />
  
      <p class="text-sm text-gray-400 leading-relaxed">
        {{ text }}
      </p>
    </div>
  </template>
  
  <script setup>
  defineProps({
    title: String,
    text: String,
  })
  </script>
  