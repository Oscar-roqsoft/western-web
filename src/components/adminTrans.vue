<template>

    <main class="max-w-7xl mx-auto px-2 md:px-0 pb-10">
    
    
    <!-- HEADER -->
    
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
    
    <h1 class="text-2xl md:text-3xl font-bold">
      User Transactions
    </h1>
    
    
    <div class="text-sm text-gray-500">
      Total: {{ filteredTransactions.length }}
    </div>
    
    
    </div>
    
    
    
    
    <!-- FILTER -->
    
    <div
    class="bg-white rounded-2xl shadow-sm border p-4 mb-6 flex flex-col md:flex-row gap-4"
    >
    
    
    <select
    v-model="filterType"
    class="border rounded-xl px-4 py-3 outline-none"
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
    placeholder="Search coin, user..."
    class="flex-1 border rounded-xl px-4 py-3"
    />
    
    
    </div>
    
    
    
    
    
    <!-- DESKTOP TABLE -->
    
    <div class="hidden md:block bg-white rounded-2xl shadow border overflow-hidden">
    
    
    <table class="w-full">
    
    
    <thead class="bg-gray-50">
    
    <tr>
    
    <th class="p-4 text-left">
    Type
    </th>
    
    
    <th class="p-4 text-left">
    User
    </th>
    
    
    <th class="p-4 text-left">
    Coin
    </th>
    
    
    <th class="p-4 text-left">
    Amount
    </th>
    
    
    <th class="p-4 text-left">
    Status
    </th>
    
    
    <th class="p-4 text-left">
    Date
    </th>
    
    
    <th class="p-4">
    Action
    </th>
    
    
    </tr>
    
    </thead>
    
    
    
    <tbody>
    
    
    <tr
    v-for="tx in paginatedTransactions"
    :key="tx._id"
    class="border-t hover:bg-gray-50 transition"
    >
    
    
    <td class="p-4">
    
    <span
    class="px-3 py-1 rounded-full text-xs font-semibold"
    :class="typeClass(tx.type)"
    >
    {{tx.type}}
    </span>
    
    </td>
    
    
    
    
    <td class="p-4">
    
    <p class="font-medium">
    {{tx.userId?.name}}
    </p>
    
    <p class="text-xs text-gray-500">
    {{tx.userId?.email}}
    </p>
    
    </td>
    
    
    
    
    
    <td class="p-4">
    
    <p class="font-semibold">
    {{tx.coin}}
    </p>
    
    <p class="text-xs text-gray-500">
    {{tx.network}}
    </p>
    
    </td>
    
    
    
    
    
    <td class="p-4 font-bold">
    
    {{tx.amount}}
    
    </td>
    
    
    
    
    <td class="p-4">
    
    <span
    :class="statusClass(tx.status)"
    >
    {{tx.status}}
    </span>
    
    </td>
    
    
    
    
    <td class="p-4 text-sm">
    
    {{formatDate(tx.createdAt)}}
    
    </td>
    
    
    
    
    <td class="p-4">
    
    
    <div
    v-if="tx.status==='pending'"
    class="flex gap-2"
    >
    
    
    <button
    @click="openConfirm(tx,'approve')"
    class="px-3 py-2 rounded-xl bg-green-500 text-white text-sm"
    >
    Approve
    </button>
    
    
    <button
    @click="openConfirm(tx,'reject')"
    class="px-3 py-2 rounded-xl bg-red-500 text-white text-sm"
    >
    Reject
    </button>
    
    
    </div>
    
    
    
    </td>
    
    
    </tr>
    
    
    </tbody>
    
    
    </table>
    
    
    </div>
    
    
    
    
    
    
    
    <!-- MOBILE CARD -->
    
    <div class="md:hidden space-y-4">
    
    
    <div
    v-for="tx in paginatedTransactions"
    :key="tx._id"
    class="bg-white rounded-2xl border shadow p-5"
    >
    
    
    <div class="flex justify-between">
    
    
    <span
    class="px-3 py-1 rounded-full text-xs"
    :class="typeClass(tx.type)"
    >
    {{tx.type}}
    </span>
    
    
    
    <span
    :class="statusClass(tx.status)"
    >
    {{tx.status}}
    </span>
    
    
    </div>
    
    
    
    <div class="mt-4 space-y-2 text-sm">
    
    
    <p>
    <b>User:</b>
    {{tx.userId?.name}}
    </p>
    
    
    <p>
    <b>Coin:</b>
    {{tx.coin}} ({{tx.network}})
    </p>
    
    
    <p>
    <b>Amount:</b>
    {{tx.amount}}
    </p>
    
    
    <p>
    <b>Date:</b>
    {{formatDate(tx.createdAt)}}
    </p>
    
    
    
    </div>
    
    
    
    
    <div
    v-if="tx.status==='pending'"
    class="flex gap-3 mt-5"
    >
    
    
    <button
    @click="openConfirm(tx,'approve')"
    class="flex-1 bg-green-500 text-white rounded-xl py-2"
    >
    Approve
    </button>
    
    
    <button
    @click="openConfirm(tx,'reject')"
    class="flex-1 bg-red-500 text-white rounded-xl py-2"
    >
    Reject
    </button>
    
    
    </div>
    
    
    </div>
    
    
    </div>
    
    
    
    
    
    
    <!-- PAGINATION -->
    
    
    <div class="flex justify-center items-center gap-4 mt-6">
    
    
    <button
    @click="currentPage--"
    :disabled="currentPage===1"
    class="px-5 py-2 rounded-xl bg-gray-200 disabled:opacity-40"
    >
    Prev
    </button>
    
    
    
    <span>
    {{currentPage}} / {{totalPages}}
    </span>
    
    
    
    <button
    @click="currentPage++"
    :disabled="currentPage===totalPages"
    class="px-5 py-2 rounded-xl bg-gray-200 disabled:opacity-40"
    >
    Next
    </button>
    
    
    
    </div>
    
    
    
    
    
    <!-- DETAILS MODAL -->
    
    <div
    v-if="selectedTransaction"
    class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
    
    
    <div
    class="bg-white w-full max-w-lg rounded-3xl p-6 animate-fadeIn"
    >
    
    
    <button
    @click="selectedTransaction=null"
    class="float-right text-2xl"
    >
    ×
    </button>
    
    
    
    <h2 class="text-xl font-bold mb-5">
    Transaction Details
    </h2>
    
    
    
    <div class="space-y-3">
    
    
    <p>
    Type:
    <b>{{selectedTransaction.type}}</b>
    </p>
    
    
    <p>
    Coin:
    <b>{{selectedTransaction.coin}}</b>
    </p>
    
    
    <p>
    Amount:
    <b>{{selectedTransaction.amount}}</b>
    </p>
    
    
    <p>
    Network:
    <b>{{selectedTransaction.network}}</b>
    </p>
    
    
    <p>
    Status:
    <b>{{selectedTransaction.status}}</b>
    </p>
    
    
    </div>
    
    
    </div>
    
    
    </div>
    
    
    
    
    
    
    <!-- CONFIRM ACTION MODAL -->
    
    
    <div
    v-if="confirmModal"
    class="fixed inset-0 z-[60] bg-black/60 backdrop-blur flex items-center justify-center p-4"
    >
    
    
    <div
    class="bg-white rounded-3xl w-full max-w-md p-7 text-center animate-fadeIn"
    >
    
    
    <div
    class="text-5xl mb-4"
    >
    
    {{actionType==='approve'?'✅':'⚠️'}}
    
    </div>
    
    
    
    <h2 class="text-xl font-bold">
    
    {{actionType==='approve'
    ?'Approve Transaction?'
    :'Reject Transaction?'}}
    
    </h2>
    
    
    
    
    <p class="text-gray-500 mt-3">
    
    You are about to
    {{actionType}}
    this
    <b>{{confirmTransaction?.coin}}</b>
    transaction.
    
    </p>
    
    
    
    
    
    <div class="flex gap-4 mt-7">
    
    
    <button
    @click="confirmModal=false"
    class="flex-1 border rounded-xl py-3"
    >
    Cancel
    </button>
    
    
    
    
    <button
    @click="executeAction"
    :disabled="actionLoading"
    :class="
    actionType==='approve'
    ?'bg-green-600'
    :'bg-red-600'
    "
    class="flex-1 text-white rounded-xl py-3 flex justify-center"
    >
    
    <span>
    Confirm
    </span>
    
    <Spinner v-if="actionLoading"/>
    
    </button>
    
    
    
    </div>
    
    
    </div>
    
    
    </div>
    
    
    
    
    </main>
    
