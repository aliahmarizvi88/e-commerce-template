<script setup>
import { computed, onMounted, ref } from 'vue';
import { useAuthStore } from '../../store/AuthStore';
import { useAdminStore } from '../../store/GET/AdminStore';
import { useRouter } from 'vue-router';

import UniDailogue from '../../components/UniDailogue.vue';
import { showToast } from '../../utils/Toast';
import Uni_table from '../../components/Admin/Uni_table.vue';

const authStore = useAuthStore();
const adminStore = useAdminStore();

const adminProfile = computed(() => authStore.userProfile);
const router = useRouter();

//Tabs & functions
const activeTab = ref('Admin Profile');
const tabs = ['Admin Profile', 'Manage Admins'];

const formattedCreationDate = computed(() => {
  const rawDate = adminProfile.value?.createdOn;

  if (!rawDate) {
    return 'N/A';
  }

  try {
    const dateObj = new Date(rawDate);

    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    });
  } catch (e) {
    console.error('Failed to parse date:', rawDate, e);
    return 'Invalid Date';
  }
});

//UniTable Codes
const currentAdminId = computed(() => authStore.userProfile?.id);

const adminFilteredList = computed(() => {
  const allAdmin = adminStore.admins;

  if (!currentAdminId.value || !allAdmin.length) {
    return allAdmin;
  }

  return allAdmin.filter((admin) => admin.id !== currentAdminId.value);
});

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'createdOn', label: 'Created On' },
  { key: 'phone', label: 'Phone' },
];

onMounted(() => {
  if (authStore.isAdmin) {
    adminStore.fetchAllAdmins();
  }
});
const AddDailog = ref(false);

const form = ref({
  name: '',
  email: '',
});

function handleAdd() {
  form.value = {
    name: '',
    email: '',
  };
  AddDailog.value = true;
}

const handleConfrim = () => {
  if (!form.value.name || !form.value.email) {
    showToast('Something is missing.');
    return;
  }
  adminStore.addNewAdmin(form.value);
  AddDailog.value = false;
};

//Change Admin Details:
const updateDailog = ref(false);

const detailForm = ref({
  name: '',
  username: '',
  phone: '',
});

const handleUpdateClick = () => {
  if (adminProfile.value) {
    detailForm.value = {
      name: adminProfile.value.name || '',
      username: adminProfile.value.username || '',
      phone: adminProfile.value.phone || '',
    };
  }
  updateDailog.value = true;
};

//Change Admin Password:
const passwordDailog = ref(false);

const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  newConfirmPassword: '',
});

const handlePasswordClick = () => {
  passwordForm.value = {
    oldPassword: '',
    newPassword: '',
    newConfirmPassword: '',
  };
  passwordDailog.value = true;
};

const handleConfirmPassword = async () => {
  authStore.error = null;
  const form = passwordForm.value;

  if (!form.oldPassword || !form.newPassword || !form.newConfirmPassword) {
    showToast('Fill all the Feilds', 'error');
    return;
  }

  try {
    await authStore.ChangeUserPassword(form);
    showToast('Password Change, Please Login Again', 'success');
    passwordDailog.value = false;
    authStore.logout();
    router.push('/auth/adminLogin');
  } catch (error) {
    showToast(`Password Update Failed: ${authStore.error}`, 'error');
  }
};

const handleLogout = () => {
  authStore.logout();
  router.push('/auth/adminLogin');
};
</script>

