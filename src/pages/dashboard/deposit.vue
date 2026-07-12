<template>
  <main class="max-w-3xl  space-y-6">
<!-- {{ pinia.state.selectedCryptoPrice}} -->
    <!-- =========================
         STEP 1 → MODERN FORM
    ========================== -->
    <div v-if="step === 1" class="space-y-6">

<!-- HEADER -->
<div>
  <h1 class="text-2xl font-bold">Deposit Funds</h1>
  <p class="text-gray-500 text-sm">
    Add funds securely using {{ pinia.state.selectedCryptoPrice.symbol }} ({{ pinia.state.selectedCryptoPrice.network }} network)
  </p>
</div>

<!-- INFO -->
<div class="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
  <div class="bg-blue-100 text-blue-700 p-2 rounded-lg">💡</div>

  <div class="text-sm text-blue-900">
    <p class="font-semibold mb-1">How it works</p>
    <ul class="list-disc ml-4 space-y-1">
      <li>Enter amount you want to deposit</li>
      <li>Get your wallet address</li>
      <li>Send {{ pinia.state.selectedCryptoPrice.symbol }} from external wallet</li>
      <li>Funds will be credited after approval</li>
    </ul>
  </div>
</div>

<!-- FORM -->
<div class="bg-white shadow rounded-2xl p-5 space-y-5">

  <!-- COIN -->
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-3">
      <!-- <img src="/img/usdt.png" class="w-10 h-10 rounded-full" /> -->
      <div>
        <p class="font-semibold">{{ pinia.state.selectedCryptoPrice.name }} ({{ pinia.state.selectedCryptoPrice.symbol }})</p>
        <p class="text-xs text-gray-500">{{ pinia.state.selectedCryptoPrice.network }} Network</p>
      </div>
    </div>

    <span class="badge-green">Recommended</span>
  </div>

  <!-- AMOUNT -->
  <div>
    <label class="label">Deposit Amount ({{ pinia.state.selectedCryptoPrice.symbol }})</label>

    <input
      v-model="amount"
      type="number"
      placeholder="e.g 100"
      class="input text-lg"
    />

    <!-- <p class="text-xs text-gray-400 mt-1">
      Minimum deposit: 10 USDT
    </p> -->
  </div>

  <!-- QUICK -->
  <div class="flex gap-2 flex-wrap">
    <button
      v-for="amt in [50,100,500,1000]"
      :key="amt"
      @click="amount = amt"
      class="quick-btn"
    >
      {{ amt }}
    </button>
  </div>

  <!-- ERROR -->
  <p class="text-red-500 text-sm">{{ error }}</p>

  <!-- BUTTON -->
  <button
    @click="create_Deposit"
    :disabled="loading"
    class="btn-primary flex items-center justify-center gap-2"
  >

    <span >Continue to Payment</span>
    <Spinner v-if="loading"/>
  </button>

</div>

<!-- SECURITY -->
<div class="bg-gray-50 border rounded-xl p-4 text-xs text-gray-500">
  🔒 Always confirm you are sending via {{pinia.state.selectedCryptoPrice.network}} network.
</div>

