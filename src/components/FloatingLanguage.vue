<template>
    <div
      ref="wrapper"
      class="fixed bottom-6 left-6 z-[9999]"
    >
      <button
        @click="toggle"
        class="flex items-center gap-2 px-4 py-3 rounded-full bg-blue-600 text-white shadow-xl hover:bg-blue-700 transition"
      >
        <svg
          v-if="loading"
          class="animate-spin w-5 h-5"
          viewBox="0 0 24 24"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="white"
            stroke-width="3"
            fill="none"
            stroke-linecap="round"
          />
        </svg>
  
        <span v-else>
          🌐
        </span>
  
        <span class="hidden md:block">
          {{ loading ? "Loading..." : "Language" }}
        </span>
      </button>
  
      <Transition
        enter-active-class="transition duration-200"
        enter-from-class="opacity-0 scale-90"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-200"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-90"
      >
        <div
          v-show="open"
          class="absolute bottom-16 left-0 bg-white rounded-xl shadow-xl border p-5 w-72"
        >
          <h3 class="font-semibold mb-3">
            Select Language
          </h3>
  
          <div
            v-if="loading"
            class="py-8 flex flex-col items-center"
          >
            <div
              class="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"
            ></div>
  
            <p class="mt-3 text-gray-500">
              Loading translator...
            </p>
          </div>
  
          <div
            id="google_translate_element"
            v-show="!loading"
          ></div>
        </div>
      </Transition>
    </div>
  </template>
  
  <script setup>
  import {
    ref,
    onMounted,
    onBeforeUnmount,
    nextTick,
  } from "vue";
  
  const wrapper = ref(null);
  
  const open = ref(false);
  
  const loading = ref(true);
  
  const initialized = ref(false);
  
  const toggle = async () => {
    open.value = !open.value;
  
    if (!open.value) return;
  
    if (initialized.value) return;
  
    if (!window.google?.translate) return;
  
    await nextTick();
  
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
  
        includedLanguages:
          "en,fr,es,de,it,pt,ru,ar,zh-CN,ja,ko,hi,tr,nl,pl,sv,id,th,vi,ha,yo",
  
        layout:
          window.google.translate.TranslateElement
            .InlineLayout.SIMPLE,
      },
      "google_translate_element"
    );
  
    initialized.value = true;
  };
  
  const closeOutside = (e) => {
    if (!wrapper.value?.contains(e.target)) {
      open.value = false;
    }
  };
  
  const ready = () => {
    loading.value = false;
  };
  
  onMounted(() => {
    document.addEventListener(
      "click",
      closeOutside
    );
  
    if (window.google?.translate) {
      ready();
    } else {
      window.addEventListener(
        "google-translator-ready",
        ready
      );
    }
  });
  
  onBeforeUnmount(() => {
    document.removeEventListener(
      "click",
      closeOutside
    );
  
    window.removeEventListener(
      "google-translator-ready",
      ready
    );
  });
  </script>
  
  <style>
  .goog-logo-link,
  .goog-te-gadget span {
    display: none !important;
  }
  
  .goog-te-gadget {
    color: transparent !important;
  }
  
  .goog-te-banner-frame.skiptranslate {
    display: none !important;
  }
  
  .goog-te-combo {
    width: 100%;
    padding: 10px;
    border-radius: 12px;
  }
  </style>