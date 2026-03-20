<template>

    <main class=" max-w-3xl ">

        <div class="bg-white shadow rounded-2xl p-4 mb-6">
      
          <!-- Header -->
          <div class="flex items-center justify-between mb-3">
            <div>
              <h2 class="font-bold text-xl md:text-2xl mb-1">Deposit Address</h2>
              <p class="text-xs text-gray-500">
                Only send USDT via TRC20 network
              </p>
            </div>
            <Wallet class="w-5 h-5 text-gray-500" />
          </div>
      
          <!-- Coin + Network -->
          <div class="flex items-center gap-2 mb-3">
            <span class="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">
              USDT
            </span>
            <span class="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-semibold">
              TRC20 (TRON)
            </span>
          </div>
      
          <!-- Address -->
          <div class="bg-gray-100 p-3 rounded-lg text-sm break-all">
            {{ walletAddress }}
          </div>
      
          <!-- Actions -->
          <div class="flex gap-3 mt-3">
            <button
              @click="copyAddress"
              class="flex items-center gap-2 bg-black text-white px-3 py-2 rounded-lg text-sm"
            >
              <Copy class="w-4 h-4" />
              Copy
            </button>
      
            <button
              class="flex items-center gap-2 border px-3 py-2 rounded-lg text-sm"
            >
              <QrCode class="w-4 h-4" />
              QR Code
            </button>
          </div>
      
          <!-- WARNING -->
          <div class="mt-4 flex gap-2 bg-red-100 text-red-700 p-3 rounded-lg text-xs">
            <AlertTriangle class="w-4 h-4 mt-0.5" />
            <p>
              Send only <b>USDT (TRC20)</b> to this address. Sending other coins or using a different network may result in permanent loss.
            </p>
          </div>
      
        </div>

         <!-- PROVIDERS -->
        <div class="bg-white shadow rounded-2xl p-4">
        <h2 class="font-semibold mb-3">Buy from trusted providers</h2>

        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">

            <!-- AlchemyPay -->
            <a
            href="https://ramp.alchemypay.org/"
            target="_blank"
            class="provider-card"
            >
            <img src="/image/alchemypay.png" />
            <span>AlchemyPay</span>
            <ExternalLink class="icon" />
            </a>

            <!-- Mercuryo -->
            <a
            href="https://exchange.mercuryo.io/"
            target="_blank"
            class="provider-card"
            >
            <img src="/image/mercuryo.png" />
            <span>Mercuryo</span>
            <ExternalLink class="icon" />
            </a>

            <!-- Transak -->
            <a
            href="https://global.transak.com/"
            target="_blank"
            class="provider-card"
            >
            <img src="/image/transak.png" />
            <span>Transak</span>
            <ExternalLink class="icon" />
            </a>

        </div>
        </div>

    </main>


  </template>
  
  <script setup>
  import { ref } from "vue"
  import { Copy, Wallet, QrCode, AlertTriangle } from "lucide-vue-next"
  
  const walletAddress = ref("TExampleTRONwalletAddress123456789")
  
  const copyAddress = async () => {
    await navigator.clipboard.writeText(walletAddress.value)
    alert("Address copied!")
  }
  </script>

<style scoped>
.provider-card {
  @apply flex flex-col items-center justify-center text-center p-3 rounded-xl shadow hover:bg-black hover:text-white transition;
}

.provider-card img {
  width: 60px;
  margin-bottom: 8px;
}

.provider-card .icon {
  width: 14px;
  margin-top: 5px;
}
</style>