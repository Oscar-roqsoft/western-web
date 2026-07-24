<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
  
      <div class="bg-white w-full max-w-md rounded-xl p-6 shadow-xl">
  
        <!-- HEADER -->
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-bold">Fund User</h2>
  
          <button @click="$emit('close')">✕</button>
        </div>
  
        <!-- USER INFO -->
        <div class="mb-4 text-sm text-gray-500">
          Funding: <span class="font-semibold text-black">{{ user?.name }}</span>
        </div>
  
        <!-- FORM -->
        <div class="space-y-4">
  
         <!-- COIN -->
          <div>
            <label class="label">Select Coin</label>

            <select v-model="coin" class="input">
              <option disabled value="">Select coin</option>

              <option 
                v-for="c in coins" 
                :key="c"
                :value="c"
              >
                {{ c }}
              </option>

            </select>
          </div>


          <!-- USD AMOUNT -->
          <div>

          <label class="label">
            Amount (USD)
          </label>


          <div class="relative">

         

          <input
            v-model="usdAmount"
            type="number"
            placeholder="Enter USD amount"
            class="input pl-8"
          />

          </div>


          </div>



          <!-- COIN EQUIVALENT -->

          <div 
          v-if="coinAmount"
          class="bg-indigo-50 border border-indigo-100 rounded-xl p-4"
          >

          <p class="text-sm text-gray-500">
          You will receive
          </p>


          <h3 class="text-xl font-bold text-indigo-600">

          {{ formatNumber(coinAmount) }}

          {{coin}}

          </h3>


          <p class="text-xs text-gray-500 mt-1">

          1 {{coin}} =
          ${{ coinPrice }}

          </p>


          </div>
          <!-- TYPE -->
          <div>
            <label class="label">Action</label>
  
            <div class="flex gap-3">
  
              <button
                :class="type === 'credit' ? activeBtn : btn"
                @click="type = 'credit'"
              >
                Credit
              </button>
  
              <button
                :class="type === 'debit' ? activeBtn : btn"
                @click="type = 'debit'"
              >
                Debit
              </button>
  
            </div>
          </div>
  
          <!-- NOTE -->
          <div>
            <label class="label">Note (optional)</label>
  
            <input
              v-model="note"
              placeholder="e.g manual funding"
              class="input"
            />
          </div>

          <span class=" text-red-500">{{ error }}</span>
  
          <!-- BUTTON -->
          <button
            @click="submit"
            :disabled="loading"
            class="w-full bg-indigo-600 text-white gap-2 py-2 rounded-lg flex items-center justify-center"
          >
            <span>Submit</span>
            <Spinner  v-if="loading" />
          </button>
  
        </div>
  
      </div>
      
    </div>
    <span class=" hidden">
        {{  userinfo = user   }}
    </span>
  </template>
  
  <script setup>
  import { ref } from "vue"
  import { fundUser } from "@/composables/requests/crypto"
  import {  sendNotification} from "@/composables/requests/notification"
  import { fetchAllUsers } from '~/composables/actions/index'

  const props = defineProps({
    user: Object
  })

  
  const pinia = useStore()
  const notify = useNotify()
  const emit = defineEmits(["close", "success"])
  
  const error = ref("")
  const coin = ref("")
  const amount = ref("")
  const usdAmount = ref("")
const coinAmount = ref(0)
const coinPrice = ref(0) 
  const network = ref("")
  const type = ref("credit")
  const note = ref("")
  const loading = ref(false)

  const userinfo = ref(null)
  
  const coins = ["BTC", "ETH", "USDT", "XRP", "SOL","ADA","XLM"]

  
  const btn = "flex-1 border rounded-lg py-2"
  const activeBtn = "flex-1 bg-indigo-600 text-white rounded-lg py-2"
  const cryptoPrices = computed(()=>{

return Array.isArray(pinia.state.cryptoPrices)
? pinia.state.cryptoPrices
: Object.values(pinia.state.cryptoPrices || {})

})

  watch(coin, (newValue) => {
  if (!newValue) return

  const walletNet = Object.values(
    pinia.state.cryptoBalance?.balances || {}
  ).find(w => w.coin === newValue)

  if (!walletNet) {
    network.value = ""
    return
  }

  network.value = walletNet.network
})

watch(
 [coin, usdAmount],

 ([selectedCoin, usd])=>{


 if(!selectedCoin || !usd){

  coinAmount.value = 0
  coinPrice.value = 0

  return

 }


 const priceData = cryptoPrices.value.find(
   c => c.symbol === selectedCoin
 )


 if(!priceData){

   coinAmount.value = 0
   coinPrice.value = 0

   return
 }


 coinPrice.value = priceData.price || 0


 coinAmount.value =
 Number(usd) / Number(priceData.price)


})
  
  const submit = async () => {
  
 if (!coin.value || !usdAmount.value)
return error.value="Fill all fields"
  
    loading.value = true
  
    try {
  
      const payload = {

userId: props.user._id,

coin: coin.value,

amount: Number(
  coinAmount.value.toFixed(8)
),

usdAmount:Number(
  usdAmount.value
),

network:network.value,

}

      const data = await fundUser(payload)

      if(data.success){
        notify.success(data.message)

        await sendNotification({
          userId:props.user._id,
          title: "Wallet Funded",
          message: `Your wallet has been credited with ${formatNumber(coinAmount.value)} ${coin.value} ($${usdAmount.value})`,
          type: "deposit"
        });
        await fetchAllUsers()
        emit("success")
        emit("close")
    }else{
          notify.error(data.message)

      }
  
  
  
    } catch (err) {
      console.error(err)
    }
  
    loading.value = false
  }
  </script>
  
  <style scoped>
  .input {
    width: 100%;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    padding: 10px;
  }
  .label {
    font-size: 13px;
    font-weight: 600;
  }
  </style>