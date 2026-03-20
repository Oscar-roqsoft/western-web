<template>
    <main class="max-w-xl  md:p-4 ">
    
    <!-- Token Selector -->
    <listToken v-if="!reveal" @close="handleClose"/>
    
    <div v-else>
        
        <!-- Header -->
        <div  class="flex flex-col items-start gap-3 mb-6">
        
            <button @click="navigateBack" class="bg-blue-500 rounded-full p-2">
              <ArrowLeft class="w-5 h-5 text-white"/>
            </button>
            
            <div class="flex flex-col  items-center justify-center  w-full gap-2">
                <img
                    :src="selectedCoin.icon"
                    class="w-16 h-16 rounded-full"
                />

                <div class="flex items-center justify-center w-full gap-2">
                    <div class="font-bold text-lg">{{ selectedCoin.name }}</div>
                    <div class="text-gray-400 text-sm">/{{ selectedCoin.symbol }}</div>
                </div>
            </div>
        
        </div>
        
        
       <!-- Balance -->
        <div class="bg-white rounded-xl shadow p-5 mb-6">
        <div class="text-gray-400 text-sm">My Balance</div>
        
        <div class="text-2xl font-bold mt-1">{{ userBalance }} {{ selectedCoin.symbol }}</div>
        
        <div class="text-gray-400 text-sm">≈ {{ balanceUSD }}</div>
        </div>
        
        
       <!-- Amount Section -->
        <div class="bg-white rounded-xl shadow p-5 mb-6">
        <div class="text-gray-400 text-sm mb-2">Coin Amount</div>
        
        <input
            type="number"
            v-model="coinAmount"
            placeholder="0.00"
            class="w-full text-2xl font-bold outline-none"
        />
        
        <div class="flex gap-2 mt-4">
            <button
            v-for="p in percentages"
            :key="p"
            class="flex-1 border rounded-lg py-1 text-sm hover:bg-gray-100"
            @click="setPercentageAmount(p)"
            >
            {{p}}%
            </button>
        </div>
        </div>
        
        
        <!-- Actions -->
        <div class="grid grid-cols-4 gap-3 text-center">
        
            <button @click="openModal('send')" class="action-btn">
            <Send class="w-5 h-5"/>
            Send
            </button>
            
            <button @click="openModal('receive')" class="action-btn">
            <Download class="w-5 h-5"/>
            Receive
            </button>
            
            <button @click="openModal('swap')" class="action-btn">
            <RefreshCcw class="w-5 h-5"/>
            Swap
            </button>
            
            <button @click="navigateTo('/dashboard/deposit')" class="action-btn">
            <ShoppingCart class="w-5 h-5"/>
            Buy
            </button>
        
        </div>
    </div>
    
    
    <!-- MODALS -->
    
    
</main>
        <SendModal
        v-if="activeModal==='send'"
        @close="activeModal=null"
        />

        <ReceiveModal
        v-if="activeModal==='receive'"
        @close="activeModal=null"
        />

        <SwapModal v-if="activeModal==='swap'" :activeModal="activeModal" @close="activeModal=null" />

        <BuyModal
        v-if="activeModal==='buy'"
        @close="activeModal=null"
        />
    </template>
    
    
    <script setup>
    import { ref, computed } from "vue"
    import { fetchWalletAddress } from "@/composables/actions/index"
    
    import {
      ArrowLeft,
      Send,
      Download,
      RefreshCcw,
      ShoppingCart
    } from "lucide-vue-next"
    
    // import your modals
    // import SendModal from "@/components/modals/SendModal.vue"
    // import ReceiveModal from "@/components/modals/ReceiveModal.vue"
    // import SwapModal from "@/components/modals/SwapModal.vue"
    // import BuyModal from "@/components/modals/BuyModal.vue"
    // import listToken from "@/components/listToken.vue"
    
    const store = useStore()
    
    const reveal = ref(false)
    const activeModal = ref(null)
    const percentages = [25,50,75,100]
    
    const handleClose = () => {
      reveal.value = true
    }
    
    const openModal = (type) => {
        activeModal.value = type

        store.setSelectedTransaction({
            coin: selectedCoin.value,
            coinAmount: coinAmount.value,
            balance: userBalance.value,
            balanceUSD: balanceUSD.value,
            actionType: type, // send, receive, swap, buy
        })
    }
    
    
    const navigateBack = () => {
      reveal.value = false
    }
    
    // -----------------------------
    // Computed for selected coin
    // -----------------------------
    const selectedCoin = computed(() => store.state.selectedCryptoPrice || {
      name: "Bitcoin",
      symbol: "BTC",
      icon: "/img/bitcoin.png",
      price: 0
    })
    
    // Example balance (you can replace this with real user balances)
    const userBalance = computed(() => {
      const symbol = selectedCoin.value.symbol

      const balances = store.state.cryptoBalance?.balances || []

      const coinData = balances.find(
        (item) => item.coin === symbol
      )

      return coinData?.balance || 0
    })

    console.log('bal',userBalance.value,selectedCoin.value.symbol)
    
    // Approximate USD value
    const balanceUSD = computed(() => {
      return (userBalance.value * selectedCoin.value.price).toLocaleString(undefined, { style: 'currency', currency: 'USD' })
    })


      // Coin amount input
        const coinAmount = ref(0)

        // When user clicks percentage button
        const setPercentageAmount = (p) => {
        coinAmount.value = ((userBalance.value * p) / 100).toFixed(4) // 8 decimal precision
        }


        // const fetchWalletAddressInfo = async()=>{
        // }
        
        watchEffect(async()=>{
            if(reveal.value == true){
                await fetchWalletAddress(store.state.selectedCryptoPrice?.symbol)
            }
        })


    </script>
    
    
    <style scoped>
    
    .action-btn{
    @apply bg-white shadow rounded-xl p-3 flex flex-col items-center gap-1 text-sm hover:shadow-md transition;
    }
    
    </style>

