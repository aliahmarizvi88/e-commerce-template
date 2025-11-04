<script setup>
import { useRouter } from 'vue-router';

import electronicImg from '../assets/images/HomeBanner/Category Images/electronic.png';
import jeweleryImg from '../assets/images/HomeBanner/Category Images/jewelary.png';
import menClothing from '../assets/images/HomeBanner/Category Images/Mens Clothing.png';
import womenClothing from '../assets/images/HomeBanner/Category Images/womens clothing.png';

const props = defineProps({
  category: String,
});

const router = useRouter();

function getCategoryImage(category) {
  const images = {
    electronics: electronicImg,
    jewelery: jeweleryImg,
    "men's clothing": menClothing,
    "women's clothing": womenClothing,
  };
  return images[category] || 'https://placehold.co/600x400/png';
}

function goToCategory(category) {
  router.push(`/category/${encodeURIComponent(category)}`);
}
</script>

<template>
  <div
    @click="goToCategory(category)"
    class="overflow-hidden hover:scale-105 duration-300 transition-all cursor-pointer"
  >
    <div class="h-48 flex items-center justify-center">
      <img
        :src="getCategoryImage(category)"
        :alt="category"
        class="max-h-[200px] rounded-xl object-contain"
      />
    </div>

    <div class="p-4 flex justify-center">
      <h2 class="text-base font-semibold text-center capitalize">
        {{ category }}
      </h2>
    </div>
  </div>
</template>
