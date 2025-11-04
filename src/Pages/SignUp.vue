<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../store/AuthStore';
import { useRouter } from 'vue-router';
import { showToast } from '../utils/Toast';

const router = useRouter();
const authStore = useAuthStore();

const credintials = ref({
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const errorMessage = ref(null);

const handleSignUp = async () => {
  errorMessage.value = null;
  console.log(credintials);
  if (credintials.value.password !== credintials.value.confirmPassword) {
    errorMessage.value = 'Passwords do not match';
    showToast(errorMessage.value, 'error');
    return;
  }

  try {
    await authStore.registerUser(credintials.value);

    showToast('Registration Successful! Welcome!', 'success');
    router.push('/');
  } catch (error) {
    errorMessage.value = authStore.error;
    showToast(`Sign Up Failed: ${errorMessage.value}`, 'error');
  }
};
</script>

<template>
  <form
    class="flex flex-col justify-center items-center gap-12"
    @submit.prevent="handleSignUp"
  >
    <h1 class="text-4xl font-extrabold uppercase">Sign Up</h1>
    <div class="mt-8 flex gap-2">
      <input
        type="text"
        placeholder="First Name"
        v-model="credintials.firstname"
        class="relative bg-white py-3 px-4 w-[200px] rounded-lg shadow-lg focus-within:outline-1 outline-gray-400"
        required
      />

      <input
        type="text"
        placeholder="Last Name"
        v-model="credintials.lastname"
        class="relative bg-white py-3 px-4 w-[200px] rounded-lg shadow-lg focus-within:outline-1 outline-gray-400"
        required
      />
    </div>

    <div class="mb-2">
      <input
        type="email"
        placeholder="Email Address"
        v-model="credintials.email"
        class="relative bg-white py-3 px-4 w-[400px] rounded-lg shadow-lg focus-within:outline-1 outline-gray-400"
        required
      />
    </div>

    <div class="mb-2">
      <input
        type="password"
        placeholder="Password"
        v-model="credintials.password"
        class="relative bg-white py-3 px-4 w-[400px] rounded-lg shadow-lg focus-within:outline-1 outline-gray-400"
        required
      />
    </div>

    <div class="mb-2">
      <input
        type="password"
        placeholder="Confrim Password"
        v-model="credintials.confirmPassword"
        class="relative bg-white py-3 px-4 w-[400px] rounded-lg shadow-lg focus-within:outline-1 outline-gray-400"
        required
      />
    </div>

    <div class="flex justify-between items-center w-100">
      <a href="/auth/login" class="hover:underline">Already had a account!</a>
      <button
        type="submit"
        class="bg-black text-white rounded-2xl py-3 px-7 hover:shadow-2xl/30 duration-300 cursor-pointer font-semibold"
      >
        {{ authStore.loading ? 'Signing Up...' : 'SignUp' }}
      </button>
    </div>
  </form>
</template>
