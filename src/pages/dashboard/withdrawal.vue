<template>
    <div class="max-w-xl">

        <ListToken
        v-if="!reveal"
        title="Select Withdrawal Token"
        description="Choose the cryptocurrency you want to withdraw."
        @close="handleClose"
        />
  
        <div v-else>

            <!-- Progress -->
            <div class="flex items-center justify-between mb-10">
        
              <template
                v-for="step in 4"
                :key="step"
              >
                <div class="flex flex-col items-center">
        
                  <div
                    class="w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all"
                    :class="
                      pinia.state.withdrawal.step >= step
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    "
                  >
                    <span v-if="pinia.state.withdrawal.step > step">
                      ✓
                    </span>
        
                    <span v-else>
                      {{ step }}
                    </span>
        
                  </div>
        
                  <span
                    class="text-xs mt-2"
                    :class="
                      pinia.state.withdrawal.step >= step
                        ? 'text-blue-600 font-semibold'
                        : 'text-gray-400'
                    "
                  >
        
                    {{
                      [
                        'Wallet',
                        'Amount',
                        'Security',
                        'Complete'
                      ][step - 1]
                    }}
        
                  </span>
        
                </div>
        
                <div
                  v-if="step < 4"
                  class="flex-1 h-1 mx-2 rounded-full"
                  :class="
                    pinia.state.withdrawal.step > step
                      ? 'bg-blue-600'
                      : 'bg-gray-200'
                  "
                ></div>
        
              </template>
        
            </div>
        
            <!-- Card -->
        
            <div v-if=" pinia.state.withdrawal.step === 1">
                <div
                  v-if="selectedCoin"
                  class="bg-white rounded-3xl shadow-xl border border-gray-100 p-4"
                >
            
                  <!-- Coin -->
            
                  <div
                    class="flex items-center justify-between"
                  >
            
                    <div class="flex items-center gap-4">
            
                      <img
                        :src="selectedCoin.icon"
                        class="w-16 h-16 rounded-full shadow"
                      />
            
                      <div>
            
                        <h2 class="text-2xl font-bold">
                          {{ selectedCoin.name }}
                        </h2>
            
                        <p class="text-gray-500">
                          {{ selectedCoin.symbol }}
                        </p>
            
                      </div>
            
                    </div>
            
                  </div>
            
                  <!-- Balance -->
            
                  <div
                    class="mt-8 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6"
                  >
            
                    <p class="text-sm opacity-80">
                      Available Balance
                    </p>
            
                    <h3 class="text-3xl font-bold mt-2">
                      {{ userBalance.toFixed(8) }}
                      {{ selectedCoin.symbol }}
                    </h3>
            
                    <p class="opacity-80 mt-1">
                      {{ balanceUSD }}
                    </p>
            
                  </div>
            
                  <!-- Wallet -->
            
                  <div class="mt-8">
            
                    <label
                      class="block font-semibold mb-3"
                    >
                      Recipient Wallet Address
                    </label>
            
                    <div class="relative">
            
                      <input
                        v-model="form.walletAddress"
                        type="text"
                        placeholder="Enter wallet address"
                        class="w-full rounded-xl border border-gray-300 px-4 py-4 pr-24 outline-none focus:border-blue-600"
                      />
            
                      <button
                        @click="pasteAddress"
                        type="button"
                        class="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600 font-semibold hover:text-blue-700"
                      >
                        Paste
                      </button>
            
                    </div>
            
                  </div>
            
                  <!-- Network -->
            
                  <div class="mt-6">
            
                    <label
                      class="block font-semibold mb-3"
                    >
                      Select Network
                    </label>
            
                    <n-select
                      v-model:value="form.network"
                      :options="networkSelectOptions"
                      placeholder="Choose Network"
                      size="large"
                    />
            
                  </div>
            
                  <!-- Warning -->
            
                  <div
                    class="mt-8 rounded-2xl bg-amber-50 border border-amber-200 p-5"
                  >
            
                    <div class="flex gap-4">
            
                      <div
                        class="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold"
                      >
                        !
                      </div>
            
                      <div>
            
                        <h4 class="font-semibold">
                          Before you continue
                        </h4>
            
                        <ul
                          class="mt-2 text-sm text-gray-600 space-y-2"
                        >
            
                          <li>
                            • Double-check the wallet address.
                          </li>
            
                          <li>
                            • Make sure the selected network matches the recipient wallet.
                          </li>
            
                          <li>
                            • Withdrawals cannot be reversed after confirmation.
                          </li>
            
                        </ul>
            
                      </div>
            
                    </div>
            
                  </div>
            
                  <!-- Summary -->
            
                  <div
                    class="mt-8 rounded-xl border border-gray-200 p-5"
                  >
            
                    <div
                      class="flex justify-between py-2"
                    >
            
                      <span class="text-gray-500">
                        Coin
                      </span>
            
                      <span class="font-semibold">
                        {{ selectedCoin.symbol }}
                      </span>
            
                    </div>
            
                    <div
                      class="flex justify-between py-2"
                    >
            
                      <span class="text-gray-500">
                        Network
                      </span>
            
                      <span class="font-semibold">
                        {{ form.network || "--" }}
                      </span>
            
                    </div>
            
                    <div
                      class="flex justify-between py-2"
                    >
            
                      <span class="text-gray-500">
                        Estimated Arrival
                      </span>
            
                      <span class="font-semibold text-green-600">
                        5–30 Minutes
                      </span>
            
                    </div>
            
                  </div>
            
                  <!-- Buttons -->
            
                  <div
                    class="flex justify-between mt-10"
                  >
            
                    <button
                      @click="reveal = false"
                      class="px-8 py-3 rounded-xl border border-gray-300 hover:bg-gray-50"
                    >
                      Back
                    </button>
            
                    <button
                      @click="nextStep"
                      class="px-8 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                    >
                      Continue →
                    </button>
            
                  </div>
            
                </div>
            </div>


            <div v-if="pinia.state.withdrawal.step === 2 " class="bg-white rounded-3xl shadow border p-6">

                <div v-if="selectedCoin" class="flex items-center gap-4">

                <img
                    :src="selectedCoin?.icon"
                    class="w-14 h-14 rounded-full"
                />

                <div>

                    <h2 class="text-xl font-bold">
                    {{ selectedCoin?.name }}
                    </h2>

                    <p class="text-gray-500">
                    {{selectedCoin?.symbol }}
                    </p>

                </div>

                </div>

                <!-- Balance -->

                <div
                class="mt-6 bg-blue-50 rounded-xl p-5"
                >

                <p class="text-gray-500 text-sm">

                    Available Balance

                </p>

                <h2 class="text-3xl font-bold">

                    <!-- {{ withdrawal.balance.toFixed(8) }} -->
                    {{ selectedCoin.symbol }}

                </h2>

                <p class="text-gray-500 mt-1">

                    {{ selectedCoin.balanceUSD }}

                </p>

                </div>

                <!-- Amount -->

                <div class="mt-8">

                <label class="font-semibold">

                    Withdrawal Amount

                </label>

                <div class="relative mt-3">

                    <input

                    v-model.number="amount"

                    type="number"

                    placeholder="0.00"

                    class="w-full border rounded-xl px-5 py-4 text-2xl font-bold outline-none focus:border-blue-600"

                    />

                    <button

                    @click="setMax"

                    class="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600 font-semibold"

                    >

                    MAX

                    </button>

                </div>

                </div>

                <!-- USD -->

                <div class="mt-2 text-gray-500">

                ≈ {{ amountUSD }}

                </div>

                <!-- Percentage -->

                <div class="grid grid-cols-4 gap-3 mt-6">

                <button
                    v-for="item in [25,50,75,100]"
                    :key="item"
                    @click="selectPercentage(item)"
                    class="border rounded-xl py-3 hover:bg-blue-50"
                >

                    {{ item }}%

                </button>

                </div>

                <!-- Summary -->

                <div
                class="mt-8 border rounded-xl p-5"
                >

                <div class="flex justify-between">

                    <span class="text-gray-500">

                    Wallet

                    </span>

                    <span>

                    {{ withdrawal.walletAddress.slice(0,8) }}...
                    {{ withdrawal.walletAddress.slice(-6) }}

                    </span>

                </div>

                <div class="flex justify-between mt-3">

                    <span class="text-gray-500">

                    Network

                    </span>

                    <span>

                    {{ withdrawal.network }}

                    </span>

                </div>

                </div>

                <!-- Buttons -->

                <div class="flex justify-between mt-8">

                <button

                    @click="back"

                    class="px-8 py-3 border rounded-xl"

                >

                    Back

                </button>

                <button

                    @click="continueStep"

                    class="px-8 py-3 bg-blue-600 text-white rounded-xl"

                >

                    Continue →

                </button>

                </div>

            </div>

            <div
                v-if="pinia.state.withdrawal.step === 3"
                class="bg-white rounded-3xl shadow-xl border p-4"
                >

                    <div class="text-center">

                        <div
                            class="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto"
                        >
                            <Lock class="w-10 h-10 text-blue-600"/>
                        </div>

                        <h2 class="text-2xl font-bold mt-5">
                            Security Verification
                        </h2>

                        <p class="text-gray-500 mt-2">
                            Enter your transaction PIN to authorize this withdrawal.
                        </p>

                    </div>

                <!-- Summary -->
                <div class="mt-8 rounded-2xl border p-5">

                <div class="flex justify-between py-2">
                    <span class="text-gray-500">Coin</span>
                    <span class="font-semibold">
                        {{ withdrawal.coin?.symbol }}
                    </span>
                </div>

                <div class="flex justify-between py-2">
                    <span class="text-gray-500">Amount</span>
                    <span class="font-semibold">
                        {{ Number(withdrawal.amount || 0).toFixed(8) }}
                        {{ withdrawal.coin?.symbol }}
                    </span>
                </div>

                <div class="flex justify-between py-2">
                    <span class="text-gray-500">Value</span>
                    <span class="font-semibold">
                        {{ withdrawal.usdValue }}
                    </span>
                </div>

                <div class="flex justify-between py-2">
                    <span class="text-gray-500">Network</span>
                    <span>
                        {{ withdrawal.network }}
                    </span>
                </div>

                <div class="flex justify-between py-2">
                    <span class="text-gray-500">
                        Recipient
                    </span>

                    <span class="max-w-[180px] truncate">
                        {{ withdrawal.walletAddress }}
                    </span>
                </div>

                </div>

             

                    <div class="mt-8">

                    <label class="font-semibold block mb-3">
                        Transaction PIN
                    </label>

                    <!-- User already has a PIN -->
                    <div v-if="!pinia.state.user?.isPinSet">

                        <n-input
                            v-model:value="pin"
                            type="password"
                            maxlength="6"
                            show-password-on="click"
                            placeholder="Enter your 6-digit transaction PIN"
                        />

                        <p class="text-xs text-gray-500 mt-2">
                            Enter your transaction PIN to authorize this withdrawal.
                        </p>

                    </div>

                    <!-- User has NO PIN -->
                    <div v-else>

                        <div
                            class="rounded-xl border border-amber-200 bg-amber-50 p-4"
                        >

                            <div class="flex gap-3">

                                <Lock class="w-6 h-6 text-amber-500 flex-shrink-0" />

                                <div>

                                    <h3 class="font-semibold">
                                        Transaction PIN Required
                                    </h3>

                                    <p class="text-sm text-gray-600 mt-1">
                                        You need to create a transaction PIN before you can withdraw your funds.
                                    </p>

                                    <button
                                        class="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                                        @click="navigateTo('/dashboard/profile')"
                                    >
                                        Create Transaction PIN
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                    </div>

                    <div
                        class="mt-8 flex justify-between"
                    >

                        <button
                            @click="backToAmount"
                            class="px-8 py-3 border rounded-xl"
                        >
                            Back
                        </button>

                        <button
                            @click="confirmWithdrawal"
                            :disabled="loading"
                            class="px-8 py-3 bg-blue-600 text-white rounded-xl"
                        >

                            {{ loading ? "Processing..." : "Confirm Withdrawal" }}

                        </button>

                    </div>

                </div>

            <!-- ========================= -->
            <!-- STEP 4 - COMPLETE -->
            <!-- ========================= -->

            <Transition
            enter-active-class="transition duration-300"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            >
            <div
                v-if="pinia.state.withdrawal.step === 4"
                class="animate-fadeIn"
            >
                <div class="bg-white rounded-3xl shadow-lg border p-4">

                <!-- Success Icon -->

                <div class="flex justify-center">

                    <div
                    class="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center"
                    >
                    <svg
                        class="w-12 h-12 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.5"
                        viewBox="0 0 24 24"
                    >
                        <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5 13l4 4L19 7"
                        />
                    </svg>
                    </div>

                </div>

                <!-- Title -->

                <div class="text-center mt-6">

                    <h2 class="text-3xl font-bold">
                    Withdrawal Submitted
                    </h2>

                    <p class="text-gray-500 mt-2">

                    Your withdrawal request has been submitted successfully and is now awaiting processing.

                    </p>

                </div>

                <!-- Status -->

                <div class="mt-8 flex justify-center">

                    <div
                    class="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-5 py-2 rounded-full"
                    >
                    <span
                        class="w-2.5 h-2.5 rounded-full bg-yellow-500 animate-pulse"
                    ></span>

                    Pending Review

                    </div>

                </div>

                <!-- Receipt -->

                <div
                    class="mt-10 rounded-2xl border bg-gray-50 p-6"
                >

                    <h3 class="font-semibold text-lg mb-6">
                    Withdrawal Summary
                    </h3>

                    <div class="space-y-4">

                    <div class="flex justify-between">

                        <span class="text-gray-500">
                        Asset
                        </span>

                        <div class="flex items-center gap-2">

                        <img
                            :src="selectedCoin?.icon"
                            class="w-6 h-6 rounded-full"
                        >

                        <span class="font-semibold">
                            {{ selectedCoin?.symbol }}
                        </span>

                        </div>

                    </div>

                    <div class="flex justify-between">

                        <span class="text-gray-500">
                        Amount
                        </span>

                        <span class="font-semibold">
                        {{selectedCoin.amount }}
                        {{ selectedCoin?.symbol }}
                        </span>

                    </div>

                    <div class="flex justify-between">

                        <span class="text-gray-500">
                        Network
                        </span>

                        <span class="font-semibold">
                        {{ selectedCoin.network }}
                        </span>

                    </div>

                    <div class="flex justify-between">

                        <span class="text-gray-500">
                        Wallet Address
                        </span>

                        <span
                        class="font-medium max-w-[220px] truncate"
                        >
                        {{ withdrawal.walletAddress }}
                        </span>

                    </div>

                    <div class="flex justify-between">

                        <span class="text-gray-500">
                        Processing Fee
                        </span>

                        <span class="font-semibold text-red-600">
                        {{ selectedCoin.fee }}
                        {{ selectedCoin.symbol }}
                        </span>

                    </div>

                    <div class="flex justify-between">

                        <span class="text-gray-500">
                        You'll Receive
                        </span>

                        <span class="font-bold text-green-600">
                        {{ selectedCoin.netAmount }}
                        {{ selectedCoin.symbol }}
                        </span>

                    </div>

                    <div class="border-t pt-4 flex justify-between">

                        <span class="text-gray-500">
                        Reference
                        </span>

                        <span class="font-semibold">
                        {{ selectedCoin?.reference }}
                        </span>

                    </div>

                    <div class="flex justify-between">

                        <span class="text-gray-500">
                        Date
                        </span>

                        <span class="font-medium">
                        {{ selectedCoin?.createdAt }}
                        </span>

                    </div>

                    </div>

                </div>

                <!-- Timeline -->

                <div
                    class="mt-10 rounded-2xl bg-blue-50 border border-blue-100 p-6"
                >

                    <h3 class="font-semibold mb-5">
                    Processing Status
                    </h3>

                    <div class="space-y-5">

                    <div class="flex gap-4">

                        <div
                        class="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center"
                        >
                        ✓
                        </div>

                        <div>

                        <h4 class="font-semibold">
                            Withdrawal Submitted
                        </h4>

                        <p class="text-sm text-gray-500">

                            Your withdrawal request has been received.

                        </p>

                        </div>

                    </div>

                    <div class="flex gap-4">

                        <div
                        class="w-8 h-8 rounded-full bg-yellow-500 text-white flex items-center justify-center animate-pulse"
                        >
                        •
                        </div>

                        <div>

                        <h4 class="font-semibold">
                            Compliance Review
                        </h4>

                        <p class="text-sm text-gray-500">

                            Our security team is verifying your transaction.

                        </p>

                        </div>

                    </div>

                    <div class="flex gap-4 opacity-50">

                        <div
                        class="w-8 h-8 rounded-full border flex items-center justify-center"
                        >
                        3
                        </div>

                        <div>

                        <h4 class="font-semibold">
                            Funds Sent
                        </h4>

                        <p class="text-sm text-gray-500">

                            The transaction hash will be generated after approval.

                        </p>

                        </div>

                    </div>

                    </div>

                </div>

                <!-- Notice -->

                <div
                    class="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-5"
                >

                    <h4 class="font-semibold mb-2">
                    Processing Time
                    </h4>

                    <p class="text-sm text-gray-600">

                    Withdrawals are usually completed within
                    <strong>5–30 minutes</strong>.
                    During periods of high network congestion,
                    processing may take up to
                    <strong>24 hours</strong>.

                    </p>

                </div>

                <!-- Buttons -->

                <div
                    class="mt-10 flex flex-col md:flex-row gap-4"
                >

                    <button
                    @click="navigateTo('/dashboard/history')"
                    class="flex-1 py-3 rounded-xl border hover:bg-gray-100 font-semibold"
                    >
                    View History
                    </button>

                    <button
                    @click="navigateTo('/dashboard')"
                    class="flex-1 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-semibold"
                    >
                    Return Dashboard
                    </button>

                </div>

                </div>

            </div>

            </Transition>

        </div>
  
    </div>
  </template>

