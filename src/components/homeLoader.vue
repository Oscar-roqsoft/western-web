<template>
    <div class="flex items-center justify-center h-screen bg-gray-900 z-50">
      <div class="relative flex items-center justify-center w-60 h-60 transform rotate-x-30 rotate-z-45">
        <div
          v-for="n in 12"
          :key="n"
          class="absolute w-6 h-6 bg-blue-500 rounded-full shadow-lg animate-ping"
          :style="dotStyle(n)"
        ></div>
        <p class="absolute text-white text-xs tracking-widest uppercase transform -rotate-45">
          Loading…
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  const dotStyle = (index) => {
    const angle = (360 / 12) * (index - 1);
    return {
      transform: `rotate(-${angle}deg) translateX(5rem) rotate(${angle}deg)`,
      animationDelay: `${-index / 12}s`,
    };
  };
  </script>
  