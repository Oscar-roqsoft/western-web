<template>
    <main class="max-w-7xl mx-auto  md:px-6 py-8 space-y-8">
  
      <!-- Hero -->
      <section
        class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 via-violet-600 to-blue-600 text-white p-8 md:p-10"
      >
        <div class="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/10 animate-pulse"></div>
        <div class="absolute -bottom-20 left-10 w-64 h-64 rounded-full bg-white/10 animate-pulse"></div>
  
        <div class="relative z-10 flex flex-col lg:flex-row justify-between gap-8">
  
          <div>
            <span class="inline-flex bg-white/20 backdrop-blur px-4 py-1 rounded-full text-sm mb-4">
              🎉 Grant Dashboard
            </span>
  
            <h1 class="text-4xl font-bold">
              My Grant Applications
            </h1>
  
            <p class="mt-4 text-white/90 max-w-2xl">
              Track all your submitted grant applications, monitor approval
              progress and receive funding updates in one place.
            </p>
          </div>
  
          <div class="grid grid-cols-2 gap-4 min-w-[280px]">
  
            <div class="bg-white/10 backdrop-blur rounded-2xl p-5">
              <p class="text-white/70 text-sm">
                Total Applications
              </p>
  
              <h2 class="text-4xl font-bold mt-2">
                {{ grants.length }}
              </h2>
            </div>
  
            <div class="bg-white/10 backdrop-blur rounded-2xl p-5">
              <p class="text-white/70 text-sm">
                Approved
              </p>
  
              <h2 class="text-4xl font-bold mt-2">
                {{ approvedCount }}
              </h2>
            </div>
  
          </div>
  
        </div>
  
      </section>
  
      <!-- Search -->
      <div class="bg-white rounded-2xl shadow border p-5">
  
        <div class="flex flex-col md:flex-row gap-4">
  
          <input
            v-model="keyword"
            class="flex-1 border rounded-xl px-5 py-3"
            placeholder="Search applications..."
          />
  
          <select
            v-model="status"
            class="border rounded-xl px-5 py-3"
          >
            <option value="">
              All Status
            </option>
  
            <option value="Pending">
              Pending
            </option>
  
            <option value="Under Review">
              Under Review
            </option>
  
            <option value="Approved">
              Approved
            </option>
  
            <option value="Rejected">
              Rejected
            </option>
  
          </select>
  
        </div>
  
      </div>
  
      <!-- Cards -->
  
      <TransitionGroup
        name="list"
        tag="section"
        class="grid lg:grid-cols-2 xl:grid-cols-3 gap-6"
      >
  
        <div
          v-for="grant in filteredGrants"
          :key="grant.id"
          class="group bg-white rounded-3xl border shadow-sm overflow-hidden hover:shadow-2xl hover:-translate-y-2 duration-300"
        >
  
          <div
            :class="grant.color"
            class="relative p-6 text-white"
          >
  
            <div class="text-6xl">
              {{ grant.icon }}
            </div>
  
            <div
              class="absolute top-5 right-5 px-3 py-1 rounded-full text-xs font-semibold"
              :class="statusBadge(grant.status)"
            >
              {{ grant.status }}
            </div>
  
          </div>
  
          <div class="p-6">
  
            <h2 class="font-bold text-xl">
              {{ grant.title }}
            </h2>
  
            <p class="text-gray-500 mt-2 line-clamp-2">
              {{ grant.description }}
            </p>
  
            <div class="grid grid-cols-2 gap-4 mt-6">
  
              <div>
  
                <p class="text-xs text-gray-400">
                  Requested
                </p>
  
                <h3 class="font-bold">
                  {{ grant.requested }}
                </h3>
  
              </div>
  
              <div>
  
                <p class="text-xs text-gray-400">
                  Date
                </p>
  
                <h3 class="font-semibold">
                  {{ grant.date }}
                </h3>
  
              </div>
  
            </div>
  
            <!-- Progress -->
  
            <div class="mt-6">
  
              <div class="flex justify-between text-sm mb-2">
  
                <span>
                  Progress
                </span>
  
                <span>
                  {{ grant.progress }}%
                </span>
  
              </div>
  
              <div class="h-2 rounded-full bg-gray-100 overflow-hidden">
  
                <div
                  class="h-full rounded-full transition-all duration-700"
                  :style="{width: grant.progress+'%'}"
                  :class="progressColor(grant.status)"
                ></div>
  
              </div>
  
            </div>
  
            <div class="mt-6 flex gap-3">
  
              <button
                class="flex-1 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white py-3"
              >
                View Details
              </button>
  
              <button
                class="rounded-xl border px-5 hover:bg-gray-50"
              >
                PDF
              </button>
  
            </div>
  
          </div>
  
        </div>
  
      </TransitionGroup>
  
      <!-- Empty -->
  
      <div
        v-if="!filteredGrants.length"
        class="bg-white rounded-3xl border shadow p-16 text-center"
      >
  
        <div class="text-7xl mb-5">
          📂
        </div>
  
        <h2 class="text-2xl font-bold">
          No Grant Applications Found
        </h2>
  
        <p class="text-gray-500 mt-3">
          Your applications will appear here after submission.
        </p>
  
      </div>
  
    </main>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  
  const keyword = ref("");
  const status = ref("");
  
  const grants = ref([
    // {
    //   id: 1,
    //   title: "Healthcare Assistance Grant",
    //   requested: "$45,000",
    //   date: "12 Jul 2026",
    //   progress: 30,
    //   status: "Pending",
    //   icon: "🏥",
    //   color: "bg-gradient-to-r from-red-500 to-pink-500",
    //   description: "Medical treatment and hospital assistance."
    // },
    // {
    //   id: 2,
    //   title: "Employment Assistance",
    //   requested: "$22,000",
    //   date: "09 Jul 2026",
    //   progress: 70,
    //   status: "Under Review",
    //   icon: "💼",
    //   color: "bg-gradient-to-r from-blue-500 to-cyan-500",
    //   description: "Employment support and certification."
    // },
    // {
    //   id: 3,
    //   title: "Business Startup Grant",
    //   requested: "$80,000",
    //   date: "01 Jul 2026",
    //   progress: 100,
    //   status: "Approved",
    //   icon: "🚀",
    //   color: "bg-gradient-to-r from-indigo-500 to-violet-500",
    //   description: "Funding for startup business."
    // },
    // {
    //   id: 4,
    //   title: "Housing Assistance",
    //   requested: "$16,000",
    //   date: "28 Jun 2026",
    //   progress: 100,
    //   status: "Rejected",
    //   icon: "🏠",
    //   color: "bg-gradient-to-r from-orange-500 to-red-500",
    //   description: "Housing support grant."
    // }
  ]);
  
  const approvedCount = computed(() =>
    grants.value.filter(i => i.status === "Approved").length
  );
  
  const filteredGrants = computed(() => {
    return grants.value.filter(item => {
  
      const matchesKeyword =
        item.title.toLowerCase().includes(keyword.value.toLowerCase());
  
      const matchesStatus =
        !status.value || item.status === status.value;
  
      return matchesKeyword && matchesStatus;
    });
  });
  
  const statusBadge = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-500";
  
      case "Pending":
        return "bg-yellow-500";
  
      case "Rejected":
        return "bg-red-500";
  
      default:
        return "bg-blue-500";
    }
  };
  
  const progressColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-500";
  
      case "Rejected":
        return "bg-red-500";
  
      case "Pending":
        return "bg-yellow-500";
  
      default:
        return "bg-blue-500";
    }
  };
  </script>
  
  <style scoped>
  .list-enter-active,
  .list-leave-active{
    transition:all .35s ease;
  }
  
  .list-enter-from{
    opacity:0;
    transform:translateY(30px);
  }
  
  .list-leave-to{
    opacity:0;
    transform:scale(.9);
  }
  </style>