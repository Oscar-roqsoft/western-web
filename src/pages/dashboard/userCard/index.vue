<template>
  <main class="md:p-4">

          <!-- PAGE HEADER -->
      <section class="max-w-6xl mx-auto mb-6">
      
        <div class="flex justify-between items-center mb-5">
        
          <div>
            <h1 class="text-2xl font-bold">
            My Cards
            </h1>
            
            <p class="text-sm text-gray-500">
            Manage your virtual cards and applications
            </p>
          </div>
        
           <!-- CREATE NEW CARD -->
        
          <NuxtLink
          to="/dashboard/userCard/request"
          class="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl shadow"
          >
            <Plus class="w-4 h-4"/>
            
            Request Card
          
          </NuxtLink>
        
        
        </div>
      
          <!-- INFORMATION CARD -->
        <div
          class="bg-gradient-to-r from-indigo-50 to-blue-50 border rounded-2xl p-5 flex gap-4"
          >
              <div
              class="w-14 h-14 rounded-xl bg-indigo-600 text-white flex items-center justify-center"
              >
              
              <CreditCard/>
              
              </div>
          
        <div>
          
          <h2 class="font-bold text-lg">
          QFS Virtual Cards
          </h2>
          
          
          <p class="text-sm text-gray-600">
          Secure virtual cards for online payments and global transactions.
          </p>
          
        
        
        <div class="flex flex-wrap gap-4 mt-3 text-xs">
          
            <span>
            ✔ Secure
            </span>
            
            <span>
            ✔ Global Payment
            </span>
            
            
            <span>
            ✔ Instant Activation
            </span>
          
          
        </div>
          
        
      </div>
        
        
    </div>
      
      </section>
  
  
  
      <!-- CARD LIST -->
    <section class="max-w-6xl mx-auto">
      
      <div
      v-if="cards"
      class="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
      
      
      
      <div
      v-for="card in cards"
      :key="card._id"
      >
      <!-- ==========================
          CARD DESIGN
      ========================== -->
      
      <div
      class="rounded-2xl p-5 text-white shadow-xl relative overflow-hidden min-h-[230px]"
      :class="getCardTheme(card.cardType)"
      >
      
      
      
      <!-- DECORATION -->
      
      <div
      class="absolute right-0 top-0 w-40 h-40 bg-white/10 rounded-full -mr-16 -mt-16"
      />
      
      
      
      
      
      <!-- CARD HEADER -->
      
      <div class="flex gap-4 items-center">
      
      
      <span class="font-bold">
      QFS BANK
      </span>
      
      
      
      <!-- STATUS BADGE -->
      
     
      
      
      </div>
      
      
      
      
      
      
      
      <!-- CHIP -->
      
      <div
      class="w-12 h-9 rounded-lg bg-gradient-to-br from-yellow-300 to-yellow-600 mt-8"
      />
      
      
      
      
      
      <!-- CARD NUMBER -->
      
      <p class="mt-7 font-mono tracking-widest text-lg">
      
      {{maskCardNumber(card.cardNumber)}}
      
      </p>
      
      
      
      
      
      
      
      <!-- BALANCE INFO -->
      

<div class="flex justify-between items-end mt-8">

<div>
  <p class="text-[10px] uppercase tracking-wider opacity-70">
    Card Holder
  </p>

  <p class="text-sm font-semibold uppercase tracking-wide mt-1">
    {{ card.fullname || card.username || "CARD HOLDER" }}
  </p>
</div>

<div class="text-right">
  <p class="text-[10px] uppercase tracking-wider opacity-70">
    Expires
  </p>

  <p class="text-sm font-semibold">
    {{ card.expiry || "**/**" }}
  </p>
</div>

