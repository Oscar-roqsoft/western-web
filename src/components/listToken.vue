<template>
    <section class="max-w-xl mx-auto md:p-4">
  
      <!-- Header -->
      <div class="mb-6">
        <h2 class="text-xl md:text-2xl font-bold">Select Token</h2>
        <p class="text-gray-500 text-sm mt-1">
          Choose the cryptocurrency you wish to send, receive, or swap
        </p>
      </div>
  
      <!-- Search -->
      <div class="relative mb-5">
        <Search class="absolute left-3 top-3 w-4 h-4 text-gray-400"/>
        <input
          v-model="search"
          type="text"
          placeholder="Search token"
          class="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>
  
      <!-- Token List -->
      <div class="space-y-2 max-h-[420px] overflow-y-auto">
        <div
          v-for="coin in filteredCoins"
          :key="coin.symbol"
          @click="closeModal();selectCoin(coin)"
          class="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition"
        >
          <!-- Coin Info -->
          <div class="flex items-center gap-3">
            <img
              :src="coin.image || coin.icon || '/img/bitcoin.png'"
              class="w-9 h-9 rounded-full"
            />
            <div>
              <div class="font-semibold text-sm">{{ coin.name }}</div>
              <div class="text-xs text-gray-400">{{ coin.symbol }}</div>
            </div>
          </div>
  
          <!-- Network Tag -->
          <div
            class="text-xs px-2 py-1 rounded-md"
            :class="networkColor(coin.network)"
          >
            {{ coin.network }}
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, computed } from "vue"
  import { Search } from "lucide-vue-next"
//   import { useStore } from "@/stores/store" // adjust path to your Pinia store
  
  const pinia = useStore()
  const search = ref("")
  
  const emitReveal = defineEmits('close')
  const closeModal = () => emitReveal('close')
  
  // Use cryptoPrices from Pinia
  const coins = computed(() => {
  // Convert object with numeric keys to array
  const prices = pinia.state.cryptoPrices
  const arr = Array.isArray(prices)
    ? prices
    : Object.values(prices || {})   // <-- this converts {0:{},1:{}} to [{},{}]

  return arr.map(coin => ({
    name: coin.name,
    symbol: coin.symbol,
    network: coin.network || (coin.symbol === "USDT" ? "Tron" : coin.name),
    icon: coin.image || '/img/bitcoin.png',
    price:coin.price
  }))
})

console.log(coins.value)
  
  // Filter by search input
  const filteredCoins = computed(() => {
    return coins.value.filter(c =>
      c.name.toLowerCase().includes(search.value.toLowerCase()) ||
      c.symbol.toLowerCase().includes(search.value.toLowerCase())
    )
  })
  
  // Network tag colors
  const networkColor = (network) => {
    switch (network) {
      case "Bitcoin": return "bg-orange-100 text-orange-600"
      case "Ethereum": return "bg-purple-100 text-purple-600"
      case "Tron": return "bg-red-100 text-red-600"
      case "Cardano": return "bg-blue-100 text-blue-600"
      default: return "bg-gray-100 text-gray-600"
    }
  }

  // When a coin is selected
const selectCoin = (coin) => {
  pinia.setSelectedCryptoPrice(coin)
  console.log('Selected coin:', pinia.state.selectedCryptoPrice)
}



  </script>