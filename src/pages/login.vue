<template>
    <div
      class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 p-4"
    >
      <div class="w-full max-w-md">
  
        <!-- Logo -->
        <div class="text-center mb-8">
          <NuxtLink to="/">
            <img src="/logo/8.png" class="h-16 mx-auto" />
            
          </NuxtLink>
        </div>
  
        <!-- Card -->
        <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
  
          <!-- Header -->
          <div class="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5">
            <h3 class="text-white text-xl font-bold">
              User Login
            </h3>
          </div>
  
          <!-- Form -->
          <div class="p-7">
  
            <form @submit.prevent="login">
  
              <!-- Email -->
              <div class="mb-5">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
  
                <div class="relative">
  
                  <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="m22 7-9 6-9-6"/>
                      <rect x="2" y="4" width="20" height="16" rx="2"/>
                    </svg>
                  </div>
  
                  <input
                    v-model="email"
                    type="email"
                    placeholder="name@example.com"
                    class="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                    required
                  />
  
                </div>
              </div>
  
  
              <!-- Password -->
              <div class="mb-5">
  
                <div class="flex justify-between mb-2">
                  <label class="text-sm font-medium text-gray-700">
                    Password
                  </label>
  
                  <NuxtLink
                    to="/reset"
                    class="text-sm text-primary-600 hover:text-primary-700"
                  >
                    Forgot password?
                  </NuxtLink>
                </div>
  
                <div class="relative">
  
                  <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2">
                      <rect width="18" height="11" x="3" y="11" rx="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </div>
  
                  <input
                    v-model="password"
                    type="password"
                    placeholder="••••••••"
                    class="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                    required
                  />
  
                </div>
  
              </div>
  
  
              <!-- Remember -->
              <div class="flex items-center mb-6">
                <input
                  v-model="remember"
                  type="checkbox"
                  class="w-4 h-4 text-primary-600 border-gray-300 rounded"
                />
  
                <label class="ml-2 text-sm text-gray-600">
                  Remember me
                </label>
              </div>
  
  
              <!-- Login Button -->
              <button
                type="submit"
                class="w-full flex items-center justify-center py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:from-primary-700 hover:to-primary-800 transition shadow-lg"
              >
  
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="m10 17 5-5-5-5"/>
                  <path d="M15 12H3"/>
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                </svg>
  
                Sign in
  
              </button>
  
  
              <!-- Register -->
              <div class="text-center mt-6 text-sm text-gray-600">
  
                Don't have an account?
  
                <NuxtLink
                  to="/register"
                  class="text-primary-600 font-medium hover:text-primary-700"
                >
                  Sign up
                </NuxtLink>
  
              </div>
  
            </form>
  
          </div>
  
        </div>
  
        <!-- Footer -->
        <div class="text-center mt-6 text-xs text-gray-500">
          © Copyright 2026 Qfs Web3 — All Rights Reserved.
        </div>
  
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue"
  definePageMeta(
        {
        layout: 'custom2',
        }
    );
  
  const email = ref("")
  const password = ref("")
  const remember = ref(false)
  
  const login = () => {
    navigateTo('/dashboard')
    console.log({
      email: email.value,
      password: password.value,
      remember: remember.value
    })
  
    // connect API here
  }
  </script>
  