<script setup>
import { ref, computed } from "vue";
import { NSelect,useDialog,NInput} from "naive-ui";
import { useStore } from "@/stores";
import { Lock } from "lucide-vue-next";

const notify = useNotify()
const pinia = useStore();
const reveal =  ref(false)

// const notify = useMessag
const withdrawal = computed(() => pinia.state.withdrawal);

const amount = ref(0);



const setMax = () => {

  amount.value = withdrawal.value.balance;

};

const selectPercentage = (percent)=>{

  amount.value =
    Number(
      withdrawal.value.balance *
      percent / 100
    ).toFixed(8);

};

const back = ()=>{

  pinia.state.withdrawal.step--;

};


const continueStep = ()=>{

  if(amount.value <= 0){

    notify.error("Enter withdrawal amount.");

    return;

  }

  if(amount.value > withdrawal.value.balance){

    notify.error("Insufficient balance.");

    // return;

  }

  pinia.state.withdrawal = {

    ...withdrawal.value,

    amount:Number(amount.value),

    usdValue:amountUSD.value,

    step:3

  };

};


// const dialog = useDialog();

const pin = ref("");

const loading = ref(false);


const backToAmount = () => {

    pinia.state.withdrawal.step = 2;

};

const forgotPin = () => {

    if (!pinia.state.user?.hasTransactionPin) {

        // dialog.warning({

        //     title: "Transaction PIN Required",

        //     content:
        //         "You need to create a transaction PIN before making withdrawals.",

        //     positiveText: "Create PIN",

        //     negativeText: "Cancel",

        //     onPositiveClick() {

        //         navigateTo("/dashboard/settings/security");

        //     }

        // });

        return;

    }

    navigateTo("/dashboard/settings/security");

};

