<template>
    <section
      ref="carsSection"
      class="bg-[#f8f9fa] text-[#111] py-16 px-4 md:px-8 overflow-hidden"
    >
      <div class="max-w-[1200px] mx-auto">
        <!-- Section Header -->
        <div
          ref="headerSection"
          class="flex flex-col md:flex-row md:items-center md:justify-between w-full mb-10 gap-6 md:gap-0 opacity-0 transform translate-y-10"
        >
          <!-- Title + Tabs -->
          <div class=" sm:flex-row sm:items-center sm:gap-8 w-full">
            <h2
              class="text-3xl md:text-4xl font-extrabold text-[#111] text-center sm:text-left sm:mb-0"
            >
              Explore All Cars
            </h2>
  
            <!-- Tabs -->
            <div
              class="flex items-center justify-center sm:justify-start border-b border-gray-300 max-w-full sm:max-w-[60%] mt-4 mx-auto sm:mx-0"
            >
              <button
                v-for="tab in tabs"
                :key="tab.value"
                @click="changeTab(tab.value)"
                :class="tabClass(tab.value)"
              >
                {{ tab.label }}
              </button>
            </div>
          </div>
  
          <!-- View All -->
          <div class="w-full flex justify-center md:justify-end">
            <button
              class="text-sm font-semibold text-[#fcb900] hover:text-[#111] transition-all"
            >
              View All →
            </button>
          </div>
        </div>
  
        <!-- Car Grid -->
        <div
          class="grid sm:grid-cols-2 md:grid-cols-3 gap-8 opacity-0 transform translate-y-10"
          ref="carGrid"
        >
          <div
            v-for="car in filteredCars"
            :key="car.id"
            ref="carRefs"
            class="car-card bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <!-- Image -->
            <div
              class="bg-cover bg-center h-56 relative"
              :style="`background-image: url(${car.image})`"
            >
              <!-- Like Button -->
              <button
                @click="toggleLike(car)"
                class="absolute top-3 right-3 p-2 rounded-full bg-white/20 backdrop-blur-sm shadow-md transition-transform duration-200 hover:scale-110"
              >
                <svg
                  v-if="car.liked"
                  class="h-6 w-6 text-[#fcb900] transform scale-110 transition-all duration-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12.76 3.76a6 6 0 0 1 8.48 8.48l-8.53 8.54a1 1 0 0 1-1.42 0l-8.53-8.54a6 6 0 0 1 8.48-8.48l.76.75.76-.75z"
                  />
                </svg>
                <svg
                  v-else
                  class="h-6 w-6 text-gray-400 transition-all duration-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 0 1 6.364 0L12 7.636l1.318-1.318a4.5 4.5 0 1 1 6.364 6.364L12 21.682l-7.682-9a4.5 4.5 0 0 1 0-6.364z"
                  />
                </svg>
              </button>
            </div>
  
            <!-- Content -->
            <div class="p-4">
              <p class="uppercase tracking-wide text-sm font-semibold text-gray-500">
                {{ car.condition }} • {{ car.year }}
              </p>
              <p class="text-2xl font-bold text-[#fcb900] mt-1">
                ₦{{ car.price.toLocaleString() }}
              </p>
              <p class="text-gray-800">{{ car.name }}</p>
  
              <!-- View Details Button -->
              <button
                class="mt-4 w-full bg-[#fcb900] text-[#111] font-semibold py-2 rounded-lg hover:bg-[#ffce33] transition-all duration-300"
              >
                View Details
              </button>
            </div>
  
            <!-- Specs -->
            <div class="flex p-4 border-t border-gray-200 text-gray-600">
              <div class="flex-1 flex items-center">
                <svg
                  class="h-5 w-5 text-[#fcb900] mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M3 13l1-7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2l1 7v7a1 1 0 0 1-1 1h-2v-2H6v2H4a1 1 0 0 1-1-1v-7z"
                  />
                </svg>
                <p>
                  <span class="text-[#111] font-semibold">{{ car.engine }}</span>
                  Engine
                </p>
              </div>
              <div class="flex-1 flex items-center">
                <svg
                  class="h-5 w-5 text-[#fcb900] mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 11h14v2H5zM4 15h16v2H4z" />
                </svg>
                <p>
                  <span class="text-[#111] font-semibold">{{ car.transmission }}</span>
                </p>
              </div>
            </div>
  
            <!-- Seller Info -->
            <div class="px-4 pt-3 pb-4 border-t border-gray-200 bg-[#f9f9f9]">
              <div class="text-xs uppercase font-bold text-gray-500 tracking-wide">
                Seller
              </div>
              <div class="flex items-center pt-2">
                <div
                  class="bg-cover bg-center w-10 h-10 rounded-full mr-3"
                  :style="`background-image: url(${car.seller.avatar})`"
                ></div>
                <div>
                  <p class="font-semibold text-[#111]">{{ car.seller.name }}</p>
                  <p class="text-sm text-gray-500">{{ car.seller.phone }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, nextTick } from 'vue'
  import gsap from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  
  gsap.registerPlugin(ScrollTrigger)
  
  const activeTab = ref('all')
  const tabs = [
    { label: 'In Stock', value: 'all' },
    { label: 'Used', value: 'used' },
    { label: 'New', value: 'new' }
  ]
  
  const cars = ref([
    {
      id: 1,
      name: 'Toyota Corolla LE',
      condition: 'Used',
      year: 2018,
      price: 8500000,
      engine: '1.8L',
      transmission: 'Automatic',
      image: '/image/car-home1.jpg',
      liked: false,
      seller: {
        name: 'Jide Motors',
        phone: '(+234) 801 222 5555',
        avatar:
          'https://images.unsplash.com/photo-1603415526960-f7e0328b5d5f?auto=format&fit=crop&w=100&q=60'
      }
    },
    {
      id: 2,
      name: 'Honda Accord Sport',
      condition: 'New',
      year: 2023,
      price: 21000000,
      engine: '2.0L Turbo',
      transmission: 'Automatic',
      image: '/image/car-home1.jpg',
      liked: false,
      seller: {
        name: 'MegaCar Hub',
        phone: '(+234) 809 331 9876',
        avatar:
          'https://images.unsplash.com/photo-1614287349507-0a3c2b7de5af?auto=format&fit=crop&w=100&q=60'
      }
    },
    {
      id: 3,
      name: 'Lexus RX 350',
      condition: 'In Stock',
      year: 2021,
      price: 35000000,
      engine: '3.5L V6',
      transmission: 'Automatic',
      image: '/image/car-home1.jpg',
      liked: false,
      seller: {
        name: 'AutoElite',
        phone: '(+234) 806 112 4477',
        avatar:
          'https://images.unsplash.com/photo-1624561231800-8cda9d92c567?auto=format&fit=crop&w=100&q=60'
      }
    }
  ])
  
  const filteredCars = computed(() => {
    if (activeTab.value === 'all') return cars.value
    return cars.value.filter(
      (car) => car.condition.toLowerCase() === activeTab.value.toLowerCase()
    )
  })
  
  const tabClass = (tab) =>
    `relative px-4 py-2 text-sm font-semibold border-b-2 transition-all duration-300 ${
      activeTab.value === tab
        ? 'border-[#fcb900] text-[#111]'
        : 'border-transparent text-gray-500 hover:text-[#111] hover:border-[#fcb900]/40'
    }`
  
  const changeTab = (tab) => {
    activeTab.value = tab
  }
  
  const toggleLike = (car) => {
    car.liked = !car.liked
  }
  
  const carRefs = ref([])
  const carsSection = ref(null)
  const headerSection = ref(null)
  const carGrid = ref(null)
  
  onMounted(async () => {
    await nextTick()
  
    // Animate header (title + tabs)
    gsap.fromTo(
      headerSection.value,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: carsSection.value,
          start: 'top 75%'
        }
      }
    )
  
    // Animate car grid container
    gsap.fromTo(
      carGrid.value,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: carGrid.value,
          start: 'top 50%'
        }
      }
    )
  
    // Animate individual car cards
    gsap.fromTo(
      carRefs.value,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.25,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: carGrid.value,
          start: 'top 50%'
        }
      }
    )
  })
  </script>
  
  <style scoped>
  .car-card {
    will-change: transform, opacity;
  }
  </style>
  