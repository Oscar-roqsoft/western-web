<template>
  <section class="max-w-5xl mx-auto p-4 flex flex-col md:flex-row items-start md:items-center gap-4">
    <!-- Header -->
    <div class="flex-1">
      <h1 class="text-xl md:text-2xl font-bold">
        Secure Your Digital Assets
      </h1>
      <p class="text-gray-400 mt-1 text-sm md:text-base">
        Protect your digital wallet with advanced security measures.<br />
        Ensure your assets are safe from unauthorized access.
      </p>
    </div>

    <!-- Add Wallet Button -->
    <div>
      <button
        @click="addWallet"
        class="flex items-center gap-2 bg-white border border-gray-400 text-blue-600 px-4 py-2 rounded-lg hover:shadow hover:text-black transition"
      >
        <LockIcon class="w-4 h-4" />
        Add Wallet
      </button>
    </div>
  </section>

  <!-- Secured Wallets -->
  <section class="max-w-5xl mx-auto mt-6 bg-white shadow rounded-lg p-4">
    <h2 class="font-bold text-lg">Secured Wallet</h2>

    <!-- Wallet List -->
    <div v-if="wallets.length > 0" class="mt-4 flex flex-wrap gap-4">
      <div
        v-for="wallet in wallets"
        :key="wallet.name"
        class="flex flex-col items-center p-3 shadow rounded-lg w-36"
      >
        <img :src="wallet.icon || '/walleticons/default.png'" alt="wallet icon" class="w-16 h-16 object-contain mb-2" />
        <span class="font-bold">{{ wallet.name }}</span>
        <span class="text-gray-400 text-xs">Last Synced {{ wallet.lastSynced }}</span>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="mt-6 flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
      <!-- <img src="/icons/empty-wallet.png" alt="empty wallet" class="w-20 h-20 mb-4" /> -->
      <h3 class="font-bold text-lg mb-1">No Wallet Added</h3>
      <p class="text-gray-400 text-sm mb-4 text-center">
        Add your first wallet to start securing your digital assets.
      </p>
      <button
        @click="addWallet"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:shadow transition"
      >
        Add Wallet
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { LockIcon } from "lucide-vue-next";

const wallets = ref([
  {
    name: "Meta Mask",
    icon: "/img/xrp.png", // fallback will use default.png
    lastSynced: "7 seconds ago",
  },
]);

const addWallet = () => {
  navigateTo("/dashboard/wallet");
  console.log("Add wallet clicked");
};
</script>