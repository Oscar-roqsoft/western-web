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
              <span class="font-semibold text-center capitalize">{{ wallet.name }}</span>
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
              <span class="font-semibold text-sm text-center capitalize">{{ wallet.name }}</span>
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
      name: "1inch wallet",
      frontImage: "/wallet/1inch.jpg",
      backImage: "/wallet/1inch.jpg",
      hover: false,
    },
    {
      name: "Adex network",
      frontImage: "/wallet/adex.jpg",
      backImage: "/wallet/adex.jpg",
      hover: false,
    },
    {
      name: "Alice",
      frontImage: "/wallet/alice.jpg",
      backImage:  "/wallet/alice.jpg",
      hover: false,
    },
    {
      name: "Alpha",
      frontImage: "/wallet/alpha.jpg",
      backImage:  "/wallet/alpha.jpg",
      hover: false,
    },
    {
      name: "Argent",
      frontImage: "/wallet/arge.jpg",
      backImage:  "/wallet/arge.jpg",
      hover: false,
    },
    {
      name: "Atomic",
      frontImage: "/wallet/atomic.jpg",
      backImage: "/wallet/atomic.jpg",
      hover: false,
    },
    {
      name: "Authereum",
      frontImage: "/wallet/authereum.jpg",
      backImage: "/wallet/authereum.jpg",
      hover: false,
    },
    {
      name: "Bitpay",
      frontImage: "/wallet/bitpay.jpg",
      backImage:  "/wallet/bitpay.jpg",
      hover: false,
    },
    {
      name: "Binance Dex",
      frontImage: "/wallet/BNS.jpg",
      backImage: "/wallet/BNS.jpg",
      hover: false,
    },
    {
      name: "coin 98",
      frontImage: "/wallet/coin98.jpg",
      backImage: "/wallet/coin98.jpg",
      hover: false,
    },
    {
      name: "coinbase ",
      frontImage: "/wallet/coinbase.png",
      backImage: "/wallet/coinbase.png",
      hover: false,
    },
    {
      name: "coinomi ",
      frontImage: "/wallet/coinomi.jpg",
      backImage: "/wallet/coinomi.jpg",
      hover: false,
    },
    {
      name: "compound ",
      frontImage: "/wallet/compound.jpg",
      backImage: "/wallet/compound.jpg",
      hover: false,
    },
    {
      name: "crypto.com |Defi wallet ",
      frontImage: "/wallet/crypto.jpg",
      backImage: "/wallet/crypto.jpg",
      hover: false,
    },
    {
      name: "curve ",
      frontImage: "/wallet/curve.jpg",
      backImage: "/wallet/curve.jpg",
      hover: false,
    },
    {
      name: "cybavo wallet ",
      frontImage: "/wallet/cybavo.jpg",
      backImage: "/wallet/cybavo.jpg",
      hover: false,
    },
    {
      name: "d'cent ",
      frontImage: "/wallet/d'cent.jpg",
      backImage: "/wallet/d'cent.jpg",
      hover: false,
    },
    {
      name: "debank ",
      frontImage: "/wallet/debank.jpg",
      backImage: "/wallet/debank.jpg",
      hover: false,
    },
    {
      name: "dharma ",
      frontImage: "/wallet/dharma.jpg",
      backImage: "/wallet/dharma.jpg",
      hover: false,
    },
    {
      name: "dydx ",
      frontImage: "/wallet/dydx.jpg",
      backImage: "/wallet/dydx.jpg",
      hover: false,
    },
    {
      name: "Eidoo ",
      frontImage: "/wallet/Eidoo.jpg",
      backImage: "/wallet/Eidoo.jpg",
      hover: false,
    },
    {
      name: "ellipal ",
      frontImage: "/wallet/ellipal.png",
      backImage: "/wallet/ellipal.png",
      hover: false,
    },
    {
      name: "etherscan ",
      frontImage: "/wallet/etherscan.jpg",
      backImage: "/wallet/etherscan.jpg",
      hover: false,
    },
    {
      name: "gnosis ",
      frontImage: "/wallet/gnosis.jpg",
      backImage: "/wallet/gnosis.jpg",
      hover: false,
    },
    {
      name: "gridplud ",
      frontImage: "/wallet/gridplud.jpg",
      backImage: "/wallet/gridplud.jpg",
      hover: false,
    },
    {
      name: "huobi",
      frontImage: "/wallet/huobi.jpg",
      backImage: "/wallet/huobi.jpg",
      hover: false,
    },
    {
      name: "imToken",
      frontImage: "/wallet/imtoken.jpg",
      backImage: "/wallet/imtoken.jpg",
      hover: false,
    },
    {
      name: "ledger live",
      frontImage: "/wallet/ledger.png",
      backImage: "/wallet/ledger.png",
      hover: false,
    },
    {
      name: "local cryptos ",
      frontImage: "/wallet/localcryptos.jpg",
      backImage: "/wallet/localcryptos.jpg",
      hover: false,
    },
    {
      name: "loopring ",
      frontImage: "/wallet/loopring.jpg",
      backImage: "/wallet/loopring.jpg",
      hover: false,
    },
    {
      name: "maiar ",
      frontImage: "/wallet/maiar-dex.jpg",
      backImage: "/wallet/maiar-dex.jpg",
      hover: false,
    },
    {
      name: "math ",
      frontImage: "/wallet/math.jpg",
      backImage: "/wallet/math.jpg",
      hover: false,
    },
    {
      name: "my crypto ",
      frontImage: "/wallet/mycrypto.jpg",
      backImage: "/wallet/mycrypto.jpg",
      hover: false,
    },
    {
      name: "my key ",
      frontImage: "/wallet/mykey.jpg",
      backImage: "/wallet/mykey.jpg",
      hover: false,
    },
    {
      name: "nash ",
      frontImage: "/wallet/nash.jpg",
      backImage: "/wallet/nash.jpg",
      hover: false,
    },
    {
      name: "nomic ",
      frontImage: "/wallet/nomic.png",
      backImage: "/wallet/nomic.png",
      hover: false,
    },
    {
      name: "opensea ",
      frontImage: "/wallet/opensea.jpg",
      backImage: "/wallet/opensea.jpg",
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