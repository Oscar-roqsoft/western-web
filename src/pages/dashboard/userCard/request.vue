<template>
    <main class="md:p-3">
  
      <!-- Header -->
      <section class="max-w-5xl mx-auto">
        <div class="flex gap-2 items-start">
  
          <div class="bg-gray-200 h-9 w-9 rounded-full flex items-center justify-center mt-2">
            <NuxtLink to="/dashboard/userCard" class="text-gray-500 hover:text-black">
              <ArrowLeft class="w-5 h-5"/>
            </NuxtLink>
          </div>
  
          <div>
            <h1 class="text-xl font-bold">Request Card</h1>
            <p class="text-gray-500">Apply for a new Card</p>
          </div>
  
        </div>
      </section>
  
  
      <!-- Info Box -->
      <section class="max-w-5xl mx-auto mt-6 bg-blue-50 shadow rounded-lg p-4 flex gap-3">
  
        <Info class="text-blue-800 w-6 h-6"/>
  
        <div class="text-blue-900 text-sm">
          <p class="font-bold">Important Information</p>
  
          <ul class="list-disc ml-5 mt-1">
            <li>A one-time fee of $1,000.00 is required for card issuance</li>
            <li>Processing takes about 6 business days</li>
            <li>You’ll receive an email notification once ready</li>
          </ul>
        </div>
  
      </section>
  
  
      <!-- Card Form -->
      <section class="max-w-5xl mx-auto bg-white shadow rounded-xl mt-8">
  
        <div class="border-b p-5">
          <h2 class="font-bold text-lg">Card Request Form</h2>
          <p class="text-gray-500 text-sm">
            Fill out the details to request your card
          </p>
        </div>
  
  
        <div class="grid md:grid-cols-2 gap-6 p-6">
  
          <!-- Card Preview -->
          <div class="flex justify-center overflow-hidden">
  
            <VisaCard
              :firstname="formCard.firstname"
              :lastname="formCard.lastname"
              :number="formCard.number"
              :expiry="formCard.expiry"
              :cvv="formCard.cvv"
              bank="QFS Web3"
              email="support@qfsweb3.com"
            />
  
          </div>
  
  
          <!-- Form -->
          <form @submit.prevent="submitCard" class="grid gap-4">
  
            <!-- Card Type -->
            <div>
              <label class="font-semibold text-gray-700">
                Card Type
              </label>
  
              <select
                v-model="cardType"
                class="w-full mt-1 border rounded-lg p-2"
                required
              >
                <option disabled value="">Select Card Type</option>
                <option value="master">Master Card</option>
                <option value="visa">Visa Card</option>
                <option value="amex">Amex Card</option>
              </select>
  
              <p class="text-gray-400 text-sm">
                Select Card Type
              </p>
            </div>
  
  
            <!-- Card Limit -->
            <div>
              <label class="font-semibold text-gray-700">
                Card Limit
              </label>
  
              <input
                type="number"
                min="100"
                max="100000"
                v-model="form.cardlimit"
                class="w-full border rounded-lg p-2"
              />
  
              <p class="text-gray-400 text-sm">
                Set a spending limit between $100 and $100,000
              </p>
            </div>
  
  
            <!-- Address -->
            <div>
              <label class="font-semibold text-gray-700">
                Residential Address
              </label>
  
              <input
                v-model="form.address"
                type="text"
                class="w-full border rounded-lg p-2"
                required
              />
  
              <p class="text-gray-400 text-sm">
                Enter address where card will be shipped
              </p>
            </div>
  
  
            <!-- PIN -->
            <div>
              <label class="font-semibold text-gray-700">
                Card PIN
              </label>
  
              <input
                v-model="form.cardpin"
                type="password"
                maxlength="4"
                placeholder="Enter 4 digit PIN"
                class="w-full border rounded-lg p-2 font-bold"
                required
              />
  
              <p class="text-gray-400 text-sm">
                Create a secure 4-digit PIN
              </p>
            </div>
  
  
            <!-- Submit -->
            <button
            type="submit"
            :disabled="isDisabled"
            class="bg-indigo-600 text-white h-10 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <CreditCard class="w-4 h-4"/>

            <span v-if="!isSubmitting">Submit Card</span>
            <Spinner v-else/>
          </button>
  
          </form>
  
        </div>
  
      </section>
  
    </main>
  </template>
  
  

  <script setup>
  import { ref, reactive, computed, watch } from "vue"
  import { ArrowLeft, CreditCard ,Info} from "lucide-vue-next"
  import { requestCard } from "@/composables/requests/card"
  import { fetchMyUserCards } from "@/composables/actions/index"

  
  const notify = useNotify()
  const pinia = useStore()
  
  /* =========================
     STATE
  ========================= */
  
  const isSubmitting = ref(false)
  
  const cardType = ref("visa")
  
  const form = reactive({
    cardlimit: 100,
    address: "",
    cardpin: ""
  })
  
  /* =========================
     CARD PREVIEW (AUTO UPDATE)
  ========================= */
  
  const formCard = reactive({
    firstname: "Stanley",
    lastname: "Harrison",
    number: "1234 1234 1234 1234",
    expiry: "12/29",
    cvv: "123"
  })
  
  /* =========================
     VALIDATIONS
  ========================= */
  
  const isDisabled = computed(() => {
    return (
      !form.address ||
      !form.cardpin ||
      form.cardpin.length !== 4 ||
      isSubmitting.value
    )
  })
  
  /* =========================
     GENERATE CARD DETAILS
  ========================= */
  
  const generateCardNumber = () => {
    return "4" + Math.floor(Math.random() * 1e15).toString().padStart(15, "0")
  }
  
  const generateExpiry = () => {
    const year = new Date().getFullYear() + 3
    return `12/${year.toString().slice(-2)}`
  }
  
  const generateCVV = () => {
    return Math.floor(100 + Math.random() * 900).toString()
  }
  
  /* =========================
     WATCH (LIVE PREVIEW)
  ========================= */
  
  watch(cardType, () => {
    // regenerate card details when type changes
    formCard.number = generateCardNumber()
    formCard.expiry = generateExpiry()
    formCard.cvv = generateCVV()
  })
  
  /* =========================
     SUBMIT FUNCTION
  ========================= */
  
  const submitCard = async () => {
    if (isDisabled.value) return
  
    try {
      isSubmitting.value = true
  
      const payload = {
        cardtype: cardType.value,
        cardlimit: form.cardlimit,
        address: form.address,
        cardpin: form.cardpin
      }
      console.log(payload)
  
      const res = await requestCard(payload)
  
      if (res.success) {
        notify.success("Card request submitted successfully")

        await fetchMyUserCards()
  
        // Reset form
        form.cardlimit = 100
        form.address = ""
        form.cardpin = ""
  
        // regenerate preview
        formCard.number = generateCardNumber()
        formCard.expiry = generateExpiry()
        formCard.cvv = generateCVV()
  
      } else {
        notify.error( res.message || "Request failed")
      }
  
    } catch (err) {
      console.error(err)
  
      // notify({
      //   type: "error",
      //   text: "Something went wrong"
      // })
    } finally {
      isSubmitting.value = false
    }
  }
  
  /* =========================
     INITIAL GENERATION
  ========================= */
  
  formCard.number = generateCardNumber()
  formCard.expiry = generateExpiry()
  formCard.cvv = generateCVV()
  </script>