const confirmWithdrawal = async () => {

    if (!pin.value) {

        notify.error("Enter your transaction PIN.");

        return;

    }

    loading.value = true;

    try {

        const payload = {

            walletAddress: withdrawal.value.walletAddress,

            network: withdrawal.value.network,

            amount: withdrawal.value.amount,

            coin: withdrawal.value.coin.symbol,

            pin: pin.value

        };

        const res = await createWithdrawal(payload);

        if (res.success) {

            pinia.state.withdrawal = {

                ...withdrawal.value,

                reference: res.reference,

                fee: res.fee,

                netAmount: res.netAmount,

                createdAt: res.createdAt,

                step: 4

            };

        } else {

            notify.error(res.message);

        }

    } catch (err) {

        notify.error(err.message || "Withdrawal failed.");

    } finally {

        loading.value = false;

    }

};
/**
 * Current Step
 */
const currentStep = ref(
  pinia.state.withdrawal?.step || 1
);

/**
 * Form
 */


/**
 * Selected Coin
 */
const selectedCoin = computed(() => {
  return (
    pinia.state.selectedCryptoPrice || {
      name: "Bitcoin",
      symbol: "BTC",
      icon: "/img/bitcoin.png",
      price: 0
    }
  );
});

const selectedBalance = computed(() => {

    return (
    pinia.state.cryptoBalance?.balances?.find(
        item => item.coin === selectedCoin.value?.symbol
    ) || null
    );

});


