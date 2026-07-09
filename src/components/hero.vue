<template>
    <section class="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-black via-[#0b0b0b] to-[#191919]">
      <!-- Background overlay glow -->
      <div class="absolute inset-0">
        <div class="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#fcb900]/20 blur-[120px] rounded-full animate-pulse"></div>
        <div class="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-500/10 blur-[120px] rounded-full"></div>
      </div>
  
      <!-- Main Slider Container -->
      <div class="relative z-10 w-full max-w-[1200px] mx-auto px-6">
        <div class="grid md:grid-cols-2 gap-12 items-center min-h-[600px]">
          
          <!-- LEFT CONTENT - Slides -->
          <div class="relative pt-28 md:pt-0 overflow-hidden">
            <TransitionGroup 
              name="slide-fade" 
              mode="out-in"
              class="relative"
            >
              <div 
                :key="currentSlide.id" 
                class="space-y-6 absolute w-full"
                :style="{ position: 'relative' }"
              >
                <!-- Subtitle -->
                <p class="text-[#fcb900] uppercase tracking-widest text-sm font-semibold">
                  {{ currentSlide.subtitle }}
                </p>
  
                <!-- Title -->
                <h1 class="text-white text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight">
                  {{ currentSlide.title }}
                  <span class="inline-flex items-center gap-2">
                    {{ currentSlide.highlight }}
                  </span>
                </h1>
  
                <!-- Description -->
                <p class="text-gray-300 max-w-xl text-lg">
                  {{ currentSlide.description }}
                </p>
  
                <!-- CTA BUTTONS -->
                <div class="flex flex-wrap items-center gap-4 pt-4">
                  <NuxtLink to="/login">
                    <button class="px-6 py-3 bg-white text-black font-semibold rounded-full hover:scale-105 transition-all duration-300 shadow-lg">
                      Login
                    </button>
                  </NuxtLink>
  
                  <NuxtLink to="/register">
                    <button class="px-6 py-3 bg-[#fcb900] text-black font-semibold rounded-full flex items-center gap-2 hover:bg-[#ffd24d] hover:scale-105 transition-all duration-300">
                      Join Us →
                    </button>
                  </NuxtLink>
                </div>
  
                <!-- App Store Links -->
                <div class="flex items-center gap-6">
                  <img src="/app-store-logo.svg" alt="App Store" class="w-24 h-24">
                  <img src="/google-store-logo.svg" alt="Google Store" class="w-24 h-24">
                </div>
  
                <!-- User Stats -->
                <div class="flex items-center gap-6 pt-4">
                  <div class="flex -space-x-2">
                    <img v-for="(user, index) in userImages.slice(0, 4)" 
                         :key="index"
                         :src="user" 
                         alt="User" 
                         class="w-10 h-10 rounded-full border-2 border-gray-800 object-cover"
                         :style="{ transform: `translateX(${index * 8}px)` }"
                    />
                  </div>
                  <div>
                    <p class="text-xl font-extrabold text-white">
                      10<span class="text-[#fcb900]">M+</span>
                    </p>
                    <p class="text-xs text-gray-400 flex items-center gap-2">
                      <span class="w-2 h-2 rounded-full bg-[#fcb900]"></span>
                      World Enrolled Users
                    </p>
                  </div>
                </div>
              </div>
            </TransitionGroup>
          </div>
  
          <!-- RIGHT CONTENT - Image with rotating icons -->
          <div class="hidden md:flex justify-center relative">
            <!-- Image Carousel -->
            <div class="relative w-[380px] h-[380px] rounded-full overflow-hidden shadow-2xl">
              <TransitionGroup name="fade-zoom" mode="out-in">
                <img
                  :key="currentSlide.id"
                  :src="currentSlide.image"
                  alt="Hero"
                  class="absolute inset-0 w-full h-full object-cover"
                />
              </TransitionGroup>
              
              <!-- Soft Overlay -->
              <div class="absolute inset-0 bg-black/10"></div>
            </div>
  
            <!-- Floating Icons -->
            <div 
              v-for="(icon, index) in floatingIcons" 
              :key="index"
              class="absolute"
              :class="icon.position"
            >
              <div class="w-14 h-14 rounded-full bg-gray-900/90 backdrop-blur-sm flex items-center justify-center shadow-lg border border-gray-800">
                <component :is="icon.component" class="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>
  
        <!-- Slider Controls -->
        <div class="flex items-center justify-center gap-4 mt-12 relative z-10">
          <button 
            @click="prevSlide" 
            class="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div class="flex gap-2">
            <button 
              v-for="(slide, index) in slides" 
              :key="index"
              @click="goToSlide(index)"
              class="h-2 rounded-full transition-all duration-500"
              :class="[
                currentSlideIndex === index 
                  ? 'w-8 bg-[#fcb900]' 
                  : 'w-2 bg-white/30 hover:bg-white/50'
              ]"
              :aria-label="`Go to slide ${index + 1}`"
            />
          </div>
          
          <button 
            @click="nextSlide" 
            class="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  
  // Slide Data
  const slides = [
    {
      id: 1,
      subtitle: 'Quantum Financial System',
      title: 'Quantum Financial System',
      highlight: 'IS HERE',
      description: 'Decentralized financial system designed to democratize money and eliminate the control of central banks.',
    //   image: '/hero/image.png'
    },
    {
      id: 2,
      subtitle: 'Next Generation Banking',
      title: 'Experience the Future of',
      highlight: 'Digital Finance',
      description: 'Built on quantum-resistant blockchain technology for unprecedented security and speed.',
    //   image: '/hero/girl.png' // Add your second image
    },
    {
      id: 3,
      subtitle: 'Global Adoption',
      title: 'Join the Revolution of',
      highlight: 'Financial Freedom',
      description: 'Over 10 million users worldwide are already experiencing the benefits of decentralized finance.',
      image: '/imgHero3.png' // Add your third image
    }
  ]
  
  const userImages = [
    '/files/hh1.jpg',
    '/files/hh2.jpg',
    '/files/hh3.jpg',
    '/files/hh4.jpg'
  ]
  
  // Floating Icons with different animations
  const floatingIcons = [
    {
      position: 'absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-float1',
      component: 'CryptoIcon'
    },
    {
      position: 'absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 animate-float2',
      component: 'CryptoIcon'
    },
    {
      position: 'absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 animate-float3',
      component: 'WorldIcon'
    },
    {
      position: 'absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-float4',
      component: 'LightningIcon'
    }
  ]
  
  // State
  const currentSlideIndex = ref(0)
  let autoPlayInterval = null
  
  // Computed
  const currentSlide = computed(() => slides[currentSlideIndex.value])
  
  // Methods
  const nextSlide = () => {
    currentSlideIndex.value = (currentSlideIndex.value + 1) % slides.length
  }
  
  const prevSlide = () => {
    currentSlideIndex.value = currentSlideIndex.value === 0 
      ? slides.length - 1 
      : currentSlideIndex.value - 1
  }
  
  const goToSlide = (index) => {
    currentSlideIndex.value = index
  }
  
  // Auto-play
  const startAutoPlay = () => {
    autoPlayInterval = setInterval(nextSlide, 5000)
  }
  
  const stopAutoPlay = () => {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval)
      autoPlayInterval = null
    }
  }
  
  onMounted(() => {
    startAutoPlay()
  })
  
  onUnmounted(() => {
    stopAutoPlay()
  })
  </script>
  
  <style scoped>
  /* Transition Animations */
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .slide-fade-enter-from {
    opacity: 0;
    transform: translateY(30px);
  }
  
  .slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-30px);
  }
  
  .fade-zoom-enter-active,
  .fade-zoom-leave-active {
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .fade-zoom-enter-from {
    opacity: 0;
    transform: scale(0.95);
  }
  
  .fade-zoom-leave-to {
    opacity: 0;
    transform: scale(1.05);
  }
  
  /* Floating Animations */
  @keyframes float1 {
    0%, 100% { transform: translateY(0px) translateX(-50%); }
    50% { transform: translateY(-15px) translateX(-50%); }
  }
  
  @keyframes float2 {
    0%, 100% { transform: translateY(0px) translateX(50%); }
    50% { transform: translateY(15px) translateX(50%); }
  }
  
  @keyframes float3 {
    0%, 100% { transform: translateY(0px) translateX(-50%); }
    50% { transform: translateY(15px) translateX(-50%); }
  }
  
  @keyframes float4 {
    0%, 100% { transform: translateY(0px) translateX(-50%); }
    50% { transform: translateY(-10px) translateX(-50%); }
  }
  
  .animate-float1 {
    animation: float1 4s ease-in-out infinite;
  }
  
  .animate-float2 {
    animation: float2 4.5s ease-in-out infinite;
  }
  
  .animate-float3 {
    animation: float3 5s ease-in-out infinite;
  }
  
  .animate-float4 {
    animation: float4 3.5s ease-in-out infinite;
  }
  
  /* Hover pause for auto-play */
  .relative:hover .slide-fade-enter-active {
    animation-play-state: paused;
  }
  
  /* Responsive Adjustments */
  @media (max-width: 768px) {
    .slide-fade-enter-from {
      transform: translateX(30px);
    }
    
    .slide-fade-leave-to {
      transform: translateX(-30px);
    }
  }
  </style>