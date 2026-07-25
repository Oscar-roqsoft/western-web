<template>

  <main class="max-w-7xl mx-auto p-4">
  
  
  <!-- =========================
  HEADER
  ========================= -->
  
  <section class="mb-6">
  
  <div class="flex justify-between items-center">
  
  
  <div>
  
  <h1 class="text-2xl font-bold">
  Card Requests
  </h1>
  
  <p class="text-gray-500 text-sm">
  Review, approve or reject user card applications
  </p>
  
  </div>
  
  
  
  <select
  v-model="statusFilter"
  class="border rounded-xl px-4 py-2 text-sm"
  >
  
  <option value="">
  All Status
  </option>
  
  <option value="pending">
  Pending
  </option>
  
  <option value="active">
  Approved
  </option>
  
  <option value="rejected">
  Rejected
  </option>
  
  </select>
  
  
  </div>
  
  
  </section>
  
  
  
  
  <!-- =========================
  TABLE
  ========================= -->
  
  
  <div class="bg-white rounded-2xl shadow overflow-auto">
  
  
  <table class="w-full text-sm">
  
  
  <thead class="bg-gray-50">
  
  <tr>
  
  <th class="p-4 text-left">
  User
  </th>
  
  <th class="p-4">
  Card
  </th>
  
  
  <th class="p-4">
  Limit
  </th>
  
  
  <th class="p-4">
  Status
  </th>
  
  
  <th class="p-4">
  Date
  </th>
  
  
  <th class="p-4 text-right">
  Action
  </th>
  
  
  </tr>
  
  </thead>
  
  
  
  <tbody>
  
  
  
  <!-- LOADING -->
  
  <template v-if="loading">
  
  
  <tr
  v-for="i in 5"
  :key="i"
  class="border-t"
  >
  
  <td colspan="6" class="p-4">
  
  <div class="skeleton h-8"></div>
  
  </td>
  
  
  </tr>
  
  
  </template>
  
  
  
  
  
  
  <!-- DATA -->
  
  <template v-else>
  
  
  <tr
  v-for="card in cards"
  :key="card._id"
  class="border-t hover:bg-gray-50"
  >
  
  
  <!-- USER -->
  
  <td class="p-4">
  
  <p class="font-semibold">
  {{card.fullname || card.userId?.name}}
  </p>
  
  
  <p class="text-xs text-gray-400">
  {{card.userId?.email}}
  </p>
  
  
  <p class="text-xs text-gray-400">
  {{card.phoneNumber}}
  </p>
  
  
  </td>
  
  
  
  
  
  <!-- CARD TYPE -->
  
  <td class="p-4 uppercase font-semibold">
  
  {{card.cardType}}
  
  </td>
  
  
  
  
  
  
  <!-- LIMIT -->
  
  
  <td class="p-4">
  
  ${{formatMoney(card.cardLimit)}}
  
  </td>
  
  
  
  
  
  <!-- STATUS -->
  
  <td class="p-4">
  
  
  <span
  class="px-3 py-1 rounded-full text-xs font-semibold capitalize"
  :class="statusClass(card.status)"
  >
  
  {{card.status}}
  
  </span>
  
  
  </td>
  
  
  
  
  
  <!-- DATE -->
  
  
  <td class="p-4 text-xs text-gray-500">
  
  {{formatDate(card.createdAt)}}
  
  </td>
  
  
  
  
  
  
  <!-- ACTIONS -->
  
  
  <td class="p-4">
  
  
  <div class="flex justify-end gap-2">
  
  
  <button
  @click="viewCard(card)"
  class="btn-outline"
  >
  
  View
  
  </button>
  
  
  
  
  <button
  
  v-if="card.status==='pending'"
  
  @click="openAction(card,'approve')"
  
  class="btn-success"
  >
  
  
  <span v-if="!rowLoading[card._id]">
  Approve
  </span>
  
  
  <span v-else>
  ...
  </span>
  
  
  </button>
  
  
  
  
  
  <button
  
  v-if="card.status==='pending'"
  
  @click="openAction(card,'reject')"
  
  class="btn-danger"
  >
  
  Reject
  
  </button>
  
  
  
  
  <button
  
  v-if="card.status==='active'"
  
  @click="openAction(card,'block')"
  
  class="btn-danger"
  >
  
  Block
  
  </button>
  
  
  
  </div>
  
  
  </td>
  
  
  </tr>
  
  
  
  </template>
  
  
  </tbody>
  
  
  </table>
  
  
  
  </div>
  
  
  
  
  
  
  
  <!-- =========================
  EMPTY STATE
  ========================= -->
  
  <div
  v-if="!loading && pinia.state.allCardDetails == null"
  
  class="text-center py-16"
  >
  
  
  <p class="text-gray-400">
  No card requests found
  </p>
  
  
  </div>
  
  
  
  
  
  <!-- =========================
  VIEW MODAL
  ========================= -->
  
  
  <div
  
  v-if="selectedCard"
  
  class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
  
  >
  
  
  <div class="bg-white rounded-2xl p-6 w-full max-w-md">
  
  
  <div class="flex justify-between mb-5">
  
  
  <h2 class="font-bold text-lg">
  Card Details
  </h2>
  
  
  <button
  @click="selectedCard=null"
  >
  ✕
  </button>
  
  
  </div>
  
  
  
  
  
  <div class="space-y-3 text-sm">
  
  
  <p>
  <b>Name:</b>
  {{selectedCard.fullname}}
  </p>
  
  
  <p>
  <b>Email:</b>
  {{selectedCard.userId?.email}}
  </p>
  
  
  
  <p>
  <b>Phone:</b>
  {{selectedCard.phoneNumber}}
  </p>
  
  
  
  <p>
  <b>Card Type:</b>
  {{selectedCard.cardType}}
  </p>
  
  
  
  <p>
  <b>Limit:</b>
  ${{formatMoney(selectedCard.cardLimit)}}
  </p>
  
  
  
  <p>
  <b>Status:</b>
  
  <span
  class="ml-2 px-2 py-1 rounded-full"
  :class="statusClass(selectedCard.status)"
  >
  
  {{selectedCard.status}}
  
  </span>
  
  
  </p>
  
  
  
  
  
  <p>
  <b>Address:</b>
  
  {{selectedCard.address}}
  
  </p>
  
  
  
  
  
  <div
  
  v-if="selectedCard.status==='rejected'"
  
  class="bg-red-50 text-red-600 p-3 rounded-xl"
  
  >
  
  <b>
  Rejection Reason:
  </b>
  
  <br>
  
  {{selectedCard.rejectionReason}}
  
  </div>
  
  
  
  </div>
  
  
  
  <button
  
  @click="selectedCard=null"
  
  class="mt-6 w-full bg-gray-900 text-white py-3 rounded-xl"
  
  >
  
  Close
  
  </button>
  
  
  
  </div>
  
  
  </div>
  
  
  
  
  
  <!-- =========================
  ACTION MODAL
  ========================= -->
  
  
  <div
  
  v-if="actionModal"
  
  class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
  
  >
  
  
  <div class="bg-white rounded-2xl p-6 max-w-sm w-full">
  
  
  <h2 class="font-bold text-lg">
  
  Confirm {{actionType}}
  
  </h2>
  
  
  
  <p class="text-gray-500 text-sm my-4">
  
  Are you sure you want to
  {{actionType}}
  this card?
  
  </p>
  
  
  
  
  <textarea
  
  v-if="actionType==='reject'"
  
  v-model="rejectionReason"
  
  placeholder="Reason for rejection"
  
  class="w-full border rounded-xl p-3 mb-4"
  
  ></textarea>
  
  
  
  
  <div class="flex gap-3">
  
  
  <button
  
  @click="actionModal=false"
  
  class="flex-1 border rounded-xl py-2"
  
  >
  
  Cancel
  
  </button>
  
  
  
  <button
  
  @click="confirmAction"
  
  class="flex-1 bg-indigo-600 text-white rounded-xl py-2"
  
  >
  
  Continue
  
  </button>
  
  
  </div>
  
  
  
  </div>
  
  
  
  </div>
  
  
  </main>
  
  
