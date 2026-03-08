<template>
    <div
      class="perspective  w-[380px] h-[220px]  sm:h-[240px] cursor-pointer mx-auto"
      @click="flipCard"
    >
      <div
        class="relative w-full h-full transition-transform duration-500 preserve-3d"
        :class="{ 'rotate-y-180': isFlipped }"
      >
        <!-- FRONT -->
        <div
          class="absolute w-full h-full rounded-xl p-5 text-white backface-hidden bg-gradient-to-br from-indigo-700 to-blue-900"
        >
          <!-- Top -->
          <div class="flex justify-between items-center font-semibold">
            <span class="text-sm sm:text-base">{{ bank }}</span>
            <Wifi class="w-5 h-5" />
          </div>
  
          <!-- Chip + Visa -->
          <div class="mt-6 flex justify-between items-center">
            <CreditCard class="w-8 h-8" />
            <span class="font-bold text-lg tracking-widest">VISA</span>
          </div>
  
          <!-- Number -->
          <div class="mt-6 text-lg sm:text-xl tracking-widest font-medium">
            {{ formattedNumber }}
          </div>
  
          <!-- Bottom -->
          <div class="flex justify-between mt-6 text-xs sm:text-sm">
            <div>
              <p class="opacity-70 text-[10px]">CARD HOLDER</p>
              <p class="font-medium">{{ firstname }} {{ lastname }}</p>
            </div>
  
            <div>
              <p class="opacity-70 text-[10px]">EXPIRES</p>
              <p class="font-medium">{{ expiry }}</p>
            </div>
          </div>
        </div>
  
        <!-- BACK -->
        <div
          class="absolute w-full h-full rounded-xl p-4 text-white backface-hidden rotate-y-180 bg-gradient-to-br from-indigo-700 to-blue-900"
        >
          <!-- Magnetic stripe -->
          <div class="bg-black h-10 w-full mt-2"></div>
  
          <!-- CVV -->
          <div class="mt-6">
            <span class="text-xs">CVV</span>
  
            <div
              class="bg-white text-black px-2 py-1 mt-1 text-right rounded text-sm"
            >
              {{ cvv }}
            </div>
          </div>
  
          <!-- Terms -->
          <p class="text-[8px] mt-4 leading-tight opacity-90">
            By using this card the holder agrees to all the terms under which it
            was issued. This card remains the property of Qfs Web3. If found please
            return to any Qfs Web3 branch or contact support.
          </p>
  
          <!-- Support -->
          <p class="text-[10px] mt-2 opacity-80">
            {{ email }}
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { Wifi, CreditCard } from "lucide-vue-next"
  
  const props = defineProps({
    firstname: String,
    lastname: String,
    number: String,
    expiry: String,
    cvv: String,
    bank: String,
    email: String
  })
  
  const isFlipped = ref(false)
  
  const flipCard = () => {
    isFlipped.value = !isFlipped.value
  }
  
  const formattedNumber = computed(() => {
    if (!props.number) return "•••• •••• •••• ••••"
    return props.number.replace(/(.{4})/g, "$1 ")
  })
  </script>
  
  <style scoped>
  
  /* 3D flip helpers */
  
  .perspective {
    perspective: 1000px;
  }
  
  .preserve-3d {
    transform-style: preserve-3d;
  }
  
  .backface-hidden {
    backface-visibility: hidden;
  }
  
  .rotate-y-180 {
    transform: rotateY(180deg);
  }
  
  </style>