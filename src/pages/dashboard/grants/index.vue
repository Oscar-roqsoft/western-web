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
  
              <div class="flex justify-between items-center">
  
                <h3 class="font-bold text-xl">
                  {{ grant.title }}
                </h3>
  
                <span
                  class="bg-green-100 text-green-700 text-xs text-center px-3 py-1 flex rounded-full"
                >
                  Open
                </span>
  
              </div>
  
              <p class="text-gray-500 mt-3">
                {{ grant.description }}
              </p>
  
              <div class="grid grid-cols-3 gap-4 mt-5">
  
                <div class="col-span-2">
  
                  <p class="text-gray-400  text-xs">
                    Maximum
                  </p>
  
                  <h4 class="font-bold">
                    {{ grant.amount }}
                  </h4>
  
                </div>
<!--   
                <div>
  
                  <p class="text-gray-400 text-xs">
                    Deadline
                  </p>
  
                  <h4 class="font-bold">
                    31 Dec 2026
                  </h4>
  
                </div> -->
  
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
        class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-2"
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
    title: "Healthcare Assistance Grant",
    amount: "$20,000 to $100,000",
    icon: "🏥",
    color: "bg-gradient-to-r from-red-500 to-pink-500",
    description:
      "Financial assistance to help cover eligible medical treatments, hospital bills and healthcare expenses."
  },
  {
    id: 2,
    title: "Health Insurance Support",
    amount: "$10,000 to $45,000",
    icon: "🛡️",
    color: "bg-gradient-to-r from-blue-500 to-cyan-500",
    description:
      "Support towards eligible health insurance premiums and medical protection plans."
  },
  {
    id: 3,
    title: "Employment Assistance Grant",
    amount: "$14,000 to $76,000",
    icon: "💼",
    color: "bg-gradient-to-r from-indigo-500 to-violet-500",
    description:
      "Support for job seekers covering training, certifications, work equipment and employment readiness."
  },
  {
    id: 4,
    title: "Education & Scholarship Grant",
    amount: "$5,000 to $15,000",
    icon: "🎓",
    color: "bg-gradient-to-r from-emerald-500 to-green-500",
    description:
      "Funding assistance for tuition fees, educational materials and professional certification programs."
  },
  {
    id: 5,
    title: "Small Business Grant",
    amount: "$20000 to $75,000",
    icon: "🏪",
    color: "bg-gradient-to-r from-orange-500 to-red-500",
    description:
      "Financial support for entrepreneurs starting or expanding small businesses."
  },
  {
    id: 6,
    title: "Women Empowerment Grant",
    amount: "$16,000 to $100,500",
    icon: "👩",
    color: "bg-gradient-to-r from-pink-500 to-rose-500",
    description:
      "Funding opportunities that support women in education, entrepreneurship and career development."
  },
  {
    id: 7,
    title: "Youth Development Grant",
    amount: "$6,000 to $30,000",
    icon: "🌟",
    color: "bg-gradient-to-r from-yellow-500 to-orange-500",
    description:
      "Support for youth innovation, leadership programs and skills development initiatives."
  },
  {
    id: 8,
    title: "Housing Assistance Grant",
    amount: "$10,000 to $22,000",
    icon: "🏠",
    color: "bg-gradient-to-r from-teal-500 to-cyan-500",
    description:
      "Financial assistance for eligible housing, rent support and home improvement needs."
  },
  {
    id: 9,
    title: "Disability Support Grant",
    amount: "$10,000 to $29,000",
    icon: "♿",
    color: "bg-gradient-to-r from-purple-500 to-indigo-500",
    description:
      "Assistance for eligible individuals requiring accessibility, healthcare and mobility support."
  },
  {
    id: 10,
    title: "Agriculture Grant",
    amount: "$20,000 to $200,000",
    icon: "🌾",
    color: "bg-gradient-to-r from-green-500 to-lime-500",
    description:
      "Funding support for farming, livestock, irrigation and agricultural development projects."
  },
  {
    id: 11,
    title: "Disaster Relief Grant",
    amount: "$5,000 to $25,000",
    icon: "🆘",
    color: "bg-gradient-to-r from-red-600 to-orange-500",
    description:
      "Emergency financial assistance for individuals and families affected by natural disasters or crises."
  },
  {
    id: 12,
    title: "Community Development Grant",
    amount: "$10,000 to $25,000",
    icon: "🌍",
    color: "bg-gradient-to-r from-sky-500 to-blue-600",
    description:
      "Funding for nonprofit organizations and community projects that improve local infrastructure and services."
  }
];
  </script>