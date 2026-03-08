<template>
    <div
      ref="topDestinationsSection"
      class="md:max-w-[1200px] mx-auto w-full h-full px-4 md:px-0 flex flex-col justify-center items-center"
    >
      <!-- Heading -->
      <div class="text-center opacity-0 transform translate-y-10" ref="heading">
        <span class="text-[#F17216] text-sm border-[#F17216] px-1.5">Top Selling</span>
        <h2 class="text-[34px] md:text-[44px] font-bold mb-2.5 tracking-wide">Top Destinations</h2>
      </div>
  
      <!-- Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-center justify-center my-14 md:w-[80%]">
        <div
          v-for="i in test"
          :key="i.id"
          class="card opacity-0 transform translate-y-10 scale-90"
          ref="destinationCards"
        >
          <n-card size="small" title="">
            <template #cover>
              <img :src="i.img" />
            </template>
            <div>
              <div class="py-4 flex  items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 14 14"
                >
                  <path
                    fill="currentColor"
                    fill-rule="evenodd"
                    d="M13.96.695a.5.5 0 0 0-.655-.655l-13 5.5a.5.5 0 0 0-.029.907l4.851 2.426l2.426 4.85a.5.5 0 0 0 .907-.028z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="ml-2">{{ i.location }}</span>
                <!-- <span>${{ i.amount }}k</span> -->
              </div>
              <div class="flex items-center gap-2 mt-6">
               
                <!-- <span>{{ i.trip }} Days Trip</span> -->
              </div>
            </div>
          </n-card>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { NCard } from "naive-ui";
  
  // gsap.registerPlugin(ScrollTrigger);
  
  const topDestinationsSection = ref(null);
  const heading = ref(null);
  const destinationCards = ref([]);
  
  const test = [
    { id: 1, img: "/location/us.jpg",  location: "United States",},
    { id: 2, img: "/location/uk.jpg",  location: "United Kingdom",  },
    { id: 3, img: "/location/euro.jpg",  location: " Europe" },
  ];
  
  onMounted(() => {
    // Animate Heading
    gsap.fromTo(
      heading.value,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heading.value,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  
    // Animate Cards
    gsap.to(destinationCards.value, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: topDestinationsSection.value,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  });
  </script>
  
  <style scoped>
  .n-card {
    max-width: 300px;
    width: 100%;
    height: 440px;
  }
  </style>
  