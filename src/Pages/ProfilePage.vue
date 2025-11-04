<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/AuthStore';
import { storeToRefs } from 'pinia';

import UniDailogue from '../components/UniDailogue.vue';
import { showToast } from '../utils/Toast';
import { Trash2, LockKeyhole, LogOut, Pencil } from 'lucide-vue-next';

const authStore = useAuthStore();

const router = useRouter();

const { userProfile } = storeToRefs(authStore);

const handleLogout = () => {
  authStore.logout();
  showToast('Logout Sucessful');
  router.push('/');
};

//Update User Profile:
const updateDailog = ref(false);

const detailsForm = ref({
  firstName: '',
  lastName: '',
  phone: '',
  city: '',
  number: 0,
  street: '',
  zipcode: '',
  username: '',
});

const handleUpdateClick = () => {
  if (userProfile.value) {
    detailsForm.value = {
      username: userProfile.value.username || '',
      firstName: userProfile.value.name?.firstname || '',
      lastName: userProfile.value.name?.lastname || '',
      phone: userProfile.value.phone || '',

      number: userProfile.value.address?.number || 0,
      street: userProfile.value.address?.street || '',
      city: userProfile.value.address?.city || '',
      zipcode: userProfile.value.address?.zipcode || '',
    };
  }
  updateDailog.value = true;
};

const handleUpdateConfirm = async () => {
  const payload = {
    username: detailsForm.value.username,
    name: {
      firstname: detailsForm.value.firstName,
      lastname: detailsForm.value.lastName,
    },
    phone: detailsForm.value.phone,
    address: {
      city: detailsForm.value.city,
      street: detailsForm.value.street,
      zipcode: detailsForm.value.zipcode,

      number: detailsForm.value.number,
      geolocation: userProfile.value.address?.geolocation || {
        lat: '0',
        long: '0',
      },
    },
  };

  try {
    await authStore.updateUserDetails(payload);
    showToast('Profile updated successfully!', 'success');
    updateDailog.value = false;
  } catch (error) {
    showToast(`Update Failed: ${authStore.error}`, 'error');
  }
};

//Change Password/Update Password:
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
  if (form.newPassword !== form.newConfirmPassword) {
    showToast('Password do not match', 'error');
    return;
  }

  try {
    await authStore.ChangeUserPassword(form);
    showToast('Password Changed, Please Login Again', 'success');
    passwordDailog.value = false;
    authStore.logout();
    router.push('/auth/login');
  } catch (error) {
    showToast(`Password Update Failed: ${authStore.error}`, 'error');
  }
};

//Delete User Account:
const confirmDailog = ref(false);

const deleteClick = () => {
  confirmDailog.value = true;
};

const deleteUserAccount = async () => {
  try {
    await authStore.deleteAccount();
    showToast('Account Deleted, Goodbye!', 'success');
    router.push('/');
  } catch (error) {
    showToast(`Deletion Failed: ${authStore.error}`, 'error');
  }
};
</script>

