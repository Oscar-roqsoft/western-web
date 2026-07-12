<template>
    <main class="max-w-7xl mx-auto  md:px-6 pb-6 space-y-8">
  
      <!-- ================= HERO ================= -->
      <section
        class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600 text-white p-8 md:p-12"
      >
        <div class="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full"></div>
        <div class="absolute -bottom-24 left-0 w-80 h-80 bg-white/10 rounded-full"></div>
  
        <div class="relative z-10 max-w-3xl">
          <span
            class="inline-flex px-4 py-1 rounded-full bg-white/20 backdrop-blur text-sm mb-4"
          >
            🚀 Crypto Grant Program
          </span>
  
          <h1 class="text-4xl md:text-5xl font-bold leading-tight">
            Turn Your Blockchain Idea Into Reality
          </h1>
  
          <p class="mt-5 text-lg text-white/90">
            Apply for grants designed for startups, developers, creators,
            researchers and communities building the future of Web3.
          </p>
  
          <div class="flex flex-wrap gap-4 mt-8">
            <!-- <button
              class="bg-white text-indigo-700 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
            >
              Browse Grants
            </button> -->
  
            <button
              class="border border-white/30 bg-white/10 backdrop-blur px-6 py-3 rounded-xl hover:bg-white/20 transition"
            >
              My Applications
            </button>
          </div>
        </div>
      </section>
  
      <!-- ================= STATS ================= -->
  
      <section class="grid md:grid-cols-4 gap-5">
  
        <div
          class="bg-white rounded-2xl p-6 border shadow-sm"
        >
          <h3 class="text-3xl font-bold text-indigo-600">$2.5M</h3>
          <p class="text-gray-500 mt-1">
            Total Grants
          </p>
        </div>
  
        <div
          class="bg-white rounded-2xl p-6 border shadow-sm"
        >
          <h3 class="text-3xl font-bold text-green-600">320</h3>
          <p class="text-gray-500 mt-1">
            Projects Funded
          </p>
        </div>
  
        <div
          class="bg-white rounded-2xl p-6 border shadow-sm"
        >
          <h3 class="text-3xl font-bold text-orange-600">42</h3>
          <p class="text-gray-500 mt-1">
            Countries
          </p>
        </div>
  
        <div
          class="bg-white rounded-2xl p-6 border shadow-sm"
        >
          <h3 class="text-3xl font-bold text-blue-600">15</h3>
          <p class="text-gray-500 mt-1">
            Active Grants
          </p>
        </div>
  
      </section>
  
      <!-- ================= SEARCH ================= -->
  
      <section class="flex flex-col md:flex-row gap-4">
  
        <input
          class="flex-1 border rounded-xl px-5 py-3"
          placeholder="Search grants..."
        />
  
        <select
          class="border rounded-xl px-5 py-3"
        >
          <option>All Categories</option>
          <option>Startup</option>
          <option>Developer</option>
          <option>Research</option>
          <option>Community</option>
        </select>
  
      </section>
  
      <!-- ================= GRANTS ================= -->
  
      <section>
  
        <div class="flex justify-between items-center mb-5">
  
          <h2 class="text-2xl font-bold">
            Available Grants
          </h2>
  
          <span class="text-gray-500">
            6 Grants Available
          </span>
  
        </div>
  
        <div
          class="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
  
          <div
            v-for="grant in grants"
            :key="grant.id"
            class="bg-white rounded-2xl border shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
  
            <div
              :class="grant.color"
              class="h-32 p-6 text-white"
            >
  
              <div class="text-5xl">
                {{ grant.icon }}
              </div>
  
            </div>
  
            <div class="p-6">
  
              <div class="flex justify-between">
  
                <h3 class="font-bold text-xl">
                  {{ grant.title }}
                </h3>
  
                <span
                  class="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full"
                >
                  Open
                </span>
  
              </div>
  
              <p class="text-gray-500 mt-3">
                {{ grant.description }}
              </p>
  
              <div class="grid grid-cols-2 gap-4 mt-5">
  
                <div>
  
                  <p class="text-gray-400 text-xs">
                    Maximum
                  </p>
  
                  <h4 class="font-bold">
                    {{ grant.amount }}
                  </h4>
  
                </div>
  
                <div>
  
                  <p class="text-gray-400 text-xs">
                    Deadline
                  </p>
  
                  <h4 class="font-bold">
                    31 Dec 2026
                  </h4>
  
                </div>
  
              </div>
  
              <button
                @click="selectedGrant = grant"
                class="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3 font-semibold transition"
              >
                Apply Now
              </button>
  
            </div>
  
          </div>
  
        </div>
  
      </section>
  
      <!-- ================= APPLICATION MODAL ================= -->
  
      <div
        v-if="selectedGrant"
        class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-5"
      >
  
        <div
          class="bg-white rounded-3xl w-full max-w-2xl p-8 max-h-[90vh] overflow-y-auto"
        >
  
          <div class="flex justify-between items-center">
  
            <div>
  
              <h2 class="text-2xl font-bold">
                Apply for {{ selectedGrant.title }}
              </h2>
  
              <p class="text-gray-500">
                Maximum Funding {{ selectedGrant.amount }}
              </p>
  
            </div>
  
            <button
              @click="selectedGrant=null"
              class="text-3xl"
            >
              ×
            </button>
  
          </div>
  
          <div class="grid md:grid-cols-2 gap-5 mt-8">
  
            <input
              placeholder="Full Name"
              class="border rounded-xl p-3"
            />
  
            <input
              placeholder="Email Address"
              class="border rounded-xl p-3"
            />
  
            <input
              placeholder="Country"
              class="border rounded-xl p-3"
            />
  
            <input
              placeholder="Wallet Address"
              class="border rounded-xl p-3"
            />
  
            <input
              placeholder="Project Title"
              class="border rounded-xl p-3 md:col-span-2"
            />
  
            <textarea
              rows="5"
              placeholder="Describe your project..."
              class="border rounded-xl p-3 md:col-span-2"
            ></textarea>
  
            <input
              placeholder="Requested Amount"
              class="border rounded-xl p-3"
            />
  
            <input
              placeholder="Website / GitHub"
              class="border rounded-xl p-3"
            />
  
            <input
              type="file"
              class="md:col-span-2"
            />
  
          </div>
  
          <div class="flex justify-end gap-4 mt-8">
  
            <button
              @click="selectedGrant=null"
              class="px-6 py-3 border rounded-xl"
            >
              Cancel
            </button>
  
            <button
              class="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
            >
              Submit Application
            </button>
  
          </div>
  
        </div>
  
      </div>
  
    </main>
  </template>
  
  <script setup>
  import { ref } from "vue"
  
  const selectedGrant = ref(null)
  
  const grants = [
    {
      id: 1,
      title: "Startup Grant",
      amount: "$10,000",
      icon: "🚀",
      color: "bg-gradient-to-r from-indigo-600 to-violet-600",
      description:
        "Funding for early-stage blockchain startups building innovative products."
    },
    {
      id: 2,
      title: "Developer Grant",
      amount: "$5,000",
      icon: "💻",
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
      description:
        "Support for developers creating open-source blockchain tools."
    },
    {
      id: 3,
      title: "Research Grant",
      amount: "$8,000",
      icon: "🔬",
      color: "bg-gradient-to-r from-green-500 to-emerald-500",
      description:
        "Academic and technical blockchain research initiatives."
    },
    {
      id: 4,
      title: "Community Grant",
      amount: "$2,500",
      icon: "🌍",
      color: "bg-gradient-to-r from-orange-500 to-red-500",
      description:
        "Grow local blockchain communities through events and education."
    },
    {
      id: 5,
      title: "Creator Grant",
      amount: "$2,000",
      icon: "🎥",
      color: "bg-gradient-to-r from-pink-500 to-rose-500",
      description:
        "Create educational videos, tutorials and blockchain content."
    },
    {
      id: 6,
      title: "Student Grant",
      amount: "$1,500",
      icon: "🎓",
      color: "bg-gradient-to-r from-violet-500 to-fuchsia-500",
      description:
        "Support student innovation in blockchain technology."
    }
  ]
  </script>