</template>

<script setup>

    import {
      ref,
      computed,
      watch,
      onMounted
    } from "vue"


    import {
      fetchAllUserCards
    } from "@/composables/actions/index"


    import {
      approveCard,
      blockCard,
      rejectCard
    } from "@/composables/requests/card"



    const pinia = useStore()

    const notify = useNotify()



    /*
    |--------------------------------------------------------------------------
    | DATA
    |--------------------------------------------------------------------------
    */


    // loading table state
    const loading = ref(false)


    // prevent multiple clicks on same row
    const rowLoading = ref({})


    // all cards from store
    const cards = computed(()=>{

      return pinia.state.allCardDetails || []

    })



    // pagination
    const page = ref(1)

    const totalPages = ref(1)



    // filter
    const statusFilter = ref("")




    // selected card for view modal
    const selectedCard = ref(null)



    /*
    |--------------------------------------------------------------------------
    | ACTION MODAL
    |--------------------------------------------------------------------------
    */


    const actionModal = ref(false)


    // approve | reject | block
    const actionType = ref("")


    // card selected for action
    const activeCard = ref(null)



    // rejection reason
    const rejectionReason = ref("")



    /*
    |--------------------------------------------------------------------------
    | FETCH CARD REQUESTS
    |--------------------------------------------------------------------------
    */


    const fetchCards = async()=>{


      loading.value = true


      try{


        const res = await fetchAllUserCards({

          page: page.value,

          status: statusFilter.value

        })


        /*
          If your backend returns pagination
          update total pages here
        */

        if(res?.totalPages){

          totalPages.value = res.totalPages

        }


      }catch(error){


        console.error(
          "Fetch cards error:",
          error
        )


        notify.error(
          error.message || "Failed loading cards"
        )


      }finally{


        loading.value = false


      }


    }





    /*
    |--------------------------------------------------------------------------
    | INITIAL LOAD
    |--------------------------------------------------------------------------
    */


    onMounted(async()=>{


      await fetchCards()


    })





    /*
    |--------------------------------------------------------------------------
    | WATCH FILTER / PAGE CHANGE
    |--------------------------------------------------------------------------
    */


    watch(

    [
    page,
    statusFilter
    ],

    ()=>{

      fetchCards()

    }

    )





    /*
    |--------------------------------------------------------------------------
    | OPEN ACTION MODAL
    |--------------------------------------------------------------------------
    */


    const openAction=(card,type)=>{


      activeCard.value = card


      actionType.value = type


      actionModal.value = true


    }







    /*
    |--------------------------------------------------------------------------
    | CONFIRM ACTION
    |--------------------------------------------------------------------------
    */


    const confirmAction = async()=>{


      const cardId = activeCard.value?._id



      if(!cardId){

        return

      }



      rowLoading.value[cardId] = true



      try{


        let res



        /*
        ==========================
        APPROVE CARD
        ==========================
        */


        if(actionType.value === "approve"){


          res = await approveCard({

            cardId

          })


        }





        /*
        ==========================
        REJECT CARD
        ==========================
        */


        else if(actionType.value === "reject"){



          if(!rejectionReason.value.trim()){


            notify.error(
              "Please enter rejection reason"
            )


            return


          }



          res = await rejectCard({

            cardId,

            reason: rejectionReason.value

          })



        }





        /*
        ==========================
        BLOCK CARD
        ==========================
        */


        else if(actionType.value === "block"){



          res = await blockCard({

            cardId

          })



        }





        if(res?.success){


          notify.success(
            res.message
          )


          await fetchCards()



        }else{


          notify.error(
            res?.message || "Action failed"
          )


        }




      }catch(error){


        console.error(error)


        notify.error(

          error.message ||
          "Something went wrong"

        )


      }finally{


        rowLoading.value[cardId] = false


        actionModal.value = false


        activeCard.value = null


        actionType.value = ""


        rejectionReason.value = ""


      }


    }







    /*
    |--------------------------------------------------------------------------
    | VIEW CARD DETAILS
    |--------------------------------------------------------------------------
    */


    const viewCard=(card)=>{


      selectedCard.value = card


    }







    /*
    |--------------------------------------------------------------------------
    | DATE FORMAT
    |--------------------------------------------------------------------------
    */


    const formatDate=(date)=>{


      if(!date){

        return "--"

      }



      return new Date(date)
      .toLocaleDateString(
        "en-GB",
        {

          day:"2-digit",

          month:"short",

          year:"numeric"

        }
      )


    }







    /*
    |--------------------------------------------------------------------------
    | MONEY FORMAT
    |--------------------------------------------------------------------------
    */


    const formatMoney=(value)=>{


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
    | STATUS COLORS
    |--------------------------------------------------------------------------
    */


    const statusClass=(status)=>{


      return {


        "bg-yellow-100 text-yellow-700":
        status === "pending",



        "bg-green-100 text-green-700":
        status === "active",



        "bg-red-100 text-red-700":
        status === "rejected",



        "bg-gray-100 text-gray-700":
        status === "blocked"


      }


    }



</script>


<style scoped>


.btn-outline{

@apply border px-3 py-1 rounded-lg text-xs hover:bg-gray-100 transition;

}



.btn-success{

@apply bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-xs transition;

}



.btn-danger{

@apply bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-xs transition;

}




.skeleton{

position:relative;

overflow:hidden;

background:#e5e7eb;

border-radius:8px;

}



.skeleton::after{


content:"";


position:absolute;


inset:0;


background:
linear-gradient(
90deg,
transparent,
rgba(255,255,255,.6),
transparent
);


animation:
shimmer 1.2s infinite;


}



@keyframes shimmer{


100%{

transform:translateX(100%);

}


}



</style>