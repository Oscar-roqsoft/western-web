<template>
  <div>
    <!-- TABLE -->
    <div class="overflow-x-auto rounded-xl border">
      <table class="w-full text-sm">
        <thead class="bg-gray-50 border-b">
          <tr>
            <th class="p-4 text-left">Type</th>
            <th class="p-4 text-left">Coin</th>
            <th class="p-4 text-left">Amount</th>
            <th class="p-4 text-left">Status</th>
            <th class="p-4 text-left">Date</th>
            <th class="p-4 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="tx in displayedTransactions"
            :key="tx._id"
            class="border-b last:border-b-0 hover:bg-gray-50 transition"
          >
            <!-- TYPE -->
            <td class="p-4">
              <span :class="typeBadge(tx.type)">
                {{ capitalize(tx.type) }}
              </span>
            </td>

            <!-- COIN -->
            <td class="p-4 font-semibold">
              {{ tx.coin }}
            </td>

            <!-- AMOUNT -->
            <td class="p-4">
              <span :class="amountColor(tx)">
                {{ amountPrefix(tx.type) }}
                {{ Number(tx.amount).toLocaleString() }}
              </span>
            </td>

            <!-- STATUS -->
            <td class="p-4">
              <span :class="statusBadge(tx.status)">
                {{ capitalize(tx.status || "pending") }}
              </span>
            </td>

            <!-- DATE -->
            <td class="p-4 text-gray-500">
              {{ formatDate(tx.createdAt) }}
            </td>

            <!-- ACTION -->
            <td class="p-4 text-center">
              <button
                @click="viewTransaction(tx)"
                class="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
              >
                View
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- EMPTY -->
    <div
      v-if="!transactions.length"
      class="py-10 text-center text-gray-400"
    >
      No transactions found.
    </div>

    <!-- PAGINATION -->
    <div
      v-if="!slice && transactions.length"
      class="flex items-center justify-between mt-5"
    >
      <button
        @click="prevPage"
        :disabled="page === 1"
        class="px-4 py-2 border rounded-lg disabled:opacity-40"
      >
        Previous
      </button>

      <span class="text-sm text-gray-500">
        Page {{ page }} of {{ pages }}
      </span>

      <button
        @click="nextPage"
        :disabled="page === pages"
        class="px-4 py-2 border rounded-lg disabled:opacity-40"
      >
        Next
      </button>
    </div>
    <!-- ==========================
      Transaction Details Modal
      ========================== -->
  
      <div class="mx-4">
  
        <n-modal
            v-model:show="showModal"
            preset="card"
            style="max-width:350px;border-radius:20px;"
            :bordered="false"
        >
    
            <template #header>
    
                <div class="flex items-center gap-3">
    
                    <div
                        class="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center"
                    >
    
                        {{ selectedTransaction?.coin }}
    
                    </div>
    
                    <div>
    
                        <h2 class="text-xl font-bold">
    
                            Transaction Details
    
                        </h2>
    
                        <p class="text-gray-500 text-sm">
    
                            {{ capitalize(selectedTransaction?.type) }}
    
                        </p>
    
                    </div>
    
                </div>
    
            </template>
    
            <div
                v-if="selectedTransaction"
                class="space-y-4"
            >
    
                <div
                    class="grid grid-cols-2 gap-4"
                >
    
                    <div class="border rounded-xl p-4">
    
                        <p class="text-gray-500 text-sm">
                            Coin
                        </p>
    
                        <h3 class="font-semibold mt-1">
                            {{ selectedTransaction.coin }}
                        </h3>
    
                    </div>
    
                    <div class="border rounded-xl p-4">
    
                        <p class="text-gray-500 text-sm">
                            Amount
                        </p>
    
                        <h3
                            :class="amountColor(selectedTransaction)"
                        >
                            {{ amountPrefix(selectedTransaction.type) }}
                            {{ selectedTransaction.amount }}
                        </h3>
    
                    </div>
    
                </div>
    
                <div
                    class="grid grid-cols-2 gap-4"
                >
    
                    <div class="border rounded-xl p-4">
    
                        <p class="text-gray-500 text-sm">
                            Status
                        </p>
    
                        <span
                            :class="statusBadge(selectedTransaction.status)"
                        >
    
                            {{ capitalize(selectedTransaction.status) }}
    
                        </span>
    
                    </div>
    
                    <div class="border rounded-xl p-4">
    
                        <p class="text-gray-500 text-sm">
                            Network
                        </p>
    
                        <h3 class="font-semibold">
    
                            {{ selectedTransaction.network || "--" }}
    
                        </h3>
    
                    </div>
    
                </div>
    
                <div
                    class="border rounded-xl p-4"
                >
    
                    <p class="text-gray-500 text-sm">
    
                        Wallet Address
    
                    </p>
    
                    <p
                        class="break-all mt-2 font-medium"
                    >
    
                        {{ selectedTransaction.walletAddress ||
                          selectedTransaction.recipientAddress ||
                          "--" }}
    
                    </p>
    
                </div>
    
                <div
                    class="border rounded-xl p-4"
                >
    
                    <p class="text-gray-500 text-sm">
    
                        Transaction Reference
    
                    </p>
    
                    <p class="font-medium mt-2 break-all">
    
                        {{ selectedTransaction.reference ||
                          selectedTransaction.txHash ||
                          "--" }}
    
                    </p>
    
                </div>
    
                <div
                    class="grid grid-cols-2 gap-4"
                >
    
                    <div class="border rounded-xl p-4">
    
                        <p class="text-gray-500 text-sm">
    
                            Fee
    
                        </p>
    
                        <h3 class="font-semibold">
    
                            {{ selectedTransaction.fee ?? "--" }}
    
                        </h3>
    
                    </div>
    
                    <div class="border rounded-xl p-4">
    
                        <p class="text-gray-500 text-sm">
    
                            Date
    
                        </p>
    
                        <h3 class="font-semibold">
    
                            {{ formatDate(selectedTransaction.createdAt) }}
    
                        </h3>
    
                    </div>
    
                </div>
    
            </div>
    
            <template #footer>
    
                <div class="flex justify-end">
    
                    <button
                        @click="closeModal"
                        class="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
                    >
    
                        Close
    
                    </button>
    
                </div>
    
            </template>
    
        </n-modal>
      </div>
  </div>

