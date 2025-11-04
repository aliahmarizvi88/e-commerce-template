<script setup>
import { CircleArrowRight } from 'lucide-vue-next';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <div class="mt-20 flex flex-col justify-center items-center">
    <h1 class="text-4xl font-extrabold">Welcome Admin</h1>
    <p class="text-md mt-10">
      This is Admin Dashboard where you can manage your store easily
    </p>

    <!-- Lower Section -->
    <div
      class="my-20 mx-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
    >
      <!-- Manage Products Card -->
      <div
        @click="router.push('/admin/products')"
        class="group cursor-pointer border border-gray-200 rounded-2xl p-6 bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
      >
        <div class="flex items-center justify-between mb-2">
          <h1 class="text-xl font-semibold text-gray-800">Manage Products</h1>
          <CircleArrowRight
            class="text-gray-500 group-hover:text-blue-600 transition-colors duration-300"
          />
        </div>
        <p class="text-gray-500 group-hover:text-gray-700 transition-colors">
          Add, update, and delete your products.
        </p>
      </div>

      <!-- Manage Users Card -->
      <div
        @click="router.push('/admin/users')"
        class="group cursor-pointer border border-gray-200 rounded-2xl p-6 bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
      >
        <div class="flex items-center justify-between mb-2">
          <h1 class="text-xl font-semibold text-gray-800">Manage Users</h1>
          <CircleArrowRight
            class="text-gray-500 group-hover:text-blue-600 transition-colors duration-300"
          />
        </div>
        <p class="text-gray-500 group-hover:text-gray-700 transition-colors">
          View and manage all registered users.
        </p>
      </div>

      <!-- Manage Orders Card -->
      <div
        @click="router.push('/admin/orders')"
        class="group cursor-pointer border border-gray-200 rounded-2xl p-6 bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
      >
        <div class="flex items-center justify-between mb-2">
          <h1 class="text-xl font-semibold text-gray-800">Manage Orders</h1>
          <CircleArrowRight
            class="text-gray-500 group-hover:text-blue-600 transition-colors duration-300"
          />
        </div>
        <p class="text-gray-500 group-hover:text-gray-700 transition-colors">
          Track and fulfill customer orders efficiently.
        </p>
      </div>

      <!-- Manage Admin -->
      <div
        @click="router.push('/admin/manager')"
        class="group cursor-pointer border border-gray-200 rounded-2xl p-6 bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
      >
        <div class="flex items-center justify-between mb-2">
          <h1 class="text-xl font-semibold text-gray-800">Manage Admin</h1>
          <CircleArrowRight
            class="text-gray-500 group-hover:text-blue-600 transition-colors duration-300"
          />
        </div>
        <p class="text-gray-500 group-hover:text-gray-700 transition-colors">
          Manage, Add, Delete Admin
        </p>
      </div>
    </div>
  </div>
</template>