<template>
  <div class="max-w-xl mx-auto p-6 rounded-lg">
    <div v-if="userProfile">
      <h1 class="text-3xl font-bold capitalize">
        Welcome back, {{ userProfile.name.firstname }}
      </h1>
      <p class="text-gray-400 text-md mb-3">@{{ userProfile.username }}</p>
      <p class="font-semibold text-lg">{{ userProfile.email }}</p>
      <p
        class="bg-gray-200 text-black text-sm font-semibold rounded-lg px-3 py-1 mt-2 mb-2 w-30"
      >
        id: {{ userProfile.id }}
      </p>

      <div
        class="border-2 mt-9 rounded-xl border-gray-400 px-8 py-3 flex flex-col gap-5 pb-10"
      >
        <div class="flex justify-between items-center">
          <h1 class="text-xl font-bold mt-3">Personal Info</h1>
          <button
            class="p-2 rounded-full hover:bg-gray-300 cursor-pointer"
            @click="handleUpdateClick"
          >
            <Pencil size="20" />
          </button>
        </div>
        <div>
          <p class="text-md text-gray-500">Fullname</p>
          <p class="bg-gray-200 rounded-xl px-2 py-2 my-1 text-md capitalize">
            {{ `${userProfile.name.firstname} ${userProfile.name.lastname}` }}
          </p>
        </div>

        <div>
          <p class="text-md text-gray-500">Phone</p>
          <p class="bg-gray-200 rounded-xl px-2 py-2 my-1 text-md">
            {{ userProfile.phone }}
          </p>
        </div>

        <div>
          <p class="text-md text-gray-500">Address</p>
          <p class="bg-gray-200 rounded-xl px-2 py-2 my-1 text-md capitalize">
            {{
              `${userProfile.address?.number}, ${userProfile.address?.street}, ${userProfile.address?.city}`
            }}
          </p>
        </div>

        <div>
          <p class="text-md text-gray-500">Zip Code</p>
          <p class="bg-gray-200 rounded-xl px-2 py-2 my-1 text-md">
            {{ `${userProfile.address?.zipcode}` }}
          </p>
        </div>
      </div>

      <div
        class="border-2 mt-9 rounded-xl border-gray-400 px-8 py-3 flex flex-col gap-6 pb-10"
      >
        <h1 class="text-xl font-bold mt-3">Perform Action</h1>

        <button
          @click="handlePasswordClick"
          class="text-md text-red-500 font-semibold cursor-pointer hover:bg-red-100 p-2 rounded-lg duration-150 flex justify-center gap-2 items-center"
        >
          <LockKeyhole size="18" />
          Change Password
        </button>

        <button
          class="text-md text-red-500 font-semibold cursor-pointer hover:bg-red-100 p-2 rounded-lg duration-150 flex justify-center gap-2 items-center"
          @click="deleteClick"
        >
          <Trash2 size="18" />
          Delete Account
        </button>

        <button
          @click="handleLogout"
          class="text-md text-gray-700 font-semibold cursor-pointer hover:bg-gray-200 p-2 rounded-lg duration-150 flex justify-center gap-2 items-center"
        >
          <LogOut size="18" />
          Logout
        </button>
      </div>
    </div>

    <div v-else class="min-h-75">
      <div
        class="border-2 mt-9 rounded-xl border-gray-400 px-8 py-3 flex flex-col justify-center items-center gap-10 pb-10"
      >
        <h3 class="text-xl font-semibold pt-5">You haven't Logged in Yet</h3>
        <button
          class="bg-black text-white rounded-2xl px-2 py-3 w-30 cursor-pointer hover:scale-115 duration-200 font-semibold"
          @click="router.push('/auth/login')"
        >
          Log In
        </button>
      </div>
    </div>
  </div>

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

  <UniDailogue
    v-model="updateDailog"
    title="Update Data"
    type="form"
    width="420px"
    @confirm="handleUpdateConfirm"
  >
    <div class="flex flex-col gap-5">
      <h4 class="font-semibold text-gray-700 mt-2">Personal & Contact Info</h4>
      <div class="flex gap-1">
        <input
          type="text"
          class="border border-gray-300 py-2 px-3 rounded-lg w-45"
          v-model="detailsForm.firstName"
          placeholder="First Name"
        />
        <input
          type="text"
          class="border border-gray-300 py-2 px-3 rounded-lg w-45"
          v-model="detailsForm.lastName"
          placeholder="Last Name"
        />
      </div>
      <input
        type="text"
        class="border border-gray-300 py-2 px-3 rounded-lg"
        v-model="detailsForm.username"
        placeholder="Username"
      />
      <input
        type="text"
        class="border border-gray-300 py-2 px-3 rounded-lg"
        v-model="detailsForm.phone"
        placeholder="Phone"
      />

      <h4 class="font-semibold text-gray-700 mt-2">Address Details</h4>
      <div class="flex gap-1">
        <input
          type="number"
          class="border border-gray-300 py-2 px-3 rounded-lg w-30"
          v-model="detailsForm.number"
          placeholder="Number"
        />
        <input
          type="text"
          class="border border-gray-300 py-2 px-3 rounded-lg w-30"
          v-model="detailsForm.street"
          placeholder="Street/Area"
        />
        <input
          type="text"
          class="border border-gray-300 py-2 px-3 rounded-lg w-30"
          v-model="detailsForm.city"
          placeholder="City"
        />
      </div>
      <input
        type="text"
        class="border border-gray-300 py-2 px-3 rounded-lg"
        v-model="detailsForm.zipcode"
        placeholder="Zip Code"
      />
      <p class="text-sm text-gray-500 mt-1">
        Email and User ID cannot be changed.
      </p>
    </div>
  </UniDailogue>

  <UniDailogue
    v-model="confirmDailog"
    title="Deleting Account!"
    type="confirm"
    message="This is action action will delete all the data linked to your account permanently, Are you sure?"
    width="350px"
    @confirm="deleteUserAccount"
  />
</template>