</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "@/stores";
import { NModal } from "naive-ui";

const props = defineProps({
  slice: {
    type: Number,
    default: null
  }
});

const emit = defineEmits(["view"]);

const pinia = useStore();

const transactions = computed(
  () => pinia.state.userTransaction || []
);

/*
|--------------------------------------------------------------------------
| Pagination
|--------------------------------------------------------------------------
*/

const page = ref(1);

const perPage = 10;

const pages = computed(() =>
  Math.max(1, Math.ceil(transactions.value.length / perPage))
);

const displayedTransactions = computed(() => {

  if (props.slice) {
    return transactions.value.slice(0, props.slice);
  }

  const start = (page.value - 1) * perPage;

  return transactions.value.slice(start, start + perPage);

});

const nextPage = () => {

  if (page.value < pages.value) {
    page.value++;
  }

};

const prevPage = () => {

  if (page.value > 1) {
    page.value--;
  }

};

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

const capitalize = (text = "") => {

  if (!text) return "--";

  return text.charAt(0).toUpperCase() + text.slice(1);

};

const formatDate = (date) => {

  if (!date) return "--";

  return new Date(date).toLocaleString();

};

const amountPrefix = (type) => {

  return [
    "send",
    "withdrawal",
    "sell"
  ].includes(type)
    ? "-"
    : "+";

};

const amountColor = (tx) => {

  return [
    "send",
    "withdrawal",
    "sell"
  ].includes(tx.type)
    ? "text-red-600 font-semibold"
    : "text-green-600 font-semibold";

};

const typeBadge = (type = "") => {

  const styles = {

    deposit:
      "bg-green-100 text-green-700",

    withdrawal:
      "bg-orange-100 text-orange-700",

    send:
      "bg-red-100 text-red-700",

    receive:
      "bg-emerald-100 text-emerald-700",

    swap:
      "bg-blue-100 text-blue-700",

    buy:
      "bg-indigo-100 text-indigo-700",

    sell:
      "bg-purple-100 text-purple-700"

  };

  return `${styles[type] || "bg-gray-100 text-gray-700"} px-3 py-1 rounded-full text-xs font-semibold`;

};

const statusBadge = (status = "") => {

  const styles = {

    pending:
      "bg-yellow-100 text-yellow-700",

    approved:
      "bg-green-100 text-green-700",

    completed:
      "bg-green-100 text-green-700",

    success:
      "bg-green-100 text-green-700",

    rejected:
      "bg-red-100 text-red-700",

    failed:
      "bg-red-100 text-red-700",

    cancelled:
      "bg-gray-100 text-gray-700"

  };

  return `${styles[status] || "bg-gray-100 text-gray-700"} px-3 py-1 rounded-full text-xs font-semibold`;

};

/*
|--------------------------------------------------------------------------
| View Transaction
|--------------------------------------------------------------------------
*/

const showModal = ref(false);

const selectedTransaction = ref(null);

const viewTransaction = (transaction) => {

  selectedTransaction.value = transaction;

  showModal.value = true;

};

const closeModal = () => {

  showModal.value = false;

  selectedTransaction.value = null;

};
</script>