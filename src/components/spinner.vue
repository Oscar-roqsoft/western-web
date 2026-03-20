<template>
    <div
      :style="{
        width: size + 'px',
        height: size + 'px',
        borderWidth: thickness + 'px'
      }"
      class="border-gray-300 border-t-blue-600 rounded-full animate-spin"
    ></div>
  </template>
  
  <script setup>
  defineProps({
    size: {
      type: Number,
      default: 16
    },
    thickness: {
      type: Number,
      default: 2
    }
  })
  </script>