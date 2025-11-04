<script setup>
import { computed } from 'vue';
import { useFavoriteStore } from '../store/FavoriteStore';
import { HeartCrack } from 'lucide-vue-next';

import ProductCard from '../components/ProductCard.vue';

const favoriteStore = useFavoriteStore();

const favorites = computed(() => favoriteStore.favorite);
</script>

<template>
  <div class="mt-[80px] mx-60">
    <h1 class="text-3xl font-extrabold">My Wishlist</h1>
    <div
      v-if="favoriteStore.favoriteCount === 0"
      class="h-[500px] flex flex-col justify-center items-center text-gray-400 gap-5"
    >
      <HeartCrack size="100" class="text-red-300" />
      <p class="text-center text-2xl font-bold">YOUR WISHLIST IS EMPTY</p>
    </div>

    <div
      v-else
      class="grid grid-cols-1 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <ProductCard
        v-for="favorite in favorites"
        :key="favorite.id"
        :product="favorite"
      />
      <p class="col-span-full text-gray-400 text-lg mt-10 text-center">
        Total Items: {{ favoriteStore.favoriteCount }}
      </p>
    </div>
  </div>
</template>
