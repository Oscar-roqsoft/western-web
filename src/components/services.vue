<template>
  <div
    class="group relative overflow-hidden rounded-2xl
           bg-gray-50/40 p-8 backdrop-blur-md
           transition-all duration-500 ease-out
           hover:-translate-y-3 hover:bg-gray-800
           hover:shadow-2xl hover:shadow-black/40 shadow-md"
  >
    <!-- Subtle Hover Overlay -->
    <span
      class="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition
             bg-gradient-to-br from-gray-700/40 via-transparent to-gray-900/60"
    ></span>

    <!-- Content -->
    <div class="relative z-10">
      <!-- Icon -->
      <div
        class="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl
               bg-gray-50 text-primary
               transition-all duration-500
               group-hover:-translate-y-1 group-hover:rotate-6
              "
      >
        <ServiceIcon :name="icon" />
      </div>

      <!-- Title -->
      <h3
        class="text-xl font-semibold mb-3
               transition-colors group-hover:text-primary"
      >
        {{ title }}
      </h3>

      <!-- Description -->
      <p
        class="text-gray-600 mb-6
               transition-colors group-hover:text-gray-300"
      >
        {{ text }}
      </p>

      <!-- Arrow -->
      <div
        class="inline-flex items-center gap-2 text-primary font-medium
               transition-all duration-500 group-hover:gap-4"
      >
        <span>Learn more</span>
        <span
          class="transition-transform duration-500 group-hover:translate-x-2"
        >
          →
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  icon: String,
  title: String,
  text: String,
})
</script>

