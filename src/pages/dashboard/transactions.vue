<template>
    <section class="max-w-7xl mx-auto  md:px-6">
  
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
  
        <div class="flex items-center gap-4">
  
          <!-- Back Button -->
          <button
            @click="$router.back()"
            class="w-11 h-11 rounded-xl border bg-white hover:bg-gray-100 flex items-center justify-center transition"
          >
            <ArrowLeft class="w-5 h-5"/>
          </button>
  
          <div>
  
            <!-- <h1 class="text-3xl font-bold">
              Transaction History
            </h1>
  
            <p class="text-gray-500 mt-1">
              View all deposits, withdrawals, transfers and swaps.
            </p> -->
  
          </div>
  
        </div>
  
        <!-- Summary -->
        <!-- <div
          class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl px-6 py-4 shadow-lg"
        >
  
          <p class="text-sm opacity-80">
            Total Transactions
          </p>
  
          <h2 class="text-3xl font-bold mt-1">
            {{ transactions.length }}
          </h2>
  
        </div> -->
  
      </div>
  
      <!-- Card -->
      <div
        class="bg-white rounded-3xl  border border-gray-100 overflow-hidden"
      >
  
        <!-- Card Header -->
        <div
          class="flex items-center justify-between px-6 py-5 border-b bg-gradient-to-r from-gray-50 to-white"
        >
  
          <div>
  
            <h2 class="text-xl font-bold">
              Recent Transactions
            </h2>
  
            <p class="text-gray-500 text-sm mt-1">
              Latest activities on your account.
            </p>
  
          </div>
  
          <div
            class="hidden md:flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold"
          >
            {{ transactions.length }} Records
          </div>
  
        </div>
  
        <!-- Table -->
        <div class="p-2 md:p-6">
  
          <HistoryList />
  
        </div>
  
      </div>
  
    </section>
  </template>
  
  <script setup>
  import { computed } from "vue";
  import { ArrowLeft } from "lucide-vue-next";
  
  const pinia = useStore();
  
  const transactions = computed(() => pinia.state.userTransaction || []);
  </script>



<style scoped>
/* Optional: smooth hide transition */
#announcement-banner {
  transition: all 0.3s ease;
}


.card-action {
border-radius: 0.5rem;          /* rounded-lg */
padding: 0.625rem 0;           /* py-2.5 */
display: flex;                 
align-items: center;            /* items-center */
justify-content: center;        /* justify-center */
gap: 0.5rem;                    /* gap-2 */
box-shadow: 0 1px 2px rgba(0,0,0,0.05);  /* shadow-sm */
transition: all 0.2s ease;     /* transition-all */
}

.card-action:hover {
box-shadow: 0 4px 6px rgba(0,0,0,0.1);   /* hover:shadow */
}

.quick-actions-grid {
display: grid;
grid-template-columns: 1fr;
gap: 1.5rem;
padding-bottom: 1.5rem;
}

@media (min-width: 768px) {
.quick-actions-grid {
  grid-template-columns: repeat(2, 1fr);
}
}

.card {
position: relative;
background: #fff;
border: 1px solid #f3f4f6;
border-radius: 1rem;
box-shadow: 0 1px 3px rgba(0,0,0,0.06);
overflow: hidden;
transition: box-shadow 0.2s ease;
}

.card:hover {
box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.pattern-grid {
position: absolute;
inset: 0;
pointer-events: none;
opacity: 0.3;
background-image: radial-gradient(currentColor 1px, transparent 1px);
background-size: 10px 10px;
color: #f3f4f6;
}

.card-header {
display: flex;
align-items: center;
justify-content: space-between;
padding: 1rem;
border-bottom: 1px solid #f3f4f6;
position: relative;
z-index: 10;
}

.card-header h2 {
font-size: 1.125rem;
font-weight: 600;
color: #1f2937;
}

.view-all {
font-size: 0.875rem;
color: #3b82f6;
text-decoration: none;
transition: color 0.2s ease;
}

.view-all:hover {
color: #2563eb;
}

.card-body {
padding: 1rem;
position: relative;
z-index: 10;
}

.card-action {
display: flex;
align-items: center;
gap: 1rem;
padding: 1rem;
border-radius: 0.75rem;
background: linear-gradient(to bottom right, #fff, #f9fafb);
text-decoration: none;
box-shadow: 0 1px 2px rgba(0,0,0,0.05);
transition: all 0.2s ease;
cursor: pointer;
}

.card-action:hover {
background: linear-gradient(to bottom right, #f9fafb, #f3f4f6);
box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.action-icon {
width: 2.5rem;
height: 2.5rem;
border-radius: 9999px;
display: flex;
align-items: center;
justify-content: center;
background-color: #dbeafe;
color: #3b82f6;
transition: background-color 0.3s ease;
}

.card-action:hover .action-icon {
background-color: #bfdbfe;
animation: float 1s ease-in-out infinite alternate;
}

.action-content h3 {
font-size: 0.875rem;
font-weight: 500;
color: #1f2937;
}

.action-content p {
font-size: 0.75rem;
color: #6b7280;
margin-top: 0.25rem;
}

.action-chevron svg {
width: 1.25rem;
height: 1.25rem;
color: #9ca3af;
}

.more-btn {
background: none;
border: none;
cursor: pointer;
color: #3b82f6;
transition: color 0.2s ease;
}

.more-btn:hover {
color: #2563eb;
}

/* Optional floating animation */
@keyframes float {
0% { transform: translateY(0); }
100% { transform: translateY(-4px); }
}

.skeleton {
background: #e5e7eb;
border-radius: 6px;
position: relative;
overflow: hidden;
}

.skeleton::after {
content: "";
position: absolute;
inset: 0;
transform: translateX(-100%);
background: linear-gradient(
  90deg,
  transparent,
  rgba(255,255,255,0.5),
  transparent
);
animation: shimmer 1.2s infinite;
}

@keyframes shimmer {
100% {
  transform: translateX(100%);
}
}


</style>

