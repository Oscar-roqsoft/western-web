<template>
    <div class="auth-gradient min-h-screen flex items-center justify-center p-4">
      <div class="w-full max-w-xl md:px-4">
  
        <!-- Logo -->
        <div class="text-center mb-6">
          <NuxtLink to="/">
            <img src="/logo/8.png"  alt="Logo" class="h-16 mx-auto" />
          </NuxtLink>
        </div>
  
        <!-- Card -->
        <div class="bg-blue rounded-xl shadow-lg overflow-hidden">
  
          <!-- Header -->
          <div class="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <h3 class="font-bold text-xl text-white">Create an Account</h3>
          </div>
  
          <!-- Form -->
          <div class="p-6">
  
            <form @submit.prevent="register">
  
              <!-- Full Name -->
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                  <span class="text-red-500">*</span>
                </label>
  
                <div class="relative">
  
                  <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    👤
                  </div>
  
                  <input
                    v-model="form.name"
                    type="text"
                    placeholder="Enter Full Name"
                    class="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
              </div>
  
  
              <!-- Email -->
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                  <span class="text-red-500">*</span>
                </label>
  
                <div class="relative">
                  <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    ✉️
                  </div>
  
                  <input
                    v-model="form.email"
                    type="email"
                    placeholder="name@example.com"
                    class="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
              </div>
  
  
              <!-- Phone -->
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                  <span class="text-red-500">*</span>
                </label>
  
                <div class="relative">
  
                  <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    📞
                  </div>
  
                  <input
                    v-model="form.phone"
                    type="tel"
                    placeholder="Enter Phone Number"
                    class="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
  
                </div>
              </div>
  
  
              <!-- Password -->
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Password
                  <span class="text-red-500">*</span>
                </label>
  
                <div class="relative">
  
                  <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    🔒
                  </div>
  
                  <input
                    v-model="form.password"
                    type="password"
                    placeholder="Create Password"
                    class="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
  
                </div>
              </div>
  
  
              <!-- Confirm Password -->
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                  <span class="text-red-500">*</span>
                </label>
  
                <div class="relative">
  
                  <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    🔒
                  </div>
  
                  <input
                    v-model="form.password_confirmation"
                    type="password"
                    placeholder="Confirm Password"
                    class="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
  
                </div>
              </div>
  
  
              <!-- Country -->
              <div class="mb-5">
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Country <span class="text-red-500">*</span>
                </label>

                <div class="relative group">
                    
                    <!-- Icon -->
                    <div class="absolute left-3 top-1/2 -translate-y-1/2 flex items-center pl-3 text-gray-400 group-focus-within:text-primary">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
                        <circle cx="12" cy="10" r="3"/>
                    </svg>
                    </div>

                    <!-- Select -->
                    <select
                    v-model="form.country"
                    class="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-xl 
                            bg-white shadow-sm
                            focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
                            transition-all duration-200"
                    >
                    <option disabled class="text-gray-300" value="">Select Country</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Ghana">Ghana</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    </select>

                </div>
                </div>


              <!-- <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="map-pin" class="lucide lucide-map-pin h-5 w-5 text-gray-400">
                                        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                                </div> -->
  
  
              <!-- Hidden Referral -->
              <input type="hidden" v-model="form.refer" />
  
  
              <!-- Submit -->
              <div class="mb-6">
  
                <button
                  type="submit"
                  class="w-full flex justify-center items-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-primary-700 hover:to-primary-800 text-white font-medium rounded-lg transition"
                >
                   Register
                </button>
  
              </div>
  
  
              <!-- Login -->
              <div class="text-center">
                <p class="text-sm text-gray-600">
                  Already have an account?
  
                  <NuxtLink
                    to="/login"
                    class="font-medium text-primary-600 hover:text-primary-800"
                  >
                    Login
                  </NuxtLink>
  
                </p>
              </div>
  
            </form>
  
          </div>
  
        </div>
  
        <!-- Footer -->
        <div class="mt-6 text-center">
          <p class="text-xs text-gray-600">
            © Copyright 2026 Qfs Web3 — All Rights Reserved.
          </p>
        </div>
  
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive } from "vue"
  definePageMeta(
        {
        layout: 'custom2',
        }
    );
  
  const form = reactive({
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
    country: "",
    refer: "NB"
  })
  
  const register = () => {
    console.log(form)
  
    // call API here
  }
  </script>
  