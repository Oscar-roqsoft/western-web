<template>
    <main class=" max-w-3xl mx-auto">
  
      <!-- HEADER -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Wallet Settings</h1>
      </div>
  
      <!-- INFO -->
      <div class="bg-blue-50 p-4 rounded-lg mb-6 flex items-start gap-3">
        <svg class="w-6 h-6 text-blue-600">
          <use href="#info-icon"/>
        </svg>
        <p class="text-blue-900 text-sm">
          Set your main USDT (TRC20) wallet for receiving deposits. Make sure the
          address is correct — all transactions will go here.
        </p>
      </div>
  
      <!-- FORM -->
      <div class="bg-white shadow rounded-xl p-6">
  
        <label class="block font-semibold mb-1">USDT (TRC20) Wallet Address</label>
        <input
          v-model="walletAddress"
          placeholder="Enter your TRC20 wallet address"
          class="w-full border p-3 rounded-lg mb-4"
        />
  
        <span class="text-red-500 text-sm mb-2 block">{{ error }}</span>
  
        <button
          @click="store.state.adminWalletAddress ? updateWallet() : saveWallet()"
          :disabled="loading"
          class="bg-indigo-600 hover:bg-indigo-700 text-white w-full py-2 rounded-lg flex items-center justify-center"
        >
          <span v-if="!store.state.adminWalletAddress">Save Wallet</span>
          <span v-else>Update Wallet</span>
          <Spinner v-show="loading"/>
        </button>
  
        <p v-if="success" class="text-green-600 mt-3">Wallet updated successfully ✅</p>
  
      </div>
  
    </main>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue"
  import { createAdminWallet,updateAdminWallet } from "@/composables/requests/crypto"
  import { fetchAdminWallet } from "@/composables/actions/index"

  const store = useStore()
  const notify = useNotify()
  
  const walletAddress = ref(store.state.adminWalletAddress?.usdtTrc20 || "")
  const loading = ref(false)
  const error = ref("")
  const success = ref(false)
  
  /* ========== Load existing admin wallet ========== */
  onMounted(() => {
    walletAddress.value = store.state.adminWalletAddress?.usdtTrc20 || ""
  })
  

  /* ========== Save Wallet ========== */
  const saveWallet = async () => {
    error.value = ""
    success.value = false
  
    if (!walletAddress.value || walletAddress.value.length < 20) {
      return error.value = "Please enter a valid TRC20 wallet address"
    }
  
    loading.value = true

    try {
      const data = await createAdminWallet({userId: store.state.user?.id, usdtTrc20: walletAddress.value })
      if(data.success){
        notify.success(data.message)
        store.setadminWalletAddress(data.data.wallets)
      }else{
        notify.error(data.message)
      }
       
    } catch (err) {
      console.error(err)
      error.value = "Failed to update wallet. Try again."
    }
    loading.value = false
  }

  const updateWallet = async () => {
    error.value = ""
    success.value = false
  
    if (!walletAddress.value || walletAddress.value.length < 20) {
      return error.value = "Please enter a valid TRC20 wallet address"
    }
  
    loading.value = true

    try {
      const data = await updateAdminWallet({userId: store.state.user?.id, usdtTrc20: walletAddress.value })
      if(data.success){
          store.setadminWalletAddress(data.data?.wallets)
          notify.success(data.message)
      }else{
        notify.error(data.message)
      }
       
    } catch (err) {
      console.error(err)
      error.value = "Failed to update wallet. Try again."
    }
    loading.value = false
  }

  onMounted(async()=>{
    if (store.state.adminWalletAddress && Object.keys(store.state.adminWalletAddress).length > 0)return
    await fetchAdminWallet()
  })


  </script>
  
  <style scoped>
  input {
    font-size: 14px;
  }
  </style>