</div>
      
      
      
      
      <!-- BRAND -->
      
      <div
          class="absolute top-5 right-5 text-right"
        >
          <p class="text-xl font-black tracking-widest opacity-90">
            {{ getBrand(card.cardType) }}
          </p>

          <p class="text-[10px] uppercase tracking-[4px] opacity-70">
            QFS
          </p>
        </div>

        <div
        class="absolute top-16 right-5 opacity-80"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path d="M7 8a5 5 0 0 1 0 8"/>
          <path d="M11 5a9 9 0 0 1 0 14"/>
          <path d="M15 2a13 13 0 0 1 0 20"/>
        </svg>
      </div>


      <div
        class="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none"
      ></div>
            
      
      
      
      
      
      
      
      
      
      
      </div>
      <!-- ==========================
          ACTION BUTTONS
      ========================== -->
      
      
      <div class="mt-3 space-y-2">


        <div
      class="text-xs px-3 py-2 rounded-md text-center capitalize font-semibold"
      :class="statusClass(card.status)"
      >
      
      {{card.status}}
      
      </div>
      
      
      
      <button
      @click="viewCard(card)"
      class="w-full border border-black py-2 rounded-xl hover:bg-black hover:text-white transition"
      >
      
      View Details
      
      </button>
      
      
      
      
      
      <!-- ONLY REJECTED CAN REQUEST AGAIN -->
      
      <button
      
      v-if="card.status ==='rejected'"
      
      @click="openEditModal(card)"
      
      class="w-full bg-indigo-600 text-white py-2 rounded-xl"
      
      >
      
      Edit & Request Again
      
      </button>
      
      
      
      
      </div>
      
      <!-- REJECTION MESSAGE -->
      
      <div
      
      v-if="card.status==='rejected'"
      
      class="mt-3 bg-red-50 border border-red-200 text-red-600 text-xs p-3 rounded-xl"
      
      >
      
      
      <p class="font-semibold">
      Rejected Reason:
      </p>
      
      
      <p>
      {{card.rejectionReason || "No reason provided"}}
      </p>
      
      
      </div>
      
      
      
      </div>
      </div>
      <!-- EMPTY STATE -->
      
      <div v-else class="text-center py-16">
      
        <CreditCard
        class="mx-auto w-12 h-12 text-gray-400"
        />
      
        <h3 class="mt-3 font-semibold">
        No Card Request
        </h3>
      
      
        <NuxtLink
        to="/dashboard/userCard/request"
        class="inline-flex mt-4 items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl"
        >
        
          <Plus class="w-4 h-4"/>
          
          Request Card
        
        </NuxtLink>
        
      
      </div>
      
      </section>
  
       <!-- CARD DETAILS MODAL -->
  
  
       <div
        v-if="selectedCard"
        class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      >
        <div class="bg-white rounded-2xl w-full max-w-md overflow-hidden">

          <!-- Header -->
          <div class="flex items-center justify-between p-5 border-b">
            <h2 class="text-lg font-bold">Card Details</h2>

            <button
              @click="selectedCard = null"
              class="text-xl hover:text-red-500"
            >
              ✕
            </button>
          </div>

          <div class="p-5">

            <!-- DETAILS -->
            <div class="mt-2 rounded-xl border divide-y">

              <div class="flex justify-between p-3">
                <span class="text-gray-500">Card Holder</span>
                <span class="font-semibold">
                  {{ selectedCard.fullname }}
                </span>
              </div>

              <div class="flex justify-between p-3">
                <span class="text-gray-500">Username</span>
                <span class="font-semibold">
                  {{ selectedCard.username }}
                </span>
              </div>

              <div class="flex justify-between p-3">
                <span class="text-gray-500">Phone</span>
                <span class="font-semibold">
                  {{ selectedCard.phoneNumber }}
                </span>
              </div>

              <div class="flex justify-between p-3">
                <span class="text-gray-500">Card Type</span>
                <span class="font-semibold">
                  {{ getBrand(selectedCard.cardType) }}
                </span>
              </div>

              <div class="flex justify-between p-3">
                <span class="text-gray-500">Status</span>

                <span
                  class="px-2 py-1 rounded-full text-xs font-semibold"
                  :class="statusClass(selectedCard.status)"
                >
                  {{ selectedCard.status }}
                </span>

              </div>

              <div class="flex justify-between p-3">
                <span class="text-gray-500">Address</span>
                <span class="font-semibold text-right max-w-[200px]">
                  {{ selectedCard.address }}
                </span>
              </div>

              <div class="flex justify-between p-3">
                <span class="text-gray-500">Requested</span>
                <span class="font-semibold">
                  {{ new Date(selectedCard.createdAt).toLocaleDateString() }}
                </span>
              </div>

              <div
                v-if="selectedCard.status === 'active'"
                class="flex justify-between p-3"
              >
                <span class="text-gray-500">CVV</span>

                <span class="font-semibold">
                  {{ selectedCard.cvv }}
                </span>
              </div>

            </div>

            <!-- REJECTION REASON -->
            <div
              v-if="selectedCard.status === 'rejected'"
              class="mt-5 bg-red-50 border border-red-200 rounded-xl p-4"
            >

              <p class="font-semibold text-red-700 mb-2">
                Rejection Reason
              </p>

              <p class="text-sm text-red-600">
                {{ selectedCard.rejectionReason || "No reason was provided." }}
              </p>

            </div>

            <!-- FOOTER -->
            <button
              @click="selectedCard = null"
              class="mt-6 w-full bg-gray-900 hover:bg-black text-white py-3 rounded-xl"
            >
              Close
            </button>

          </div>

        </div>
      </div>
        
        <!-- EDIT REJECTED CARD MODAL -->
  
      <div
      v-if="editCard"
      class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      >
      
      
        <div class="bg-white rounded-2xl p-6 w-full max-w-md">
        
        
        <h2 class="font-bold text-lg mb-5">
        Update Card Request
        </h2>
        
        
        
        <input
        v-model="editForm.fullname"
        placeholder="Full name"
        class="input"
        />
        
        
        <input
        v-model="editForm.phoneNumber"
        placeholder="Phone number"
        class="input mt-3"
        />
        
        
        <textarea
        v-model="editForm.address"
        placeholder="Address"
        class="input mt-3"
        />
        
        
        
        <select
        v-model="editForm.cardType"
        class="input mt-3"
        >
        
        <option value="gold card">
        Gold card
        </option>
        
        <option value="black card">
        Black card
        </option>
        
        
        
        
        </select>
        
        
        
        
        <div class="flex gap-3 mt-5">
        
        
        <button
        @click="editCard=null"
        class="flex-1 border py-2 rounded-xl"
        >
        
        Cancel
        
        </button>
        
        
        
        <button
        @click="submitEdit"
        class="flex-1 bg-indigo-600 text-white py-2 rounded-xl"
        >
        
        Submit
        
        </button>
        
        
        
        </div>
        
        
        
        </div>
      
      
      </div>
  
  
  
  </main>
  
  </template>
  
  
  
  
  <script setup>

