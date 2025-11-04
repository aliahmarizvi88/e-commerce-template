<script setup></script>

<template>
  <header class="bg-white shadow-md border-b border-gray-200">
    <div class="max-w-7xl mx-auto flex flex-col items-center py-6">
      <!-- Title -->
      <h1
        class="text-3xl font-extrabold text-gray-800 mb-6 uppercase tracking-wide"
      >
        e-commerce Dashboard
      </h1>

      <!-- Navigation Links -->
      <nav class="flex flex-wrap gap-8 justify-center">
        <router-link
          to="/admin"
          class="text-gray-600 font-medium hover:text-blue-600 transition-colors duration-200"
          active-class="text-blue-600 font-semibold"
        >
          Dashboard
        </router-link>

        <router-link
          to="/admin/products"
          class="text-gray-600 font-medium hover:text-blue-600 transition-colors duration-200"
          active-class="text-blue-600 font-semibold"
        >
          Products
        </router-link>

        <router-link
          to="/admin/orders"
          class="text-gray-600 font-medium hover:text-blue-600 transition-colors duration-200"
          active-class="text-blue-600 font-semibold"
        >
          Orders
        </router-link>

        <router-link
          to="/admin/users"
          class="text-gray-600 font-medium hover:text-blue-600 transition-colors duration-200"
          active-class="text-blue-600 font-semibold"
        >
          Users
        </router-link>

        <router-link
          to="/admin/manager"
          class="text-gray-600 font-medium hover:text-blue-600 transition-colors duration-200"
          active-class="text-blue-600 font-semibold"
        >
          Admin
        </router-link>
      </nav>
    </div>
  </header>
</template>
