<script setup>
import { X } from 'lucide-vue-next';

const props = defineProps({
  show: Boolean,
  data: Object,
});

const emit = defineEmits(['close']);
</script>

<template>
  <div
    v-if="show"
    class="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl border-l border-gray-200 z-50 p-5 overflow-y-auto animate-slideIn"
  >
    <div class="flex justify-between items-center border-b pb-3 mb-3">
      <h2 class="text-lg font-semibold text-gray-800">Order Preview</h2>
      <button
        @click="$emit('close')"
        class="text-gray-500 hover:text-red-600 cursor-pointer"
      >
        <X />
      </button>
    </div>

    <div v-if="data">
      <p><strong>ID:</strong> {{ data.id }}</p>
      <p><strong>Email:</strong> {{ data.email }}</p>
      <p><strong>Status:</strong> {{ data.status }}</p>
      <p><strong>Total Items:</strong> {{ data.totalitem }}</p>
      <p><strong>Total Price:</strong> ${{ data.totalprice.toFixed(2) }}</p>

      <h3 class="mt-4 text-md font-semibold text-gray-700">Items:</h3>
      <ul class="mt-2 space-y-2">
        <li
          v-for="item in data.items"
          :key="item.id"
          class="border rounded-lg p-2 flex items-center space-x-2"
        >
          <img :src="item.image" class="w-10 h-10 rounded object-cover" />
          <div>
            <p class="text-sm font-medium">{{ item.title }}</p>
            <p class="text-xs text-gray-500">
              {{ item.quantity }}x ${{ item.price }}
            </p>
          </div>
        </li>
      </ul>

      <h3 class="mt-4 text-md font-semibold text-gray-700">Address:</h3>
      <div class="text-sm text-gray-600">
        <p class="capitalize">{{ data.address?.street }},</p>
        <p class="capitalize">
          {{ data.address?.city }}, {{ data.address?.zipcode }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
.animate-slideIn {
  animation: slideIn 0.4s ease-out;
}
</style>
