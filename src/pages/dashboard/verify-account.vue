<template>
    <main class="min-h-screen bg-[#f5f8ff] py-6 md:px-4">
  
      <div class="max-w-4xl ">
  
        <!-- HERO -->
        <div
          class="relative overflow-hidden rounded-md bg-gradient-to-r from-blue-700 via-indigo-600 to-violet-600 p-5 md:p-10 text-white">
  
          <div class="absolute right-0 top-0 opacity-20">
            <div class="w-80 h-80 rounded-full bg-white blur-3xl"></div>
          </div>
  
          <h1 class="text-4xl font-bold">
            Verify your Identity
          </h1>
  
          <p class="mt-3 max-w-xl text-blue-100">
            Complete your identity verification to unlock deposits,
            withdrawals, P2P trading and higher account limits.
          </p>
  
        </div>
  
        <!-- PROGRESS CARD -->
  
        <div
          class="mt-8 rounded-md bg-white border p-5 md:p-8">
  
          <div class="flex justify-between mb-3">
  
            <h3 class="font-semibold text-gray-700">
              Verification Progress
            </h3>
  
            <span class="font-bold text-blue-600">
              {{ percentage }}%
            </span>
  
          </div>
  
          <!-- progress -->
  
          <div class="w-full h-3 rounded-full bg-gray-200 overflow-hidden">
  
            <div
              class="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 duration-500"
              :style="{width:percentage+'%'}"
            />
  
          </div>
  
          <!-- steps -->
  
          <div class="flex justify-between mt-8">
  
            <div
              v-for="(item,index) in steps"
              :key="item.title"
              class="flex flex-col items-center flex-1 relative"
            >
  
              <div
                class="w-14 h-14 rounded-full flex items-center justify-center font-bold transition-all duration-300"
  
                :class="[
                  pinia.state.currentStep>index+1
                  ?'bg-green-500 text-white'
  
                  :pinia.state.currentStep===index+1
                  ?'bg-blue-600 text-white scale-110 shadow-lg'
  
                  :'bg-gray-200 text-gray-500'
                ]"
              >
  
                <span v-if="pinia.state.currentStep>index+1">
                  ✓
                </span>
  
                <span v-else>
                  {{index+1}}
                </span>
  
              </div>
  
              <p class="mt-3 text-sm font-semibold">
                {{item.title}}
              </p>
  
              <span class="text-xs text-gray-500">
                {{item.subtitle}}
              </span>
  
            </div>
  
          </div>
  
        </div>
  
        <!-- STEP 1 -->
  
        <Transition
          enter-active-class="transition duration-300"
          enter-from-class="opacity-0 translate-y-8"
          enter-to-class="opacity-100 translate-y-0"
        >
  
          <div
            v-if="pinia.state.currentStep===1"
            class="mt-8 bg-white rounded-md border p-5 md:p-8"
          >
  
            <div class="flex justify-between items-center">
  
              <div>
  
                <h2 class="text-2xl font-bold">
                  Personal Information
                </h2>
  
                <p class="text-gray-500 mt-1">
                  Tell us who you are.
                </p>
  
              </div>
  
              <div
                class="bg-blue-50 min-w-[100px]  px-2 md:px-4 py-2 text-center rounded-full text-blue-600 text-xs md:text-sm font-semibold"
              >
                Step 1 of 4
              </div>
  
            </div>
  
            <div class="grid md:grid-cols-2 gap-6 mt-8">
  
              <div>
  
                <label class="label">
                  First Name
                </label>
  
                <input
                  v-model="form.firstName"
                  class="input"
                  placeholder="Enter your first name"
                >
  
              </div>
  
              <div>
  
                <label class="label">
                  Last Name
                </label>
  
                <input
                  v-model="form.lastName"
                  class="input"
                  placeholder="Enter your last name"
                >
  
              </div>
  
              <div>
  
                <label class="label">
                  Date of Birth
                </label>
  
                <input
                  type="date"
                  v-model="form.dob"
                  class="input"
                  placeholder="Select your date of birth"
                >
  
              </div>
  
              <div>
  
                <label class="label">
                  Nationality
                </label>
  
                <input
                  v-model="form.nationality"
                  class="input"
                  placeholder="Enter your nationality"
                >
  
              </div>
  
              <div class="md:col-span-2">
  
                <label class="label">
                  Residential Address
                </label>
  
                <textarea
                  rows="4"
                  v-model="form.address"
                  class="input"
                  placeholder="Enter your residential address"
                />
  
              </div>
  
            </div>
  
            <div class="flex justify-end mt-10">
  
              <button
                :disabled="disabled1"
                @click="nextStep"
                class="px-8 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
              >
                Continue →
              </button>
  
            </div>
  
          </div>
  
        </Transition>

        <!-- ===========================
        STEP 2 - DOCUMENT INFORMATION
        ============================ -->

        <Transition
          enter-active-class="transition duration-300"
          enter-from-class="opacity-0 translate-y-8"
          enter-to-class="opacity-100 translate-y-0"
        >
            <div
            v-if="pinia.state.currentStep === 2"
            class="animate-fadeIn"
            >

            <div class="mt-6 flex items-center justify-between mb-6">

                <div>
                <h2 class="text-2xl font-bold">
                    Identity Documents
                </h2>

                <p class="text-gray-500 text-sm mt-1">
                    Upload a valid government-issued identification.
                </p>
                </div>

                <span
                class="min-w-[100px]  px-2 md:px-4 py-2 text-center rounded-full bg-blue-100 text-blue-700 text-sm font-medium"
                >
                Step 2 of 4
                </span>

            </div>

            <div class="grid md:grid-cols-2 gap-6">

                <!-- Document Type -->

                <div>

                <label class="font-medium">
                    Document Type
                </label>

                <select
                    v-model="form.documentType"
                    class="input"
                    placeholder="Select Document"
                >
                    <option value="">
                    Select Document
                    </option>

                    <option>National ID</option>

                    <option>International Passport</option>

                    <option>Driver's License</option>

                    <option>Voter Card</option>

                </select>

                </div>

                <!-- Number -->

                <div>

                <label class="font-medium">
                    Document Number
                </label>

                <input
                    v-model="form.documentNumber"
                    class="input"
                    placeholder="Enter document number"
                >

                </div>

            </div>

          <!-- Upload Cards -->
              <div class="grid md:grid-cols-2 gap-6 mt-8">

              <!-- ================= FRONT ================= -->

              <label
                class="border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer hover:border-blue-500 transition"
              >

                <input
                  hidden
                  type="file"
                  accept="image/*,.pdf"
                  @change="uploadFront"
                />

                <!-- Empty -->

                <div v-if="!form.frontFile">

                  <div class="text-5xl">
                    📄
                  </div>

                  <p class="font-semibold mt-3">
                    Upload Front
                  </p>

                  <p class="text-gray-500 text-sm">
                    JPG, PNG or PDF
                  </p>

                </div>

                <!-- Uploaded -->

                <div v-else>

                  <div class="flex flex-col items-center">

                    <!-- IMAGE -->

                    <img
                      v-if="!form.frontFile.toLowerCase().endsWith('.pdf')"
                      :src="form.frontFile"
                      class="w-48 h-48 object-cover rounded-xl border"
                    >

                    <!-- PDF -->

                    <div
                      v-else
                      class="w-48 h-48 rounded-xl border bg-gray-100 flex items-center justify-center text-6xl"
                    >
                      📑
                    </div>

                    <p class="mt-3 font-semibold truncate w-48">
                      Front Uploaded
                    </p>

                    <button
                      type="button"
                      class="mt-2 text-red-500 hover:underline"
                      @click.stop.prevent="removeFront"
                    >
                      Remove
                    </button>

                  </div>

                </div>

              </label>


              <!-- ================= BACK ================= -->

              <label
                class="border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer hover:border-blue-500 transition"
              >

                <input
                  hidden
                  type="file"
                  accept="image/*,.pdf"
                  @change="uploadBack"
                />

                <!-- Empty -->

                <template v-if="!form.backFile">

                  <div class="text-5xl">
                    🪪
                  </div>

                  <p class="font-semibold mt-3">
                    Upload Back
                  </p>

                  <p class="text-gray-500 text-sm">
                    JPG, PNG or PDF
                  </p>

                </template>

                <!-- Uploaded -->

                <template v-else>

                  <div class="flex flex-col items-center">

                    <!-- IMAGE -->

                    <img
                      v-if="!form.backFile.toLowerCase().endsWith('.pdf')"
                      :src="form.backFile"
                      class="w-48 h-48 object-cover rounded-xl border"
                    >

                    <!-- PDF -->

                    <div
                      v-else
                      class="w-48 h-48 rounded-xl border bg-gray-100 flex items-center justify-center text-6xl"
                    >
                      📑
                    </div>

                    <p class="mt-3 font-semibold truncate w-48">
                      Back Uploaded
                    </p>

                    <button
                      type="button"
                      class="mt-2 text-red-500 hover:underline"
                      @click.stop.prevent="removeBack"
                    >
                      Remove
                    </button>

                  </div>

                </template>

              </label>

              </div>

            <!-- Tips -->

            <div
                class="mt-8 bg-blue-50 rounded-xl border border-blue-100 p-5"
            >

                <h4 class="font-semibold mb-3">
                Tips
                </h4>

                <ul class="text-sm text-gray-600 space-y-2">

                <li>✔ Upload the original document.</li>

                <li>✔ Ensure all corners are visible.</li>

                <li>✔ Avoid blurry images.</li>

                <li>✔ No screenshots.</li>

                </ul>

            </div>

            <!-- Buttons -->

            <div class="flex justify-between mt-10">

                <button
                @click="pinia.state.currentStep = 1"
                class="px-6 py-3 rounded-xl border hover:bg-gray-50"
                >
                ← Back
                </button>

                <button
                :disabled="disabled2"
                @click="nextToStep3"
                class="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed   text-white px-8 py-3 rounded-xl font-semibold"
                >
                Continue →
                </button>

            </div>

            </div>
        </Transition>


        <!-- ==================================
        STEP 3 - REVIEW & SUBMIT
        =================================== -->

        <div
        v-if="pinia.state.currentStep === 3"
        class="animate-fadeIn"
        >

        <div class="mt-6 flex items-center justify-between mb-8">

            <div>
            <h2 class="text-2xl font-bold">
                Review & Submit
            </h2>

            <p class="text-gray-500 mt-1">
                Review your information before submitting.
            </p>
            </div>

            <span
            class="min-w-[100px]  px-2 md:px-4 py-2 text-center rounded-full bg-green-100 text-green-700 text-sm font-semibold"
            >
            Step 3 of 4
            </span>

        </div>

        <!-- Review Card -->

        <div
            class="border rounded-2xl p-6 bg-gray-50 space-y-4"
        >

            <h3 class=" font-semibold text-lg">
            Personal Information
            </h3>

            <div class="grid md:grid-cols-2 gap-4 text-sm">

            <div>
                <span class="text-gray-500">First Name</span>
                <p class="font-semibold">
                {{ form.firstName }}
                </p>
            </div>

            <div>
                <span class="text-gray-500">Last Name</span>
                <p class="font-semibold">
                {{ form.lastName }}
                </p>
            </div>

            <div>
                <span class="text-gray-500">Nationality</span>
                <p class="font-semibold">
                {{ form.nationality }}
                </p>
            </div>

            <div>
                <span class="text-gray-500">Date of Birth</span>
                <p class="font-semibold">
                {{ form.dob }}
                </p>
            </div>

            <div class="md:col-span-2">
                <span class="text-gray-500">
                Residential Address
                </span>

                <p class="font-semibold">
                {{ form.address }}
                </p>
            </div>

            </div>

        </div>

        <!-- Document -->

       <div
        class="border rounded-2xl p-6 mt-6 bg-gray-50"
      >
        <h3 class="font-semibold text-lg mb-5">
          Document Details
        </h3>

        <div class="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <span class="text-gray-500 text-sm">
              Document Type
            </span>

            <p class="font-semibold">
              {{ form.documentType }}
            </p>
          </div>

          <div>
            <span class="text-gray-500 text-sm">
              Document Number
            </span>

            <p class="font-semibold">
              {{ form.documentNumber }}
            </p>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-6">

          <!-- FRONT -->

          <div>

            <p class="font-medium mb-3">
              Front Image
            </p>

            <div
              class="border rounded-xl overflow-hidden h-56 bg-white flex items-center justify-center"
            >

              <img
                v-if="frontPreview || pinia.state.verificationForm.frontFile"
                :src="frontPreview || pinia.state.verificationForm.frontFile"
                class="w-full h-full object-cover"
              >

              <div
                v-else
                class="text-center"
              >
                📄
                <p class="mt-2">
                  {{ form.frontFile?.name }}
                </p>
              </div>

            </div>

          </div>

          <!-- BACK -->

          <div>

            <p class="font-medium mb-3">
              Back Image
            </p>

            <div
              class="border rounded-xl overflow-hidden h-56 bg-white flex items-center justify-center"
            >

              <img
                v-if="backPreview || pinia.state.verificationForm.backFile"
                :src="backPreview || pinia.state.verificationForm.backFile"
                class="w-full h-full object-cover"
              >

              <div
                v-else
                class="text-center"
              >
                📄
                <p class="mt-2">
                  {{ form.backFile?.name }}
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

        <!-- Selfie Upload -->

        <div
            class="border rounded-2xl p-6 mt-8 bg-gray-50"
          >

            <h3 class="font-semibold text-lg mb-5">
              Selfie Verification
            </h3>

            <div
              v-if="selfiePreview"
              class="w-64 h-64 mx-auto rounded-2xl overflow-hidden border"
            >
              <img
                :src="selfiePreview"
                class="w-full h-full object-cover"
              >
            </div>

            <div
              v-else
              class="border-2 border-dashed rounded-2xl p-10 text-center"
            >

              <div class="text-6xl">
                🤳
              </div>

              <h3 class="font-semibold text-lg mt-4">
                Upload Selfie
              </h3>

              <p class="text-gray-500 mt-2">
                Upload a clear selfie while holding your ID.
              </p>

              <label
                class="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl cursor-pointer hover:bg-blue-700"
              >

                Upload Selfie

                <input
                  hidden
                  type="file"
                  accept="image/*"
                  @change="uploadSelfie"
                >

              </label>

            </div>

            <p
              v-if="form.selfieFile"
              class="text-green-600 mt-4 text-center font-medium"
            >
              ✅ {{ form.selfieFile.name }}
            </p>

          </div>
        <!-- Declaration -->

        <div
            class="bg-blue-50 border border-blue-200 rounded-xl p-5 mt-8"
        >

            <label class="flex items-start gap-3">

            <input
                type="checkbox"
                v-model="accepted"
                class="mt-1"
            >

            <span class="text-sm text-gray-600">

                I certify that all information submitted is accurate and belongs to me.
                I understand that submitting false information may result in account suspension.

            </span>

            </label>

        </div>

        <!-- Buttons -->

        <div class="flex justify-between mt-10">

            <button
            @click="pinia.state.currentStep = 2"
            class="px-6 py-3 rounded-xl border hover:bg-gray-100"
            >
            ← Back
            </button>

            <button
            @click="submitVerification"
            :disabled="!accepted || !form.selfieFile || submitting"
            class="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-10 py-3 rounded-xl font-semibold"
            >

            {{ submitting ? "Submitting..." : "Submit Verification" }}

            </button>

        </div>

        </div>


        <Transition
            enter-active-class="transition duration-300"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
          >
            <div
              v-if="pinia.state.currentStep === 4"
              class="animate-fadeIn"
            >

              <div
                class="mt-6 bg-white rounded-md  border p-5 md:p-10 text-center"
              >

                <!-- Success Circle -->

                <div
                  class="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mx-auto"
                >

                  <svg
                    class="w-12 h-12 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>

                </div>

                <h2 class="text-3xl font-bold mt-8">
                  Verification Submitted
                </h2>

                <p class="text-gray-500 mt-3 max-w-xl mx-auto">

                  Your identity verification has been submitted successfully.

                  Our compliance team is currently reviewing your documents.

                </p>

                <!-- Status -->

                <div
                  class="mt-8 inline-flex items-center gap-3 bg-yellow-100 text-yellow-700 px-6 py-3 rounded-full"
                >

                  <span
                    class="w-3 h-3 rounded-full bg-yellow-500 animate-pulse"
                  ></span>

                  Under Review

                </div>

                <!-- Timeline -->

                <div
                  class="mt-10 bg-gray-50 rounded-2xl p-6 text-left"
                >

                  <h3 class="font-semibold mb-5">

                    What happens next?

                  </h3>

                  <div class="space-y-5">

                    <div class="flex gap-4">

                      <div
                        class="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center"
                      >
                        ✓
                      </div>

                      <div>

                        <h4 class="font-semibold">

                          Documents Received

                        </h4>

                        <p class="text-gray-500 text-sm">

                          Your identity documents have been uploaded successfully.

                        </p>

                      </div>

                    </div>

                    <div class="flex gap-4">

                      <div
                        class="w-8 h-8 rounded-full bg-yellow-500 text-white flex items-center justify-center animate-pulse"
                      >
                        •
                      </div>

                      <div>

                        <h4 class="font-semibold">

                          Review In Progress

                        </h4>

                        <p class="text-gray-500 text-sm">

                          Our compliance team is reviewing your submission.

                        </p>

                      </div>

                    </div>

                    <div class="flex gap-4 opacity-50">

                      <div
                        class="w-8 h-8 rounded-full border flex items-center justify-center"
                      >
                        3
                      </div>

                      <div>

                        <h4 class="font-semibold">

                          Account Verified

                        </h4>

                        <p class="text-gray-500 text-sm">

                          You'll receive an email once approved.

                        </p>

                      </div>

                    </div>

                  </div>

                </div>

                <!-- Info -->

                <div
                  class="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-5 text-left"
                >

                  <h4 class="font-semibold mb-2">

                    Estimated Review Time

                  </h4>

                  <p class="text-gray-600 text-sm">

                    Most verifications are completed within
                    <strong>5–30 minutes</strong>.
                    In some cases, reviews may take up to
                    <strong>24 hours</strong>.

                  </p>

                </div>

                <div class="flex flex-col md:flex-row justify-between mt-10 gap-4">
                <!-- Button -->

                <button
                  class="w-full  bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-md font-semibold"
                  @click="navigateTo('/dashboard')"
                >
                  Return to Dashboard
                </button>

                <button
                  @click="pinia.state.currentStep = 3"
                  class="px-6 py-3 rounded-md border hover:bg-gray-100"
                  >
                  ← Back
                </button>
                </div>
              </div>

            </div>
        </Transition>
  
      </div>
  
    </main>
  </template>
  
  <script setup>
  import { computed, ref, watch, onMounted } from "vue";
  import { uploadImg } from "@/composables/requests/utils";
  import { updateUser } from "@/composables/requests/user";
  import { compressImage } from "@/composables/utils/compressImage";
  const pinia = useStore();
  const notify = useNotify();
  
  const accepted = ref(false);
  const submitting = ref(false);
  const reviewSubmitted = ref(false);
  
  const frontUploading = ref(false);
  const backUploading = ref(false);
  const selfieUploading = ref(false);
  
  const form = computed(() => pinia.state.verificationForm);
  
  const frontPreview = ref("");
  const backPreview = ref("");
  const selfiePreview = ref("");
  
  const percentage = computed(() => {
    switch (pinia.state.currentStep) {
      case 1:
        return 25;
      case 2:
        return 50;
      case 3:
        return 75;
      default:
        return 100;
    }
  });

  const steps = [ 
    { title: "Personal", subtitle: "Your details", },
     { title: "Documents", subtitle: "Upload ID", },
      { title: "Review", subtitle: "Submit", },
       { title: "Review", subtitle: "Pending", 

       }, 
      ];
  
  const disabled1 = computed(() => {
    return !(
      form.value.firstName &&
      form.value.lastName &&
      form.value.dob &&
      form.value.nationality &&
      form.value.address
    );
  });
  
  const disabled2 = computed(() => {
    return !(
      form.value.documentType &&
      form.value.documentNumber &&
      form.value.frontFile &&
      form.value.backFile
    );
  });
  
  /*
  |--------------------------------------------------------------------------
  | Upload Image
  |--------------------------------------------------------------------------
  */
  
  const handleUpload = async (
  event,
  fileRef,
  previewRef,
  fileName
) => {

  if (!fileName) {
    console.error("fileRefName is undefined");
    return;
  }


  let file = event.target.files?.[0];

  if (!file) return;

  const allowed = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "application/pdf",
  ];

  if (!allowed.includes(file.type)) {
    notify.error("Only JPG, PNG and PDF allowed.");
    return;
  }

  if (file.size > 10 * 1024 * 1024) {
    notify.error("Maximum file size is 10MB.");
    return;
  }

  try {

    // Compress only images
    if (file.type.startsWith("image/")) {
      file = await compressImage(file);
    }

    // Preview
    if (file.type.startsWith("image/")) {
      previewRef.value = URL.createObjectURL(file);
    } else {
      previewRef.value = "";
    }

    notify.info("Uploading...");

    const response = await uploadImg(file);

    if (!response.success) {
      throw new Error(response.message);
    }

    pinia.state.verificationForm[fileName] =
      response.imageUrl;

    notify.success("Upload successful");

  } catch (err) {

    console.error(err);

    notify.error(err.message || "Upload failed");

  }

};
  