import { ref, computed, onMounted } from "vue"

import {
  CreditCard,
  Plus
} from "lucide-vue-next"


import {
  fetchMyUserCards
} from "@/composables/actions"


import {
  requestAgainCard
} from "@/composables/requests/card"



const store = useStore()

const notify = useNotify()



/*
|--------------------------------------------------------------------------
| MODAL STATES
|--------------------------------------------------------------------------
*/


// View card details modal
const selectedCard = ref(null)


// Edit rejected card modal
const editCard = ref(null)


// Loading button
const loading = ref(false)





/*
|--------------------------------------------------------------------------
| EDIT FORM
|--------------------------------------------------------------------------
*/


const editForm = ref({

  fullname:"",
  phoneNumber:"",
  address:"",
  cardType:"gold card"

})







/*
|--------------------------------------------------------------------------
| GET CARDS FROM STORE
|--------------------------------------------------------------------------
*/


const cards = computed(()=>{

  return store.state.cardDetails || []

})









/*
|--------------------------------------------------------------------------
| MONEY FORMATTER
|--------------------------------------------------------------------------
*/


const formatMoney = (value)=>{


  return Number(value || 0)
  .toLocaleString(
    "en-US",
    {

      minimumFractionDigits:2,

      maximumFractionDigits:2

    }
  )


}