/**
 * User Balance
 */
 const userBalance = computed(() => {
  return selectedBalance.value?.balance || 0;
});

/**
 * USD Balance
 */
 const balanceUSD = computed(() => {

    return Number(
    selectedBalance.value?.valueUSD || 0
    ).toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
    });

});

const amountUSD = computed(() => {

    const usd =
    amount.value *
    (selectedBalance.value?.usdPrice || 0);

    return usd.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
    });

});

/**
 * Networks
 */
 const networkOptions = computed(() => {

const network =
  selectedBalance.value?.network;

if (!network) return [];

return [network];

});

const form = ref({
  walletAddress:
    pinia.state.withdrawal?.walletAddress || "",

  network:
  selectedBalance.value?.network || pinia.state.withdrawal?.network || ""
});

const handleClose = () => {
      reveal.value = true
      pinia.state.withdrawal.step = 1;
      form.value.network = selectedBalance.value?.network
}

/**
 * Naive Select Options
 */
const networkSelectOptions = computed(() =>

  networkOptions.value.map(item => ({
    label: item,
    value: item
  }))

);

/**
 * Paste Wallet Address
 */
const pasteAddress = async () => {

  try {

    if (!navigator.clipboard) {
      throw new Error();
    }

    const text =
      await navigator.clipboard.readText();

    form.value.walletAddress = text;

    notify.success("Wallet address pasted.");

  } catch {

    notify.error("Unable to access clipboard.");

  }

};

/**
 * Continue
 */
const nextStep = () => {

  if (!form.value.walletAddress.trim()) {

    notify.error(
      "Please enter recipient wallet address."
    );

    return;

  }

  if (!form.value.network) {

    notify.error(
      "Please select a network."
    );

    return;

  }

  pinia.state.withdrawal = {

    ...(pinia.state.withdrawal || {}),

    step: 2,

    coin: selectedCoin.value,

    walletAddress:
      form.value.walletAddress,

    network:
      form.value.network,

    balance:
      userBalance.value,

    balanceUSD:
      balanceUSD.value

  };

  currentStep.value = 3;

};

/**
 * Back
 */
const previousStep = () => {

  if (currentStep.value > 1) {

    currentStep.value--;

    pinia.state.withdrawal.step =
      currentStep.value;

  }

};
</script>

