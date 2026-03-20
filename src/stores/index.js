


import { defineStore } from 'pinia'

export const useStore = defineStore('Crypto', () => {

  const state = reactive({
    user:null,
    isAuthenticated:false,
    email:null,
    cryptoPrices:[],
    selectedCryptoPrice: null,
    selectedTransaction: null, // new
    cryptoBalance:[],
    walletAddress:null,
    current_page:'home',
    selectedNavMenu:'home',
    walletInfo:[],
    cardDetails:[],
    selected_dispute_status:'all',
    isloadingPriceCard:false,
    isFetchingCryptobal:false,
    isFetchingCrypto:false,
  });

    const setUser = (payload)=>{
        state.user = payload
    }
    const setCryptoPrices = (payload)=>{
        state.cryptoPrices = payload
    }
    const setSelectedCryptoPrice = (coin) => {
      state.selectedCryptoPrice = coin
    }
    const setSelectedTransaction = (coin) => {
      state.selectedTransaction = coin
    }

    const setCryptoBalance = (payload)=>{
            state.cryptoBalance = payload
    }
  const setWalletAddress = (payload) => {
    state.walletAddress = payload
  }
  const setwalletInfo = (payload) => {
    state.walletInfo = payload
  }
  const setcardDetails = (payload) => {
    state.cardDetails = payload
  }
 
 

  const clearUser =()=>{
    state.cryptoPrices = []
    state.selectedCryptoPrice = null
    state.user = null
    state.isFetchingCrypto = false
    state.user = null
    state.selectedTransaction = null
    state.isFetchingCryptobal = false
    state.isAuthenticated = false

  }
  const logout =()=>{
    // state.cryptoPrices = []
    state.cryptoBalance = []
    state.walletInfo = []
    state.cardDetails = []
    state.selectedCryptoPrice = null
    state.user = null
    state.isFetchingCrypto = false
    state.user = null
    state.selectedTransaction = null
    state.isFetchingCryptobal = false
    state.isAuthenticated = false
    state.walletAddress = null
    navigateTo("/login")

  }

  return {
    setUser,
    state,
    clearUser,
    logout,
    setCryptoPrices,
    setSelectedCryptoPrice,
    setSelectedTransaction,
    setCryptoBalance,
    setWalletAddress,
    setwalletInfo,
    setcardDetails
    
  }

}, {persist: {
    storage: persistedState.localStorage,
  }},
)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot));
}