</div>


    <!-- =========================
         STEP 2 → ADDRESS + PROVIDERS
    ========================== -->
    <div v-if="step === 2">

      <!-- BACK -->
      
      <button @click="step = 1" class="bg-blue-500 rounded-full p-2 mb-4">
              <ArrowLeft class="w-5 h-5 text-white"/>
        </button>

      <!-- ADDRESS CARD -->
      <div class="bg-white shadow rounded-2xl p-4 mb-6">

        <div class="flex justify-between items-center mb-3">
          <div>
            <h2 class="font-bold text-xl">Deposit Address</h2>
            <p class="text-xs text-gray-500">
              Only send {{ pinia.state.selectedCryptoPrice.symbol }} via {{ pinia.state.selectedCryptoPrice.network }}
            </p>
          </div>
        </div>

        <!-- TAGS -->
        <div class="flex gap-2 mb-3">
          <span class="badge-green capitalize">{{pinia.state.selectedCryptoPrice.symbol}}</span>
          <span class="badge-red capitalize">{{ pinia.state.selectedCryptoPrice.network }}</span>
        </div>

        <!-- ADDRESS -->
        <div class="bg-gray-100 p-3 rounded-lg text-sm break-all">
          {{ walletAddress }}
        </div>

        <!-- ACTIONS -->
        <div class="flex gap-3 mt-3">
          <button @click="copyAddress" class="btn-dark">
            Copy
          </button>

          <button class="btn-outline">
            QR Code
          </button>
        </div>

        <!-- WARNING -->
        <div class="mt-4 bg-red-100 text-red-700 p-3 rounded-lg text-xs">
          Send only {{ pinia.state.selectedCryptoPrice.symbol }} ({{ pinia.state.selectedCryptoPrice.network }}). Wrong network = loss of funds.
        </div>

      </div>


      <!-- PROVIDERS -->
      <div class="bg-white shadow rounded-2xl p-4">

        <h2 class="font-semibold mb-3">
          Buy from trusted providers
        </h2>

        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">

          <a href="https://ramp.alchemypay.org/" target="_blank" class="provider-card">
            <img src="/image/alchemypay.png" />
            <span>AlchemyPay</span>
          </a>

          <a href="https://exchange.mercuryo.io/" target="_blank" class="provider-card">
            <img src="/image/mercuryo.png" />
            <span>Mercuryo</span>
          </a>

          <a href="https://global.transak.com/" target="_blank" class="provider-card">
            <img src="/image/transak.png" />
            <span>Transak</span>
          </a>

        </div>

      </div>

    </div>

  </main>
</template>


<script setup>
import { ref } from "vue"

import { createDeposit } from "@/composables/requests/crypto"

   
import {
      ArrowLeft,
      Send,
      Download,
      RefreshCcw,
      ShoppingCart
    } from "lucide-vue-next"
    import { fetchAdminWallet } from "@/composables/actions/index"

// import axios from "axios"

const notify = useNotify()

const step = ref(1)

const amount = ref("")
const error = ref("")
const loading = ref(false)
const pinia = useStore()
/* Replace with admin wallet API later */

const walletAddress = computed(() => {
  const wallets = pinia.state.adminWalletAddress || [];

  const selectedCoin = pinia.state.selectedCryptoPrice?.symbol;

  const wallet = wallets.find(
    w => w.coin === selectedCoin
  );

  return wallet?.walletAddress || "";
});

const create_Deposit = async () => {

  error.value = ""

  if (!amount.value || amount.value < 0.0001) {
    error.value = `Minimum deposit is 10 ${pinia.state.selectedCryptoPrice.symbol}`
    return
  }

  try {
    loading.value = true

    const payload = {
      userId:pinia.state.user.id,
      coin: pinia.state.selectedCryptoPrice.symbol,
      network: pinia.state.selectedCryptoPrice.network,
      amount: Number(amount.value)
    }

    const data = await createDeposit(payload)

    if(data.success){
      notify.success(data.message)
      await fetchAdminWallet()
      step.value = 2
    }else{
      notify.error(data.message)
    }



  } catch (err) {
    error.value = err?.response?.data?.message || "Error creating deposit"
  } finally {
    loading.value = false
  }
}


const copyAddress = async () => {
  await navigator.clipboard.writeText(walletAddress.value)
  alert("Copied!")
}

onMounted(async()=>{
    if (pinia.state.adminWalletAddress && Object.keys(pinia.state.adminWalletAddress).length > 0)return
     await fetchAdminWallet()
  })

</script>


<style scoped>
.label {
  font-size: 13px;
  font-weight: 600;
}

.input {
  width: 100%;
  border: 1px solid #e5e7eb;
  padding: 12px;
  border-radius: 12px;
}

.btn-primary {
  width: 100%;
  background: linear-gradient(to right, #4f46e5, #7c3aed);
  color: white;
  padding: 12px;
  border-radius: 12px;
  font-weight: 600;
}

.badge-green {
  background: #dcfce7;
  color: #166534;
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 12px;
}

.badge-red {
  background: #fee2e2;
  color: #991b1b;
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 12px;
}

.quick-btn {
  border: 1px solid #e5e7eb;
  padding: 6px 12px;
  border-radius: 8px;
}

.quick-btn:hover {
  background: #4f46e5;
  color: white;
}

.btn-dark {
  background: black;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
}

.btn-outline {
  border: 1px solid #e5e7eb;
  padding: 8px 12px;
  border-radius: 8px;
}

.provider-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  transition: 0.3s;
}

.provider-card:hover {
  background: black;
  color: white;
}

.provider-card img {
  width: 60px;
  margin-bottom: 8px;
}
</style>