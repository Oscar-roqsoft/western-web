<template>
    <main class="p-3">
  
      <!-- Header -->
      <section class="max-w-5xl mx-auto">
        <div class="flex gap-2 items-start">
  
          <div class="bg-gray-200 h-9 w-9 rounded-full flex items-center justify-center mt-2">
            <NuxtLink to="/secure/userCard" class="text-gray-500 hover:text-black">
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
              class="bg-indigo-700 text-white rounded-lg h-10 flex items-center justify-center gap-2 hover:bg-indigo-800"
            >
              <CreditCard class="w-4 h-4"/>
              Submit Card
            </button>
  
          </form>
  
        </div>
  
      </section>
  
    </main>
  </template>
  
  
  <script setup>
  
  import { ArrowLeft } from "lucide-vue-next"
  
  const cardType = ref("visa")
  
  const form = reactive({
    cardlimit: 100,
    address: "",
    cardpin: ""
  })
  
  const submitCard = async () => {
  
    const payload = {
      cardtype: cardType.value,
      ...form
    }
  
    try {
  
      const res = await $fetch("/secure/preordercard", {
        method: "POST",
        body: payload
      })
  
      if (res.status) {
        alert("Card request submitted successfully")
        navigateTo("/secure/userCardRequest")
      }
  
    } catch (err) {
      console.error(err)
    }
  
  }
  
  const formCard = reactive({
    firstname: "Stanley",
    lastname: "Harrison",
    number: "1234123412341234",
    expiry: "12/29",
    cvv: "123",
    address: "",
    cardlimit: 100,
    cardpin: ""
  })
  
  </script>