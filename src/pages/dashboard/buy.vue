<template>
    
      <div class="flex items-center gap-4 mb-4">
  
  <!-- Back Button -->
  <button
    @click="$router.back()"
    class="w-11 h-11 rounded-xl border bg-white hover:bg-gray-100 flex items-center justify-center transition"
  >
    <ArrowLeft class="w-5 h-5"/>
  </button>

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
</template>
<script setup>
  import { ArrowLeft } from "lucide-vue-next";
</script>