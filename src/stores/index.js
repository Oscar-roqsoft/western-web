


import { defineStore } from 'pinia'

export const useStore = defineStore('Crypto', () => {

  const state = reactive({
    user:null,
    adminUsers:[],
    isAuthenticated:false,
    email:null,
    currentStep:1,
    selectedCryptoPrice: null,
    cryptoPrices:[],
    notification:[],
    allTransaction:[],
    userTransaction:[],
    selectedTransaction: null, // new
    cryptoBalance:null,
    walletAddress:null,
    adminWalletAddress:null,
    current_page:'home',
    selectedNavMenu:'home',
    walletInfo:[],
    cardDetails:[],
    securedWallets:[],
    allCardDetails:[],
    selected_dispute_status:'all',
    isloadingPriceCard:false,
    isFetchingCryptobal:false,
    isFetchingCrypto:false,
    withdrawal:{
      step: 1,
      coin: null,
      walletAddress: "",
      network: "",
      amount: 0,
      feePaid: false,
      securityPassed: false
    },
    verificationForm: {
      firstName: "",
      lastName: "",
      dob: "",
      nationality: "",
      address: "",

      documentType: "",
      documentNumber: "",

      frontFile: null,
      backFile: null,
      selfieFile: null,
    },
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
  const setallCardDetails = (payload) => {
    state.allCardDetails = payload
  }
  
  const setAdminUsers = (payload) => {
    state.adminUsers = payload
  }
  
  const setadminWalletAddress = (payload) => {
    state.adminWalletAddress = payload
  }
  const setallTransaction = (payload) => {
    state.allTransaction = payload
  }
  const setUserTransaction = (payload) => {
    state.userTransaction = payload
  }
  const setnotification = (payload) => {
    state.notification = payload
  }
  const setsecuredWallets = (payload) => {
    state.securedWallets = payload
  }
 

  const clearUser =()=>{
    state.cryptoPrices = []
    state.selectedCryptoPrice = null
    state.user = null
    state.adminUsers = []
    state.isFetchingCrypto = false
    state.user = null
    state.selectedTransaction = null
    state.isFetchingCryptobal = false
    state.isAuthenticated = false
    state.verificationForm = {
      firstName: "",
      lastName: "",
      dob: "",
      nationality: "",
      address: "",
      documentType: "",
      documentNumber: "",
      frontFile: null,
      backFile: null,
      selfieFile: null,
    }
    state.currentStep = 1
  }
  const logout =()=>{
    state.cryptoPrices = []
    state.notification = []
    state.cryptoBalance = null
    state.allTransaction = []
    state.userTransaction = []
    state.walletInfo = []
    state.cardDetails = []
    state.securedWallets = []
    state.allCardDetails = []
    state.selectedCryptoPrice = null
    state.user = null
    state.adminWalletAddress = null
    state.isFetchingCrypto = false
    state.user = null
    state.selectedTransaction = null
    state.isFetchingCryptobal = false
    state.isAuthenticated = false
    state.walletAddress = null
    state.verificationForm = {
      firstName: "",
      lastName: "",
      dob: "",
      nationality: "",
      address: "",
      documentType: "",
      documentNumber: "",
      frontFile: null,
      backFile: null,
      selfieFile: null,
    }
    state.currentStep = 1
    navigateTo("/login")

  }

  return {
    setUser,
    state,
    clearUser,
    setAdminUsers,
    logout,
    setCryptoPrices,
    setSelectedCryptoPrice,
    setSelectedTransaction,
    setCryptoBalance,
    setWalletAddress,
    setwalletInfo,
    setcardDetails,
    setadminWalletAddress,
    setallTransaction,
    setUserTransaction,
    setallCardDetails,
    setnotification,
    setsecuredWallets
    
  }

}, {persist: {
    storage: persistedState.localStorage,
  }},
)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot));
}