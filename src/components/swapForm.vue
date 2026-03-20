<template>
    <div class="bg-white rounded-2xl shadow-xl p-4">
  
      <!-- FROM -->
      <div class="bg-gray-50 rounded-xl p-4 mb-3">
  
        <div class="flex justify-between text-sm text-gray-400 mb-1">
          <span>From</span>
          <span>Balance: {{ fromBalance.toFixed(4) }} {{ fromCoin.symbol }}</span>
        </div>
  
        <div class="flex gap-2">
  
          <input
            v-model="fromAmount"
            type="number"
            placeholder="0.0"
            class="bg-transparent text-2xl font-semibold outline-none w-full"
          />
  
          <!-- FROM DROPDOWN -->
          <div class="relative w-[120px]">

                <button
                @click="showFromList = !showFromList"
                class="flex items-center gap-2 border rounded-lg px-2 py-1 w-full"
                >
                <img :src="fromCoin.image || fromCoin.icon" class="w-5 h-5 rounded-full" />
                {{ fromCoin.symbol }}
                </button>

                <div
                v-if="showFromList"
                class="absolute z-10 bg-white shadow-lg rounded-lg mt-1 w-full max-h-60 overflow-y-auto"
                >
                <div
                    v-for="coin in filteredFromCoins"
                    :key="coin.symbol"
                    @click="selectFromCoin(coin)"
                    class="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                >
                    <img :src="coin.image || coin.icon" class="w-5 h-5 rounded-full" />
                    {{ coin.symbol }}
                </div>
                </div>

                </div>
  
        </div>
      </div>
  
      <!-- SWITCH -->
      <div class="flex justify-center my-2">
        <button @click="reverseSwap" class="bg-white shadow p-2 rounded-full">
          ⇅
        </button>
      </div>
  
      <!-- TO -->
      <div class="bg-gray-50 rounded-xl p-4 mb-4">
  
        <div class="text-sm text-gray-400 mb-1">To</div>
  
        <div class="flex gap-2">
  
          <input
            :value="toAmount"
            readonly
            class="bg-transparent text-2xl font-semibold w-full"
          />
  
          <!-- TO DROPDOWN -->
          <div class="relative w-[120px]">

            <button
            @click="showToList = !showToList"
            class="flex items-center gap-2 border rounded-lg px-2 py-1 w-full"
            >
            <img :src="toCoin.image || toCoin.icon" class="w-5 h-5 rounded-full" />
            {{ toCoin.symbol }}
            </button>

            <div
            v-if="showToList"
            class="absolute z-10 bg-white shadow-lg rounded-lg mt-1 w-full max-h-60 overflow-y-auto"
            >
            <div
                v-for="coin in filteredToCoins"
                :key="coin.symbol"
                @click="selectToCoin(coin)"
                class="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
                <img :src="coin.image || coin.icon" class="w-5 h-5 rounded-full" />
                {{ coin.symbol }}
            </div>
            </div>

            </div>
  
        </div>
      </div>
  
      <!-- INFO -->
      <div class="text-xs text-gray-500 mb-4 space-y-1">
  
        <div class="flex justify-between">
          <span>Rate</span>
          <span v-if="rate">
            1 {{ fromCoin.symbol }} ≈ {{ rate }} {{ toCoin.symbol }}
          </span>
        </div>
  
        <div class="flex justify-between">
          <span>Gas Fee</span>
          <span v-if="gasFee">
            {{ gasFee }} {{ fromCoin.symbol }}
          </span>
        </div>
  
      </div>
  
      <!-- BUTTON -->
      <button
        :disabled="isDisabled"
        @click="handleSwap"
        class="w-full py-3 rounded-xl font-semibold"
        :class="isDisabled
          ? 'bg-gray-300'
          : 'bg-indigo-600 text-white'"
      >
        <span v-if="!isLoading">Swap Now</span>
        <span v-else>Processing...</span>
      </button>
  
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from "vue"
//   import { use.state } from "@/store"
import { calGasFee,swapCoin } from "@/composables/requests/crypto"
import { fetchCryptoBal } from "@/composables/actions/index"


  const store = useStore()
  const notify = useNotify()
  
  /* INIT FROM STORE */
  const fromCoin = ref(store.state.selectedTransaction.coin || store.state.cryptoPrices[1] )
  const toCoin = ref(store.state.cryptoPrices[3]) // default first coin
  
  const fromAmount = ref("")
  const toAmount = ref("")
  
  const gasFee = ref(null)
  const rate = ref(null)
  const isLoading = ref(false)
  const showFromList = ref(false)
  const  showToList = ref(false)
  
  /* GAS FEES */
  const GAS = {
    BTC: 0.0005,
    ETH: 0.005,
    USDT: 1,
    TRX: 1,
    SOL: 0.01,
    XRP: 0.1,
    XLM: 0.1,
    ADA: 0.1
  }
  
  /* GET BALANCE */
  const fromBalance = computed(() => {
    const bal = store.state.cryptoBalance.balances.find(
      b => b.coin === fromCoin.value.symbol
    )
    return bal?.balance || 0
  })

  const priceList = computed(() => Object.values(store.state.cryptoPrices || {}))
  
  /* FILTER DROPDOWNS */
  const filteredFromCoins = computed(() =>
    priceList.value.filter(c => c.symbol !== toCoin.value.symbol)
  )
  
  const filteredToCoins = computed(() =>
    priceList.value.filter(c => c.symbol !== fromCoin.value.symbol)
  )
  
  /* REVERSE */
  const reverseSwap = () => {
    const temp = fromCoin.value
    fromCoin.value = toCoin.value
    toCoin.value = temp
  
    // fromAmount.value = ""
    // toAmount.value = ""
  }
  
  /* DEBOUNCE */
  let timer = null
  
  watch(fromAmount, () => {
    clearTimeout(timer)
  
    if (!fromAmount.value || fromAmount.value <= 0) {
      toAmount.value = ""
      gasFee.value = null
      return
    }
  
    timer = setTimeout(() => {
      calculate()
    }, 500)
  })
  
  /* CALCULATE LOCALLY */
  const calculate = () => {
  
    const priceFrom = fromCoin.value.price
    const priceTo = toCoin.value.price
  
    const amount = parseFloat(fromAmount.value)
  
    const usd = amount * priceFrom
  
    const receive = usd / priceTo
  
    toAmount.value = receive.toFixed(6)
  
    rate.value = (priceFrom / priceTo).toFixed(4)
  
    gasFee.value = GAS[fromCoin.value.symbol] || 0
  }
  
  /* BUTTON STATE */
  const isDisabled = computed(() => {
    return (
      !fromAmount.value ||
      fromAmount.value <= 0 ||
      isLoading.value ||
      fromAmount.value > fromBalance.value
    )
  })
  
  /* SWAP */
  const handleSwap = async () => {
    isLoading.value = true
  
    try {
        const payload = {
        fromCoin: fromCoin.value?.symbol,
        toCoin: toCoin.value?.symbol,
        fromAmount: fromAmount.value
        }

        // call your API here
        const data = await swapCoin(payload)
        if(data.success){
            notify.success(data.message)
            await fetchCryptoBal()
            fromAmount.value = ""
            toAmount.value = ""
        }else{
            notify.error(data.message)
        }
        
  
    } finally {
      isLoading.value = false
    }
  }
  const triggerRecalculation = () => {
    if (!fromAmount.value || fromAmount.value <= 0) return

    calculate()
    }

    watch([fromCoin, toCoin], () => {
      triggerRecalculation()
    })

  const selectFromCoin = (coin) => {
    fromCoin.value = coin
    showFromList.value = false

    triggerRecalculation()
    }

    const selectToCoin = (coin) => {
    toCoin.value = coin
    showToList.value = false

    triggerRecalculation()
    }
    
  </script>