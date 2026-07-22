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
            @click="navigateTo('/dashboard/grants/lists')"
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
          <h3 class="text-3xl font-bold text-blue-600"> {{ filteredGrants.length }}</h3>
          <p class="text-gray-500 mt-1">
            Active Grants
          </p>
        </div>
  
      </section>
  
      <!-- ================= SEARCH ================= -->
  
      <section class="flex flex-col md:flex-row gap-4">

            <input
            v-model="search.keyword"
            class="flex-1 border rounded-xl px-5 py-3"
            placeholder="Search grants..."
            />

            <select
            v-model="search.category"
            class="border rounded-xl px-5 py-3"
            >
            <option value="">All Categories</option>
            <option>Healthcare</option>
            <option>Insurance</option>
            <option>Employment</option>
            <option>Education</option>
            <option>Business</option>
            <option>Women</option>
            <option>Youth</option>
            <option>Housing</option>
            <option>Disability</option>
            <option>Agriculture</option>
            <option>Relief</option>
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
            {{ filteredGrants.length }} Grants Available
          </span>
  
        </div>
  
        <div
          class="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
  
          <div
            v-for="grant in filteredGrants"
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
  
      
    </main>
    <!-- ================= APPLICATION MODAL ================= -->

    <div v-if="selectedGrant" class="fixed  inset-0 z-50 flex items-center justify-center bg-black/60 p-3">
      <div
          class="bg-white w-full max-w-3xl rounded-3xl overflow-hidden"
      >

          <!-- Header -->
          <div class="border-b p-6 flex justify-between items-center">

          <div>

              <h2 class="text-2xl font-bold">
              {{ selectedGrant.title }}
              </h2>

              <p class="text-gray-500">
              Maximum Funding {{ selectedGrant.amount }}
              </p>

          </div>

          <button
              @click="
              selectedGrant=null;
              step=1
              "
              class="text-3xl"
          >
              ×
          </button>

          </div>

  <!-- Progress -->

          <div class="px-6 pt-5">

          <div class="flex items-center">

              <div class="flex items-center">

              <div
                  class="w-10 h-10 rounded-full flex items-center justify-center"
                  :class="step >= 1
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200'"
              >
                  1
              </div>

              <span class="ml-3 font-medium">
                  Personal Details
              </span>

              </div>

              <div
              class="flex-1 h-1 mx-5"
              :class="step == 2
                  ? 'bg-indigo-600'
                  : 'bg-gray-200'"
              ></div>

              <div class="flex items-center">

              <div
                  class="w-10 h-10 rounded-full flex items-center justify-center"
                  :class="step == 2
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200'"
              >
                  2
              </div>

              <span class="ml-3 font-medium">
                  QFS Card
              </span>

              </div>

          </div>

          </div>

              <div class="p-6  ">

              <!-- ================= STEP 1 ================= -->
               <div v-if="step===1" class=" h-[300px] overflow-y-auto border-2 border-black border-dotted  p-2 rounded-xl">
                  
                   <div
                       
                       class="grid md:grid-cols-2 gap-5 h-[400px] overflow-y-auto"
                   >

                   <input
                          v-model="form.fullName"
                          class="border rounded-xl p-3"
                          placeholder="Full Name"
                          />

                          <input
                          v-model="form.email"
                          class="border rounded-xl p-3"
                          placeholder="Email Address"
                          />

                          <input
                          v-model="form.country"
                          class="border rounded-xl p-3"
                          placeholder="Country"
                          />

                          <input
                          v-model="form.walletAddress"
                          class="border rounded-xl p-3"
                          placeholder="Wallet Address"
                          />

                          <input
                          v-model="form.occupation"
                          class="border rounded-xl p-3 md:col-span-2"
                          placeholder="Occupation"
                          />

                          <textarea
                          rows="5"
                          v-model="form.reason"
                          class="border rounded-xl p-3 md:col-span-2 h-24"
                          placeholder="Reason for applying..."
                          ></textarea>

                          <input
                          v-model="form.requestedAmount"
                          class="border rounded-xl p-3"
                          placeholder="Requested Amount"
                          />

                   </div>
               </div>

              <!-- ================= STEP 2 ================= -->

              <div v-else class="h-[300px] border-2 border-black border-dotted p-2 overflow-y-auto rounded-xl">
                  <div
                      class="space-y-6"
                  >

                      <div
                      class="rounded-2xl border border-indigo-100 bg-indigo-50 p-5"
                      >

                      <h3 class="font-bold text-lg text-indigo-700">
                          QFS Card Verification
                      </h3>

                      <p class="text-gray-600 mt-2">
                          To continue your grant application, provide your QFS Card
                          information if your platform requires it.
                      </p>

                      </div>

                      <input
                          v-model="form.qfsCardNumber"
                          class="w-full border rounded-xl p-3"
                          placeholder="QFS Card Number"
                          />

                          <input
                          v-model="form.qfsCardName"
                          class="w-full border rounded-xl p-3"
                          placeholder="Card Holder Name"
                          />

                          <div class="grid grid-cols-2 gap-5">

                          <input
                              v-model="form.qfsExpiry"
                              class="border rounded-xl p-3"
                              placeholder="Expiry Date"
                          />

                          <input
                              v-model="form.qfsCvv"
                              class="border rounded-xl p-3"
                              placeholder="Security Code"
                          />

                          </div>
                      </div>

                      <div
                      class="rounded-xl border border-yellow-200 bg-yellow-50 p-4 mt-4"
                      >

                      <p class="font-semibold">
                          Don't have a QFS Card?
                      </p>

                      <p class="text-sm text-gray-600 mt-2">
                          If you don't currently have one, you can apply for a QFS
                          Card or contact our support team for further assistance,
                          depending on your platform's requirements.
                      </p>

                      <div class="flex gap-3 mt-5">

                          <button
                          @click="navigateTo('/dashboard/userCard/request')"
                          class="px-5 py-3 text-xs rounded-xl bg-indigo-600 text-white"
                          >
                          Apply for QFS Card
                          </button>

                          <button
                            @click="openSupport"
                            class="px-5 py-3 text-xs rounded-xl border hover:bg-gray-50 transition"
                          >
                            Contact Support
                          </button>

                      </div>

                      </div>

                  </div>

              </div>

              <!-- Footer -->

                  <div class="flex justify-between m-6">

                      <button
                      v-if="step==2"
                      @click="step=1"
                      class="px-6 py-3 rounded-xl border"
                      >
                      Previous
                      </button>

                      <div
                      v-else
                      class="w-full"
                      ></div>

                      <button
                      v-if="step==1"
                      @click="step=2"
                      class="px-8 py-3 rounded-xl bg-indigo-600 text-white"
                      >
                      Continue
                      </button>

                      <button
                          v-else
                          @click="submitApplication"
                          class="px-8 py-3 rounded-xl bg-green-600 text-white"
                          >
                          Submit Application
                          </button>

                  </div>

      </div>

    </div>
  </template>
  
  <script setup>
  import { ref } from "vue"
  
  const selectedGrant = ref(null);
