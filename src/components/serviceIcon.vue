<template>
    <svg
      v-if="name === 'credit-card'"
      class="w-12 h-12"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      viewBox="0 0 24 24"
    >
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  
    <svg v-else-if="name === 'coins'" class="w-12 h-12" viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="5" />
      <ellipse cx="12" cy="16" rx="7" ry="3" />
    </svg>
  
    <!-- You can add more SVGs here -->
  </template>
  
  <script setup>
  defineProps({ name: String })
  </script>
  