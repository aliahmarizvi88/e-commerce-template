<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
defineProps({
  product: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div
    @click="router.push(`/product/${product.id}`)"
    class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
  >
    <div class="h-64 flex items-center justify-center bg-gray-100">
      <img
        :src="product?.image"
        :alt="product?.title"
        class="max-h-[220px] object-contain"
      />
    </div>

    <div class="p-4 flex flex-col justify-between h-[160px]">
      <h2 class="text-base font-semibold line-clamp-2 mb-1">
        {{ product?.title }}
      </h2>
      <p class="text-sm text-gray-500 capitalize mb-2">
        {{ product?.category }}
      </p>
      <div class="flex items-center justify-between mt-auto">
        <p class="text-lg font-bold text-gray-800">$ {{ product?.price }}</p>
        <span
          class="text-yellow-500 text-sm font-medium flex items-center gap-1"
        >
          ⭐ {{ product?.rating?.rate }}
        </span>
      </div>
    </div>
  </div>
</template>
