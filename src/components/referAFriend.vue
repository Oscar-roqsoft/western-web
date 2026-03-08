<template>
    <section class="w-full px-4 py-8">
      <div class="max-w-6xl mx-auto px-6 bg-gray-800 rounded-2xl p-8">
        <div class="text-center">
          <!-- Icon -->
          <div class="flex justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-5V7m-6 9h.01M6 5h.01M12 5h.01M18 5h.01" />
            </svg>
          </div>
  
          <!-- Heading -->
          <h2 class="text-4xl font-semibold text-white">Refer a Friend</h2>
  
          <!-- Description -->
          <p class="mt-2 text-gray-300 max-w-3xl mx-auto">
            Invite your friends and earn rewards when they join and start using our service. 
            Share your referral link below!
          </p>
  
          <!-- Referral Link -->
          <div class="mt-6 flex items-center justify-center gap-2">
            <input
              type="text"
              value="https://example.com/ref/your-code"
              readonly
              class="w-full max-w-md px-4 py-2 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none"
            />
            <button
              class="px-4 py-2 rounded-lg bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition"
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </section>
  </template>
  