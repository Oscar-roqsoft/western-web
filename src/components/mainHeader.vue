<template>
  <header
    class="fixed top-0 left-0 w-full bg-[#191919]/95 backdrop-blur-lg border-b border-white/10 z-[999] shadow-sm"
  >
    <div
      class="max-w-[1200px] mx-auto w-full px-4 flex items-center justify-between min-h-[80px]"
    >
      <!-- LOGO -->
      <div
        class="w-[120px] flex items-center cursor-pointer"
        @click="navigateTo('home')"
      >
        <img
         src="/logo/8.png"
          alt="Deroly"
          class="w-full object-contain"
        />
      </div>

      <!-- NAV LINKS (Desktop) -->
      <nav
        class="hidden md:flex items-center gap-8 text-white text-[16px] font-medium"
      >
        <a
          v-for="(item, index) in navigationItems"
          :key="index"
          :href="item.href"
          @click="navigateTo(item.label)"
          class="relative group transition duration-300 capitalize cursor-pointer"
          :class="
            pinia.state.selectedNavMenu === item.label
              ? 'text-[#fcb900]'
              : 'text-gray-200 hover:text-[#fcb900]'
          "
        >
          {{ item.label }}
          <span
            class="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#fcb900] transition-all duration-300 group-hover:w-full"
          ></span>
        </a>
      </nav>

      <!-- RIGHT BUTTONS -->
      <div class="hidden md:flex items-center gap-4">
        <NuxtLink to="/login">
          <button
            class="px-5 py-2 border border-white/30 text-white rounded-full text-sm hover:bg-white hover:text-black transition-all"
          >
            Log In →
          </button>
        </NuxtLink>

        <NuxtLink to="/dashboard">
          <button
            class="px-6 py-2 bg-[#fcb900] text-black font-semibold rounded-full shadow-md hover:bg-[#ffd24d] transition-all duration-300"
          >
            Access Dashboard
          </button>
        </NuxtLink>
      </div>

      <!-- MOBILE MENU TOGGLE -->
      <div class="md:hidden flex items-center z-[1000]">
        <button
          @click="toggleDrawer"
          class="flex flex-col justify-center space-y-[6px] focus:outline-none"
        >
          <span
            :class="['bar', showNavbar ? 'rotate-45 translate-y-[9px]' : '']"
          ></span>
          <span
            :class="['bar', showNavbar ? 'opacity-0' : 'opacity-100']"
          ></span>
          <span
            :class="['bar', showNavbar ? '-rotate-45 -translate-y-[9px]' : '']"
          ></span>
        </button>
      </div>
    </div>

    <!-- MOBILE DRAWER -->
    <transition name="slide">
      <aside
        v-if="showNavbar"
        class="fixed top-[80px] left-0 w-[75%] h-[calc(100vh-80px)] bg-[#191919] p-6 z-[998] shadow-lg md:hidden"
      >
        <nav class="flex flex-col space-y-5">
          <a
            v-for="(item, index) in navigationItems"
            :key="index"
            :href="item.href"
            @click="navigateTo(item.label); showNavbar = false"
            class="text-lg text-gray-200 hover:text-[#fcb900] capitalize"
          >
            {{ item.label }}
          </a>

          <div class="border-t border-white/10 pt-4 space-y-3">
            <NuxtLink to="/login">
              <button
                class="px-5 w-full py-2 border border-white/30 text-white rounded-full text-sm hover:bg-white hover:text-black transition-all"
              >
                Log In →
              </button>
            </NuxtLink>
          </div>

          <NuxtLink to="/dashboard">
            <button
              class="w-full mt-4 py-3 bg-[#fff] text-black font-semibold rounded-full hover:bg-[#ffd24d] transition-all duration-300"
            >
              Access Dashboard
            </button>
          </NuxtLink>
        </nav>
      </aside>
    </transition>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from '@/stores/index'

const pinia = useStore()
const showNavbar = ref(false)

const toggleDrawer = () => {
  showNavbar.value = !showNavbar.value
}

const navigationItems = [
  { label: 'home', href: '/' },
  { label: 'about', href: '#about' },
  { label: 'services', href: '#services' },
  { label: 'contact', href: '#contact' },
  
]

const navigateTo = (label) => {
  pinia.state.selectedNavMenu = label
}
</script>

<style scoped>
.bar {
  width: 28px;
  height: 3px;
  background: white;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
