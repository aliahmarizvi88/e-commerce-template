<script setup>
import { useProductStore } from '../../store/GET/ProductStore';
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { CircleArrowRight } from 'lucide-vue-next';

import SekeletonLoader from '../SekeletonLoader.vue';
import ProductCard from '../ProductCard.vue';

const router = useRouter();

const productStore = useProductStore();

onMounted(() => {
  productStore.fetchProduct();
});

const homeProducts = computed(() => productStore.products.slice(0, 12));
</script>

<template>
  <div class="mt-[80px] mx-10">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold">Products</h1>
      <button
        class="text-md text-black cursor-pointer"
        title="show more"
        @click="router.push('/products')"
      >
        <CircleArrowRight size="40" />
      </button>
    </div>

    <div v-if="productStore.error" class="text-red-600">
      {{ productStore.error }}
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
        v-for="product in homeProducts"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>
