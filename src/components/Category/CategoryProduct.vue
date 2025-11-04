<script setup>
import { ref, onMounted, watch } from 'vue';
import { useCategoryStore } from '../../store/GET/CategoryStore';
import { useRoute } from 'vue-router';
import ProductCard from '../ProductCard.vue';
import SekeletonLoader from '../SekeletonLoader.vue';

const route = useRoute();
const categoryStore = useCategoryStore();

onMounted(() => {
  categoryStore.fetchProductByCategory(`${route.params.category}`);
});

watch(
  () => route.params.category,
  () => {
    categoryStore.fetchProductByCategory(`${route.params.category}`);
  }
);
</script>
<template>
  <div class="mt-[80px] p-6">
    <h1 class="text-3xl font-bold mb-6 capitalize">
      Category > {{ route.params.category }}
    </h1>

    <div
      v-if="categoryStore.loading"
      class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
    >
      <SekeletonLoader
        v-for="n in 12"
        :key="n"
        width="w-[250px]"
        height="h-[250px]"
        class="bg-white"
      />
    </div>
    <div v-else-if="categoryStore.errors" class="text-red-500 text-center">
      {{ categoryStore.errors }}
    </div>

    <div
      v-else
      class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
    >
      <ProductCard
        v-for="products in categoryStore.productByCategory"
        :key="products.id"
        :product="products"
      />
    </div>
  </div>
</template>
