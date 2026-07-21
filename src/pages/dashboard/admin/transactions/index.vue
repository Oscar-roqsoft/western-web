<template>

 <AdminTrans />

</template>
<script setup>
import { ref, onMounted, computed } from "vue";
// import axios from "axios";
import { getAllDeposits,approveDeposit,rejectDeposit,getUserAdminTransactions } from "@/composables/requests/crypto"
import { getAllWithdrawals,approveWithdrawal,rejectWithdrawal } from "@/composables/requests/withdrawal"
const pinia = useStore()
const notify = useNotify()

const isApproving = ref(false)
const isRejecting = ref(false)

const transactions = computed(() => pinia.state.allTransaction.reverse() || []);
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
    const data = await getUserAdminTransactions()
    if(data.success){
      pinia.setallTransaction(data.data?.deposits)
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