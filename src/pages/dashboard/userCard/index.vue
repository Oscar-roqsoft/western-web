<template>
    <main class="md:p-4">
  
      <!-- Header -->
      <section class="max-w-6xl mx-auto">
  
        <div class="flex items-center justify-between mb-4">
          <h1 class="text-2xl font-bold">Cards</h1>
  
          <NuxtLink
            to="/dashboard/userCard"
            class="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm shadow"
          >
            <Plus class="w-4 h-4"/>
            Request New Card
          </NuxtLink>
        </div>
  
  
        <!-- Info Card -->
        <div class="bg-white shadow rounded-lg p-6 flex gap-4 flex-wrap">
  
          <div class="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
            <CreditCard class="w-6 h-6"/>
          </div>
  
          <div class="flex-1">
  
            <h2 class="text-lg font-semibold">
              Cards
            </h2>
  
            <p class="text-gray-500 mt-1">
              Create secure cards for online purchases, subscriptions, and more.
              Our cards are fully functional and can be used anywhere major
              credit cards are accepted.
            </p>
  
            <!-- Benefits -->
            <div class="flex gap-6 mt-4 flex-wrap">
  
              <div class="flex items-center gap-2 text-gray-500">
                <Shield class="w-5 h-5 text-indigo-600"/>
                <span>Secure Transactions</span>
              </div>
  
              <div class="flex items-center gap-2 text-gray-500">
                <Globe class="w-5 h-5 text-indigo-600"/>
                <span>Global Acceptance</span>
              </div>
  
              <div class="flex items-center gap-2 text-gray-500">
                <Settings class="w-5 h-5 text-indigo-600"/>
                <span>Full Control</span>
              </div>
  
            </div>
  
          </div>
  
        </div>
      </section>
  
  
      <!-- Card Empty State -->
      <section class="max-w-6xl mx-auto mt-6">
  
        <div class="bg-white rounded-xl shadow p-10 text-center">
  
          <div class="flex justify-center">
            <div class="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <CreditCard class="w-6 h-6"/>
            </div>
          </div>
  
          <h3 class="text-lg font-semibold mt-4">
            No Cards Yet
          </h3>
  
          <p class="text-gray-500 mt-2 max-w-md mx-auto">
            You haven't created any cards yet. Get started by requesting your
            first card for secure online shopping.
          </p>
  
          <NuxtLink
            to="/dashboard/userCard/request"
            class="inline-flex items-center gap-2 mt-5 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow"
          >
            <Plus class="w-4 h-4"/>
            Request New Card
          </NuxtLink>
  
        </div>
  
      </section>
  
    </main>
  </template>
  
  
  <script setup>
  
  import {
    CreditCard,
    Plus,
    Shield,
    Globe,
    Settings
  } from "lucide-vue-next"
  
  </script>