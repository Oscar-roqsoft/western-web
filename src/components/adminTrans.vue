<template>
    <main class="max-w-7xl mx-auto">
    
    <h1 class="text-2xl font-bold mb-6">
      User Transactions
    </h1>
    
    
    <!-- FILTER -->
    
    <div class="bg-white rounded-xl shadow p-4 mb-5 flex flex-wrap gap-4">
    
    <select
    v-model="filterType"
    class="border rounded-lg px-4 py-2"
    >
    
    <option value="">
    All Transactions
    </option>
    
    <option value="deposit">
    Deposits
    </option>
    
    <option value="withdrawal">
    Withdrawals
    </option>
    
    <option value="swap">
    Swaps
    </option>
    
    <option value="send">
    Send
    </option>
    
    </select>
    
    
    <input
    v-model="search"
    placeholder="Search coin/user..."
    class="border rounded-lg px-4 py-2 flex-1"
    />
    
    
    </div>
    
    
    
    
    <!-- TABLE -->
    
    
    <div class="bg-white rounded-xl shadow overflow-x-auto">
    
    
    <table class="w-full">
    
    <thead class="bg-gray-100">
    
    <tr>
    
    <th class="p-3 text-left">
    Type
    </th>
    
    <th class="p-3 text-left">
    User
    </th>
    
    
    <th class="p-3 text-left">
    Coin
    </th>
    
    
    <th class="p-3 text-left">
    Amount
    </th>
    
    
    <th class="p-3 text-left">
    Status
    </th>
    
    
    <th class="p-3 text-left">
    Date
    </th>
    
    
    <th>
    Action
    </th>
    
    
    </tr>
    
    </thead>
    
    
    
    <tbody>
    
    
    <tr
    v-for="tx in paginatedTransactions"
    :key="tx._id"
    class="border-b hover:bg-gray-50 cursor-pointer"
    @click="openModal(tx)"
    >
    
    
    <td class="p-3">
    
    
    <span
    class="px-3 py-1 rounded-full text-xs"
    :class="typeClass(tx.type)"
    >
    
    {{tx.type}}
    
    </span>
    
    
    </td>
    
    
    
    <td class="p-3">
    
    {{tx.userId?.name}}
    
    <br>
    
    <small>
    {{tx.userId?.email}}
    </small>
    
    
    </td>
    
    
    
    
    <td class="p-3">
    
    {{tx.coin}}
    
    <br>
    
    <small>
    {{tx.network}}
    </small>
    
    </td>
    
    
    
    <td class="p-3">
    
    {{tx.amount}}
    
    </td>
    
    
    
    
    <td class="p-3">
    
    <span
    :class="statusClass(tx.status)"
    >
    
    {{tx.status}}
    
    </span>
    
    </td>
    
    
    
    
    <td class="p-3">
    
    {{formatDate(tx.createdAt)}}
    
    </td>
    
    
    
    <td class="p-3">
    
    <button
    v-if="tx.status==='pending'"
    @click.stop="approve(tx)"
    class="bg-green-500 text-white px-3 py-1 rounded-lg"
    >
    
    Approve
    
    </button>
    
    
    <button
    v-if="tx.status==='pending'"
    @click.stop="reject(tx)"
    class="bg-red-500 text-white px-3 py-1 rounded-lg ml-2"
    >
    
    Reject
    
    </button>
    
    
    </td>
    
    
    
    </tr>
    
    
    
    </tbody>
    
    
    </table>
    
    
    
    <div
    v-if="!paginatedTransactions.length"
    class="p-6 text-center text-gray-500"
    >
    
    No transactions found
    
    </div>
    
    
    </div>
    
    
    
    
    
    <!-- PAGINATION -->
    
    <div class="flex justify-center gap-4 mt-5">
    
    
    <button
    @click="currentPage--"
    :disabled="currentPage===1"
    class="px-4 py-2 bg-gray-200 rounded"
    >
    
    Prev
    
    </button>
    
    
    <span>
    {{currentPage}} / {{totalPages}}
    </span>
    
    
    <button
    @click="currentPage++"
    :disabled="currentPage===totalPages"
    class="px-4 py-2 bg-gray-200 rounded"
    >
    
    Next
    
    </button>
    
    
    </div>
    
    
    
    
    
    
    <!-- MODAL -->
    
    
    <div
    v-if="selectedTransaction"
    class="fixed inset-0 bg-black/50 flex items-center justify-center p-5"
    >
    
    
    <div class="bg-white rounded-xl p-6 max-w-lg w-full">
    
    
    <button
    @click="selectedTransaction=null"
    class="float-right text-xl"
    >
    ×
    </button>
    
    
    
    <h2 class="text-xl font-bold mb-5">
    
    Transaction Details
    
    </h2>
    
    
    
    <p>
    Type:
    <b>
    {{selectedTransaction.type}}
    </b>
    </p>
    
    
    <p>
    Coin:
    <b>
    {{selectedTransaction.coin}}
    </b>
    </p>
    
    
    <p>
    Amount:
    <b>
    {{selectedTransaction.amount}}
    </b>
    </p>
    
    
    <p>
    Network:
    <b>
    {{selectedTransaction.network}}
    </b>
    </p>
    
    
    <p>
    Status:
    <b>
    {{selectedTransaction.status}}
    </b>
    </p>
    
    
    </div>
    
    
    </div>
    
    
    </main>
 </template>
  <script setup>

  import {ref,computed,onMounted} from "vue";
  
  import {
  getUserTransactions,
  approveDeposit,
  rejectDeposit
  }
  from "@/composables/requests/crypto";
  
  
  import {
  approveWithdrawal,
  rejectWithdrawal
  }
  from "@/composables/requests/withdrawal";
  
  
  const pinia = useStore();
  
  const notify = useNotify();
  
  
  
  const filterType = ref("");
  
  const search = ref("");
  
  const currentPage = ref(1);
  
  const perPage = 10;
  
  
  const selectedTransaction = ref(null);
  
  
  
  const transactions = computed(()=>{
  
  return pinia.state.allTransaction || [];
  
  });
  
  
  
  
  
  /*
  FILTER
  */
  
  
  const filteredTransactions = computed(()=>{
  
  
  return transactions.value.filter(tx=>{
  
  
  const matchType =
  !filterType.value ||
  tx.type === filterType.value;
  
  
  
  const keyword =
  search.value.toLowerCase();
  
  
  
  const matchSearch =
  !keyword ||
  
  tx.coin?.toLowerCase().includes(keyword)
  
  ||
  
  tx.userId?.name?.toLowerCase().includes(keyword)
  
  ||
  
  tx.type?.toLowerCase().includes(keyword);
  
  
  
  return matchType && matchSearch;
  
  
  
  });
  
  
  });
  
  
  
  
  
  /*
  PAGINATION
  */
  
  
  const totalPages = computed(()=>{
  
  
  return Math.ceil(
  filteredTransactions.value.length / perPage
  )||1;
  
  
  });
  
  
  
  
  const paginatedTransactions = computed(()=>{
  
  
  const start =
  (currentPage.value-1)*perPage;
  
  
  return filteredTransactions.value.slice(
  start,
  start+perPage
  );
  
  
  });
  
  
  
  
  
  
  /*
  FETCH
  */
  
  
  const fetchTransactions = async()=>{
  
  
  const res = await getUserTransactions();
  
  
  if(res.success){
  
  pinia.setallTransaction(
  res.data.transactions
  );
  
  
  }
  
  
  };
  
  
  
  
  
  
  /*
  APPROVE
  */
  
  
  const approve = async(tx)=>{
  
  
  let res;
  
  
  if(tx.type==="deposit"){
  
  res =
  await approveDeposit(tx._id);
  
  
  }
  
  
  
  if(tx.type==="withdrawal"){
  
  res =
  await approveWithdrawal(tx._id);
  
  }
  
  
  
  
  if(res.success){
  
  notify.success(res.message);
  
  fetchTransactions();
  
  
  }else{
  
  notify.error(res.message);
  
  }
  
  
  
  };
  
  
  
  
  
  
  
  /*
  REJECT
  */
  
  
  const reject = async(tx)=>{
  
  
  let res;
  
  
  
  if(tx.type==="deposit"){
  
  res =
  await rejectDeposit(tx._id);
  
  
  }
  
  
  
  
  if(tx.type==="withdrawal"){
  
  res =
  await rejectWithdrawal(tx._id);
  
  }
  
  
  
  
  if(res.success){
  
  notify.success(res.message);
  
  fetchTransactions();
  
  
  }else{
  
  notify.error(res.message);
  
  }
  
  
  };
  
  
  
  
  
  
  
  
  const openModal=(tx)=>{
  
  selectedTransaction.value=tx;
  
  };
  
  
  
  
  
  
  const formatDate=(date)=>{
  
  return new Date(date).toLocaleString();
  
  };
  
  
  
  
  
  const statusClass=(status)=>{
  
  
  return {
  
  "approved":"text-green-600",
  
  "pending":"text-yellow-600",
  
  "rejected":"text-red-600"
  
  }[status] || "";
  
  };
  
  
  
  
  
  const typeClass=(type)=>{
  
  
  return {
  
  deposit:
  "bg-green-100 text-green-700",
  
  withdrawal:
  "bg-red-100 text-red-700",
  
  swap:
  "bg-blue-100 text-blue-700",
  
  send:
  "bg-purple-100 text-purple-700"
  
  }[type] || "bg-gray-100";
  
  };
  
  
  
  
  
  
  onMounted(()=>{
  
  fetchTransactions();
  
  });
  
  
  </script>