<template>

    <div class="max-w-xl  md:p-6 ">
    
    <!-- Profile Header -->
    <div class="flex items-center gap-4 mb-6">
    
    <img
    src="/img/bitcoin.png"
    class="w-14 h-14 rounded-full border"
    />
    
    <div>
    <h2 class="font-bold text-lg">John Doe</h2>
    <p class="text-sm text-gray-500">john@email.com</p>
    </div>
    
    </div>
    
    
    <!-- Account Info -->
    <div class="bg-white rounded-xl shadow-sm border p-4 mb-4">
    
    <h3 class="text-sm font-semibold text-gray-500 mb-3">
    Account Information
    </h3>
    
    <div class="space-y-3 text-sm">
    
    <div class="flex justify-between">
    <span class="text-gray-500">User ID</span>
    <span class="font-medium">USR38291</span>
    </div>
    
    <div class="flex justify-between items-center">
    <span class="text-gray-500">Wallet</span>
    
    <div class="flex items-center gap-2 font-mono text-xs">
    0x9c3a...21d8
    <Copy class="w-4 h-4 text-gray-400 cursor-pointer"/>
    </div>
    
    </div>
    
    <div class="flex justify-between">
    <span class="text-gray-500">Joined</span>
    <span>Mar 2026</span>
    </div>
    
    </div>
    
    </div>
    
    
    <!-- Security -->
    <div class="bg-white rounded-xl shadow-sm border p-4 mb-4">
    
    <h3 class="text-sm font-semibold text-gray-500 mb-3">
    Security
    </h3>
    
    <div class="space-y-2">
    
    <button
    class="profile-btn"
    @click="showPasswordModal = true"
    >
    <KeyRound class="icon"/>
    <span>Change Password</span>
    <ChevronRight class="arrow"/>
    </button>
    
    
    <button
    class="profile-btn"
    @click="showPinModal = true"
    >
    <Lock class="icon"/>
    <span>Set / Change PIN</span>
    <ChevronRight class="arrow"/>
    </button>
    
    </div>
    
    </div>
    
    
    <!-- Logout -->
    <button
    @click="showLogoutModal = true"
    class="w-full bg-red-500 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-red-600 transition"
    >
    
    <LogOut class="w-4 h-4"/>
    
    Logout
    
    </button>
    
    
    <!-- Modals -->
    <ChangePasswordModal
    v-if="showPasswordModal"
    @close="showPasswordModal=false"
    />
    
    <SetPinModal
    v-if="showPinModal"
    @close="showPinModal=false"
    />
    
    <LogoutModal
    v-if="showLogoutModal"
    @close="showLogoutModal=false"
    />
    
    </div>
    
    </template>
    
    
    <script setup>
    
    import { ref } from "vue"
    
    import {
    KeyRound,
    Lock,
    LogOut,
    ChevronRight,
    Copy
    } from "lucide-vue-next"
    
    import ChangePasswordModal from "@/components/ChangePasswordModal.vue"
    import SetPinModal from "@/components/SetPinModal.vue"
    import LogoutModal from "@/components/LogoutModal.vue"
    
    const showPasswordModal = ref(false)
    const showPinModal = ref(false)
    const showLogoutModal = ref(false)
    
    </script>

    <style scoped>

.profile-btn{
display:flex;
align-items:center;
justify-content:space-between;
width:100%;
padding:12px;
border-radius:8px;
transition:0.2s;
}

.profile-btn:hover{
background:#f3f4f6;
}

.icon{
width:20px;
height:20px;
color:#6b7280;
}

.arrow{
width:16px;
height:16px;
color:#9ca3af;
}

.profile-btn span{
flex:1;
text-align:left;
margin-left:12px;
font-size:14px;
}
    </style>