



<template>
  <main class="md:p-4">

    <!-- Header -->
    <section class="max-w-6xl mx-auto">

      <div class="flex items-center justify-between mb-4">
        <h1 class="text-2xl font-bold">Cards</h1>

        <NuxtLink
          to="/dashboard/userCard/request"
          class="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm shadow"
        >
          <Plus class="w-4 h-4"/>
          Request New Card
        </NuxtLink>
      </div>

        <!-- Info Card -->
        <div class="bg-white shadow rounded-lg p-6 flex gap-4 flex-wrap">
  
  <div class="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
    <CreditCard class="w-6 h-6"/>
  </div>

  <div class="flex-1">

    <h2 class="text-lg font-semibold">
      Cards
    </h2>

    <p class="text-gray-500 mt-1">
      Create secure cards for online purchases, subscriptions, and more.
      Our cards are fully functional and can be used anywhere major
      credit cards are accepted.
    </p>

    <!-- Benefits -->
    <div class="flex gap-6 mt-4 flex-wrap">

      <div class="flex items-center gap-2 text-gray-500">
        <Shield class="w-5 h-5 text-indigo-600"/>
        <span>Secure Transactions</span>
      </div>

      <div class="flex items-center gap-2 text-gray-500">
        <Globe class="w-5 h-5 text-indigo-600"/>
        <span>Global Acceptance</span>
      </div>

      <div class="flex items-center gap-2 text-gray-500">
        <Settings class="w-5 h-5 text-indigo-600"/>
        <span>Full Control</span>
      </div>

    </div>

  </div>

</div>
    </section>


    <!-- =========================
         CARD LIST
    ========================== -->
    <section class="max-w-6xl mx-auto mt-6">

      <!-- IF CARDS EXIST -->
       <div v-if="cards" class=" max-w-sm">
         
         <div
             v-for="card in cards"
             :key="card._id"
             class="relative rounded-2xl p-5 text-white shadow-xl overflow-hidden group
                   bg-gradient-to-br from-[#1e1e2f] via-[#2b2b45] to-[#1a1a2e] min-h-28"
           >
   
             <!-- Glow Effect -->
             <div class="absolute inset-0 opacity-30 bg-gradient-to-tr from-indigo-500 to-purple-500 blur-2xl group-hover:opacity-50 transition"></div>
   
             <!-- Glass Overlay -->
             <div class="absolute inset-0 bg-white/5 backdrop-blur-xl"></div>
   
             <!-- Content -->
             <div class="relative z-10">
   
               <!-- Top Row -->
               <div class="flex justify-between items-center mb-6">
   
                 <!-- Chip -->
                 <div class="w-10 h-7 rounded-md bg-gradient-to-br from-yellow-300 to-yellow-600 shadow-inner"></div>
   
                 <!-- Card Type -->
                 <div class="text-right">
                   <p class="text-xs uppercase opacity-70">{{ card.cardtype }}</p>
                   <p class="text-[10px] opacity-50">{{ card.status || "active" }}</p>
                 </div>
   
               </div>
   
               <!-- Card Number -->
               <div class="text-xl tracking-[3px] font-semibold mb-6 font-mono">
                 {{ maskCardNumber(card.number) }}
               </div>
   
               <!-- Bottom -->
               <div class="flex justify-between items-end">
   
                 <div>
                   <p class="text-[10px] opacity-60">CARD HOLDER</p>
                   <p class="text-sm font-semibold">
                     {{ card.firstname }} {{ card.lastname }}
                   </p>
                 </div>
   
                 <div>
                   <p class="text-[10px] opacity-60">EXPIRES</p>
                   <p class="text-sm font-semibold">{{ card.expiry }}</p>
                 </div>
   
               </div>
   
               <!-- Brand -->
               <div class="absolute bottom-4 right-4 text-sm font-bold opacity-80">
                 {{ getBrand(card.cardtype) }}
               </div>
   
             </div>
   
           </div>
       </div>


      <!-- EMPTY STATE -->
      <div v-else class="bg-white rounded-xl shadow p-10 text-center">

        <div class="flex justify-center">
          <div class="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
            <CreditCard class="w-6 h-6"/>
          </div>
        </div>

        <h3 class="text-lg font-semibold mt-4">
          No Cards Yet
        </h3>

        <p class="text-gray-500 mt-2 max-w-md mx-auto">
          You haven't created any cards yet.
        </p>

        <NuxtLink
          to="/dashboard/userCard/request"
          class="inline-flex items-center gap-2 mt-5 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow"
        >
          <Plus class="w-4 h-4"/>
          Request New Card
        </NuxtLink>

      </div>

    </section>

  </main>
</template>


<script setup>
import { computed, onMounted } from "vue"
import {
  CreditCard,
  Plus
} from "lucide-vue-next"

const store = useStore()

/* =========================
   GET CARDS FROM PINIA
========================= */

const cards = computed(() => {
  return store.state.cardDetails || []
})

/* =========================
   MASK CARD NUMBER
========================= */

const maskCardNumber = (num) => {
  if (!num) return "**** **** **** ****"
  return num.replace(/\d{4}(?= \d{4})/g, "****")
}

const getBrand = (type) => {
  if (!type) return "CARD"

  if (type.toLowerCase().includes("visa")) return "VISA"
  if (type.toLowerCase().includes("master")) return "MASTERCARD"
  if (type.toLowerCase().includes("amex")) return "AMEX"

  return "CARD"
}

/* =========================
   FETCH CARDS (optional)
========================= */

onMounted(() => {
  if (!store.state.carddetails?.length) {
    store.getUserCards?.()
  }
})
</script>