/*
|--------------------------------------------------------------------------
| MASK CARD NUMBER
|--------------------------------------------------------------------------
*/


const maskCardNumber=(number)=>{


if(!number){

return "**** **** **** ****"

}


return "**** **** **** " + number.slice(-4)


}









/*
|--------------------------------------------------------------------------
| CARD BRAND
|--------------------------------------------------------------------------
*/


const getBrand=(type)=>{


switch(type?.toLowerCase()){


case "gold card":

return "GOLDCARD"



case "black card":

return "BLACKCARD"


default:

return "CARD"



}


}











/*
|--------------------------------------------------------------------------
| CARD COLOR THEME
|--------------------------------------------------------------------------
*/


const getCardTheme = (type) => {
  switch (type?.toLowerCase()) {
    case "gold card":
      return "gold-card"

    case "black card":
      return "black-card"

    default:
      return "classic-card"
  }
}













/*
|--------------------------------------------------------------------------
| STATUS BADGE COLORS
|--------------------------------------------------------------------------
*/


const statusClass=(status)=>{


switch(status?.toLowerCase()){


case "pending":

return "bg-yellow-200 text-yellow-700"



case "approved":

return "bg-blue-200 text-blue-700"



case "active":

return "bg-green-200 text-green-700"



case "rejected":

return "bg-red-200 text-red-700"



case "blocked":

return "bg-gray-200 text-gray-700"



default:

return "bg-gray-200 text-gray-700"



}


}











/*
|--------------------------------------------------------------------------
| OPEN DETAILS
|--------------------------------------------------------------------------
*/


const viewCard=(card)=>{


selectedCard.value = card


}









/*
|--------------------------------------------------------------------------
| OPEN EDIT MODAL FOR REJECTED CARD
|--------------------------------------------------------------------------
*/


const openEditModal=(card)=>{


editCard.value = card



editForm.value = {


fullname:
card.fullname || "",


phoneNumber:
card.phoneNumber || "",


address:
card.address || "",


cardType:
card.cardType || "visa"



}



}









/*
|--------------------------------------------------------------------------
| SUBMIT UPDATED CARD REQUEST
|--------------------------------------------------------------------------
|
| This will call backend endpoint:
|
| PUT /card/request-again
|
| Backend should:
| - check card status rejected
| - update details
| - change status pending
|
|--------------------------------------------------------------------------
*/


const submitEdit = async()=>{


try{


loading.value=true



const payload={


cardId:editCard.value._id,


...editForm.value


}



const res =
await requestAgainCard(payload)



if(res.success){


notify.success(
"Card request submitted again"
)



editCard.value=null



await fetchMyUserCards()



}else{


notify.error(res.message)


}



}catch(error){


notify.error(
error.message || "Update failed"
)



}finally{


loading.value=false


}



}









/*
|--------------------------------------------------------------------------
| INITIAL LOAD
|--------------------------------------------------------------------------
*/


onMounted(async()=>{


if(!cards.value){
   await fetchMyUserCards()

}


})


</script>





<style scoped>


.input{

width:100%;

border:1px solid #e5e7eb;

border-radius:12px;

padding:12px;

outline:none;

}


.input:focus{

border-color:#6366f1;

}

.gold-card{
  background:
    radial-gradient(circle at top right,rgba(255,255,255,.35),transparent 35%),
    linear-gradient(135deg,#f8d568 0%,#d4af37 35%,#b8860b 100%);
}

.black-card{
  background:
    radial-gradient(circle at top right,rgba(255,255,255,.08),transparent 35%),
    linear-gradient(135deg,#111827 0%,#000000 55%,#1f2937 100%);
}

.classic-card{
  background:
    radial-gradient(circle at top right,rgba(255,255,255,.18),transparent 35%),
    linear-gradient(135deg,#4338ca 0%,#2563eb 45%,#0f172a 100%);
}

</style>