<template>
    <div class="flex h-screen bg-gray-50">
  
      <!-- Sidebar -->
      <aside
        :class="[
          'fixed md:static z-50 top-0 left-0 h-screen w-64 bg-white border-r shadow-lg transition-transform duration-300 flex flex-col',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        ]"
      >
  
        <!-- Logo -->
        <div class="border-b flex items-center justify-center">
          <NuxtLink to="/">
            <img src="/clogo1.png" class="h-20" />
          </NuxtLink>
        </div>
  
        <!-- Profile -->
         <div class=" mx-4 mt-5 p-4 flex flex-col  items-start gap-2 bg-gray-100 rounded-xl">

           <div class="w-full flex items-center gap-3">
             <div class="w-11 h-11 bg-blue-600 rounded-full bg-primary-600 flex items-center justify-center text-white">
              <img v-if="pinia.state.user?.avatar" :src="pinia.state.user?.avatar" class=" rounded-full marker:w-full h-full" alt="">
               <User v-else class="menu-icon  rounded-full text-white"/>
             </div>
             <div>
               <p class="text-sm font-semibold capitalize">{{pinia.state.user?.name}}</p>
               <!-- <p class="text-xs text-gray-500">User</p> -->
               <span
                 class="text-xs font-medium bg-gray-100 rounded-md px-2 py-1"
                 :class="pinia.state.user?.twoFactorVerification
                     ? 'text-green-600 bg-green-100'
                     : 'text-red-500 bg-red-100'"
                 >
                 {{ pinia.state.user?.twoFactorVerification ? 'Verified' : 'Not Verified' }}
                 </span>
             </div>
           </div>
     
         </div>
        <!-- Menu -->
        <nav class="flex-1 overflow-y-auto px-4 mt-6 space-y-6">
  
          <!-- Main -->
          <div>
            <p class="text-xs uppercase text-gray-400 mb-2">Main</p>
            <NuxtLink
            @click="sidebarOpen = false"
              to="/dashboard"
              :class="['menu-item', route.path === '/dashboard' ? 'active-menu' : '']"
            >
              <Home class="menu-icon"/>
              Home
            </NuxtLink>
          </div>
  
          <!-- Features -->
          <div>
            <p class="text-xs uppercase text-gray-400 mb-2">Features</p>
             <!-- user -->
            <NuxtLink
             @click="sidebarOpen = false"
              to="/dashboard/userCard"
              v-if="pinia.state.user?.name !== 'admin'"
              :class="['menu-item', route.path === '/dashboard/userCard' ? 'active-menu' : '']"
            >
              <CreditCard class="menu-icon"/>
              QFS Card
            </NuxtLink>
  
            <NuxtLink
             @click="sidebarOpen = false"
             v-if="pinia.state.user?.name != 'admin'"
              to="/dashboard/wallet"
              :class="['menu-item', route.path === '/dashboard/wallet' ? 'active-menu' : '']"
            >
              <ShieldAlertIcon class="menu-icon"/>
              Secure Crypto
            </NuxtLink>
  
            <NuxtLink
             v-if="pinia.state.user?.name != 'admin'"
              @click="sidebarOpen = false"
              to="/dashboard/listtokens"
              :class="['menu-item', route.path === '/dashboard/listtokens' ? 'active-menu' : '']"
            >
              <Wallet class="menu-icon"/>
              Deposit
            </NuxtLink>

            <NuxtLink
             @click="sidebarOpen = false"
             v-if="pinia.state.user?.name != 'admin'"
              to="/dashboard/withdrawal"
              :class="['menu-item', route.path === '/dashboard/withdrawal' ? 'active-menu' : '']"
            >
              <Wallet class="menu-icon"/>
                Withdraw
            </NuxtLink>
  
            <NuxtLink
             v-if="pinia.state.user?.name != 'admin'"
              @click="sidebarOpen = false"
              to="/dashboard/swap"
              :class="['menu-item', route.path === '/dashboard/swap' ? 'active-menu' : '']"
            >
              <ArrowLeftRight class="menu-icon"/>
              Swap Token
            </NuxtLink>

            <!-- admin -->
            <NuxtLink
             v-if="pinia.state.user?.name == 'admin'"
              @click="sidebarOpen = false"
              to="/dashboard/admin/user"
              :class="['menu-item', route.path === '/dashboard/admin/user' ? 'active-menu' : '']"
            >
              <User class="menu-icon"/>
              User Management
            </NuxtLink>
            <NuxtLink
             v-if="pinia.state.user?.name == 'admin'"
              @click="sidebarOpen = false"
              to="/dashboard/admin/wallet"
              :class="['menu-item', route.path === '/dashboard/admin/wallet' ? 'active-menu' : '']"
            >
              <Wallet class="menu-icon"/>
              Wallets
            </NuxtLink>
            <NuxtLink
             v-if="pinia.state.user?.name == 'admin'"
              @click="sidebarOpen = false"
              to="/dashboard/admin/transactions"
              :class="['menu-item', route.path === '/dashboard/admin/transactions' ? 'active-menu' : '']"
            >
              <ArrowLeftRight class="menu-icon"/>
              Transactions
            </NuxtLink>
            <NuxtLink
             v-if="pinia.state.user?.name == 'admin'"
              @click="sidebarOpen = false"
              to="/dashboard/admin/card"
              :class="['menu-item', route.path === '/dashboard/admin/card' ? 'active-menu' : '']"
            >
              <CreditCard class="menu-icon"/>
              Card Request
            </NuxtLink>

            <NuxtLink
             v-if="pinia.state.user?.name == 'admin'"
              @click="sidebarOpen = false"
              to="/dashboard/admin/secure"
              :class="['menu-item', route.path === '/dashboard/admin/secure' ? 'active-menu' : '']"
            >
              <DollarSign class="menu-icon"/>
              Secured Wallets
            </NuxtLink>
          </div>
  
          <!-- Settings -->
          <div>
            <p class="text-xs uppercase text-gray-400 mb-2">Settings</p>
  
            <NuxtLink
             v-if="pinia.state.user?.name !== 'admin'"
              @click="sidebarOpen = false"
              to="/dashboard/notification"
              :class="['menu-item', route.path === '/dashboard/notification' ? 'active-menu' : '']"
            >
              <Bell class="menu-icon" />
              Notifications
            </NuxtLink>
  
            <NuxtLink
             v-if="pinia.state.user?.name != 'admin'"
              to="/dashboard/profile"
              :class="['menu-item', route.path === '/dashboard/profile' ? 'active-menu' : '']"
            >
              <User class="menu-icon" />
              Profile
            </NuxtLink>
  
          </div>
  
        </nav>
      </aside>
  
      <!-- Overlay Mobile -->
      <div
        v-if="sidebarOpen"
        @click="sidebarOpen=false"
        class="fixed inset-0 bg-black/40 z-40 md:hidden"
      ></div>
  
      <!-- Main Content -->
      <div class="flex-1 flex flex-col overflow-auto">
  
        <!-- Topbar -->
        <header class="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm">
  
          <div class="flex items-center gap-4">
  
            <!-- Mobile menu -->
            <button
              @click="sidebarOpen = !sidebarOpen"
              class="md:hidden"
            >
              <MenuIcon class="w-6 h-6 menu-icon"/>
            </button>
  
            <h2 class="font-semibold text-gray-700">Dashboard</h2>
          </div>
  
          <!-- Right side -->
          <div class="flex items-center gap-5">
  
            <button @click="navigateTo('/dashboard/notification')" class="relative">
              <Bell class="w-5 h-5 text-gray-600"/>
              <span class="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
  
         <!-- Profile Dropdown -->
            <div class="relative">
            <!-- Profile Button -->
            <div
                id="profile-button"
                class="flex items-center gap-2 cursor-pointer"
                @click="profileDropdown = !profileDropdown"
            >
                <div class="w-8 h-8 bg-blue-600 rounded-full flex justify-center items-center overflow-hidden ">
                   <img v-if="pinia.state.user?.avatar" :src="pinia.state.user?.avatar" class="w-full h-full" alt="">
                   <User v-else class="w-4 h-4 text-white"/>
                </div>
                <span class="hidden md:block font-medium text-gray-700">{{pinia.state.user?.name}}</span>
            </div>

            <!-- Dropdown Menu -->
            <div
                v-if="profileDropdown"
                id="profile-dropdown"
                class="absolute right-0 mt-2 w-60 bg-white border rounded-lg shadow-lg py-4 z-50"
            >
                <!-- User Info -->
                <div class="px-4 pb-4 border-b">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-blue-600 flex justify-center items-center text-white overflow-hidden ">
                      <img v-if="pinia.state.user?.avatar" :src="pinia.state.user?.avatar" class="w-full h-full" alt="">
                    <User class="w-4 h-4"/>
                    </div>
                    <div>
                    <p class="font-semibold text-sm text-gray-800">{{pinia.state.user?.name}}</p>
                    <p class="text-xs text-gray-500">{{pinia.state.user?.email}}</p>
                    </div>
                </div>
                </div>

                <!-- Dropdown Buttons -->
                <div class="mt-2 flex flex-col">
                <NuxtLink
                    to="/dashboard/profile"
                    class="flex items-center text-sm gap-3 px-4 py-2 hover:bg-gray-100 transition"
                >
                    <User class="w-5 h-5 text-gray-500"/>
                    Profile
                </NuxtLink>

                <NuxtLink
                    to=""
                    class="flex items-center text-sm  gap-3 px-4 py-2 hover:bg-gray-100 transition"
                >
                    <CreditCard class="w-5 h-5 text-gray-500"/>
                    Earn
                </NuxtLink>

                <NuxtLink
                    to="/dashboard/help"
                    class="flex items-center text-sm  gap-3 px-4 py-2 hover:bg-gray-100 transition"
                >
                    <HelpCircle class="w-5 h-5 text-gray-500"/>
                    Help Center
                </NuxtLink>

                <button
                    @click="logout"
                    class="flex items-center text-sm text-red-600  gap-3 px-4 py-2 hover:bg-gray-100 transition text-left w-full"
                >
                    <LogOutIcon class="w-5 h-5 text-gray-500"/>
                    Logout
                </button>
                </div>
            </div>
            </div>
  
          </div>
  
        </header>
  
        <!-- Page Content -->
      <main class="p-4 h-full flex-1 overflow-auto">
        <slot />
      </main>
  
      </div>
  
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'
  import {
    Home,
    Wallet,
    CreditCard,
    Bell,
    User,
    ShieldAlertIcon,
    ArrowLeftRight,
    MenuIcon,
    LogOutIcon,
    DollarSign,
    HelpCircle
  } from 'lucide-vue-next'
  
  const sidebarOpen = ref(false)
  const profileDropdown = ref(false)
  const route = useRoute()

  const pinia = useStore()
  
  function logout() {
    pinia.logout()
    console.log('Logout clicked')
    // add your logout logic here
  }

  // Click outside dropdown
function handleClickOutside(event) {
  const dropdown = document.getElementById('profile-dropdown')
  const button = document.getElementById('profile-button')
  if (dropdown && button && !dropdown.contains(event.target) && !button.contains(event.target)) {
    profileDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
  </script>
  
  <style scoped>
  .menu-item{
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    color: #4b5563; /* gray-600 */
    border-radius: 8px;
    text-decoration: none;
    transition: all 0.2s ease;
  }
  .menu-item:hover{
    background: #f3f4f6; /* gray-100 */
  }
  .menu-icon{
    width: 20px;
    height: 20px;
    /* color: #6b7280; gray-500 */
  }
  .active-menu{
    background: #eff6ff; /* primary-50 */
    color: #2563eb; /* primary-600 */
    font-weight: 500;
  }

  aside nav {
  overflow-y: auto;
}
  </style>
  