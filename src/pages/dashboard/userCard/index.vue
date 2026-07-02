
<template>
  <main class="md:p-4">

    <!-- HEADER -->
    <section class="max-w-6xl mx-auto mb-6">

      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold">My Cards</h1>

        <NuxtLink
          to="/dashboard/userCard/request"
          class="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm shadow"
        >
          <Plus class="w-4 h-4"/>
          Request Card
        </NuxtLink>
      </div>

      <!-- INFO -->
      

       <div class="bg-gradient-to-r from-indigo-50 to-white border rounded-xl p-4 flex gap-4"> 
        <div class="w-24 h-12 flex items-center justify-center rounded-full bg-indigo-600 text-white"> 
          <CreditCard class="w-4 h-4"/> 
        </div> 
        <div> 
          <h2 class="font-semibold text-lg">Virtual Cards</h2> 
          <p class="text-gray-500 text-sm mt-1"> Create secure virtual cards for online payments, subscriptions, and global transactions. </p> 
          <div class="flex gap-5 mt-3 text-xs text-gray-600 flex-wrap"> 
            <span>✔ Secure Payments</span> <span>✔ Global Use</span> 
            <span>✔ Instant Activation</span> 
          </div>
         </div> 
        </div>

    </section>

    <!-- =========================
         CARD GRID
    ========================== -->
    <section class="max-w-6xl mx-auto">

      <div v-if="cards.length && cards" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        <div v-for="card in cards" :key="card._id">

          <!-- CARD -->
          <div
            class="rounded-2xl p-5 text-white shadow-xl relative overflow-hidden min-h-[200px]"
            :class="getCardTheme(card.cardType)"
          >

            <!-- BANK -->
            <div class="absolute top-4 left-5 text-sm font-bold opacity-80">
              QFS BANK
            </div>

            <!-- CHIP -->
            <div class="w-12 h-8 rounded-md bg-gradient-to-br from-yellow-300 to-yellow-600 mt-6"></div>

            <!-- MASKED NUMBER -->
            <div class="text-lg tracking-[3px] font-mono mt-6">
              {{ maskCardNumber(card.cardNumber) }}
            </div>

            <!-- DETAILS -->
            <div class="flex justify-between mt-6">
              <div>
                <p class="text-[10px] opacity-70">CARD HOLDER</p>
                <p class="text-sm font-semibold uppercase">
                  {{ card.username || "USER" }}
                </p>
              </div>

              <div>
                <p class="text-[10px] opacity-70">EXPIRES</p>
                <p class="text-sm font-semibold">
                  {{ card.expiry }}
                </p>
              </div>
            </div>

            <!-- BRAND -->
            <div class="absolute bottom-4 right-5 text-lg font-bold">
              {{ getBrand(card.cardType) }}
            </div>

          </div>

          <!-- ACTION BUTTONS (OUTSIDE CARD) -->
          <div class="flex gap-2 mt-3">

            <button
              @click="viewCard(card)"
              class="flex-1 border border-gray-900   py-2 rounded-lg text-sm hover:bg-black hover:text-white"
            >
              View
            </button>

          

          </div>

        </div>

      </div>

      <!-- EMPTY -->
      <div v-else class="text-center py-16 flex flex-col items-center">
        <CreditCard class="w-10 h-10 mx-auto text-gray-400"/>
        <h3 class="mt-3 font-semibold">No Cards Yet</h3>
        <NuxtLink
          to="/dashboard/userCard/request"
          class="flex items-center gap-2 bg-indigo-600 mt-4 text-white px-4 py-2 rounded-lg text-sm shadow"
        >
          <Plus class="w-4 h-4"/>
          Request Card
        </NuxtLink>
      </div>

    </section>

    <!-- =========================
         MODAL (FULL DETAILS)
    ========================== -->
    <div v-if="selectedCard" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">

      <div class="bg-white rounded-xl w-full max-w-md p-6">

        <h2 class="font-bold text-lg mb-4">Card Details</h2>

        <!-- FRONT -->
        <div class="rounded-xl p-4 text-white mb-4" :class="getCardTheme(selectedCard.cardType)">
          <p class="text-sm mb-2">{{ getBrand(selectedCard.cardType) }}</p>

          <!-- FULL NUMBER (VISIBLE HERE ONLY) -->
          <p class="text-lg font-mono">
            {{ selectedCard.cardNumber }}
          </p>

          <div class="flex justify-between mt-3 text-sm">
            <span>{{ selectedCard.expiry }}</span>
            <span>{{ selectedCard.status }}</span>
          </div>
        </div>

        <!-- BACK -->
        <div class="bg-gray-100 rounded-xl p-4 text-sm">
          <div class="bg-black h-8 rounded mb-3"></div>

          <div class="flex justify-between">
            <span>CVV</span>
            <span class="bg-white px-3 py-1 rounded shadow">
              {{ selectedCard.cvv }}
            </span>
          </div>
        </div>

        <button
          @click="selectedCard = null"
          class="mt-5 w-full bg-gray-900 text-white py-2 rounded-lg"
        >
          Close
        </button>

      </div>

    </div>

  </main>
</template>

<script setup>
import { computed, ref, onMounted } from "vue"
import { CreditCard, Plus } from "lucide-vue-next"
import { fetchMyUserCards } from "@/composables/actions"

const store = useStore()
const selectedCard = ref(null)

const cards = computed(() => store.state.cardDetails || [])

/* MASK LOGIC */
const maskCardNumber = (num) => {
  if (!num) return "**** **** **** ****"
  return "**** **** **** " + num.slice(-4)
}

/* BRAND */
const getBrand = (type) => {
  type = type?.toLowerCase()
  if (type?.includes("visa")) return "VISA"
  if (type?.includes("master")) return "MASTERCARD"
  if (type?.includes("amex")) return "AMEX"
  return "CARD"
}

/* THEMES */
const getCardTheme = (type) => {
  type = type?.toLowerCase()

  if (type?.includes("visa"))
    return "bg-gradient-to-br from-blue-800 via-blue-700 to-indigo-800"

  if (type?.includes("master"))
    return "bg-gradient-to-br from-gray-900 via-gray-800 to-black"

  if (type?.includes("amex"))
    return "bg-gradient-to-br from-green-700 via-green-600 to-emerald-700"

  return "bg-gradient-to-br from-purple-700 to-indigo-700"
}

const viewCard = (card) => {
  selectedCard.value = card
}

onMounted(() => {
  if (!store.state.cardDetails?.length) {
    fetchMyUserCards()
  }
})
</script>




