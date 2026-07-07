<template>
    <main class="max-w-7xl mx-auto space-y-8">

      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
  
        <div>
  
          <button
            class="text-blue-600 hover:underline mb-3 text-2xl"
            @click="$router.back()"
          >
            ← Back
          </button>
  
          <h1 class="text-3xl font-bold">
            {{ user?.name }}
          </h1>
  
          <p class="text-gray-500 mt-1">
            {{ user?.email }}
          </p>
  
        </div>
  
        <div>
          <span
            class="px-5 py-2 rounded-full font-semibold"
            :class="statusColor"
          >
            {{ verification.status }}
          </span>
        </div>
  
      </div>
  
      <!-- USER DETAILS -->
  
      <div class="grid lg:grid-cols-3 gap-6">
  
        <div class="lg:col-span-1">
  
          <div class="bg-white rounded-2xl border p-6 shadow-sm">
  
            <h2 class="font-bold text-lg mb-6">
              User Details
            </h2>
  
            <InfoRow label="Name" :value="user?.name"/>
  
            <InfoRow label="Email" :value="user?.email"/>
  
            <InfoRow label="Phone" :value="user?.phone || '-'" />
  
            <InfoRow label="Country" :value="user?.country"/>
  
            <InfoRow label="Wallet" :value="user?.walletAddress"/>
  
            <InfoRow label="Role" :value="user?.role"/>
  
            <InfoRow
              label="Email Verified"
              :value="user?.isVerified ? 'Yes' : 'No'"
            />
  
            <InfoRow
              label="2FA"
              :value="user?.twoFactorVerification ? 'Enabled' : 'Disabled'"
            />
  
          </div>
  
        </div>
  
        <!-- KYC -->
  
        <div class="lg:col-span-2">
  
          <div class="bg-white rounded-2xl border p-6 shadow-sm">
  
            <h2 class="font-bold text-lg mb-6">
              KYC Information
            </h2>
  
            <div class="grid md:grid-cols-2 gap-5">
  
              <InfoRow
                label="First Name"
                :value="verification.firstName"
              />
  
              <InfoRow
                label="Last Name"
                :value="verification.lastName"
              />
  
              <InfoRow
                label="DOB"
                :value="verification.dob"
              />
  
              <InfoRow
                label="Nationality"
                :value="verification.nationality"
              />
  
              <div class="md:col-span-2">
  
                <p class="text-gray-500 text-sm">
                  Address
                </p>
  
                <p class="font-semibold">
                  {{ verification.address }}
                </p>
  
              </div>
  
              <InfoRow
                label="Document Type"
                :value="verification.documentType"
              />
  
              <InfoRow
                label="Document Number"
                :value="verification.documentNumber"
              />
  
            </div>
  
          </div>
  
        </div>
  
      </div>
  
      <!-- Documents -->

      <div class="grid lg:grid-cols-3 gap-6">
  
        <ImageCard
          title="Front of ID"
          :image="verification?.frontFile"
        />
  
        <ImageCard
          title="Back of ID"
          :image="verification?.backFile"
        />
  
        <ImageCard
          title="Selfie Verification"
          :image="verification?.selfieFile"
        />
  
      </div>
  
      <!-- Timeline -->
  
      <div
        class="bg-white rounded-2xl border p-6"
      >
  
        <h2 class="font-bold text-lg mb-6">
          Verification Timeline
        </h2>
  
        <div class="grid md:grid-cols-3 gap-6">
  
          <InfoRow
            label="Submitted"
            :value="formatDate(verification.submittedAt)"
          />
  
          <InfoRow
            label="Reviewed"
            :value="verification.reviewedAt ? formatDate(verification.reviewedAt) : 'Not Reviewed'"
          />
  
          <InfoRow
            label="Status"
            :value="verification.status"
          />
  
        </div>
  
      </div>
  
      <!-- Notes -->
  
      <div class="bg-white rounded-2xl border p-6">
  
        <h2 class="font-bold text-lg mb-5">
          Admin Review
        </h2>
  
        <textarea
          v-model="reason"
          rows="5"
          class="w-full rounded-xl border p-4"
          placeholder="Reason for rejection..."
        />
  
        <div
          class="flex justify-end gap-4 mt-6"
          v-if="verification.status==='pending'"
        >
  
        <button
          @click="reject"
          :disabled="rejecting"
          class="bg-red-600 text-white px-8 py-3 rounded-xl disabled:opacity-50"
        >
          {{ rejecting ? "Rejecting..." : "Reject" }}
        </button>

        <button
          @click="approve"
          :disabled="approving"
          class="bg-green-600 text-white px-8 py-3 rounded-xl disabled:opacity-50"
        >
          {{ approving ? "Approving..." : "Approve" }}
        </button>
  
        </div>
  
      </div>
  
    </main>
  </template>
  
  <script setup>
  import { computed, ref } from "vue";
  import { updateUser,approveKYC,rejectKYC } from "@/composables/requests/user";

const approving = ref(false);
const rejecting = ref(false);
  const route = useRoute();
  const pinia = useStore();
  const notify = useNotify()

  
  // Get the id from the URL
  const userId = computed(() => route.params._id);
  
  // Find the user
  const user = computed(() => {
    return pinia.state.adminUsers.find(
      (item) => item._id === userId.value
    );
  });
  
  // KYC data
  const verification = computed(() => {
    return user.value?.userIdentity || {};
  });
  
  const reason = ref("");
  
  const statusColor = computed(() => {
    switch (verification.value.status) {
      case "verified":
        return "bg-green-100 text-green-700";
  
      case "rejected":
        return "bg-red-100 text-red-700";
  
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  });
  


const approve = async () => {
  try {

    approving.value = true;

    const payload = {
      ...user.value,

      twoFactorVerification: true,

      userIdentity: {
        ...user.value.userIdentity,
        status: "verified",
        reviewedAt: new Date(),
        rejectionReason: reason.value,
      },
    };

    const response = await approveKYC(user.value._id);

    if (response.success) {
      Object.assign(user.value, response.data);
    }

    // Update Pinia
    // const index = pinia.state.adminUsers.findIndex(
    //   u => u._id === user.value._id
    // );

    // if (index !== -1) {
    //   pinia.state.adminUsers[index] = response.data;
    // }

    notify.success("Verification approved successfully.");

  } catch (err) {

    notify.error(
      err.message || "Unable to approve verification."
    );

  } finally {

    approving.value = false;

  }
};


const reject = async () => {

  if (!reason.value.trim()) {
    return notify.error("Please enter a rejection reason.");
  }

  try {

    rejecting.value = true;

    const payload = {
      ...user.value,

      twoFactorVerification: false,

      userIdentity: {
        ...user.value.userIdentity,
        status: "rejected",
        reviewedAt: new Date(),
        rejectionReason: reason.value,
      },
    };

    const response = await rejectKYC(
        user.value._id,
        reason.value
      );

      if (response.success) {
        Object.assign(user.value, response.data);
      }

    // Update Pinia
    // const updatedUser = response.data;


    // pinia.state.adminUsers = pinia.state.adminUsers.map((u) =>
    //   u.email === updatedUser.email
    //     ? updatedUser
    //     : u
    // );

    notify.success("Verification rejected.");

  } catch (err) {

    notify.error(
      err.message || "Unable to reject verification."
    );

  } finally {

    rejecting.value = false;

  }

};
  
 
  const formatDate = (date) => {
    if (!date) return "-";
  
    return new Date(date).toLocaleString();
  };
  </script>