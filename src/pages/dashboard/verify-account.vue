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
                  pinia.state.currentStep>index+1 || 4
                  ?'bg-green-500 text-white'
  
                  :pinia.state.currentStep===index+1
                  ?'bg-blue-600 text-white scale-110 shadow-lg'
  
                  :'bg-gray-200 text-gray-500'
                ]"
              >
  
                <span v-if="pinia.state.currentStep>index+1 || 4">
                  ✓
                </span>
  
                <!-- <span v v-else-if="pinia.state.currentStep = 4">
                  ✓
                </span> -->
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

                    <!-- <option>Voter Card</option> -->

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

                <div v-if="!frontPreview">

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
                      v-if="!frontPreview.endsWith('.pdf')"
                      :src="frontPreview"
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

                <template v-if="!backPreview">

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
                      v-if="!backPreview.toLowerCase().endsWith('.pdf')"
                      :src="backPreview"
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
                v-if="frontPreview || pinia.state.verificationForm.frontFile || form.frontFile"
                :src="frontPreview || pinia.state.verificationForm.frontFile || form.frontFile"
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
                v-if="backPreview || pinia.state.verificationForm.backFile || form.backFile"
                :src="backPreview || pinia.state.verificationForm.backFile || form.backFile"
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
              v-if="selfiePreview || pinia.state.verificationForm.selfieFile || form.selfieFile"
              class="w-64 h-64 mx-auto rounded-2xl overflow-hidden border"
            >
              <img
                :src="selfiePreview || pinia.state.verificationForm.selfieFile || form.selfieFile"
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
            <button
             v-if="form.selfieFile"
                type="button"
                class="mt-2 text-center text-red-500 hover:underline w-full"
                @click.stop.prevent="removeSelfie"
              >
                Remove
              </button>

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
<!-- 
            <button
            v-else
            @click="pinia.state.currentStep = 4"
            class="px-6 py-3 rounded-xl border bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
             View verification status
            </button> -->

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
                  class="mt-6 bg-white rounded-md border p-5 md:p-10 text-center"
                >

                  <!-- Status Icon -->
                  <div
                    class="w-24 h-24 rounded-full flex items-center justify-center mx-auto"
                    :class="{
                      'bg-yellow-100': verificationStatus === 'pending',
                      'bg-green-100': verificationStatus === 'verified',
                      'bg-red-100': verificationStatus === 'rejected'
                    }"
                  >

                    <!-- VERIFIED -->
                    <svg
                      v-if="verificationStatus === 'verified'"
                      class="w-12 h-12 text-green-600"
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

                    <!-- REJECTED -->
                    <svg
                      v-else-if="verificationStatus === 'rejected'"
                      class="w-12 h-12 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>

                    <!-- PENDING -->
                    <svg
                      v-else
                      class="w-12 h-12 text-yellow-600 animate-pulse"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.5"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                      />
                    </svg>

                  </div>

                  <!-- Title -->

                  <h2 class="text-3xl font-bold mt-8">

                    {{
                      verificationStatus === "verified"
                        ? "Verification Approved"
                        : verificationStatus === "rejected"
                        ? "Verification Rejected"
                        : "Verification Submitted"
                    }}

                  </h2>

                  <!-- Description -->

                  <p class="text-gray-500 mt-3 max-w-xl mx-auto">

                    <template v-if="verificationStatus === 'verified'">

                      Congratulations! Your identity verification has been approved.
                      Your account now has full access to all platform features.

                    </template>

                    <template v-else-if="verificationStatus === 'rejected'">

                      Unfortunately your verification could not be approved.
                      Please review the reason below, make the necessary corrections,
                      and submit your documents again.

                    </template>

                    <template v-else>

                      Your identity verification has been submitted successfully.
                      Our compliance team is reviewing your documents.

                    </template>

                  </p>

                  <!-- Status Badge -->

                  <div
                    class="mt-8 inline-flex items-center gap-3 px-6 py-3 rounded-full"
                    :class="{
                      'bg-yellow-100 text-yellow-700':
                        verificationStatus === 'pending',

                      'bg-green-100 text-green-700':
                        verificationStatus === 'verified',

                      'bg-red-100 text-red-700':
                        verificationStatus === 'rejected'
                    }"
                  >

                    <span
                      class="w-3 h-3 rounded-full"
                      :class="{
                        'bg-yellow-500 animate-pulse':
                          verificationStatus === 'pending',

                        'bg-green-500':
                          verificationStatus === 'verified',

                        'bg-red-500':
                          verificationStatus === 'rejected'
                      }"
                    />

                    {{
                      verificationStatus === "verified"
                        ? "Verified"

                        : verificationStatus === "rejected"

                        ? "Rejected"

                        : "Under Review"
                    }}

                  </div>

                  <!-- Timeline -->

                  <div
                    class="mt-10 bg-gray-50 rounded-2xl p-6 text-left"
                  >

                    <h3 class="font-semibold mb-6">

                      Verification Progress

                    </h3>

                    <div class="space-y-6">

                      <!-- STEP 1 -->

                      <div class="flex gap-4">

                        <div
                          class="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center"
                        >
                          ✓
                        </div>

                        <div>

                          <h4 class="font-semibold">

                            Documents Submitted

                          </h4>

                          <p class="text-gray-500 text-sm">

                            Your KYC documents have been uploaded successfully.

                          </p>

                        </div>

                      </div>

                      <!-- STEP 2 -->

                      <div class="flex gap-4">

                        <div
                          class="w-8 h-8 rounded-full text-white flex items-center justify-center"
                          :class="{
                            'bg-yellow-500 animate-pulse':
                              verificationStatus === 'pending',

                            'bg-green-500':
                              verificationStatus === 'verified',

                            'bg-red-500':
                              verificationStatus === 'rejected'
                          }"
                        >

                          {{
                            verificationStatus === "pending"
                              ? "•"
                              : verificationStatus === "verified"
                              ? "✓"
                              : "✕"
                          }}

                        </div>

                        <div>

                          <h4 class="font-semibold">

                            Compliance Review

                          </h4>

                          <p
                            class="text-gray-500 text-sm"
                          >

                            <template
                              v-if="verificationStatus === 'pending'"
                            >

                              Our compliance team is reviewing your
                              documents.

                            </template>

                            <template
                              v-else-if="verificationStatus === 'verified'"
                            >

                              Your documents have been reviewed and
                              approved.

                            </template>

                            <template
                              v-else
                            >

                              Your verification request was rejected.

                            </template>

                          </p>

                        </div>

                      </div>

                      <!-- STEP 3 -->

                      <div
                        class="flex gap-4"
                        :class="{
                          'opacity-50':
                            verificationStatus !== 'verified'
                        }"
                      >

                        <div
                          class="w-8 h-8 rounded-full flex items-center justify-center"
                          :class="{
                            'bg-green-500 text-white':
                              verificationStatus === 'verified',

                            'border':
                              verificationStatus !== 'verified'
                          }"
                        >

                          {{
                            verificationStatus === "verified"
                              ? "✓"
                              : "3"
                          }}

                        </div>

                        <div>

                          <h4 class="font-semibold">

                            Account Activated

                          </h4>

                          <p class="text-gray-500 text-sm">

                            Full platform access has been enabled.

                          </p>

                        </div>

                      </div>

                    </div>

                  </div>

                  <!-- Rejection Reason -->

                  <div
                    v-if="verificationStatus === 'rejected'"
                    class="mt-8 bg-red-50 border border-red-200 rounded-xl p-5 text-left"
                  >

                    <h4 class="font-semibold text-red-700">

                      Reason for rejection

                    </h4>

                    <p class="text-red-600 mt-2">

                      {{
                        pinia.state.user.userIdentity?.rejectionReason
                      }}

                    </p>

                  </div>

                  <!-- Review Time -->

                  <div
                    v-if="verificationStatus === 'pending'"
                    class="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-5 text-left"
                  >

                    <h4 class="font-semibold">

                      Estimated Review Time

                    </h4>

                    <p class="text-gray-600 text-sm mt-2">

                      Most verifications are completed within
                      <strong>5–30 minutes</strong>.
                      Some reviews may take up to
                      <strong>24 hours.</strong>

                    </p>

                  </div>

                  <!-- Buttons -->

                  <div
                    class="flex flex-col md:flex-row gap-4 mt-10"
                  >

                    <button
                      class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold"
                      @click="navigateTo('/dashboard')"
                    >

                      Return to Dashboard

                    </button>

                    <button
                      v-if="verificationStatus === 'rejected'"
                      class="flex-1 border hover:bg-gray-100 py-3 rounded-md"
                      @click="pinia.state.currentStep = 2"
                    >

                      Resubmit Documents

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
  
  const form = computed(() =>  pinia.state.verificationForm);
  
  const frontPreview = ref("");
  const backPreview = ref("");
  const selfiePreview = ref("");


  const verificationStatus = computed(() =>
  pinia.state.user?.userIdentity?.status || "not_started"
)

