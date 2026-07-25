<template>
    <main class="max-w-7xl mx-auto ">
  
      <!-- HEADER -->
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-2xl font-bold">Card Requests</h1>
          <p class="text-gray-500 text-sm">
            Manage and approve user card applications
          </p>
        </div>
  
        <select v-model="statusFilter" class="border px-3 py-2 rounded-lg text-sm">
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="active">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
  
      <!-- TABLE -->
      <div class="bg-white rounded-xl shadow overflow-auto">
  
        <table class="w-full text-sm">
          <thead class="bg-gray-50 text-gray-600">
            <tr>
              <th class="p-3 text-left">User</th>
              <th class="p-3 text-left">Card Type</th>
              <th class="p-3 text-left">Limit</th>
              <th class="p-3 text-left">Status</th>
              <th class="p-3 text-left">Date</th>
              <th class="p-3 text-right">Action</th>
            </tr>
          </thead>
  
          <tbody>
  
            <!-- SKELETON -->
            <template v-if="loading">
              <tr v-for="i in 6" :key="i" class="border-t">
                <td class="p-3"><div class="skeleton h-4 w-32 mb-2"></div></td>
                <td class="p-3"><div class="skeleton h-4 w-16"></div></td>
                <td class="p-3"><div class="skeleton h-4 w-20"></div></td>
                <td class="p-3"><div class="skeleton h-5 w-20 rounded-full"></div></td>
                <td class="p-3"><div class="skeleton h-3 w-24"></div></td>
                <td class="p-3">
                  <div class="flex gap-2 justify-end">
                    <div class="skeleton h-7 w-16"></div>
                    <div class="skeleton h-7 w-16"></div>
                  </div>
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
  
                <td class="p-3">
                  <p class="font-semibold">{{ card.userId?.name }}</p>
                  <p class="text-xs text-gray-400">{{ card.userId?.email }}</p>
                </td>
  
                <td class="p-3 uppercase">{{ card.cardType }}</td>
  
                <td class="p-3">${{ card.cardLimit }}</td>
  
                <td class="p-3">
                  <span :class="statusClass(card.status)">
                    {{ card.status }}
                  </span>
                </td>
  
                <td class="p-3 text-xs text-gray-500">
                  {{ formatDate(card.createdAt) }}
                </td>
  
                <td class="p-3 text-right">
                  <div class="flex justify-end gap-2">
  
                    <button @click="viewCard(card)" class="btn-outline">
                      View
                    </button>
  
                    <button
                      v-if="card.status === 'pending'"
                      @click="openAction(card,'approve')"
                      class="btn-success flex items-center gap-1"
                    >
                      <span v-if="!rowLoading[card._id]">Approve</span>
                      <Spinner v-else />
                    </button>
  
                    <button
                      v-if="card.status === 'pending'"
                      @click="openAction(card,'reject')"
                      class="btn-danger flex items-center gap-1"
                    >
                      <span v-if="!rowLoading[card._id]">Reject</span>
                      <Spinner v-else />
                    </button>
  
                  </div>
                </td>
  
              </tr>
            </template>
  
          </tbody>
        </table>
  
      </div>
  
      <!-- PAGINATION -->
      <div class="flex justify-between items-center mt-4">
        <button
          @click="page--"
          :disabled="page === 1"
          class="px-4 py-2 border rounded-lg disabled:opacity-40"
        >
          Prev
        </button>
  
        <span class="text-sm">
          Page {{ page }} of {{ totalPages }}
        </span>
  
        <button
          @click="page++"
          :disabled="page === totalPages"
          class="px-4 py-2 border rounded-lg disabled:opacity-40"
        >
          Next
        </button>
      </div>
  
      <!-- VIEW MODAL -->
      <div v-if="selectedCard" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
  
        <div class="bg-white w-full max-w-md rounded-xl p-6">
  
          <h2 class="font-bold text-lg mb-4">Card Details</h2>
  
          <div class="space-y-2 text-sm">
            <p><b>Name:</b> {{ selectedCard.userId?.name }}</p>
            <p><b>Email:</b> {{ selectedCard.userId?.email }}</p>
            <p><b>Type:</b> {{ selectedCard.cardType }}</p>
            <p><b>Limit:</b> ${{ selectedCard.cardLimit }}</p>
            <p><b>Address:</b> {{ selectedCard.address }}</p>
          </div>
  
          <button
            @click="selectedCard = null"
            class="mt-4 w-full bg-gray-800 text-white py-2 rounded-lg"
          >
            Close
          </button>
  
        </div>
  
      </div>
  
      <!-- ACTION MODAL -->
      <div v-if="actionModal" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
  
        <div class="bg-white w-full max-w-sm rounded-xl p-6 text-center">
  
          <h2 class="font-bold text-lg mb-2">
            Confirm {{ actionType }}
          </h2>
  
          <p class="text-gray-500 text-sm mb-4">
            Are you sure you want to {{ actionType }} this card request?
          </p>
  
          <div class="flex gap-3">
  
            <button
              @click="actionModal = false"
              class="flex-1 border py-2 rounded-lg"
            >
              Cancel
            </button>
  
            <button
              @click="confirmAction"
              class="flex-1 bg-indigo-600 text-white py-2 rounded-lg"
            >
              Yes, Continue
            </button>
  
          </div>
  
        </div>
  
      </div>
  
    </main>
  </template>
  
  <script setup>
  import { ref } from "vue"
  import { fetchAllUserCards } from "@/composables/actions/index"
  import { approveCard ,blockCard} from "@/composables/requests/card"
  
  const pinia = useStore()
  const notify = useNotify()
  
  const loading = ref(false)
  
  const cards = computed(() => pinia.state.allCardDetails || [])
  
  const page = ref(1)
  const totalPages = ref(1)
  const statusFilter = ref("")
  
  const selectedCard = ref(null)
  
  const actionModal = ref(false)
  const actionType = ref("")
  const activeCard = ref(null)
  
  const rowLoading = ref({})
  
  const fetchCards = async () => {
    loading.value = true
    try {
      await fetchAllUserCards()
    } catch (err) {
      console.error(err)
    }
    loading.value = false
  }
  
  onMounted(async()=>{
    if (pinia.state.allCardDetails.length){
      pinia.state.allCardDetails 
    }else{
      await fetchCards()
    }
  })
  watch([page, statusFilter], fetchCards)
  
  const openAction = (card, type) => {
    activeCard.value = card
    actionType.value = type
    actionModal.value = true
  }
  
  const confirmAction = async () => {
    const id = activeCard.value._id
    rowLoading.value[id] = true
  
    try {
      let res
  
      if (actionType.value === "approve") {
        res = await approveCard({cardId:id})
        if(res.success){
          await Notification.create({
            userId: activeCard.value.userId._id,
            title: "Card Approved",
            message: "Your card request has been approved 🎉",
            type: "card"
          });
        }
      } else {
        res = await blockCard({cardId:id})
      }
  
      if (res.success) {
        notify.success(res.message)
        fetchCards()
      } else {
        notify.error(res.message)
      }
  
    } catch (e) {
      notify.error("Error occurred")
    }
  
    rowLoading.value[id] = false
    actionModal.value = false
  }
  
  const viewCard = (card) => {
    selectedCard.value = card
  }
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString()
  }
  
  const statusClass = (status) => {
    return {
      "px-2 py-1 rounded text-xs font-semibold": true,
      "bg-yellow-100 text-yellow-700": status === "pending",
      "bg-green-100 text-green-700": status === "active",
      "bg-red-100 text-red-700": status === "rejected"
    }
  }
  </script>
  
  <style scoped>
  .btn-outline {
    @apply border px-3 py-1 rounded-lg text-xs hover:bg-gray-100;
  }
  .btn-success {
    @apply bg-green-600 text-white px-3 py-1 rounded-lg text-xs;
  }
  .btn-danger {
    @apply bg-red-600 text-white px-3 py-1 rounded-lg text-xs;
  }
  
  .skeleton {
    position: relative;
    overflow: hidden;
    background: #e5e7eb;
    border-radius: 6px;
  }
  
  .skeleton::after {
    content: "";
    position: absolute;
    inset: 0;
    transform: translateX(-100%);
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
    animation: shimmer 1.2s infinite;
  }
  
  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
  </style>