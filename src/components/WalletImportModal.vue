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
          <Spinner v-if="importing"/>
        </button>
  
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue"
  import { X, Import } from "lucide-vue-next"
  import { importWalletAPI } from "@/composables/requests/crypto"
  import { fetchWalletInfo } from "@/composables/actions/index"

  
  const props = defineProps({
    wallet:Object
  })

  const pinia = useStore()
  const notify = useNotify()
  
  const tabs = ["Phrase","Keystore JSON","Private Key"]
  
  const activeTab = ref("Phrase")

  const importing = ref(false)
  
  const phrase = ref("")
  const privateKey = ref("")
  const keystore = ref("")
  const password = ref("")
  const error = ref("")

 
  
  const validateImport = async () => {

    error.value = ""

    importing.value = true

    let payload = {
        coin: props.wallet
      }

      if (activeTab.value === "Phrase") {
        payload.type = "phrase"
        payload.phrase = phrase.value
      }

      if (activeTab.value === "Private Key") {
        payload.type = "privateKey"
        payload.privateKey = privateKey.value
      }

      if (activeTab.value === "Keystore JSON") {
        payload.type = "keystore"
        payload.keystore = keystore.value
        payload.password = password.value
      }

      console.log(payload)
      try {
        const data = await importWalletAPI(payload)

        if(data.success){
          // pinia.setwalletInfo(data.data.wallet)
          await fetchWalletInfo()
          notify.success("Wallet Imported Successfully")
        }else{
          // notify.error(data.message)
           error.value = data.message
        }

        importing.value = false

      } catch (err) {
        error.value = err.response?.data?.message || "Import failed"
      }
}
  </script>