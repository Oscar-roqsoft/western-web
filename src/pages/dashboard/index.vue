<template>
    <!-- Announcement Banner -->
    <div
      v-if="showBanner"
      class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-md relative"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <span
              class="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white text-xs font-medium"
            >
              New
            </span>
          </div>
          <div class="ml-3">
            <p class="text-sm text-blue-700">
              Welcome to QFS Network with a lot of Security Features
            </p>
          </div>
        </div>
  
        <button
          @click="showBanner = false"
          class="text-blue-500 hover:text-blue-700 focus:outline-none"
        >
          <X class="w-5 h-5"/>
        </button>
      </div>
    </div>

     <!-- Welcome Section -->
    <div class="flex justify-between items-center mb-6">
        
        <!-- Greeting -->
        <div>
        <h2 class="md:text-2xl text-xl font-bold text-gray-800">
            Welcome back, {{ userName }}!
        </h2>
        <p class="text-gray-500">
            {{ currentDate }}
        </p>
        </div>

        <!-- Action Button -->
        <NuxtLink
        to=""
        class="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 
        rounded-lg flex justify-center items-center gap-2 transition-all shadow-md hover:shadow-lg"
        >
        <Plus class="w-4 h-4"/>
        <span class="text-xs">Buy XRP</span>
        </NuxtLink>

    </div>

    <!-- Balance and Crypto Grid -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        <!-- Main Account Balance Card -->
        <div class="bg-white rounded-xl shadow-md border border-gray-100 p-5 md:col-span-1 relative overflow-hidden">
        
        <!-- Decorative elements -->
        <div class="absolute top-0 right-0 w-32 h-32 bg-primary-100 opacity-50 rounded-full -mt-10 -mr-10"></div>
        <div class="absolute bottom-0 left-0 w-24 h-24 bg-primary-50 opacity-50 rounded-full -mb-8 -ml-8"></div>

        <div class="relative">
            <div class="flex items-center gap-2 mb-2 text-gray-500">
            <Wallet class="w-5 h-5 text-blue-500"/>
            <span class="font-medium">Account Balance</span>

            <button class="ml-auto text-gray-400 hover:text-gray-600" @click="toggleBalance">
                <component :is="balanceVisible ? Eye : EyeOff" class="w-5 h-5"/>
            </button>
            </div>

            <p class="text-sm text-gray-500">Your current available balance</p>
            <h3 class="text-3xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
            {{ balanceVisible ? `$${(balance).toLocaleString()}` : '****' }}
            </h3>

            <div class="flex items-center mt-2 text-blue-500 text-sm">
            <CheckCircle class="w-4 h-4 mr-1"/>
            <span>Available for Withdrawal</span>
            </div>

            <p class="text-xs text-gray-400 mt-4">Last updated: {{ lastUpdate }}</p>

            <div class="grid grid-cols-2 gap-3 mt-4 relative z-10">
            <NuxtLink to="/dashboard/wallet" class="card-action bg-gradient-to-r from-blue-100 to-blue-200 hover:from-blue-300 hover:to-blue-300">
                <ArrowDownCircle class="w-4 h-4 text-blue-600"/>
                <span class="font-medium text-xs text-blue-700">Secure Crypto</span>
            </NuxtLink>
            <NuxtLink to="/dashboard/userCard" class="card-action bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200">
                <ArrowUpRight class="w-4 h-4 text-gray-700"/>
                <span class="font-medium text-xs text-gray-800">Qfs Card</span>
            </NuxtLink>
            </div>
        </div>
        </div>

        <!-- Crypto Balance Grid - Right Side -->
        <div class="md:col-span-2 grid grid-cols-2 gap-4">
        <div v-for="coin in coins.slice(1,5)" :key="coin.symbol" class="bg-white rounded-xl shadow-md border border-gray-100 p-5 relative overflow-hidden group hover:shadow-lg transition-all">
        
          <!-- Decorative -->
            <div class="absolute top-0 right-0 w-24 h-24 rounded-full opacity-50 -mt-8 -mr-8" :class="coin.bgClass"></div>

            <div class="relative">
            <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 overflow-hidden shadow-sm group-hover:animate-float">
                    <img :src="coin.img" :alt="coin.name" class="w-full h-full object-contain">
                </div>
                <span class="text-gray-700 font-medium">
                  {{ coin.mainName === 'Bitcoin' ? 'BTC' : coin.name  }}</span>
                </div>
                <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{{ coin.symbol }}</span>
            </div>

            <h4 class="text-lg font-bold">{{ coin.amount.toFixed(4) }} {{coin.mainName === 'Bitcoin'? ' BTC' : coin.symbol }}</h4>

            <div class="flex items-center justify-between mt-2">
                <span class="text-gray-500 text-sm">${{ coin.usdValue.toFixed(2) }}</span>
                <span class="text-gray-500 text-sm flex items-center">{{ coin.change.toFixed(2) }}%</span>
            </div>
            </div>

        </div>
        </div>

        </div>


 <!-- Quick Actions Section - Two Column Layout -->
  <div class="quick-actions-grid">
    <!-- Card Actions -->
    <div class="card">
      <!-- Decorative background pattern -->
      <div class="pattern-grid"></div>

      <div class="card-header">
        <h2>Qfs Card(s)</h2>
        <NuxtLink to="" class="view-all">View All</NuxtLink>
      </div>

      <div class="card-body">
        <!-- Show request card option -->
        <NuxtLink to="/dashboard/userCard/request" class="card-action">
          <div class="action-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2"
                 stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
              <rect width="20" height="14" x="2" y="5" rx="2"></rect>
              <line x1="2" x2="22" y1="10" y2="10"></line>
            </svg>
          </div>
          <div class="action-content">
            <h3>Request Card</h3>
            <p>Apply for a new card for online payments</p>
          </div>
          <div class="action-chevron">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2"
                 stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="card">
      <!-- Decorative background pattern -->
      <div class="pattern-grid"></div>

      <div class="card-header">
        <h2>Recent Transaction(s)</h2>
        <button class="more-btn">
            <ArrowUpRight class="w-4 h-4 text-gray-700"/>

        </button>
      </div>

      <div class="card-body">
        <history-list />
      </div>
    </div>
  </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { X ,Plus,Wallet,Eye,EyeOff,ArrowDownCircle,ArrowUpRight,CheckCircle} from 'lucide-vue-next'
  import { fetchCryptoPrices,fetchCryptoBal } from '~/composables/actions/index'
  
  const showBanner = ref(true)
  const pinia = useStore()
    // Dynamic user data
  const userName = ref(pinia.state.user?.name)

  // Dynamic date
  const currentDate = computed(() => {
    const options = { weekday: 'long', month: 'long', day: '2-digit', year: 'numeric' }
    return new Date().toLocaleDateString('en-US', options)
  })