const isPending = computed(() => verificationStatus.value === "pending")
const isVerified = computed(() => verificationStatus.value === "verified")
const isRejected = computed(() => verificationStatus.value === "rejected")
  
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
  previewRef,
  field
) => {
  let file = event.target.files?.[0]

  if (!file) return

  const allowed = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "application/pdf"
  ]

  if (!allowed.includes(file.type)) {
    notify.error("Only JPG, PNG and PDF files are allowed.")
    return
  }

  if (file.size > 10 * 1024 * 1024) {
    notify.error("Maximum file size is 10MB.")
    return
  }

  try {
    // Create local preview immediately
    if (file.type.startsWith("image/")) {
      previewRef.value = URL.createObjectURL(file)
    } else {
      previewRef.value = ""
    }

    // Compress images only
    if (file.type.startsWith("image/")) {
      file = await compressImage(file)
    }

    notify.info("Uploading...")

    const response = await uploadImg(file)

    if (!response.success) {
      throw new Error(response.message)
    }

    // Save uploaded URL
    pinia.state.verificationForm[field] = response.imageUrl

    // Replace preview with uploaded URL
    if (file.type.startsWith("image/")) {
      previewRef.value = response.imageUrl
    }

    notify.success("Upload successful")
  } catch (err) {
    console.error(err)
    notify.error(err.message || "Upload failed")
  }
}

