<template>
  <div
    class="group bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 hover:-translate-y-2 hover:shadow-xl transition"
    :style="{ animationDelay: delay + 'ms' }"
  >
    <img
      :src="icon"
      :alt="title"
      class="w-16 h-16 mb-6 transition group-hover:scale-110"
    />

    <h3 class="text-xl font-semibold mb-3">
      {{ title }}
    </h3>

    <p class="text-gray-600 text-sm leading-relaxed">
      {{ text }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  icon: String,
  title: String,
  text: String,
  delay: {
    type: Number,
    default: 0,
  },
})
</script>

<style scoped>
div {
  animation: fadeUp 0.8s ease forwards;
  opacity: 0;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
