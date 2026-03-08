<template>
    <BaseModal>
    
    <!-- Header -->
    <div class="flex items-center justify-between mb-5">
    
    <div>
    <h2 class="font-bold text-lg">
    Receive {{ coin.name }}
    </h2>
    
    <p class="text-xs text-gray-500">
    Send only {{ coin.network }} network
    </p>
    </div>
    
    <button
    @click="$emit('close')"
    class="p-1 rounded hover:bg-gray-100"
    >
    <X class="w-5 h-5"/>
    </button>
    
    </div>
    
    
    <!-- Coin Info -->
    <div class="flex items-center gap-3 mb-5">
    
    <img
    :src="coin.icon"
    class="w-10 h-10 rounded-full"
    />
    
    <div>
    <p class="font-semibold">{{ coin.name }}</p>
    <p class="text-xs text-gray-400">{{ coin.symbol }}</p>
    </div>
    
    <span class="ml-auto text-xs bg-gray-100 px-2 py-1 rounded">
    {{ coin.network }}
    </span>
    
    </div>
    
    
    <!-- QR Code -->
    <div class="flex justify-center mb-5">
    
    <div class="bg-white p-3 rounded-xl shadow border">
    
    <canvas ref="qrCanvas" class="w-40 h-40"></canvas>
    
    </div>
    
    </div>
    
    
    <!-- Wallet Address -->
    <div class="text-xs text-gray-500 mb-1">
    Wallet Address
    </div>
    
    <div class="flex items-center gap-2 bg-gray-100 rounded-lg p-2">
    
    <p class="text-xs font-mono truncate flex-1">
    {{ shortAddress }}
    </p>
    
    <button
    @click="copyAddress"
    class="flex items-center gap-1 text-indigo-600 text-xs font-semibold"
    >
    <Copy class="w-4 h-4"/>
    
    <span v-if="!copied">Copy</span>
    <span v-else>Copied</span>
    
    </button>
    
    </div>
    
    
    <!-- Warning -->
    <div class="mt-4 text-xs text-gray-400 text-center">
    
    Send only <b>{{ coin.network }}</b> to this address.  
    Sending other assets may result in permanent loss.
    
    </div>
    
    </BaseModal>
 </template>

<script setup>

    import { ref, computed, onMounted } from "vue"
    import QRCode from "qrcode"
    // import BaseModal from "./BaseModal.vue"
    import { X, Copy } from "lucide-vue-next"
    
    const qrCanvas = ref(null)
    const copied = ref(false)
    
    const coin = ref({
    name: "Bitcoin",
    symbol: "BTC",
    network: "Bitcoin",
    icon: "/img/bitcoin.png",
    address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
    })
    
    
    const shortAddress = computed(() => {
    const addr = coin.value.address
    return addr.slice(0,10) + "..." + addr.slice(-8)
    })
    
    
    onMounted(() => {
    
    QRCode.toCanvas(
    qrCanvas.value,
    coin.value.address,
    {
    width:160,
    margin:1
    }
    )
    
    })
    
    
    const copyAddress = async () => {
    
    await navigator.clipboard.writeText(coin.value.address)
    
    copied.value = true
    
    setTimeout(()=>{
    copied.value = false
    },2000)
    
    }
    
    </script>