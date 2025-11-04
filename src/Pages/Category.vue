<script setup>
import { onMounted } from 'vue';
import { useCategoryStore } from '../store/GET/CategoryStore';
import CategoryCard from '../components/CategoryCard.vue';
import SekeletonLoader from '../components/SekeletonLoader.vue';

const categoryStore = useCategoryStore();

onMounted(() => categoryStore.fetchCategory());
</script>

<template>
  <div class="mt-[80px] mx-10">
    <h1 class="text-3xl font-bold">Categoires</h1>

    <div v-if="categoryStore.errors" class="text-red-600">
      {{ categoryStore.errors }}
    </div>

    <div
      v-else-if="categoryStore.loading"
      class="grid grid-cols-6 mt-10 pb-4 gap-5"
    >
      <SekeletonLoader
        v-for="n in 4"
        :key="n"
        width="w-[250px]"
        height="h-[250px]"
        class="bg-white"
      />
    </div>

    <div
      v-else
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-10"
    >
      <CategoryCard
        v-for="cat in categoryStore?.category"
        :key="cat"
        :category="cat"
      />
    </div>
  </div>
</template>
