<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { CircleArrowRight } from 'lucide-vue-next';
import { useCategoryStore } from '../../store/GET/CategoryStore';

import SekeletonLoader from '../SekeletonLoader.vue';
import CategoryCard from '../CategoryCard.vue';

const router = useRouter();
const categoryStore = useCategoryStore();

onMounted(() => categoryStore.fetchCategory());
</script>

<template>
  <div class="mt-[80px] mx-10">
    <div class="flex justify-between items-baseline">
      <h1 class="text-3xl font-bold">Shop by Category</h1>
      <button @click="router.push('/category')" class="cursor-pointer">
        <CircleArrowRight size="40" />
      </button>
    </div>

    <div v-if="categoryStore?.errors" class="text-red-600 mt-4">
      {{ categoryStore?.errors }}
    </div>

    <div
      v-else-if="categoryStore?.loading"
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 mt-10"
    >
      <SekeletonLoader
        v-for="n in 4"
        :key="n"
        width="w-[250px]"
        height="h-[250px]"
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