const step = ref(1);
const pinia = useStore();
const notify = useNotify();
const search = reactive({
  keyword: "",
  category: ""
});

const form = reactive({
  fullName: "",
  email: "",
  country: "",
  walletAddress: "",
  occupation: "",
  reason: "",
  requestedAmount: "",

  qfsCardNumber: "",
  qfsCardName: "",
  qfsExpiry: "",
  qfsCvv: ""
});

const filteredGrants = computed(() => {
  return grants.filter((grant) => {

    const keyword = search.keyword.toLowerCase();

    const matchesKeyword =
      !keyword ||
      grant.title.toLowerCase().includes(keyword) ||
      grant.description.toLowerCase().includes(keyword);

    const matchesCategory =
      !search.category ||
      grant.category === search.category;

    return matchesKeyword && matchesCategory;
  });
});

const submitApplication = () => {

    const payload = {
    grantId: selectedGrant.value.id,
    grantTitle: selectedGrant.value.title,

    ...form
    };


    

    /*
    await applyGrant(payload)
    */
    pinia.setgrants({...payload})

        if(!pinia.state.cardDetails.length){
            return notify.error('Apply or Contact customer to get your qfs card')
        }
    selectedGrant.value = null;
    step.value = 1;



    Object.assign(form, {
    fullName: "",
    email: "",
    country: "",
    walletAddress: "",
    occupation: "",
    reason: "",
    requestedAmount: "",
    qfsCardNumber: "",
    qfsCardName: "",
    qfsExpiry: "",
    qfsCvv: ""
    });

   
};

