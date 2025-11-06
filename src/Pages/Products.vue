<script setup>
import { useProductStore } from '../store/GET/ProductStore';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

import SekeletonLoader from '../components/SekeletonLoader.vue';
import ProductCard from '../components/ProductCard.vue';

const router = useRouter();

const productStore = useProductStore();

onMounted(() => {
  productStore.fetchProduct();
});
</script>

<template>
  <div class="mt-[80px] mx-10 animate-fade-in-up">
    <h1 class="text-3xl font-bold">Products</h1>

    <div v-if="productStore.errors" class="text-red-600">
      {{ productStore.errors }}
    </div>

    <div
      v-else-if="productStore.loading"
      class="grid grid-cols-6 mt-10 pb-4 gap-5"
    >
      <SekeletonLoader
        v-for="n in 12"
        :key="n"
        width="w-[250px]"
        height="h-[250px]"
        class="bg-white"
      />
    </div>

    <div
      v-else
      class="grid grid-cols-2 mt-10 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"
    >
      <ProductCard
        v-for="product in productStore.products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>