<template>
  <div class="max-w-6xl mx-auto p-8">
    <div class="flex gap-[30px] pb-6 border-b border-gray-200">
      <button
        v-for="tab in tabs"
        :key="tab"
        :class="{
          'text-black font-semibold border-b-2 border-black': activeTab === tab,
        }"
        class="text-gray-500 hover:text-black cursor-pointer pb-1 transition duration-150"
        @click="activeTab = tab"
      >
        {{ tab }}
      </button>
    </div>

    <div v-if="activeTab === 'Admin Profile'">
      <div
        class="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-lg mt-10 border border-gray-100"
      >
        <header class="mb-8 pb-4">
          <h1 class="text-3xl font-extrabold text-gray-900">Profile</h1>
        </header>

        <section v-if="adminProfile" class="space-y-8">
          <div
            class="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg"
          >
            <div class="flex items-center space-x-4">
              <div>
                <p class="text-lg font-bold text-gray-900">
                  {{ adminProfile.name || 'Admin' }}
                </p>
                <p class="text-sm text-gray-500 flex items-center mt-1">
                  <span class="mr-3">@{{ adminProfile.username }}</span>
                  <span class="text-xs text-gray-400"> | </span>
                  <span class="ml-3">ID: {{ adminProfile.id }}</span>
                </p>
              </div>
            </div>

            <button
              @click="handleUpdateClick"
              class="px-5 py-2 text-sm font-semibold text-white bg-black border rounded-md hover:bg-gray-700 transition duration-150 shadow-md cursor-pointer"
            >
              Edit Details
            </button>
          </div>

          <h2 class="text-xl font-semibold text-gray-900 border-b pb-2">
            Personal Information
          </h2>

          <dl class="grid grid-cols-1 gap-x-12 gap-y-6 sm:grid-cols-2">
            <div class="sm:col-span-1">
              <dt class="text-sm font-medium text-gray-500">Full Name</dt>
              <dd class="mt-1 text-base text-gray-900">
                {{ adminProfile.name }}
              </dd>
            </div>

            <div class="sm:col-span-1">
              <dt class="text-sm font-medium text-gray-500">Email</dt>
              <dd class="mt-1 text-base text-gray-900">
                {{ adminProfile.email }}
              </dd>
            </div>

            <div class="sm:col-span-1">
              <dt class="text-sm font-medium text-gray-500">
                Your Phone Number
              </dt>
              <dd class="mt-1 text-base text-gray-900">
                {{ adminProfile.phone }}
              </dd>
            </div>

            <div class="sm:col-span-1">
              <dt class="text-sm font-medium text-gray-500">Account Created</dt>
              <dd class="mt-1 text-base text-gray-900">
                {{ formattedCreationDate }}
              </dd>
            </div>
          </dl>

          <div class="flex gap-4 pt-4 border-t border-gray-100">
            <button
              @click="handlePasswordClick"
              class="px-4 py-2 text-sm font-semibold text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition duration-150 shadow-sm cursor-pointer"
            >
              Change Password
            </button>
            <button
              @click="handleLogout"
              class="px-4 py-2 text-sm font-semibold text-red-600 bg-white border border-red-300 rounded-md hover:bg-red-50 transition duration-150 shadow-sm cursor-pointer"
            >
              Logout
            </button>
          </div>
        </section>
      </div>
      <div
        v-if="adminProfile?.mustChangePassword === true"
        class="max-w-4xl mx-auto p-4 bg-red-200 shadow-xl rounded-lg mt-5 border border-red-500"
      >
        <p class="text-sm text-red-600">
          Please Change your Password as soon as possible.
        </p>
      </div>

      <!-- Update Dailogue -->
      <UniDailogue
        v-model="updateDailog"
        title="Update Admin"
        type="form"
        width="420px"
        @confirm="updateDailog.value = false"
      >
        <div class="flex flex-col gap-5">
          <input
            type="text"
            class="border border-gray-300 py-2 px-3 rounded-lg"
            v-model="detailForm.name"
            placeholder="Enter name"
          />
          <input
            type="text"
            class="border border-gray-300 py-2 px-3 rounded-lg"
            v-model="detailForm.username"
            placeholder="Enter Username"
          />
          <input
            type="text"
            class="border border-gray-300 py-2 px-3 rounded-lg"
            v-model="detailForm.phone"
            placeholder="Enter Phone"
          />
        </div>
      </UniDailogue>

      <!-- Password Dailogue -->
      <UniDailogue
        v-model="passwordDailog"
        title="Change Password"
        type="form"
        width="420px"
        @confirm="handleConfirmPassword"
      >
        <div class="flex flex-col gap-5">
          <input
            type="password"
            class="border border-gray-300 py-2 px-3 rounded-lg"
            v-model="passwordForm.oldPassword"
            placeholder="Old Password"
          />
          <input
            type="password"
            class="border border-gray-300 py-2 px-3 rounded-lg"
            v-model="passwordForm.newPassword"
            placeholder="New Password"
          />
          <input
            type="password"
            class="border border-gray-300 py-2 px-3 rounded-lg"
            v-model="passwordForm.newConfirmPassword"
            placeholder="New Confirm Password"
          />
        </div>
      </UniDailogue>
    </div>

    <div v-else>
      <Uni_table
        :columns="columns"
        :rows="adminFilteredList"
        show-actions
        show-button
        label-button="Add Admin"
        @add="handleAdd"
      />

      <UniDailogue
        v-model="AddDailog"
        title="Add New Admin"
        type="form"
        width="420px"
        @confirm="handleConfrim"
        @cancel="AddDailog = false"
      >
        <div class="flex flex-col gap-3">
          <input
            type="text"
            v-model="form.name"
            class="border py-2 px-3 rounded-lg"
            placeholder="Enter name"
          />
          <input
            type="text"
            v-model="form.email"
            class="border py-2 px-3 rounded-lg"
            placeholder="Enter Email"
          />
        </div>
      </UniDailogue>
    </div>
  </div>
</template>