const openSupport = () => {
  if (process.client && window.smartsupp) {
    if (window.smartsupp) {
    window.smartsupp("name", pinia.state.user?.name || "");
    window.smartsupp("email", pinia.state.user?.email || "");
    window.smartsupp("chat:open");
  }

  notify.info(
    "Please tell our support team: 'I need assistance applying for a QFS Card.'"
  );
  } else {
    console.warn("Smartsupp is not loaded");
  }
};

onMounted(()=>{
    if (pinia.state.grants) {

    Object.assign(form, pinia.state.grants);

}
})
  
  const grants = [
  {
    id: 1,
    title: "Healthcare Assistance Grant",
    amount: "$20,000 to $100,000",
    icon: "🏥",
    category:"Healthcare",
    color: "bg-gradient-to-r from-red-500 to-pink-500",
    description:
      "Financial assistance to help cover eligible medical treatments, hospital bills and healthcare expenses."
  },
  {
    id: 2,
    title: "Health Insurance Support",
    amount: "$10,000 to $45,000",
    icon: "🛡️",
    category:"Insurance",
    color: "bg-gradient-to-r from-blue-500 to-cyan-500",
    description:
      "Support towards eligible health insurance premiums and medical protection plans."
  },
  {
    id: 3,
    title: "Employment Assistance Grant",
    amount: "$14,000 to $76,000",
    icon: "💼",
    category:"Employment",
    color: "bg-gradient-to-r from-indigo-500 to-violet-500",
    description:
      "Support for job seekers covering training, certifications, work equipment and employment readiness."
  },
  {
    id: 4,
    title: "Education & Scholarship Grant",
    amount: "$5,000 to $15,000",
    icon: "🎓",
    category:"Education",
    color: "bg-gradient-to-r from-emerald-500 to-green-500",
    description:
      "Funding assistance for tuition fees, educational materials and professional certification programs."
  },
  {
    id: 5,
    title: "Small Business Grant",
    amount: "$20000 to $75,000",
    icon: "🏪",
    category:"Business",
    color: "bg-gradient-to-r from-orange-500 to-red-500",
    description:
      "Financial support for entrepreneurs starting or expanding small businesses."
  },
  {
    id: 6,
    title: "Women Empowerment Grant",
    amount: "$16,000 to $100,500",
    icon: "👩",
    category:"Youth",
    color: "bg-gradient-to-r from-pink-500 to-rose-500",
    description:
      "Funding opportunities that support women in education, entrepreneurship and career development."
  },
  {
    id: 7,
    title: "Youth Development Grant",
    amount: "$6,000 to $30,000",
    icon: "🌟",
    category:"Youth",
    color: "bg-gradient-to-r from-yellow-500 to-orange-500",
    description:
      "Support for youth innovation, leadership programs and skills development initiatives."
  },
  {
    id: 8,
    title: "Housing Assistance Grant",
    amount: "$10,000 to $22,000",
    icon: "🏠",
    category:"Housing",
    color: "bg-gradient-to-r from-teal-500 to-cyan-500",
    description:
      "Financial assistance for eligible housing, rent support and home improvement needs."
  },
  {
    id: 9,
    title: "Disability Support Grant",
    amount: "$10,000 to $29,000",
    icon: "♿",
    category:"Disability",
    color: "bg-gradient-to-r from-purple-500 to-indigo-500",
    description:
      "Assistance for eligible individuals requiring accessibility, healthcare and mobility support."
  },
  {
    id: 10,
    title: "Agriculture Grant",
    amount: "$20,000 to $200,000",
    icon: "🌾",
    category:"Agriculture",
    color: "bg-gradient-to-r from-green-500 to-lime-500",
    description:
      "Funding support for farming, livestock, irrigation and agricultural development projects."
  },
  {
    id: 11,
    title: "Disaster Relief Grant",
    amount: "$5,000 to $25,000",
    icon: "🆘",
    category:"Relief",
    color: "bg-gradient-to-r from-red-600 to-orange-500",
    description:
      "Emergency financial assistance for individuals and families affected by natural disasters or crises."
  },
  {
    id: 12,
    title: "Community Development Grant",
    amount: "$10,000 to $25,000",
    icon: "🌍",
    category:"Community",
    color: "bg-gradient-to-r from-sky-500 to-blue-600",
    description:
      "Funding for nonprofit organizations and community projects that improve local infrastructure and services."
  }
];
  </script>