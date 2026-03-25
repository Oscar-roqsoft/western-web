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
          Funding: <span class="font-semibold text-black">{{ user.name }}</span>
        </div>
  
        <!-- FORM -->
        <div class="space-y-4">
  
          <!-- COIN -->
          <div>
            <label class="label">Select Coin</label>
  
            <select v-model="coin" class="input">
              <option disabled value="">Select coin</option>
              <option v-for="c in coins" :key="c" :value="c">
                {{ c }}
              </option>
            </select>
          </div>
  
          <!-- AMOUNT -->
          <div>
            <label class="label">Amount</label>
  
            <input
              v-model="amount"
              type="number"
              placeholder="Enter amount"
              class="input"
            />
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
  const network = ref("")
  const type = ref("credit")
  const note = ref("")
  const loading = ref(false)

  const userinfo = ref(null)
  
  const coins = ["BTC", "ETH", "USDT", "XRP", "SOL","ADA","XLM"]

  
  const btn = "flex-1 border rounded-lg py-2"
  const activeBtn = "flex-1 bg-indigo-600 text-white rounded-lg py-2"


  watch(coin, (newv)=>{
    if(newv){
        const walletNet = Object.values(pinia.state.cryptoPrices).find(
            w => w.symbol === newv
        )
        network.value = walletNet.network
    }
  })
  
  const submit = async () => {
  
    if (!coin.value || !amount.value) return error.value = "Fill all fields"
  
    loading.value = true
  
    try {
  
      const payload = {
        userId: props.user._id,
        coin: coin.value,
        amount: Number(amount.value),
        network: network.value,
      }

      const data = await fundUser(payload)

      if(data.success){
        notify.success(data.message)

        await sendNotification({
          userId:props.user._id,
          title: "Wallet Funded",
          message: `Your wallet has been credited with ${amount.value} ${coin.value}`,
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