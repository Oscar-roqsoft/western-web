<template>
    <BaseModal>
    
    <!-- Header -->
    <div class="flex justify-between items-center mb-4">
    <h2 class="font-bold text-lg">Send Crypto</h2>
    
    <button @click="emit('close')">
    <X class="w-5 h-5"/>
    </button>
    </div>
    
    
    <!-- Coin Info -->
    <div class="flex items-center gap-3 mb-4">
    <img :src="coin.icon" class="w-10 h-10 rounded-full"/>
    
    <div>
    <div class="font-semibold">
    {{ coin.name }} / {{ coin.symbol }}
    </div>
    
    <div class="text-sm text-gray-400">
    Balance: {{ balance }} {{ coin.symbol }}
    (~${{ balanceUSD }})
    </div>
    </div>
    </div>
    
    
    <!-- Recipient -->
     <div class="relative">
         <input
         v-model="recipient"
         placeholder="Recipient Address"
         class="w-full border rounded-lg p-2 mb-4 focus:ring-1 focus:ring-indigo-500 outline-none"
         />
         <div class=" absolute right-1 top-1.5 uppercase bg-blue-500 py-1.5 px-1.5 rounded-md
          text-gray-100 text-xs font-medium">{{ coin?.network }}</div>
     </div>

     <!-- <span class="text-gray-300 text-xs">Network : {{ coin?.network }}</span> -->
    
    <p v-if="recipient && !addressValid" class="text-red-500 text-xs mb-3">
    Invalid {{ coin.symbol }} wallet address
    </p>
    
    
    <!-- Amount -->
    <input
    v-model.number="amount"
    type="number"
    placeholder="Amount"
    class="w-full border rounded-lg p-2 mb-2 focus:ring-1 focus:ring-indigo-500 outline-none"
    />
    
    
    <!-- Percentage buttons -->
    <div class="flex gap-2 mb-3">
    <button
    v-for="p in percentages"
    :key="p"
    @click="setPercentage(p)"
    class="flex-1 border rounded-lg py-1 text-sm hover:bg-gray-100"
    >
    {{ p }}%
    </button>
    </div>
    
    
    <!-- USD value -->
    <div v-if="amount > 0" class="text-sm text-gray-500 mb-2">
    ≈ ${{ (amount * coin.price).toFixed(2) }}
    </div>
    
    
    <!-- Gas fee -->
    <div v-if="gasLoaded" class="text-sm text-gray-500">
    Gas Fee: {{ gasFee }} {{ coin.symbol }}
    </div>
    
    
    <!-- Total deduction -->
    <div v-if="gasLoaded" class="text-sm text-gray-500 mb-4">
    Total Deduction: {{ totalCost }} {{ coin.symbol }}
    </div>
    
    
    <!-- PIN -->
    <span class="text-xs text-gray-400">
    <span class="text-red-500">NB:</span>
    Make sure you created your PIN in profile section
    </span>
    
    <input
    v-model="pin"
    type="password"
    maxlength="4"
    placeholder="Enter 4-digit PIN"
    class="w-full mt-1 border rounded-lg p-2 mb-4 focus:ring-1 focus:ring-indigo-500 outline-none"
    />
    
    
    <!-- Send Button -->
    <button
    @click="handleSend"
    :disabled="isDisabled"
    class="w-full py-2 rounded-lg text-white transition"
    :class="isDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'"
    >
    {{ sending ? "Sending..." : "Send" }}
    </button>
    
    </BaseModal>
    </template>
    
    
    
    <script setup>
    
    import { ref, computed, watch } from "vue"
    // import { useStore } from "@/stores/CryptoStore"
    import { X } from "lucide-vue-next"
     import { calGasFee,sendCoin } from "@/composables/requests/crypto"
     import { fetchCryptoBal } from "@/composables/actions/index"
    
    const store = useStore()
    const notify = useNotify()
    
    const emit = defineEmits(["close"])
    
    
    
    /* -----------------------------
    COIN
    ----------------------------- */
    
    const coin = computed(() => store.state.selectedCryptoPrice || {})
    
    
    
    /* -----------------------------
    BALANCE
    ----------------------------- */
    
    const balance = computed(() => {
    
    const bal = store.state.cryptoBalance.balances?.find(
    (b) => b.coin === coin.value.symbol
    )
    
    return bal ? bal.balance : 0
    })

   
    
    
    const balanceUSD = computed(() =>
       (balance.value * (coin.value.price || 0)).toFixed(2)
    )
    
    
    
    /* -----------------------------
    FORM STATE
    ----------------------------- */
    
    const recipient = ref("")
    const amount = ref(0)
    const pin = ref("")
    
    const gasFee = ref(0)
    const totalCost = ref(0)
    
    const gasLoaded = ref(false)
    
    const sending = ref(false)
    
    const percentages = [25,50,75,100]
    
    
    
    /* -----------------------------
    DEBOUNCE TIMER
    ----------------------------- */
    
    let gasTimer = null
    
    
    
    /* -----------------------------
    WALLET VALIDATION
    ----------------------------- */
    
    const validateAddress = (coin,address) => {
    
    if(!address) return false
    
    const patterns = {
    
    BTC:/^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/,
    
    ETH:/^0x[a-fA-F0-9]{40}$/,
    
    USDT:/^T[a-zA-Z0-9]{33}$/,
    
    TRX:/^T[a-zA-Z0-9]{33}$/,
    
    SOL:/^[1-9A-HJ-NP-Za-km-z]{32,44}$/,
    
    XRP:/^r[0-9a-zA-Z]{24,34}$/,
    
    XLM:/^G[A-Z2-7]{55}$/,
    
    ADA:/^addr1[0-9a-z]{20,}$/,
    
    }
    
    const regex = patterns[coin]
    
    if(!regex) return true
    
    return regex.test(address)
    
    }
    
    
    
    const addressValid = computed(() => {
    return validateAddress(coin.value.symbol,recipient.value)
    })
    
    
    
    /* -----------------------------
    BUTTON DISABLE LOGIC
    ----------------------------- */
    
    const isDisabled = computed(()=>{
    
    if(sending.value) return true
    
    if(!recipient.value) return true
    
    if(!addressValid.value) return true
    
    if(!amount.value || amount.value<=0) return true
    
    if(pin.value.length !== 4) return true
    
    if(!gasLoaded.value) return true
    
    return false
    
    })
    
    
    
    /* -----------------------------
    SET PERCENTAGE
    ----------------------------- */
    
    const setPercentage = (p)=>{
    
    const val = (balance.value * p)/100
    
    amount.value = parseFloat(val.toFixed(8))
    
    }
    
    
    
    /* -----------------------------
    CALCULATE GAS
    ----------------------------- */
    
    const calculateGas = async ()=>{
    
    try{
    
        const payload = {
        coin:coin.value.symbol,
        amount:amount.value
        }
        
        const res = await calGasFee(payload)
   
    
    
        if(res.success){
        
            gasFee.value = res.data.gasFee
            
            totalCost.value = res.data.totalCost
            
            gasLoaded.value = true
        
        }
        
        }catch(error){
        
            console.error("Gas fee error",error)
            
            gasLoaded.value = false
        
        }
    
    }
    
    
    
    /* -----------------------------
    WATCH INPUTS WITH DEBOUNCE
    ----------------------------- */
    
    watch([amount,recipient],()=>{
    
    gasLoaded.value = false
    
    clearTimeout(gasTimer)
    
    gasTimer = setTimeout(()=>{
    
    if(!addressValid.value) return
    
    if(!amount.value || amount.value<=0) return
    
    calculateGas()
    
    },800)
    
    })
    
    
    
    /* -----------------------------
    SEND CRYPTO
    ----------------------------- */
    
    const handleSend = async ()=>{
    
        if(amount.value > balance.value){
            
            notify.error("Insufficient balance")
            
         return
        
        }
    
    try{
    
    sending.value = true
    
    const payload = {
        coin:coin.value.symbol,
        amount:amount.value,
        recipientAddress:recipient.value,
        pin:pin.value
    }

    const res = await sendCoin(payload)
   
    
    
    
    if(res.success){
    
        notify.success("Transaction sent successfully")
    
         await fetchCryptoBal()
    
        // if(bal.success){
        
        //     store.state.balances = bal.data.balances
        
        // }
        
            recipient.value=""
            amount.value=0
            pin.value=""
            
            gasLoaded.value=false
            
            emit("close")
    
    }else{
    
      notify.error(res.message || "Transaction failed")
    
    }
    
    }catch(error){
    
    console.error(error)
    
    // alert("Transaction failed")
    
    }finally{
    
    sending.value=false
    
    }
    
    }
    
    </script>
    
    
    
    <style scoped>
    input:focus{
    outline:none;
    }
    </style>