</template>

<script setup>

import { ref, computed, onMounted } from "vue";

import {
    getUserAdminTransactions,
  approveDeposit,
  rejectDeposit
} from "@/composables/requests/crypto";


import {
  approveWithdrawal,
  rejectWithdrawal
} from "@/composables/requests/withdrawal";


const pinia = useStore();
const notify = useNotify();



// =============================
// STATES
// =============================

const filterType = ref("");

const search = ref("");

const currentPage = ref(1);

const perPage = 10;



const selectedTransaction = ref(null);



// Confirmation Modal

const confirmModal = ref(false);

const confirmTransaction = ref(null);

const actionType = ref("");

const actionLoading = ref(false);






// =============================
// TRANSACTIONS
// =============================


const transactions = computed(()=>{

 return pinia.state.allTransaction || [];

});







// =============================
// FILTER
// =============================


const filteredTransactions = computed(()=>{


return transactions.value.filter(tx=>{


const typeMatch =
!filterType.value ||
tx.type === filterType.value;



const keyword =
search.value.toLowerCase();



const searchMatch =
!keyword ||


tx.coin
?.toLowerCase()
.includes(keyword)


||

tx.type
?.toLowerCase()
.includes(keyword)


||

tx.userId?.name
?.toLowerCase()
.includes(keyword)


||

tx.userId?.email
?.toLowerCase()
.includes(keyword);



return typeMatch && searchMatch;



});


});









