<template>
    <main class="max-w-4xl mx-auto ">
  
      <!-- HEADER -->
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-2xl font-bold">Notifications</h1>
          <p class="text-gray-500 text-sm">
            Stay updated with your activities
          </p>
        </div>
  
        <button
          @click="markAll"
          class="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          Mark all as read
        </button>
      </div>
  
      <!-- FILTER TABS -->
      <div class="flex gap-2 mb-4 flex-wrap">
  
        <button
          v-for="tab in tabs"
          :key="tab.value"
          @click="setTab(tab.value)"
          :class="[
            'px-3 py-1 rounded-lg text-sm border',
            activeTab === tab.value
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-600'
          ]"
        >
          {{ tab.label }}
        </button>
  
      </div>
  
      <!-- LIST -->
      <div
        ref="scrollBox"
        class="bg-white rounded-xl shadow overflow-y-auto max-h-[70vh]"
        @scroll="handleScroll"
      >
  
        <!-- SKELETON -->
        <div v-if="loading && !notifications.length">
          <div v-for="i in 6" :key="i" class="p-4 border-b">
            <div class="skeleton h-4 w-40 mb-2"></div>
            <div class="skeleton h-3 w-60"></div>
          </div>
        </div>
  
        <!-- ITEMS -->
        <div
          v-for="n in filteredNotifications"
          :key="n._id"
          @click="markOne(n)"
          :class="[
            'p-4 border-b cursor-pointer transition',
            !n.isRead ? 'bg-indigo-50' : 'hover:bg-gray-50'
          ]"
        >
  
          <div class="flex justify-between items-start">
  
            <div>
              <p class="font-semibold text-sm">{{ n.title }}</p>
              <p class="text-xs text-gray-500 mt-1">
                {{ n.message }}
              </p>
            </div>
  
            <span
              v-if="!n.isRead"
              class="w-2 h-2 bg-indigo-600 rounded-full mt-1"
            ></span>
  
          </div>
  
          <div class="text-[11px] text-gray-400 mt-2 flex justify-between">
            <span>{{ formatDate(n.createdAt) }}</span>
            <span class="uppercase">{{ n.type }}</span>
          </div>
  
        </div>
  
        <!-- LOAD MORE -->
        <div v-if="loading && notifications.length" class="p-4 text-center text-sm text-gray-500">
          Loading more...
        </div>
  
        <!-- EMPTY -->
        <div v-if="!loading && !filteredNotifications.length" class="p-6 text-center text-gray-400">
          No notifications found
        </div>
  
      </div>
  
    </main>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from "vue"
  import { getNotifications,markAsRead ,markAllAsRead} from "@/composables/requests/notification"
  
  /* =========================
     STATE
  ========================= */
  
  const pinia = useStore()
  const notifications = ref([])
  const page = ref(1)
  const hasMore = ref(true)
  const loading = ref(false)
  
  const activeTab = ref("all")
  
  const scrollBox = ref(null)
  
  /* =========================
     FILTER TABS
  ========================= */
  
  const tabs = [
    { label: "All", value: "all" },
    { label: "Unread", value: "unread" },
    { label: "Deposits", value: "deposit" },
    { label: "Transactions", value: "swap" },
    { label: "Cards", value: "card" }
  ]
  
  /* =========================
     FETCH
  ========================= */
  
  const fetchNotifications = async (reset = false) => {
  
    if (loading.value || (!hasMore.value && !reset)) return
  
    if (reset) {
      page.value = 1
      notifications.value = []
      hasMore.value = true
    }
  
    loading.value = true
  
    try {
  
      const res = await getNotifications(page.value)
  
      const data = res.data.notifications
      
      pinia.state.notification

      if (data.length < 10)  hasMore.value = false
  
      pinia.state.notification.push(...data)
      notifications.value =  pinia.state.notification
  
      page.value++
  
    } catch (err) {
      console.error(err)
    }
  
    loading.value = false
  }
  
  /* =========================
     ACTIONS
  ========================= */
  
  const markOne = async (n) => {
  
    if (n.isRead) return
  
    try {

      await markAsRead(n._id)
      
      n.isRead = true
  
    } catch (err) {
      console.error(err)
    }
  }
  
  const markAll = async () => {
  
    try {
      await markAllAsRead()
  
      pinia.state.notification.forEach(n => n.isRead = true)
  
    } catch (err) {
      console.error(err)
    }
  }
  
  /* =========================
     FILTER LOGIC
  ========================= */
  
  const filteredNotifications = computed(() => {
  
    if (activeTab.value === "all") return notifications.value
  
    if (activeTab.value === "unread") {
      return pinia.state.notification.filter(n => !n.isRead)
    }
  
    return pinia.state.notification.filter(n => n.type === activeTab.value)
  })
  
  const setTab = (tab) => {
    activeTab.value = tab
  }
  
  /* =========================
     SCROLL (INFINITE)
  ========================= */
  
  const handleScroll = () => {
    const el = scrollBox.value
  
    if (!el) return
  
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 20) {
      fetchNotifications()
    }
  }
  
  /* =========================
     HELPERS
  ========================= */
  
  const formatDate = (date) => {
    return new Date(date).toLocaleString()
  }
  
  /* =========================
     INIT
  ========================= */
  
  onMounted(() => {
    if(pinia.state.notification.length){
        notifications.value = pinia.state.notification
    }else{
        fetchNotifications()
    }
  })
  </script>
  
  <style scoped>
  .skeleton {
    background: #e5e7eb;
    border-radius: 6px;
    position: relative;
    overflow: hidden;
  }
  
  .skeleton::after {
    content: "";
    position: absolute;
    inset: 0;
    transform: translateX(-100%);
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255,255,255,0.5),
      transparent
    );
    animation: shimmer 1.2s infinite;
  }
  
  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
  </style>
