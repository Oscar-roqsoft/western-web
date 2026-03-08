<template>

    <!-- Header (optional slot) -->
    <slot name="header"></slot>
    
    <!-- FROM TOKEN -->
    <div class="bg-gray-50 rounded-xl p-4 mb-3">
    
    <div class="flex justify-between text-sm text-gray-400 mb-1">
    <span>From</span>
    <span>Balance: 0.25 BTC</span>
    </div>
    
    <div class="flex justify-between items-center">
    
    <input
    type="number"
    placeholder="0.0"
    class="bg-transparent text-xl font-bold outline-none w-full"
    />
    
    <button
    class="flex items-center gap-2 bg-white border rounded-lg px-3 py-1"
    @click="revealTokenList"
    >
    <img src="/img/bitcoin.png" class="w-5 h-5 rounded-full"/>
    BTC
    <ChevronDown class="w-4 h-4"/>
    </button>
    
    </div>
    
    </div>
    
    
    <!-- Swap Icon -->
    <div class="flex justify-center my-2">
    
    <button
    @click="reverseSwap"
    class="bg-white shadow rounded-full p-2 hover:rotate-180 transition"
    >
    <ArrowDownUp class="w-4 h-4"/>
    </button>
    
    </div>
    
    
    <!-- TO TOKEN -->
    <div class="bg-gray-50 rounded-xl p-4 mb-4">
    
    <div class="text-sm text-gray-400 mb-1">
    To
    </div>
    
    <div class="flex justify-between items-center">
    
    <input
    type="number"
    placeholder="0.0"
    class="bg-transparent text-xl font-bold outline-none w-full"
    />
    
    <button
    class="flex items-center gap-2 bg-white border rounded-lg px-3 py-1"
    @click="revealTokenList"
    >
    <img src="/img/xrp.png" class="w-5 h-5 rounded-full"/>
    ETH
    <ChevronDown class="w-4 h-4"/>
    </button>
    
    </div>
    
    </div>
    
    
    <!-- Price Info -->
    <div class="text-xs text-gray-500 mb-4">
    
    <div class="flex justify-between">
    <span>Rate</span>
    <span>1 BTC = 14.2 ETH</span>
    </div>
    
    <div class="flex justify-between">
    <span>Network Fee</span>
    <span>0.00021 BTC</span>
    </div>
    
    </div>
    
    
    <!-- Swap Button -->
    <button
    class="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
    >
    Swap Now
    </button>
    
    
    <listToken
    v-if="showTokenList"
    @close="showTokenList=false"
    />
    
    </template>
    
    
    <script setup>
    
    import { ref } from "vue"
    
    import {
    ChevronDown,
    ArrowDownUp
    } from "lucide-vue-next"
    
    import listToken from "@/components/listToken.vue"
    
    const showTokenList = ref(false)
    
    const revealTokenList = ()=>{
    showTokenList.value = true
    }
    
    const reverseSwap = ()=>{
    console.log("reverse tokens")
    }
    
    </script>