const uploadFront = (e) => {
  handleUpload(e, frontPreview, "frontFile")
}

const uploadBack = (e) => {
  handleUpload(e, backPreview, "backFile")
}

const uploadSelfie = (e) => {
  handleUpload(e, selfiePreview, "selfieFile")
}
 
  /*
  |--------------------------------------------------------------------------
  | Remove
  |--------------------------------------------------------------------------
  */
  const removeFront = () => {
  frontPreview.value = ""
  pinia.state.verificationForm.frontFile = ""
}

const removeBack = () => {
  backPreview.value = ""
  pinia.state.verificationForm.backFile = ""
}

const removeSelfie = () => {
  selfiePreview.value = ""
  pinia.state.verificationForm.selfieFile = ""
}
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
        submittedAt: new Date(),
        status:"pending",
      },

      verificationStatus: "pending",
    };

    console.dir(payload, { depth: null });

       const response = await updateUser(payload);
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
      console.log("error", err);
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
  if (pinia.state.user?.userIdentity?.status === "verified") {
    pinia.state.currentStep = 4
  }


  frontPreview.value = pinia.state.verificationForm.frontFile || ""
  backPreview.value = pinia.state.verificationForm.backFile || ""
  selfiePreview.value = pinia.state.verificationForm.selfieFile || ""
})
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