// =============================
// PAGINATION
// =============================


const totalPages = computed(()=>{


return Math.max(
1,
Math.ceil(
filteredTransactions.value.length / perPage
)
);


});



const paginatedTransactions = computed(()=>{


const start =
(currentPage.value - 1) * perPage;



return filteredTransactions.value.slice(

start,

start + perPage

);


});









// =============================
// FETCH
// =============================


const fetchTransactions = async()=>{


try{


const res = await getUserAdminTransactions();



if(res.success){


pinia.setallTransaction(
res.data.transactions
);



}



}catch(error){


console.log(error);


notify.error(
"Failed to load transactions"
);


}



};









// =============================
// OPEN CONFIRM MODAL
// =============================


const openConfirm = (tx,type)=>{


confirmTransaction.value = tx;


actionType.value = type;


confirmModal.value = true;



};









// =============================
// EXECUTE APPROVE / REJECT
// =============================


const executeAction = async()=>{


if(!confirmTransaction.value)
return;



actionLoading.value = true;



const tx =
confirmTransaction.value;



try{


let response;



// DEPOSIT

if(tx.type==="deposit"){


if(actionType.value==="approve"){


response =
await approveDeposit(tx._id);


}else{


response =
await rejectDeposit(tx._id);


}


}




// WITHDRAWAL


if(tx.type==="withdrawal"){


if(actionType.value==="approve"){


response =
await approveWithdrawal(tx._id);



}else{


response =
await rejectWithdrawal(tx._id);



}


}






if(response?.success){



notify.success(
response.message
);



await fetchTransactions();



}else{


notify.error(
response?.message || "Action failed"
);


}






}catch(error){


console.log(error);


notify.error(
"Something went wrong"
);



}finally{


actionLoading.value = false;


confirmModal.value = false;


confirmTransaction.value = null;



}



};









// =============================
// DETAILS MODAL
// =============================


const openModal = (tx)=>{


selectedTransaction.value = tx;


};




const closeModal = ()=>{


selectedTransaction.value = null;


};









// =============================
// HELPERS
// =============================


const formatDate=(date)=>{


return new Date(date)
.toLocaleString();



};






const statusClass=(status)=>{


return {


approved:
"text-green-600 font-semibold",


pending:
"text-yellow-600 font-semibold",


rejected:
"text-red-600 font-semibold"



}[status] || "text-gray-500";



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



}[type] ||

"bg-gray-100 text-gray-700";



};









// =============================
// LOAD
// =============================


onMounted(()=>{


fetchTransactions();


});



</script>