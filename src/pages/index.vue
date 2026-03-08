<template>
    <section
      class="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-black via-[#0b0b0b] to-[#191919]"
    >
      <!-- Background overlay glow -->
      <div class="absolute inset-0">
        <div
          class="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#fcb900]/20 blur-[120px] rounded-full animate-pulse"
        ></div>
        <div
          class="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-500/10 blur-[120px] rounded-full"
        ></div>
      </div>
  
      <div
        class="relative z-10 max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-12 items-center"
      >
        <!-- LEFT CONTENT -->
        <div class="space-y-6 pt-28 md:pt-0">
          <!-- Subtitle -->
          <p
            class="text-[#fcb900] uppercase tracking-widest text-sm font-semibold animate-fade-up"
          >
            Quantum Financial System
          </p>
  
          <!-- Title -->
          <h1
            class="text-white text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight animate-fade-up delay-200"
          >
            Quantum Financial System (QFS)
            <span class="inline-flex items-center gap-2">
              IS
             
            </span>
          </h1>
  
          <!-- Description -->
          <p
            class="text-gray-300 max-w-xl text-lg animate-fade-up delay-400"
          >
            Decentralized financial system designed to democratize money and
            eliminate the control of central banks.
          </p>
  
          <!-- CTA BUTTONS -->
          <div
            class="flex flex-wrap items-center gap-4 pt-4 animate-fade-up delay-600"
          >
            <NuxtLink to="/login">
              <button
                class="px-6 py-3 bg-white text-black font-semibold rounded-full hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Login
              </button>
            </NuxtLink>
  
            <NuxtLink to="/register">
              <button
                class="px-6 py-3 bg-[#fcb900] text-black font-semibold rounded-full flex items-center gap-2 hover:bg-[#ffd24d] hover:scale-105 transition-all duration-300"
              >
                Join Us →
              </button>
            </NuxtLink>
          </div>
  
          <!-- App Store Links -->
          <div
            class="flex items-center gap-6 animate-fade-up delay-800"
          >
           <img src="/app-store-logo.svg" alt="App Store" class="w-24 h-24">
           <img src="/google-store-logo.svg" alt="google Store" class="w-24 h-24">

          </div>



          <section class=" relative min-h-[100px]  md:min-h-full">
              <div class="max-w-7xl mx-auto  grid md:grid-cols-1 gap-y-20 ">

                <!-- LEFT: USER IMAGES + COUNTER -->
                <div class="relative flex gap-2 justify-center animate-fade-up">

                  <!-- Image grid -->
                  <div class="grid grid-cols-2 gap-4">
                    <img
                      src="/files/hh1.jpg"
                      alt=""
                      class="w-10 h-10 object-cover rounded-full  absolute left-0"
                    />
                    <img
                      src="/files/hh2.jpg"
                      alt=""
                      class="w-10 h-10 object-cover rounded-full absolute left-8"
                    />
                    <img
                       src="/files/hh3.jpg"
                      alt=""
                      class="w-10 h-10 object-cover rounded-full  absolute left-16"
                    />
                    <img
                       src="/files/hh4.jpg"
                      alt=""
                      class="w-10 h-10 object-cover rounded-full  absolute left-24"
                    />


                    <div class=" absolute md:left-36 left-36">
                      <p class="text-xl font-extrabold text-white">
                        10<span class="text-[#fcb900]">M+</span>
                      </p>

                      <p class="mt-1 text-xs md:text-sm text-gray-400 flex items-center gap-2 justify-center">
                      <span class="w-2 h-2 rounded-full bg-[#fcb900]"></span>
                      World Enrolled Users
                    </p>

                    </div>
                  </div>

                  <!-- Counter -->
                  <!-- <div
                    class="flex  flex-col -translate-x-1/2 bg-gray-900 border border-gray-800 px-5 py-2 rounded-2xl shadow-xl text-center"
                  >
                    <p class="text-2xl font-extrabold text-white">
                      10<span class="text-[#fcb900]">M+</span>
                    </p>
                    <p class="mt-1 text-sm text-gray-400 flex items-center gap-2 justify-center">
                      <span class="w-2 h-2 rounded-full bg-[#fcb900]"></span>
                      World Enrolled Users
                    </p>
                  </div> -->
                </div>

                <!-- RIGHT: BADGE + TEXT -->
                <!-- <div class="flex  items-center md:items-start gap-6 animate-fade-up delay-200">

                  <img
                     src="/files/hh2.jpg"
                    alt="Award"
                    class="w-10"
                  />

                  <p class="text-lg font-semibold text-gray-300">
                    Official QFS Web3 Ledger
                  </p>

                </div> -->

              </div>
            </section>




        </div>
  
        <div class="hidden md:flex justify-center relative">
          <!-- Circle Wrapper -->
          <div class="relative w-[380px] h-[380px] rounded-full overflow-hidden shadow-2xl">

            <!-- Background Image -->
            <img
              src="/imgHero.png"
              alt="Hero"
              class="absolute inset-0 w-full h-full object-cover"
            />

            <!-- Soft Overlay -->
            <div class="absolute inset-0 bg-black/10"></div>
          </div>

  <!-- ICONS ON EDGES -->

  <!-- Top -->
  <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-float1">
    <div class="w-14 h-14 rounded-full bg-gray-900 flex items-center justify-center shadow-lg">
      <svg class=" animate-float1" xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 32 32"><!-- Icon from Cryptocurrency Color Icons by Christopher Downer - https://creativecommons.org/publicdomain/zero/1.0/ --><g fill="none" fill-rule="evenodd"><circle cx="16" cy="16" r="16" fill="#26A17B"/><path fill="#FFF" d="M17.922 17.383v-.002c-.11.008-.677.042-1.942.042c-1.01 0-1.721-.03-1.971-.042v.003c-3.888-.171-6.79-.848-6.79-1.658s2.902-1.486 6.79-1.66v2.644c.254.018.982.061 1.988.061c1.207 0 1.812-.05 1.925-.06v-2.643c3.88.173 6.775.85 6.775 1.658c0 .81-2.895 1.485-6.775 1.657m0-3.59v-2.366h5.414V7.819H8.595v3.608h5.414v2.365c-4.4.202-7.709 1.074-7.709 2.118s3.309 1.915 7.709 2.118v7.582h3.913v-7.584c4.393-.202 7.694-1.073 7.694-2.116s-3.301-1.914-7.694-2.117"/></g></svg>
    </div>
  </div>

  <!-- Right -->
  <div class="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 animate-float2">
    <div class="w-14 h-14 rounded-full bg-gray-900 flex items-center justify-center shadow-lg">
      <svg class=" animate-float3" xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 32 32"><!-- Icon from Cryptocurrency Color Icons by Christopher Downer - https://creativecommons.org/publicdomain/zero/1.0/ --><g fill="none" fill-rule="evenodd"><circle cx="16" cy="16" r="16" fill="#26A17B"/><path fill="#FFF" d="M17.922 17.383v-.002c-.11.008-.677.042-1.942.042c-1.01 0-1.721-.03-1.971-.042v.003c-3.888-.171-6.79-.848-6.79-1.658s2.902-1.486 6.79-1.66v2.644c.254.018.982.061 1.988.061c1.207 0 1.812-.05 1.925-.06v-2.643c3.88.173 6.775.85 6.775 1.658c0 .81-2.895 1.485-6.775 1.657m0-3.59v-2.366h5.414V7.819H8.595v3.608h5.414v2.365c-4.4.202-7.709 1.074-7.709 2.118s3.309 1.915 7.709 2.118v7.582h3.913v-7.584c4.393-.202 7.694-1.073 7.694-2.116s-3.301-1.914-7.694-2.117"/></g></svg>
    </div>
  </div>

  <!-- Bottom -->
  <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 animate-float3">
    <div class="w-14 h-14 rounded-full bg-gray-900 flex items-center justify-center shadow-lg">
      <svg class=" animate-float12" xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 24 24"><!-- Icon from Ultimate free icons by Streamline - https://creativecommons.org/licenses/by/4.0/ --><path fill="blue" d="M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0M7.89 10.07l3.5-5a.77.77 0 0 1 1.22 0l3.5 5a.74.74 0 0 1-.12 1l-3.5 3a.76.76 0 0 1-1 0l-3.5-3a.74.74 0 0 1-.1-1m8.24 6.65l-3.47 3a1 1 0 0 1-1.32 0l-3.47-3a1 1 0 0 1 1.32-1.51L12 17.67l2.81-2.46a1 1 0 0 1 1.32 1.51"/></svg>
    </div>
  </div>

  <!-- Left -->
  <div class="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-float4">
    <div class="w-14 h-14 rounded-full bg-gray-900 flex items-center justify-center shadow-lg">
      <svg class=" animate-float1" xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 24 24"><!-- Icon from Akar Icons by Arturo Wibawa - https://github.com/artcoholic/akar-icons/blob/master/LICENSE --><g fill="none"><g fill="yellow" cliw-path="url(#SVGXv8lpc2Y)"><path d="M11.385 15.275c1.111-.004 3.54-.013 3.512-1.558c-.027-1.58-2.36-1.485-3.497-1.438q-.192.009-.332.011l.052 2.987q.114-.003.265-.002m-.118-4.353c.927-.001 2.95-.003 2.926-1.408c-.026-1.437-1.969-1.352-2.918-1.31q-.16.008-.278.01l.047 2.709z"/><path fill-rule="evenodd" d="M9.096 23.641c6.43 1.603 12.942-2.31 14.545-8.738C25.244 8.474 21.33 1.962 14.9.36C8.474-1.244 1.962 2.67.36 9.1c-1.603 6.428 2.31 12.94 8.737 14.542m4.282-17.02c1.754.124 3.15.638 3.333 2.242c.136 1.174-.344 1.889-1.123 2.303c1.3.288 2.125 1.043 1.995 2.771c-.161 2.145-1.748 2.748-4.026 2.919l.038 2.25l-1.356.024l-.039-2.22q-.526.01-1.084.008l.04 2.23l-1.356.024l-.04-2.254l-.383.003q-.292 0-.586.006l-1.766.03l.241-1.624s1.004-.002.986-.017c.384-.008.481-.285.502-.459L8.693 11.3l.097-.002h.046a1 1 0 0 0-.144-.007l-.044-2.54c-.057-.274-.241-.59-.79-.58c.015-.02-.986.017-.986.017L6.846 6.74l1.872-.032v.007q.423-.008.863-.026L9.543 4.46l1.356-.023l.038 2.184c.362-.013.726-.027 1.083-.033l-.038-2.17l1.357-.024z" clip-rule="evenodd"/></g><defs><clipPath id="SVGXv8lpc2Y"><path fill="#fff" d="M0 0h24v24H0z"/></clipPath></defs></g></svg>
    </div>
  </div>
</div>


      </div>
    </section>

    <section class="py-20 bg-gray-100 text-">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        <!-- LEFT: FEATURES GRID -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-10">

          <Features
             icon="/p1.svg"
            title="Asset Protection"
            text="Get onboard today on QFS and get liberated from all financial limitations."
            :delay="0"
          />

          <Features
           icon="/h.svg"
            title="Humanitarian Project"
            text="Get access to funds once your humanitarian project is approved."
            :delay="100"
          />

          <Features
             icon="/w2.svg"
            title="Wallet Sync"
            text="Sync your asset to QFS Ledger 3 system."
            :delay="200"
          />

          <Features
           icon="/r1.svg"
            title="Asset Recovery"
            text="Intercept and recover stolen digital assets with help from international police."
            :delay="300"
          />

        </div>

        <!-- RIGHT: CONTENT -->
        <div class="space-y-6">
          <p
            class="text-[#fcb900] uppercase tracking-wider animate-fade-up"
          >
            QFS is Coming!
          </p>

          <h2
            class="text-3xl md:text-4xl font-bold leading-tight animate-fade-up delay-200"
          >
            Get Ready for a Revolutionary Financial System <br />
            QFS Nesara Official
          </h2>

          <p
            class="text-gray-600 max-w-xl animate-fade-up delay-300"
          >
            QFS literal meaning is Quantum Financial System, an advanced financial
            system launched to eradicate monopoly in the monetary system. It
            combines artificial intelligence and complex computer programs fully
            backed by banks.
          </p>

          <div class="flex flex-wrap gap-4 pt-4 animate-fade-up delay-500">
            <NuxtLink
              to="/register"
              class="px-6 py-3 rounded-lg bg-[#fcb900] text-black font-semibold hover:scale-105 transition"
            >
              Get Started
            </NuxtLink>

            <NuxtLink
              to="/login"
              class="px-6 py-3 rounded-lg border border-[#fcb900] text-[#fcb900] hover:bg-[#fcb900] hover:text-black transition"
            >
              Login
            </NuxtLink>
          </div>
        </div>

      </div>
    </div>
  </section>

  <section id="about" class=" text-white">
    <div class="max-w-7xl mx-auto bg-black px-6 py-24 rounded-lg">

      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-14">
        <div>
          <p class="text-[#fcb900] uppercase tracking-wider animate-fade-up">
            About QFS
          </p>
          <h2 class="text-3xl md:text-4xl font-bold animate-fade-up delay-200">
            Quantum Financial System
          </h2>
        </div>

        <NuxtLink
          to="#"
          class="inline-flex px-6 py-3 rounded-lg border border-[#fcb900] text-[#fcb900]
                 hover:bg-[#fcb900] hover:text-black transition animate-fade-up delay-400"
        >
          Learn More
        </NuxtLink>
      </div>

      <!-- Text -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <p class="text-gray-300 leading-relaxed animate-fade-up delay-300">
          Quantum Financial System (QFS) is an advanced financial infrastructure
          designed to eliminate monopoly in the monetary system using artificial
          intelligence and asset-backed technology such as gold, platinum, and oil.
        </p>

        <p class="text-gray-300 leading-relaxed animate-fade-up delay-500">
          NESARA/GESARA and the Global Currency Reset introduce ISO 20022 compliant
          digital assets like XRP, XLM, XDC, ALGO, IOTA, and SHX—forming the backbone
          of the new QFS ecosystem.
        </p>
      </div>

      <!-- Splide Slider -->
      <Splide
        :options="options"
        class="animate-fade-up delay-700"
      >
        <SplideSlide v-for="(img, index) in images" :key="index">
          <img
            :src="img"
            class="rounded-xl w-full h-[260px] object-cover hover:scale-105 transition"
            alt="QFS Banking"
          />
        </SplideSlide>
      </Splide>

    </div>
  </section>


  <section id="services" class="py-20 bg-gray-100 ">
  <div class="max-w-7xl mx-auto px-6">
    
    <!-- Section Header -->
    <div class="text-center mb-14">
      <p class="text-sm uppercase tracking-widest text-gray-800 mb-3">
        Our Services
      </p>
      <h2 class="text-3xl md:text-4xl font-bold leading-tight">
        ISO20022: Global Economic Security and Reformation Act
      </h2>
    </div>

    <!-- Services Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      
      <Services
        icon="credit-List"
        title="Wallet Security"
        text="Our system is developed to stop any form of cyber attacks that could result in loss of assets."
      />

      <Services
        icon="coins"
        title="Stolen & Asset Recovery"
        text="Intercept and recover stolen digital assets with help from international police."
      />

      <Services
        icon="sync"
        title="Sync Your Wallet"
        text="Designed to fortify your assets with anti-theft and anti-hack security systems."
      />

      <Services
        icon="growth"
        title="Humanitarian Project"
        text="Get access to funds once your humanitarian project is approved."
      />

      <Services
        icon="assets"
        title="Assets & Conversion"
        text="A universal network developed to facilitate the transfer of asset-backed funds."
      />

      <Services
        icon="decentralize"
        title="Decentralization"
        text="Break free from the current financial system as it is built to collapse."
      />

    </div>
  </div>
  </section>


  <section id="tfn" class="py-24 bg-gray-50">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Section Title -->
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-extrabold ">
          The Flare Network
        </h2>
      </div>

      <!-- Videos Grid -->
      <div class="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="video in videos"
          :key="video.title"
          class="group rounded-2xl overflow-hidden
                 bg-gray-900 transition-all duration-500
                 hover:-translate-y-3 hover:shadow-2xl hover:shadow-black/50"
        >
          <!-- Video -->
          <div class="relative aspect-video overflow-hidden">
            <iframe
              :src="video.src"
              class="absolute inset-0 w-full h-full
                     transition-transform duration-700
                     group-hover:scale-105"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>

          <!-- Content -->
          <div class="p-6">
            <h3
              class="text-lg font-semibold text-white mb-2
                     transition-colors group-hover:text-primary"
            >
              {{ video.title }}
            </h3>

            <p class="text-sm text-gray-400">
              Watch on YouTube
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>


  <section class="py-24 bg-gray-950">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid lg:grid-cols-2 gap-16 items-center">

        <!-- Video Column -->
        <div
          class="relative rounded-2xl overflow-hidden
                 bg-gray-900 aspect-video
                 shadow-xl hover:shadow-2xl
                 transition-all duration-500"
        >
          <iframe
            class="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/sFX1d7Si3mA"
            title="QFS Overview"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
        </div>

        <!-- Content Column -->
        <div class=" w-full">
          <!-- Section Header -->
          <p class="text-primary font-semibold mb-3">
            Why Choose QFS
          </p>

          <h2 class="text-3xl md:text-4xl font-extrabold text-white mb-10 leading-tight">
            Get to Safety before the collapse of the World Banking System
          </h2>

          <!-- Features Grid -->
          <div class="grid sm:grid-cols-2 gap-8">
            <FeatureList
              title="Protection"
              text="Get your assets secured on our Ledger-3 security system."
            />

            <FeatureList
              title="Innovation"
              text="QFS is powered by Web3 technology to eliminate centralization."
            />

            <FeatureList
              title="Decentralization"
              text="Break free from the current financial system built to collapse."
            />

            <FeatureList
              title="Secured System"
              text="256-bit encryption with fortified global infrastructure."
            />
          </div>
        </div>

      </div>
    </div>
  </section>


  <section class="py-24 bg-gray-50">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid lg:grid-cols-2 gap-16 items-center">

        <!-- Left: Decorative Line / Visual -->
        <div class=" lg:flex items-center justify-center ">
          <!-- <div class="w-full h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0" /> -->
          <img src="/Credit-Card.jpg" alt="" class="w-full h-full rounded-lg">
        </div>

        <!-- Right: Content -->
        <div>
          <!-- Header -->
          <p class="text-primary font-semibold mb-3">
            How we work
          </p>

          <h2 class="text-3xl md:text-4xl font-extrabold text mb-14">
            Quantum Financial System
          </h2>

          <!-- Steps -->
          <div class="space-y-10">
            <StepCard
              step="01"
              title="Sign Up"
              text="Sign up for onboarding on QFS, then verify your identity."
              icon="document"
            />

            <StepCard
              step="02"
              title="Wait for Approval"
              text="Once KYC submission is approved, sync your wallet or apply for a humanitarian project."
              icon="support"
            />

            <StepCard
              step="03"
              title="Get Your QFS Card"
              text="Bid for the new QFS card and shop worldwide without limitations."
              icon="card"
            />
          </div>
        </div>

      </div>
    </div>
  </section>

  <section
    id="contact"
    class="py-24 bg-gray-950 overflow-hidden"
  >
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        <!-- LEFT CONTENT -->
        <div>
          <!-- Label -->
          <p
            class="text-primary font-semibold mb-4
                   animate-fade-up"
          >
            Get Started
          </p>

          <!-- Heading -->
          <h2
            class="text-3xl md:text-4xl font-extrabold text-white mb-6
                   animate-fade-up delay-200"
          >
            Your Financial Freedom Begins Here
          </h2>

          <!-- Description -->
          <p
            class="text-gray-400 leading-relaxed mb-10
                   animate-fade-up delay-400"
          >
            The history of money is entering a new era. You might wake up one day
            with no paper money. Convert traditional currency into a digitally
            gold-backed financial system built for the future.
          </p>

          <!-- Buttons -->
          <div
            class="flex flex-wrap gap-4
                   animate-fade-up delay-600"
          >
            <!-- Primary -->
            <NuxtLink
              to="/register"
              class="px-7 py-3 rounded-lg bg-primary text-white font-semibold
                     transition-all duration-300
                     hover:bg-primary/90 hover:-translate-y-1
                     hover:shadow-lg hover:shadow-primary/30"
            >
              Get Started
            </NuxtLink>

            <!-- Secondary -->
            <a
              href="mailto:support@example.com"
              class="px-7 py-3 rounded-lg border border-gray-700
                     text-gray-300 font-semibold
                     flex items-center gap-2
                     transition-all duration-300
                     hover:bg-gray-800 hover:text-white
                     hover:border-gray-600 hover:-translate-y-1"
            >
              Contact Us
              <span class="text-lg transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>

        <!-- RIGHT IMAGE -->
        <div
          class="relative flex justify-center
                 animate-fade-in"
        >
          <img
            src="/image02.png"
            alt="Card Mockup"
            class="max-w-sm lg:max-w-md
                   rounded-xl shadow-2xl
                   transition-transform duration-500
                   hover:scale-105"
          />
        </div>

      </div>
    </div>
  </section>



  </template>


<script setup>
    import { Splide, SplideSlide } from '@splidejs/vue-splide'
    import '@splidejs/vue-splide/css'

    definePageMeta(
        {
        layout: 'custom',
        }
    );
    
    const images = [
      '/c.jpg',
      '/c.jpg',
      '/c.jpg',
      '/c.jpg',
    ]
    
    const options = {
      type: 'loop',
      autoplay: true,
      interval: 5000,
      pauseOnHover: true,
      arrows: false,
      pagination: false,
      gap: '30px',
      perPage: 3,
      breakpoints: {
        1024: { perPage: 2 },
        640: { perPage: 1 },
      },
    }

    const videos = [
  {
    title: 'XRP End Game',
    src: 'https://www.youtube.com/embed/sFX1d7Si3mA',
  },
  {
    title: 'New World Reserve Cryptocurrency Incoming! – Powered by Ripple (XRP)',
    src: 'https://www.youtube.com/embed/yLeji6EidI8',
  },
  {
    title: 'Interview with Mark Philips',
    src: 'https://www.youtube.com/embed/juUgJwBwgWk',
  },
]
    </script>
    
  
  <style scoped>
  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fade-up {
    animation: fadeUp 0.8s ease-out forwards;
  }
  
  .delay-200 {
    animation-delay: 0.2s;
  }
  .delay-400 {
    animation-delay: 0.4s;
  }
  .delay-600 {
    animation-delay: 0.6s;
  }
  .delay-800 {
    animation-delay: 0.8s;
  }
  
  @keyframes spinSlow {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  .animate-spin-slow {
    animation: spinSlow 18s linear infinite;
  }
  </style>
  