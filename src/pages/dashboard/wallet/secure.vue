<template>
    <div class="bg-black  h-[80px]">
        <div class="max-w-6xl mx-auto px-4 flex justify-between items-center h-[80px] text-gray-300 font-semibold">

            <span>
                APP
            </span>
            <span></span>
            <span>WALLET</span>

        </div>

        
    </div>
    <section class="max-w-6xl mx-auto p-4 min-h-screen">
      <h2 class="text-xl md:text-2xl font-bold mb-4 text-center py-4">Available Wallets</h2>
  
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        <div
          v-for="wallet in wallets"
          :key="wallet.name"
          class="relative w-full h-48 perspective"
          @click="openWallet(wallet)"
        >
          <!-- Card Inner -->
          <div
            class="relative w-full h-full transition-transform duration-500 transform-style preserve-3d group cursor-pointer"
            :class="{'rotate-y-180': wallet.hover}"
            @mouseenter="wallet.hover = true"
            @mouseleave="wallet.hover = false"
          >
            <!-- Front -->
            <div
              class="absolute w-full h-full rounded-xl bg-white shadow-lg flex flex-col items-center justify-center backface-hidden p-4"
            >
              <img
                :src="wallet.frontImage"
                alt="wallet"
                class="w-16 h-16 rounded-full mb-2 object-contain"
              />
              <span class="font-semibold text-center">{{ wallet.name }}</span>
              <span class="font-semibold text-center">Secure</span>
            </div>
  
            <!-- Back -->
            <div
              class="absolute w-full h-full rounded-xl bg-gray-900 text-white shadow-lg flex flex-col items-center justify-center backface-hidden transform rotate-y-180"
            >
              <div class="w-full bg-gray-800 px-2 py-1 text-xs rounded-t-lg text-center">
                App · Wallet
              </div>
              <img
                :src="wallet.backImage"
                alt="wallet back"
                class="w-16 h-16 rounded-full my-4 object-contain"
              />
              <span class="font-semibold text-sm text-center">{{ wallet.name }}</span>
            </div>
          </div>
        </div>
      </div>


    </section>

    <WalletImportModal
        v-if="showModal"
        :wallet="selectedWallet"
        @close="showModal=false"
    />

  </template>
  
  <script setup>
  import { ref } from "vue";
  definePageMeta(
        {
        layout: 'custom2',
        }
    );
  
  // Example list of wallets
  const wallets = ref([
    {
      name: "MetaMask",
      frontImage: "/img/xrp.png",
      backImage: "/img/xrp.png",
      hover: false,
    },
    {
      name: "Trust Wallet",
      frontImage: "/walleticons/trustwallet.png",
      backImage: "/walleticons/trustwallet-back.png",
      hover: false,
    },
    {
      name: "Coinbase Wallet",
      frontImage: "/walleticons/coinbase.png",
      backImage: "/walleticons/coinbase-back.png",
      hover: false,
    },
    {
      name: "Ledger",
      frontImage: "/walleticons/ledger.png",
      backImage: "/walleticons/ledger-back.png",
      hover: false,
    },
    {
      name: "Trezor",
      frontImage: "/walleticons/trezor.png",
      backImage: "/walleticons/trezor-back.png",
      hover: false,
    },
  ]);
  const showModal = ref(false)
const selectedWallet = ref(null)

const openWallet = (wallet)=>{
selectedWallet.value = wallet
showModal.value = true
}
  </script>
  
  <style scoped>
  .perspective {
    perspective: 1000px;
  }
  
  .transform-style {
    transform-style: preserve-3d;
  }
  
  .backface-hidden {
    backface-visibility: hidden;
  }
  
  .rotate-y-180 {
    transform: rotateY(180deg);
  }
  </style>