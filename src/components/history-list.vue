<template>
    <div>
  
      <!-- TABLE -->
      <div class="overflow-x-auto">
  
        <table class="w-full text-sm">
  
          <thead class="text-left border-b bg-gray-50">
            <tr>
              <th class="p-3">Type</th>
              <th class="p-3">Coin</th>
              <th class="p-3">Amount</th>
              <th class="p-3">Status</th>
              <th class="p-3">Date</th>
            </tr>
          </thead>
  
          <tbody>
  
            <tr
              v-for="tx in transactions.slice(0,8)"
              :key="tx._id"
              class="border-b hover:bg-gray-50 transition"
            >
  
              <!-- TYPE -->
              <td class="p-3">
                <span :class="typeBadge(tx.type)">
                  {{ tx.type }}
                </span>
              </td>
  
              <!-- COIN -->
              <td class="p-3 font-semibold">
                {{ tx.coin }}
              </td>
  
              <!-- AMOUNT -->
              <td class="p-3">
                <span :class="amountColor(tx)">
                  {{ tx.type === "send" ? "-" : "+" }} {{ tx.amount }}
                </span>
              </td>
  
              <!-- STATUS -->
              <td class="p-3">
                <span :class="statusBadge(tx.status)">
                  {{ tx.status || "completed" }}
                </span>
              </td>
  
              <!-- DATE -->
              <td class="p-3 text-gray-500">
                {{ formatDate(tx.createdAt) }}
              </td>
  
            </tr>
  
          </tbody>
  
        </table>
  
      </div>
  
      <!-- EMPTY -->
      <div v-if="!transactions.length" class="text-center py-10 text-gray-400">
        No transactions yet
      </div>
  
      <!-- PAGINATION -->
      <div class="flex justify-between items-center mt-4">
  
        <button
          @click="prevPage"
          :disabled="page === 1"
          class="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
  
        <span class="text-sm text-gray-500">
          Page {{ page }} of {{ pages }}
        </span>
  
        <button
          @click="nextPage"
          :disabled="page === pages"
          class="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
  
      </div>
  
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue"
  
  /* =========================
     STATE
  ========================= */
  const pinia = useStore()
  const transactions = computed(()=> pinia.state.userTransaction || [])
  const page = ref(1)
  const limit = 10
  const pages = ref(1)
  const loading = ref(false)
  
  /* =========================
     FETCH
  ========================= */
  
//   const fetchTransactions = async () => {
//     try {
  
//       loading.value = true
  
//       const res = await $fetch(`/api/transactions?page=${page.value}&limit=${limit}`)
  
//       transactions.value = res.data.transactions
//       pages.value = res.data.pagination.pages
  
//     } catch (err) {
//       console.error(err)
//     }
  
//     loading.value = false
//   }
  
  /* =========================
     PAGINATION
  ========================= */
  
  const nextPage = () => {
    if (page.value < pages.value) {
      page.value++
    //   fetchTransactions()
    }
  }
  
  const prevPage = () => {
    if (page.value > 1) {
      page.value--
    //   fetchTransactions()
    }
  }
  
  /* =========================
     HELPERS
  ========================= */
  
  const formatDate = (date) => {
    return new Date(date).toLocaleString()
  }
  
  const typeBadge = (type) => {
    return {
      deposit: "bg-green-100 text-green-600 px-2 py-1 rounded text-xs",
      send: "bg-red-100 text-red-600 px-2 py-1 rounded text-xs",
      swap: "bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs"
    }[type] || "bg-gray-100 px-2 py-1 rounded text-xs"
  }
  
  const statusBadge = (status) => {
    return {
      pending: "bg-yellow-100 text-yellow-600 px-2 py-1 rounded text-xs",
      approved: "bg-green-100 text-green-600 px-2 py-1 rounded text-xs",
      rejected: "bg-red-100 text-red-600 px-2 py-1 rounded text-xs"
    }[status] || "bg-gray-100 px-2 py-1 rounded text-xs"
  }
  
  const amountColor = (tx) => {
    return tx.type === "send"
      ? "text-red-600 font-semibold"
      : "text-green-600 font-semibold"
  }
  
  /* =========================
     INIT
  ========================= */
  
//   onMounted(fetchTransactions)
  </script>