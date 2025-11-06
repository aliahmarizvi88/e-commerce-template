<script setup>
import { useRoute } from 'vue-router';

import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { Heart, Star, ShoppingCart } from 'lucide-vue-next';

import { useProductStore } from '../store/GET/ProductStore';
import { useFavoriteStore } from '../store/FavoriteStore';
import { useCartStore } from '../store/CartStore';

import { showToast } from '../utils/Toast';

const route = useRoute();

const favoriteStore = useFavoriteStore();
const cartStore = useCartStore();
const productStore = useProductStore();

const details = computed(() => productStore.productDetails);
const loading = computed(() => productStore.loading);
const error = computed(() => productStore.errors);

const isFav = computed(() =>
  details.value ? favoriteStore.isFavorite(details.value.id) : false
);

const toggleFavorite = () => {
  if (!details.value || !details.value.id) {
    console.warn('No valid product details found');
    return;
  }

  const productId = details.value.id;

  if (favoriteStore.isFavorite(productId)) {
    favoriteStore.removeFromFavorites(productId);
    showToast('Product Removed', 'info');
  } else {
    favoriteStore.addToFavorites(details.value);
    showToast('Product Added', 'success');
  }
};

const AddToCart = () => {
  cartStore.addToCart(details.value);
  showToast('Added to Cart', 'success');
};

onMounted(async () => {
  const id = route.params.id;
  await productStore.fetchProductDetails(id);
});
</script>

<template>
  <div class="mt-24 px-4 sm:px-6 md:px-10 lg:px-20 animate-fade-in-up">
    <div v-if="error" class="h-screen text-red-600 font-bold text-center">
      {{ error }}
    </div>

    <div
      v-else-if="loading"
      class="flex justify-center items-center text-4xl animate-pulse font-bold min-h-screen"
    >
      Loading...
    </div>

    <div
      v-else-if="details"
      class="flex flex-col md:flex-row gap-10 md:gap-20 items-center"
    >
      <img
        :src="details.image"
        alt="Product Image"
        class="w-full max-w-[400px] h-auto object-contain"
      />

      <div class="flex flex-col items-start gap-3 w-full md:w-1/2">
        <p
          class="text-sm sm:text-base font-light border px-4 py-1 rounded-full border-gray-400"
        >
          {{ details.category }}
        </p>

        <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug">
          {{ details.title }}
        </h1>

        <p class="flex gap-2 text-sm font-light text-gray-600">
          <Star fill="#fdc700" size="15" class="text-yellow-400" />
          {{ details.rating.rate }}
        </p>

        <h3 class="text-xl sm:text-2xl font-bold">$ {{ details.price }}</h3>

        <div
          class="flex flex-col sm:flex-row gap-4 border-y border-gray-300 py-6 my-5 w-full"
        >
          <button
            class="flex justify-center items-center gap-3 w-full sm:w-[250px] md:w-[350px] bg-black text-white py-3 rounded-full hover:scale-105 transition-transform font-semibold cursor-pointer"
            @click="AddToCart"
          >
            <ShoppingCart />
            Add to Cart
          </button>

          <button
            class="border border-gray-400 bg-white rounded-full p-3 sm:p-4 hover:scale-105 transition-transform cursor-pointer"
            @click="toggleFavorite"
          >
            <span v-if="!isFav"><Heart /></span>
            <span v-else><Heart fill /></span>
          </button>
        </div>

        <h3 class="text-lg sm:text-xl font-semibold">Description:</h3>
        <p
          class="text-sm sm:text-base text-justify leading-relaxed text-gray-700"
        >
          {{ details.description }}
        </p>
      </div>
    </div>
  </div>
</template>
