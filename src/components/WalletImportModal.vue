<template>
    <div class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
  
      <div class="bg-white max-w-[420px] w-full min-h-[500px] rounded-xl shadow-xl p-6 relative">
  
        <!-- Close -->
        <button
          @click="$emit('close')"
          class="absolute right-4 top-4 text-gray-500 hover:text-black"
        >
          <X class="w-5 h-5"/>
        </button>
  
        <!-- Wallet Info -->
        <div class="flex flex-col items-center mb-4">
          <img :src="wallet.frontImage" class="w-14 h-14 mb-2 rounded-full"/>
          <h2 class="font-bold text-lg">
            Import your {{ wallet.name }}
          </h2>
        </div>
  
        <!-- Tabs -->
        <div class="flex gap-4 border-b mb-4 text-sm">
          <button
            v-for="tab in tabs"
            :key="tab"
            @click="activeTab = tab;  error =''"
            class="pb-2"
            :class="activeTab==tab ? 'border-b-2 border-indigo-600 font-semibold' : 'text-gray-400'"
          >
            {{ tab }}
          </button>
        </div>
  
        <!-- Phrase -->
        <div v-if="activeTab==='Phrase'">
          <textarea
            v-model="phrase"
            placeholder="Enter 12 or 24 word recovery phrase"
            class="w-full border rounded-lg p-2 h-36"
          />
        </div>
  
        <!-- Private Key -->
        <div v-if="activeTab==='Private Key'">
          <textarea
            v-model="privateKey"
            placeholder="Enter private key"
            class="w-full border rounded-lg p-2 h-36"
          />
        </div>
  
        <!-- Keystore -->
        <div v-if="activeTab==='Keystore JSON'" class="space-y-3">
          <textarea
            v-model="keystore"
            placeholder="Paste keystore JSON"
            class="w-full border rounded-lg p-2 h-24"
          />
  
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="w-full border rounded-lg p-2"
          />
        </div>
  
        <!-- Error -->
        <p v-if="error" class="text-red-500 text-sm mt-3">
          {{ error }}
        </p>
  
        <!-- Import Button -->
        <button
          @click="validateImport"
          class="w-full mt-4 bg-indigo-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-700"
        >
          <Import class="w-4 h-4"/>
          Import
        </button>
  
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue"
  import { X, Import } from "lucide-vue-next"
  
  const props = defineProps({
    wallet:Object
  })
  
  const tabs = ["Phrase","Keystore JSON","Private Key"]
  
  const activeTab = ref("Phrase")
  
  const phrase = ref("")
  const privateKey = ref("")
  const keystore = ref("")
  const password = ref("")
  const error = ref("")
  
  const validateImport = () => {
  
    error.value=""
  
    if(activeTab.value==="Phrase"){
      const words = phrase.value.trim().split(" ")
  
      if(words.length !==12 && words.length !==24){
        error.value="Recovery phrase must contain 12 or 24 words separated by spaces."
        return
      }
    }
  
    if(activeTab.value==="Private Key"){
      if(privateKey.value.length < 60){
        error.value="Private key appears invalid. It should be a long hexadecimal string."
        return
      }
    }
  
    if(activeTab.value==="Keystore JSON"){
  
      try{
        JSON.parse(keystore.value)
      }catch{
        error.value="Invalid JSON format."
        return
      }
  
      if(password.value.length < 4){
        error.value="Password required to unlock keystore."
        return
      }
    }
  
    alert("Wallet Imported Successfully")
  }
  </script>