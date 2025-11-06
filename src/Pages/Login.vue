<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../store/AuthStore';
import { useRouter } from 'vue-router';

import { showToast } from '../utils/Toast';

const router = useRouter();
const authStore = useAuthStore();

const credentials = ref({
  email: '',
  password: '',
});

const errorMessage = ref(null);

const handleLogin = async () => {
  errorMessage.value = null;

  try {
    await authStore.UserLogin(credentials.value);
    showToast(`Logged in as: ${credentials.value.email}`, 'success');
    router.push('/');
  } catch (error) {
    errorMessage.value = authStore.error;
    showToast(`Login Failed: ${errorMessage.value}!`, 'error');
  }
};
</script>

<template>
  <form
    class="flex flex-col justify-center items-center gap-12 animate-fade-in-up"
    @submit.prevent="handleLogin"
  >
    <h1 class="text-4xl font-extrabold uppercase">Login</h1>

    <div class="mt-8">
      <input
        type="email"
        v-model="credentials.email"
        placeholder="Email Address"
        class="relative bg-white py-3 px-4 w-[400px] rounded-lg shadow-lg focus-within:outline-1 outline-gray-400"
        :class="errorMessage ? 'border border-red-500' : ''"
        required
      />
    </div>

    <div class="mb-2">
      <input
        type="password"
        v-model="credentials.password"
        placeholder="Password"
        class="relative bg-white py-3 px-4 w-[400px] rounded-lg shadow-lg focus-within:outline-1 outline-gray-400"
        :class="errorMessage ? 'border border-red-500' : ''"
        required
      />
    </div>

    <div class="flex justify-between items-center w-100">
      <a href="/auth/signUp" class="hover:underline">Create new account!</a>
      <button
        type="submit"
        :disabled="authStore.loading"
        class="bg-black text-white rounded-2xl py-3 px-7 hover:shadow-2xl/30 duration-300 cursor-pointer font-semibold"
      >
        {{ authStore.loading ? 'LOGING IN...' : 'LOGIN' }}
      </button>
    </div>
  </form>
</template>
