<template>
    <div>
  
      <!-- HEADER -->
      <div class="flex justify-between items-center mb-6">

        <h2 class="text-2xl font-bold">Users</h2>
  
        <div class="flex gap-3">
  
          <!-- Search -->
          <div class="relative">
            <Search class="icon-left"/>
            <input
              v-model="search"
              placeholder="Search users..."
              class="input "
            />
          </div>
  
          <!-- Filter -->
          <!-- <select v-model="statusFilter" class="input w-40">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select> -->
  
        </div>
      </div>
  
  
      <!-- TABLE -->
      <div class="bg-white rounded-xl shadow overflow-scroll">
  
        <table class="w-full text-sm">
  
          <thead class="bg-gray-100 text-gray-600">
            <tr>
              <th class="th">User</th>
              <th class="th">Country</th>
              <th class="th">Phone</th>
              <th class="th ">Status</th>
              <th class="th text-right">Actions</th>
            </tr>
          </thead>
  
          <tbody>
  
            <tr
              v-for="user in filteredUsers"
              :key="user._id"
              class="border-b hover:bg-gray-50"
            >
  
              <!-- USER -->
              <td class="td flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center">
                  {{ user.name?.charAt(0) }}
                </div>
  
                <div>
                  <p class="font-semibold">{{ user.name }}</p>
                  <p class="text-gray-400 text-xs">{{ user.email }}</p>
                </div>
              </td>
  
              
              <!-- WALLETS -->
              <td class="td">
                  {{ user.country }}
                </td>
                
                <!-- BALANCE -->
                <td class="td font-semibold">
                  {{ user.phone}}
                </td>
              <!-- STATUS -->
              <td class="td w-[100px_!important]">
                <span
                  :class="[
                    'px-2 py-1 rounded text-xs font-semibold w-[200px]',
                    user.twoFactorVerification
                      ? 'bg-green-100 text-green-600'
                      : 'bg-red-100 text-red-600'
                  ]"
                >

                  {{ user.twoFactorVerification ? 'verified' : 'not verified' }}
                </span>

              </td>
  
              <!-- ACTIONS -->
              <td class="td text-right">
  
                <div class="flex  gap-2">
  
                  <!-- View -->
                  <button class="action-btn" @click="navigateTo(`/dashboard/admin/user/${user._id}`)">
                    <Eye class="icon"/>
                  </button>
  
                  <!-- Fund -->
                  <button class="action-btn"
                  @click="openUser(user)">
                    <Wallet class="icon"/>
                  </button>
  
                  <!-- Block -->
                  <button class="action-btn text-red-500">
                    <Ban class="icon"/>
                  </button>
  
                </div>
  
              </td>
  
            </tr>
  
          </tbody>
  
        </table>
  
        <!-- EMPTY -->
        <div v-if="!filteredUsers.length" class="p-6 text-center text-gray-500">
          No users found
        </div>
  
      </div>


      <UserDetailsDrawer
        v-if="showDrawer"
        :user="selectedUser"
        @close="showDrawer=false"
        @fund="handleFundUser"
        />

        <FundUserModal
            v-if="showFundModal"
            :user="fundUser"
            @close="showFundModal=false"
            @success="fetchUsers"
            />
  
    </div>
  </template>

<script setup>
import { ref, computed } from "vue"
import {
  Search,
  Eye,
  Wallet,
  Ban
} from "lucide-vue-next"

import { fetchAllUsers } from '~/composables/actions/index'


const store = useStore()

const showDrawer = ref(false)
const showFundModal = ref(false)
const selectedUser = ref(null)
const fundUser = ref(null)

/* =========================
   STATE
========================= */

const search = ref("")
const statusFilter = ref("")

/* =========================
   USERS FROM STORE
========================= */

const users = computed(() => {
  return Object.values(store.state.adminUsers) || {}
})



const openUser = (user) => {
  selectedUser.value = user
  showDrawer.value = true
}

const handleFundUser = (user) => {
    fundUser.value = user
    showFundModal.value = true
}

/* =========================
   FILTER LOGIC
========================= */

const filteredUsers = computed(() => {

  return users.value.filter(user => {

    const matchesSearch =
      user.name?.toLowerCase().includes(search.value.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.value.toLowerCase())

    // const matchesStatus =
    //   !statusFilter.value || user.status === statusFilter.value

    return matchesSearch 
  })

})


   onMounted(async()=>{

      await fetchAllUsers()

   })
</script>


<style scoped>
.th {
  text-align: left;
  padding: 12px;
  font-weight: 600;
}

.td {
  padding: 12px;
  min-width: 140px;
}

.input {
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 8px 30px;
  outline: none;
}

.input:focus {
  border-color: #6366f1;
}

.icon-left {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: gray;
}

.action-btn {
  padding: 6px;
  border-radius: 8px;
  background: #f3f4f6;
}

.action-btn:hover {
  background: #e5e7eb;
}

.icon {
  width: 16px;
  height: 16px;
}
</style>