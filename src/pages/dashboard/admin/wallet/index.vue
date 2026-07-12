<template>
  <main class="max-w-4xl mx-auto">

    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">
        Deposit Wallet Settings
      </h1>
    </div>

    <!-- Info -->
    <div
      class="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6"
    >
      <p class="text-sm text-blue-700">
        Configure the wallet addresses customers will use when making deposits.
        Each cryptocurrency has its own wallet address and network.
      </p>
    </div>

    <!-- Wallet Cards -->
    <div class="grid gap-5">

      <div
          v-for="coin in coins"
          :key="coin.symbol"
          :class="[
            'rounded-xl shadow-sm p-5 border transition-all',
            wallets[coin.symbol]?.address
              ? 'border-green-200 bg-green-50/40'
              : 'border-gray-200 bg-white'
          ]"
        >

          <!-- Header -->
          <div class="flex justify-between items-start mb-5">

            <div class="flex items-center gap-3">
              <img
                :src="coin.image"
                class="w-10 h-10 rounded-full"
              />

              <div>
                <h3 class="font-semibold">
                  {{ coin.name }}
                </h3>

                <p class="text-sm text-gray-500">
                  {{ coin.symbol }}
                </p>
              </div>
            </div>

            <span
              v-if="wallets[coin.symbol]?.address"
              class="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium"
            >
              Configured
            </span>

            <span
              v-else
              class="px-3 py-1 text-xs rounded-full bg-orange-100 text-orange-700 font-medium"
            >
              Not Configured
            </span>

          </div>

          <!-- Current Wallet -->
          <div
            v-if="wallets[coin.symbol]?.address"
            class="mb-4 rounded-lg bg-white border border-green-200 p-3"
          >

            <p class="text-xs text-gray-500 mb-1">
              Current Wallet
            </p>

            <p class="font-mono text-sm break-all">
              {{ wallets[coin.symbol].address }}
            </p>

          </div>

          <!-- Network -->
          <label class="block font-semibold mb-2">
            Network
          </label>

          <n-select
            v-model:value="wallets[coin.symbol].network"
            :options="getNetworkOptions(coin.symbol)"
            class="mb-4"
          />

          <!-- Wallet -->
          <label class="block font-semibold mb-2">
            Wallet Address
          </label>

          <n-input
            v-model:value="wallets[coin.symbol].address"
            :placeholder="`Enter ${coin.symbol} wallet address`"
          />

          <p
            class="text-xs text-gray-500 mt-2"
            v-if="wallets[coin.symbol]?.address"
          >
            Editing this field will update the existing wallet after you click
            <strong>Save Changes</strong>.
          </p>

        </div>

    </div>

    <!-- Save -->
    <button
  @click="saveWallets"
  :disabled="loading"
  class="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-3 flex items-center justify-center gap-2"
>
  <span>
    {{ hasExistingWallets ? "Save Changes" : "Save Wallets" }}
  </span>

  <Spinner v-if="loading" />
</button>

  </main>
</template>

<script setup>
import { ref, reactive, computed, watch } from "vue";
import { NSelect, NInput } from "naive-ui";
import { createAdminWallet } from "@/composables/requests/crypto";
import { fetchAdminWallet } from "@/composables/actions";

const store = useStore();
const notify = useNotify();

const loading = ref(false);

/*
|--------------------------------------------------------------------------
| Coins
|--------------------------------------------------------------------------
*/

const coins = computed(() =>
  Object.values(store.state.cryptoPrices || {})
);

const hasExistingWallets = computed(() => {
  return (store.state.adminWalletAddress || []).length > 0;
});
/*
|--------------------------------------------------------------------------
| Wallet Form
|--------------------------------------------------------------------------
*/

const wallets = reactive({});

/*
|--------------------------------------------------------------------------
| Supported Networks
|--------------------------------------------------------------------------
*/

const getNetworks = (symbol) => {
  switch (symbol) {
    case "BTC":
      return ["BITCOIN"];

    case "ETH":
      return ["ETHEREUM"];

    case "USDT":
      return ["TRC20", "ERC20", "BEP20"];

    case "TRX":
      return ["TRC20"];

    case "SOL":
      return ["SOLANA"];

    case "XRP":
      return ["RIPPLE"];

    case "XLM":
      return ["STELLAR"];

    case "ADA":
      return ["CARDANO"];

    default:
      return [];
  }
};

const getNetworkOptions = (symbol) =>
  getNetworks(symbol).map(network => ({
    label: network,
    value: network
  }));

/*
|--------------------------------------------------------------------------
| Initialize Wallets
|--------------------------------------------------------------------------
*/

watch(
  coins,
  (list) => {

    if (!Array.isArray(list)) return;

    list.forEach((coin) => {

      if (!wallets[coin.symbol]) {

        wallets[coin.symbol] = {
          coin: coin.symbol,
          network: getNetworks(coin.symbol)[0] || "",
          address: ""
        };

      }

    });

    // Populate existing wallets
    const existing = store.state.adminWalletAddress || [];

    existing.forEach(wallet => {

      wallets[wallet.coin] = {
        coin: wallet.coin,
        network: wallet.network,
        address: wallet.walletAddress
      };

      });

  },
  {
    immediate: true
  }
);

/*
|--------------------------------------------------------------------------
| Load Existing Wallets
|--------------------------------------------------------------------------
*/

fetchAdminWallet();

/*
|--------------------------------------------------------------------------
| Save
|--------------------------------------------------------------------------
*/

const saveWallets = async () => {

  loading.value = true;

  try {

    const payload = Object.values(wallets)
      .filter(wallet => {
        return (
          wallet &&
          typeof wallet.address === "string" &&
          wallet.address.trim().length > 0
        );
      })
      .map(wallet => ({
        coin: wallet.coin,
        network: wallet.network,
        address: wallet.address.trim()
      }));

    if (!payload.length) {

      notify.error("Please enter at least one wallet address.");
      loading.value = false;
      return;

    }

    const res = await createAdminWallet({
      userId: store.state.user?._id,
      wallets: payload
    });

    if (res.success) {

      notify.success(res.message);

      store.setadminWalletAddress(res.data.wallets);

    } else {

      notify.error(res.message);

    }

  } catch (err) {

    console.error(err);

    notify.error("Failed to save wallet addresses.");

  }

  loading.value = false;

};
</script>