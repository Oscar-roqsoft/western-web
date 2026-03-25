<template>
  <main class=" max-w-7xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">User Deposit Transactions</h1>

    <!-- Table -->
    <div class="bg-white shadow rounded-lg overflow-x-auto">
      <table class="w-full text-left" v-if="paginatedTransactions.length">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-2">TxID</th>
            <th class="px-4 py-2">User</th>
            <th class="px-4 py-2">Coin</th>
            <th class="px-4 py-2">Amount</th>
            <th class="px-4 py-2">Status</th>
            <th class="px-4 py-2">Date</th>
            <th class="px-4 py-2">Actions</th>
          </tr>
        </thead>

        <tbody >
          <tr
            v-for="tx in paginatedTransactions"
            :key="tx._id"
            class="border-b hover:bg-gray-50 cursor-pointer"
            @click="openModal(tx)"
          >
            <td class="px-4 py-2 font-mono text-sm">{{ tx._id }}</td>
            <td class="px-4 py-2">{{ tx.userId.name }} ({{ tx.userId.email }})</td>
            <td class="px-4 py-2">{{ tx.coin }} ({{ tx.network }})</td>
            <td class="px-4 py-2">{{ tx.amount }}</td>
            <td class="px-4 py-2">
              <span :class="statusClass(tx.status)">{{ tx.status }}</span>
            </td>
            <td class="px-4 py-2">{{ formatDate(tx.createdAt) }}</td>
            <td class="px-4 py-2 flex gap-2">
              <button
                v-if="tx.status === 'pending'"
                @click="openModal(tx._id)"
                class="bg-green-500 text-white px-3 py-1 rounded-lg"
              >Approve</button>
              <button
                v-if="tx.status === 'pending'"
                @click ="openModal(tx._id)"
                class="bg-red-500 text-white px-3 py-1 rounded-lg"
              >Reject</button>
            </td>
          </tr>
        </tbody>
        
        
      </table>

          <!-- EMPTY -->
          <div v-else class="p-6 text-center text-gray-500">
          No transactions found
        </div>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center items-center gap-2 mt-4">
      <button
        :disabled="currentPage === 1"
        @click="currentPage--"
        class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >Prev</button>

      <span>Page {{ currentPage }} of {{ totalPages }}</span>

      <button
        :disabled="currentPage === totalPages"
        @click="currentPage++"
        class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >Next</button>
    </div>

    <!-- Modal -->
    <div
      v-if="selectedTransaction"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <div class="bg-white w-full max-w-lg rounded-xl p-6 shadow-xl relative">
        <button
          class="absolute top-4 right-4 text-gray-500 hover:text-black"
          @click="selectedTransaction = null"
        >✕</button>

        <h2 class="text-xl font-bold mb-4">Transaction Details</h2>

        <div class="space-y-2 text-sm">
          <p><span class="font-semibold">TxID:</span> {{ selectedTransaction._id }}</p>
          <p><span class="font-semibold">User:</span> {{ selectedTransaction.userId?.name }} ({{ selectedTransaction.userId?.email }})</p>
          <p><span class="font-semibold">Coin:</span> {{ selectedTransaction.coin }} ({{ selectedTransaction.network }})</p>
          <p><span class="font-semibold">Amount:</span> {{ selectedTransaction.amount }}</p>
          <p><span class="font-semibold">Status:</span> <span :class="statusClass(selectedTransaction.status)">{{ selectedTransaction.status }}</span></p>
          <p><span class="font-semibold">Date:</span> {{ formatDate(selectedTransaction.createdAt) }}</p>
          <p><span class="font-semibold">Note:</span> {{ selectedTransaction.note || "N/A" }}</p>
        </div>

        <!-- Approve / Reject Buttons -->
        <div class="flex gap-3 mt-6">
          <button
            v-if="selectedTransaction.status === 'pending'"
            @click="approve(selectedTransaction._id);"
            class="flex-1 bg-green-500 text-white py-2 rounded-lg flex items-center justify-center gap-2"
          >
          <span>
            Approve
          </span>
          <Spinner v-if="isApproving"/>
         
        </button>

          <button
            v-if="selectedTransaction.status === 'pending'"
            @click="reject(selectedTransaction._id);"
            class="flex-1 bg-red-500 text-white py-2 rounded-lg flex items-center justify-center gap-2"
          >
          <span>
            Reject
          </span>
          <Spinner v-if="isRejecting"/>
        
        </button>
        </div>
      </div>
    </div>

  </main>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
// import axios from "axios";
import { getAllDeposits,approveDeposit,rejectDeposit } from "@/composables/requests/crypto"
const pinia = useStore()
const notify = useNotify()

const isApproving = ref(false)
const isRejecting = ref(false)

const transactions = computed(() =>pinia.state.allTransaction || []);
const selectedTransaction = ref(null);


// Pagination
const currentPage = ref(1);
const perPage = 10;
const totalPages = computed(() => Math.ceil(transactions.value.length / perPage));
const paginatedTransactions = computed(() =>
  Object.values(transactions.value).slice((currentPage.value - 1) * perPage, currentPage.value * perPage)
);

const fetchDeposits = async () => {
  try {
    const data = await getAllDeposits()
    if(data.success){
      pinia.setallTransaction(data.data.deposits)
    }
  } catch (err) {
    console.error(err);
  }
};

onMounted(async() => {
  if (pinia.state.allTransaction && Object.keys(pinia.state.allTransaction).length > 0)return
   await fetchDeposits()
});

const approve = async (id) => {
  try {
    console.log(id)
    isApproving.value = true
    const data = await approveDeposit(id)
    if(data.success){
      fetchDeposits();
      notify.success(data.message)
      await sendNotification({
          userId:selectedTransaction.value?.userId._id,
          title: "Wallet Funded",
          message: `Your wallet has been credited with ${selectedTransaction.value?.amount} ${selectedTransaction.value?.coin}`,
          type: "deposit"
        });
      closeModal()
    }else{
      notify.error(data.message)
    }
    isApproving.value =  false
  } catch (err) {
    console.error(err);
  }
};

const reject = async (id) => {
  try {
    isRejecting.value = true
    const data = await rejectDeposit(id)
    if(data.success){
      await fetchDeposits();
      notify.success(data.message)
      await sendNotification({
          userId:selectedTransaction.value?.userId._id,
          title: "Wallet Funded",
          message: `your deposit request is rejected , try again`,
          type: "deposit"
        });
      closeModal()
    }else{
      notify.error(data.message)
    }
    isRejecting.value = false
  } catch (err) {
    console.error(err);
  }
};

const openModal = (tx) => selectedTransaction.value = tx;
const closeModal = () => selectedTransaction.value = null;

const formatDate = (d) => new Date(d).toLocaleString();
const statusClass = (status) => {
  return status === 'pending' ? 'text-yellow-500' :
         status === 'approved' ? 'text-green-500' :
         'text-red-500';
};
</script>