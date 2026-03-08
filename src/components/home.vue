<template>
   <section 
  id="home" 
  class="min-h-[95vh] relative flex pt-24 md:pt-0 justify-center items-center bg-cover bg-center"
  style="background-image: url('/image/car-home1.jpg');"
>
  <!-- Overlay for better readability -->
  <div class="absolute inset-0 bg-black/40"></div>

  <!-- Main Content -->
  <div class="relative z-10 text-center text-white w-full px-4 max-w-[1100px] mx-auto">
    

    <!-- Small Intro Text -->
    <p class="text-sm md:text-base text-gray-200 tracking-widest uppercase mb-2">
      Find Your Dream Ride
    </p>

    <!-- Main Heading -->
    <h1 class="text-3xl md:text-6xl font-bold mb-4">
      Buy or Rent Cars Easily
    </h1>

    <!-- Subtext -->
    <p class="text-gray-300 max-w-[600px] mx-auto mb-8 text-sm md:text-lg">
      Discover thousands of new, used, and rental cars near you — compare prices, explore models, and drive away happy.
    </p>

    <!-- Tabs -->
    <div class="flex justify-center gap-4 mb-6">
      <button class="px-4 py-2 rounded-full bg-yellow-500 text-black font-semibold hover:bg-yellow-400">All</button>
      <button class="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20">Used</button>
      <button class="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20">New</button>
    </div>

    <!-- Search Box -->
    <div class="bg-white/10 backdrop-blur-lg rounded-2xl w-[80%] p-4 md:p-6 inline-block shadow-lg mb-6">
      <div class="flex flex-col md:flex-row gap-3 md:gap-4 items-center">
        <!-- Dropdowns -->
        <select class="bg-transparent border border-white/30 w-full text-white px-3 py-2 rounded-lg focus:outline-none">
          <option>Make</option>
          <option>Toyota</option>
          <option>Honda</option>
          <option>BMW</option>
        </select>

        <select class="bg-transparent border border-white/30 w-full text-white px-3 py-2 rounded-lg focus:outline-none">
          <option>Model</option>
          <option>Camry</option>
          <option>Civic</option>
          <option>3 Series</option>
        </select>

        <select class="bg-transparent border w-full border-white/30 text-white px-3 py-2 rounded-lg focus:outline-none">
          <option>Price Range</option>
          <option>$10,000 - $20,000</option>
          <option>$20,000 - $40,000</option>
        </select>

        <!-- Search Button -->
        <button class="bg-yellow-500 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition">
          Search
        </button>
      </div>
    </div>

    <!-- Browse Models -->
    <p class="text-sm md:text-base hidden md:block text-gray-200 mb-3">or browse by model</p>

    <!-- Model Buttons -->
    <div class="hidden md:flex flex-wrap justify-center gap-3">
      <button class="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-sm hover:bg-white/20">
        Toyota
      </button>
      <button class="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-sm hover:bg-white/20">
        BMW
      </button>
      <button class="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-sm hover:bg-white/20">
        Mercedes
      </button>
      <button class="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-sm hover:bg-white/20">
        Tesla
      </button>
      <button class="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-sm hover:bg-white/20">
        Honda
      </button>
    </div>

  </div>

  <!-- Decorative Bottom Shape -->
  <div class="absolute bottom-0 left-0 w-full">
    <img src="/hero/rect.png" alt="hero-bg" class="w-full opacity-70" />
  </div>
</section>

</template>

