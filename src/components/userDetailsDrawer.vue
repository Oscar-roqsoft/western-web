<template>
    <div v-if="user" class="fixed inset-0 z-50 flex">
  
      <!-- BACKDROP -->
      <div class="flex-1 bg-black/50" @click="$emit('close')"></div>
  
      <!-- DRAWER -->
      <div class="w-[400px] bg-white h-full shadow-xl p-5 overflow-y-auto">
  
        <!-- HEADER -->
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-lg font-bold">User Details</h2>
  
          <button @click="$emit('close')">
            ✕
          </button>
        </div>
  
        <!-- USER INFO -->
        <div class="flex items-center gap-3 mb-6">
  
          <div class="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center text-lg">
            {{ user?.name?.charAt(0) }}
          </div>
  
          <div>
            <p class="font-semibold">{{ user?.name }}</p>
            <p class="text-sm text-gray-500">{{ user?.email }}</p>
          </div>
  
        </div>
  
        <!-- STATUS -->
        <div class="mb-4">
          <span
            :class="[
              'px-2 py-1 text-xs rounded',
              user.status === 'active'
                ? 'bg-green-100 text-green-600'
                : 'bg-red-100 text-red-600'
            ]"
          >
            {{ user?.status }}
          </span>
        </div>
  
        <!-- BALANCE -->
        <div class="bg-gray-50 rounded-lg p-4 mb-6">
  <p class="text-gray-500 text-sm">
    Total Balance
  </p>

  <h2 class="text-xl font-bold">
    ${{ totalBalanceUSD.toLocaleString(undefined,{
      minimumFractionDigits:2,
      maximumFractionDigits:2
    }) }}
  </h2>
</div>
  
        <!-- WALLET BREAKDOWN -->
        <div class="mb-6">
  
          <h3 class="font-semibold mb-2">Wallets</h3>
  
          <div class="space-y-2">
  
            <div
  v-for="wallet in user.wallets"
  :key="wallet.coin"
  class="bg-gray-50 p-3 rounded-xl"
>

<div class="flex justify-between items-center">

  <div>
    <p class="font-semibold">
      {{ wallet.coin }}
    </p>

    <p class="text-xs text-gray-500">
      {{ wallet.network }}
    </p>

  </div>


  <div class="text-right">

    <p class="font-bold">
      {{ formatBalance(wallet) }}
      {{ wallet.coin }}
    </p>


    <p class="text-sm text-green-600">

      ≈ 
      ${{ walletUSD(wallet).toLocaleString(undefined,{
        minimumFractionDigits:2,
        maximumFractionDigits:2
      }) }}

    </p>


  </div>

</div>


</div>
  
          </div>
  
        </div>
  
        <!-- ACTIONS -->
        <div class="space-y-3">
  
          <button
            class="w-full bg-indigo-600 text-white py-2 rounded-lg"
            @click="$emit('fund', user)"
          >
            Fund User
          </button>
  
          <button
            class="w-full border py-2 rounded-lg"
            @click="$emit('toggleStatus', user)"
          >
            {{ user?.status === 'active' ? 'Block User' : 'Unblock User' }}
          </button>
  
        </div>
  
      </div>
  
    </div>
  </template>
  
  <script setup>

  import { computed } from "vue"
  
  const props = defineProps({
    user:Object
  })
  
  
  const pinia = useStore()
  
  
  
  const prices = computed(()=>{
  
   const data = pinia.state.cryptoPrices || []
  
   return Array.isArray(data)
   ? data
   : Object.values(data)
  
  })
  
  
  
  /*
   GET COIN PRICE
  */
  const getCoinPrice = (coin)=>{
  
   const item = prices.value.find(
     p => p.symbol === coin
   )
  
   return item?.price || 0
  
  }
  
  
  
  /*
   USD VALUE
  */
  const walletUSD = (wallet)=>{
  
   const price = getCoinPrice(wallet.coin)
  
   return wallet.balance * price
  
  }
  
  
  
  
  /*
   FORMAT BALANCE
  */
  const formatBalance = (wallet)=>{
  
  
  const amount = Number(wallet.balance || 0)
  
  
  if(wallet.coin === "BTC"){
  
   return amount.toFixed(6)
  
  }
  
  
  return amount.toFixed(3)
  
  
  }

  // TOTAL BALANCE
const totalBalanceUSD = computed(()=>{

if(!props.user?.wallets)
  return 0


return props.user.wallets.reduce(
  (total,wallet)=>{

    return total + walletUSD(wallet)

  },
  0
)

})
  
  
  </script>