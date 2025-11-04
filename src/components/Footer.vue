<script setup>
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-vue-next';
</script>

<template>
  <footer class="bg-black text-white px-10 py-12 mt-20">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-10">
      <!-- Brand -->
      <div>
        <h2 class="text-2xl font-extrabold mb-4 cursor-pointer">e-commerce</h2>
        <p class="text-gray-400 text-sm leading-relaxed">
          Discover the latest trends in fashion, electronics, and more. Shop
          smart, shop easy!
        </p>
      </div>

      <!-- Links -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
        <ul class="space-y-2 text-gray-400">
          <li>
            <router-link to="/" class="hover:text-white">Home</router-link>
          </li>
          <li>
            <router-link to="/products" class="hover:text-white"
              >Products</router-link
            >
          </li>
          <li>
            <router-link to="/category" class="hover:text-white"
              >Categories</router-link
            >
          </li>
        </ul>
      </div>

      <!-- Customer Service -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Customer Service</h3>
        <ul class="space-y-2 text-gray-400">
          <li><a href="#" class="hover:text-white">Contact Us</a></li>
          <li><a href="#" class="hover:text-white">Shipping & Returns</a></li>
          <li><a href="#" class="hover:text-white">FAQs</a></li>
          <li><a href="#" class="hover:text-white">Privacy Policy</a></li>
        </ul>
      </div>

      <!-- Socials -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Follow Us</h3>
        <div class="flex gap-4">
          <a href="#" class="p-2 bg-gray-800 rounded-full hover:bg-gray-700">
            <Facebook class="w-5 h-5" />
          </a>
          <a href="#" class="p-2 bg-gray-800 rounded-full hover:bg-gray-700">
            <Twitter class="w-5 h-5" />
          </a>
          <a href="#" class="p-2 bg-gray-800 rounded-full hover:bg-gray-700">
            <Instagram class="w-5 h-5" />
          </a>
          <a href="#" class="p-2 bg-gray-800 rounded-full hover:bg-gray-700">
            <Youtube class="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div
      class="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm"
    >
      <p>© 2025 e-commerce. All rights reserved.</p>
      <p class="mt-2 md:mt-0">Made with ❤️ using Vue & TailwindCSS</p>
    </div>
  </footer>
</template>