const uploadFront = (e) => {
  handleUpload(e, form.value.frontFile, frontPreview, "frontFile");
};

const uploadBack = (e) => {
  handleUpload(e, form.value.backFile, backPreview, "backFile");
};

const uploadSelfie = (e) => {
  handleUpload(e, form.value.selfieFile, selfiePreview, "selfieFile");
};
  
  /*
  |--------------------------------------------------------------------------
  | Preview
  |--------------------------------------------------------------------------
  */
  
  watch(
    () => form.value.frontFile,
    (value) => {
      frontPreview.value = value || "";
    },
    { immediate: true }
  );
  
  watch(
    () => form.value.backFile,
    (value) => {
      backPreview.value = value || "";
    },
    { immediate: true }
  );
  
  watch(
    () => form.value.selfieFile,
    (value) => {
      selfiePreview.value = value || "";
    },
    { immediate: true }
  );
  
  /*
  |--------------------------------------------------------------------------
  | Remove
  |--------------------------------------------------------------------------
  */
  
  const removeFront = () => {
    form.value.frontFile = "";
    frontPreview.value = "";
  };
  
  const removeBack = () => {
    form.value.backFile = "";
    backPreview.value = "";
  };
  
  const removeSelfie = () => {
    form.value.selfieFile = "";
    selfiePreview.value = "";
  };
  
  /*
  |--------------------------------------------------------------------------
  | Navigation
  |--------------------------------------------------------------------------
  */
  
  const nextStep = () => {
    if (disabled1.value) {
      notify.error("Please complete all personal information.");
      return;
    }
  
    pinia.state.currentStep = 2;
  };
  
  const nextToStep3 = () => {
    if (disabled2.value) {
      notify.error("Please upload all required documents.");
      return;
    }
  
    pinia.state.currentStep = 3;
  };
  
  /*
  |--------------------------------------------------------------------------
  | Submit
  |--------------------------------------------------------------------------
  */
  
  const submitVerification = async () => {
    if (!form.value.selfieFile) {
      notify.error("Please upload your selfie.");
      return;
    }
  
    if (!accepted.value) {
      notify.error("Please accept the declaration.");
      return;
    }
  
    submitting.value = true;
  
    try {
      const payload = {
      ...pinia.state.user,

      userIdentity: {
        ...pinia.state.verificationForm,
      },

      verificationStatus: "pending",
      submittedAt: new Date(),
    };

       await updateUser(payload);
      if (!response.success) {
        throw new Error(response.message);
      }
  
      pinia.state.user = response.user;
  
      reviewSubmitted.value = true;
  
      pinia.state.currentStep = 4;
  
      notify.success(
        "Verification submitted successfully."
      );
    } catch (err) {
      notify.error(
        err.response?.data?.message ||
          err.message ||
          "Submission failed."
      );
    } finally {
      submitting.value = false;
    }
  };
  
  onMounted(() => {

    frontPreview.value =
      pinia.state.verificationForm.frontFile || "";

    backPreview.value =
      pinia.state.verificationForm.backFile || "";

    selfiePreview.value =
      pinia.state.verificationForm.selfieFile || "";

    });
  </script>
  
  <style scoped>
  
  .label{
  
  @apply block mb-2 text-sm font-semibold text-gray-700;
  
  }
  
  .input{
  
  @apply w-full rounded-md border border-gray-300 px-4 py-3 outline-none transition;
  
  }
  
  .input:focus{
  
  @apply border-blue-500 ring-4 ring-blue-100;
  
  }
  
  </style>