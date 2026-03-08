<template>
  <footer class="bg-gray-950 text-gray-400">
    <!-- TOP FOOTER -->
    <div class="max-w-7xl mx-auto px-6 py-20">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">

        <!-- BRAND -->
        <div>
          <!-- <img
            src="/files/logo_Asset-5-1024x318.png"
            alt="QFS Logo"
            class="h-14 mb-6"
          /> -->

          <p class="text-sm leading-relaxed mb-6">
            Join the biggest financial revolutionary system designed to overtake
            the world’s banking structure by eliminating centralized control
            of money.
          </p>

          <!-- Socials -->
          <div class="flex gap-4">
            <a
              v-for="icon in socials"
              :key="icon.name"
              :href="icon.link"
              target="_blank"
              class="w-10 h-10 rounded-full bg-gray-800
                     flex items-center justify-center
                     transition hover:bg-primary hover:text-white"
            >
              <i :class="icon.icon"></i>
            </a>
          </div>
        </div>

        <!-- QUICK LINKS -->
        <div>
          <h4 class="text-white font-semibold mb-5">Quick Links</h4>
          <ul class="space-y-3">
            <li><NuxtLink to="/" class="hover:text-white">Home</NuxtLink></li>
            <li><a href="#about" class="hover:text-white">About</a></li>
            <li><a href="#services" class="hover:text-white">Services</a></li>
            <li><a href="#contact" class="hover:text-white">Contact</a></li>
            <li><NuxtLink to="/login" class="hover:text-white">Login</NuxtLink></li>
          </ul>
        </div>

        <!-- SUPPORT -->
        <div>
          <h4 class="text-white font-semibold mb-5">Support</h4>

          <ul class="space-y-3 mb-6">
            <li><a href="#" class="hover:text-white">Help Center</a></li>
            <li><NuxtLink to="/login" class="hover:text-white">Privacy Policy</NuxtLink></li>
            <li><NuxtLink to="/login" class="hover:text-white">Disclaimer</NuxtLink></li>
            <li><NuxtLink to="/login" class="hover:text-white">FAQs</NuxtLink></li>
            <li><NuxtLink to="/login" class="hover:text-white">Contact</NuxtLink></li>
          </ul>

          <p class="text-sm mb-4">
            Our support team is always online to assist you.
          </p>

          <a
            href="mailto:support@example.com"
            class="inline-block px-6 py-3 rounded-lg
                   bg-primary text-white font-medium
                   transition hover:bg-primary/90 hover:-translate-y-1"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>

    <!-- BOTTOM BAR -->
    <div class="border-t border-gray-800">
      <div
        class="max-w-7xl mx-auto px-6 py-6
               flex flex-col md:flex-row
               items-center justify-between gap-4"
      >
        <p class="text-sm">
          © 2024 Quantum Security Network. All rights reserved.
        </p>

        <div class="flex gap-4 text-sm">
          <NuxtLink to="/login" class="hover:text-white">
            Privacy Policy
          </NuxtLink>
          <NuxtLink to="/login" class="hover:text-white">
            Terms & Services
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const socials = [
  { name: 'facebook', icon: 'fab fa-facebook-f', link: '#' },
  { name: 'twitter', icon: 'fab fa-twitter', link: '#' },
  { name: 'youtube', icon: 'fab fa-youtube', link: '#' },
  { name: 'linkedin', icon: 'fab fa-linkedin-in', link: '#' },
]
</script>