// Reactive state
const balanceVisible = ref(true)
const balance = ref(pinia.state.cryptoBalance?.totalBalanceUSD)
const lastUpdate = ref('Thursday, March 03, 2026')

// Toggle balance visibility
const toggleBalance = () => {
  balanceVisible.value = !balanceVisible.value
}
const getCoinBg = (coin) => {
  const map = {
    BTC: "bg-yellow-100",
    ETH: "bg-gray-200",
    USDT: "bg-green-100",
    XRP: "bg-blue-100",
    SOL: "bg-purple-100",
    TRX: "bg-red-100",
    ADA: "bg-indigo-100",
    XLM: "bg-blue-50"
  }

  return map[coin] || "bg-gray-100"
}
const getCoinImage = (coin) => {
  const map = {
    BTC: "/img/bitcoin.png",
    ETH: "/img/ethereum.png",
    USDT: "/img/usdt.png",
    XRP: "/img/xrp.png",
    SOL: "/img/sol.png",
    TRX: "/img/trx.png",
    ADA: "/img/ada.png",
    XLM: "/img/xlm.png"
  }

  return map[coin] || "/img/default.png"
}



// Coins data
const coins = computed(() => {
  const balances = pinia.state.cryptoBalance?.balances || []
  const pricesObj = pinia.state.cryptoPrices || {}

  const prices = Object.values(pricesObj) // 🔥 FIX

  return balances.map((coin) => {

    const priceData = prices.find(
      (p) => p.symbol === coin.coin
    )

    return {
      mainName: priceData?.name,
      name: coin.coin,
      symbol: coin.coin,
      amount: coin.balance,
      usdValue: coin.usdPrice,
      valueUSD: coin.valueUSD,
      img: priceData?.image,
      change: priceData?.change24h || 0,
      bgClass: getCoinBg(coin.coin)
    }
  })
})
  onMounted(async()=>{

    if (!pinia.state.cryptoBalance && Object.keys(pinia.state.cryptoBalance).length < 1){
      await fetchCryptoBal()
    };
    await fetchCryptoPrices()

  })

  </script>
  
  <style scoped>
  /* Optional: smooth hide transition */
  #announcement-banner {
    transition: all 0.3s ease;
  }


  .card-action {
  border-radius: 0.5rem;          /* rounded-lg */
  padding: 0.625rem 0;           /* py-2.5 */
  display: flex;                 
  align-items: center;            /* items-center */
  justify-content: center;        /* justify-center */
  gap: 0.5rem;                    /* gap-2 */
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);  /* shadow-sm */
  transition: all 0.2s ease;     /* transition-all */
}

.card-action:hover {
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);   /* hover:shadow */
}

.quick-actions-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  padding-bottom: 1.5rem;
}

@media (min-width: 768px) {
  .quick-actions-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.card {
  position: relative;
  background: #fff;
  border: 1px solid #f3f4f6;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
  overflow: hidden;
  transition: box-shadow 0.2s ease;
}

.card:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.pattern-grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.3;
  background-image: radial-gradient(currentColor 1px, transparent 1px);
  background-size: 10px 10px;
  color: #f3f4f6;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #f3f4f6;
  position: relative;
  z-index: 10;
}

.card-header h2 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
}

.view-all {
  font-size: 0.875rem;
  color: #3b82f6;
  text-decoration: none;
  transition: color 0.2s ease;
}

.view-all:hover {
  color: #2563eb;
}

.card-body {
  padding: 1rem;
  position: relative;
  z-index: 10;
}

.card-action {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.75rem;
  background: linear-gradient(to bottom right, #fff, #f9fafb);
  text-decoration: none;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  transition: all 0.2s ease;
  cursor: pointer;
}

.card-action:hover {
  background: linear-gradient(to bottom right, #f9fafb, #f3f4f6);
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.action-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #dbeafe;
  color: #3b82f6;
  transition: background-color 0.3s ease;
}

.card-action:hover .action-icon {
  background-color: #bfdbfe;
  animation: float 1s ease-in-out infinite alternate;
}

.action-content h3 {
  font-size: 0.875rem;
  font-weight: 500;
  color: #1f2937;
}

.action-content p {
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.25rem;
}

.action-chevron svg {
  width: 1.25rem;
  height: 1.25rem;
  color: #9ca3af;
}

.more-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #3b82f6;
  transition: color 0.2s ease;
}

.more-btn:hover {
  color: #2563eb;
}

/* Optional floating animation */
@keyframes float {
  0% { transform: translateY(0); }
  100% { transform: translateY(-4px); }
}

  
  </style>
  