<template>
    <main class="max-w-7xl mx-auto">
  
      <!-- HEADER -->
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-2xl font-bold">User Wallets</h1>
          <p class="text-gray-500 text-sm">
            Manage and inspect user wallet information
          </p>
        </div>
      </div>
  
      <!-- TABLE -->
      <div class="bg-white rounded-xl shadow overflow-x-auto">
  
        <table class="w-full text-sm">
          <thead class="bg-gray-50 text-gray-600">
            <tr>
              <th class="p-3 text-left">User</th>
              <th class="p-3 text-left">Name</th>
              <!-- <th class="p-3 text-left">Network</th> -->
              <th class="p-3 text-left">Address</th>
              <th class="p-3 text-left">Date</th>
              <th class="p-3 text-right">Action</th>
            </tr>
          </thead>
  
          <tbody>
  
            <!-- SKELETON -->
            <tr v-if="loading" v-for="i in 5" :key="i">
              <td colspan="6" class="p-3">
                <div class="skeleton h-4 w-full"></div>
              </td>
            </tr>
  
            <!-- DATA -->
            <tr
              v-for="wallet in wallets"
              :key="wallet._id"
              class="border-t hover:bg-gray-50"
            >
  
              <td class="p-3">
                <p class="font-semibold">{{ wallet.userId?.name }}</p>
                <p class="text-xs text-gray-400">{{ wallet.userId?.email }}</p>
              </td>
  
              <td class="p-3 font-semibold uppercase">
                {{ wallet.name }}
              </td>
  
              <!-- <td class="p-3">
                {{ wallet.network }}
              </td> -->
  
              <td class="p-3 text-xs break-all">
                {{ wallet.address }}
              </td>
  
              <td class="p-3 text-xs text-gray-400">
                {{ formatDate(wallet.createdAt) }}
              </td>
  
              <td class="p-3 text-right">
                <button
                  @click="openWallet(wallet)"
                  class="px-3 py-1 text-xs border rounded-lg"
                >
                  View
                </button>
              </td>
  
            </tr>
  
          </tbody>
        </table>
  
      </div>
  
      <!-- PAGINATION -->
      <div class="flex justify-between items-center mt-4">
  
        <button
          @click="prevPage"
          :disabled="page === 1"
          class="px-4 py-2 border rounded-lg"
        >
          Prev
        </button>
  
        <span class="text-sm">
          Page {{ page }} of {{ totalPages }}
        </span>
  
        <button
          @click="nextPage"
          :disabled="page === totalPages"
          class="px-4 py-2 border rounded-lg"
        >
          Next
        </button>
  
      </div>
  
      <!-- MODAL -->
      <div
        v-if="selected"
        class="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
      >
        <div class="bg-white w-full max-w-lg rounded-xl p-6">
  
          <h2 class="font-bold text-lg mb-4">
            Wallet Details
          </h2>
  
          <div class="space-y-3 text-sm">
  
            <p><b>User:</b> {{ selected.userId?.name }}</p>
            <p><b>Name:</b> {{ selected.name }}</p>
            <!-- <p><b>Network:</b> {{ selected.network }}</p> -->
  
            <p class="break-all">
              <b>Address:</b> {{ selected.address }}
            </p>
  
            <!-- ENCRYPTED KEYS -->
            <div>
              <p class="font-semibold">Encrypted Private Key</p>
  
              <div class="flex gap-2 items-center mt-1">
  
                <p class="text-xs break-all">
                  {{ reveal ? selected.decryptedPrivateKey : mask(selected.decryptedPrivateKey) }}
                </p>
  
                <button @click="copy(selected.decryptedPrivateKey)" class="text-xs border px-2 py-1 rounded">
                  Copy
                </button>
  
              </div>
            </div>
  
            <div>
              <p class="font-semibold">Encrypted Phrase</p>
  
              <div class="flex gap-2 items-center mt-1">
  
                <p class="text-xs break-all">
                  {{ reveal ? selected.decryptedPhrase : mask(selected.decryptedPhrase) }}
                </p>
  
                <button @click="copy(selected.decryptedPhrase)" class="text-xs border px-2 py-1 rounded">
                  Copy
                </button>
  
              </div>
            </div>
  
          </div>
  
          <!-- ACTIONS -->
          <div class="flex justify-between mt-5">
  
            <button
              @click="reveal = !reveal"
              class="px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm"
            >
              {{ reveal ? "Hide Keys" : "Reveal Keys" }}
            </button>
  
            <button
              @click="selected = null"
              class="px-3 py-2 bg-gray-800 text-white rounded-lg text-sm"
            >
              Close
            </button>
  
          </div>
  
        </div>
      </div>
  
    </main>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue"
  import { getWalletInfoByAdmin } from "@/composables/requests/crypto"

  /* =========================
     STATE
  ========================= */
  const pinia = useStore()
  const wallets = ref([])
  const loading = ref(false)
  
  const page = ref(1)
  const totalPages = ref(1)
  
  const selected = ref(null)
  const reveal = ref(false)
  
  /* =========================
     FETCH
  ========================= */
  
  const fetchWallets = async () => {
  
    loading.value = true
  
    try {
  
      const res = await getWalletInfoByAdmin(page.value)
   
      if(res.success){
        pinia.setsecuredWallets(res.data)
      }
      wallets.value = pinia.state.securedWallets?.wallets
      totalPages.value = pinia.state.securedWallets?.pagination?.pages
  
    } catch (err) {
      console.error(err)
    }
  
    loading.value = false
  }
  
  /* =========================
     ACTIONS
  ========================= */
  
  const openWallet = (wallet) => {
    selected.value = wallet
    reveal.value = false
  }
  
  const copy = async (text) => {
    await navigator.clipboard.writeText(text)
    alert("Copied!")
  }
  
  /* =========================
     PAGINATION
  ========================= */
  
  const nextPage = () => {
    if (page.value < totalPages.value) {
      page.value++
      fetchWallets()
    }
  }
  
  const prevPage = () => {
    if (page.value > 1) {
      page.value--
      fetchWallets()
    }
  }
  
  /* =========================
     HELPERS
  ========================= */
  
  const mask = (val) => {
    if (!val) return ""
    return val.slice(0, 6) + "****" + val.slice(-4)
  }
  
  const formatDate = (d) => {
    return new Date(d).toLocaleString()
  }
  
  /* =========================
     INIT
  ========================= */
  
  onMounted(()=>{
     if(pinia.state.securedWallets){
        wallets.value = pinia.state.securedWallets?.wallets
        totalPages.value = pinia.state.securedWallets?.pagination?.pages
     }else{
        fetchWallets()
     }
  }
   )
  </script>
  
  <style scoped>
  .skeleton {
    background: #e5e7eb;
    border-radius: 6px;
    height: 14px;
    animation: pulse 1.2s infinite;
  }
  
  @keyframes pulse {
    0% { opacity: .5 }
    50% { opacity: 1 }
    100% { opacity: .5 }
  }
  </style>