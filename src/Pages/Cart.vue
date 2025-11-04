<script setup>
import { useCartStore } from '../store/CartStore';
import { X, ShoppingBag } from 'lucide-vue-next';

import { showToast } from '../utils/Toast';

import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const cartStore = useCartStore();

const checkOut = async () => {
  const errorMessage = ref(null);

  try {
    await cartStore.checkOut();
    showToast('Check out Sucessfull', 'success');
  } catch (error) {
    errorMessage.value = cartStore.error;
    showToast(errorMessage.value, 'error');
  }
};

const removeFromCart = (item) => {
  cartStore.removeFromCart(item);
  showToast('Removed!', 'info');
};
</script>

<template>
  <div class="mt-24 px-4 sm:px-6 md:px-10 lg:px-20">
    <h1
      class="text-2xl sm:text-3xl font-extrabold mb-8 text-center md:text-left"
    >
      My Cart
    </h1>

    <div
      v-if="cartStore.cart.length === 0"
      class="h-[60vh] flex flex-col justify-center items-center text-gray-400 gap-5 text-center"
    >
      <ShoppingBag size="80" />
      <p class="text-xl sm:text-2xl font-bold">YOUR CART IS EMPTY</p>
      <button
        class="mt-6 px-6 py-3 bg-black font-semibold text-white rounded-lg shadow hover:scale-105 transition"
        @click="router.push('/products')"
      >
        Shop Now
      </button>
    </div>

    <div v-else>
      <div class="hidden md:block mt-10 border-y">
        <table class="min-w-full border rounded-lg overflow-hidden">
          <thead class="bg-gray-100 text-left text-gray-700">
            <tr>
              <th class="p-4">Product</th>
              <th class="p-4">Price</th>
              <th class="p-4">Quantity</th>
              <th class="p-4">Subtotal</th>
              <th class="p-4 text-center">Remove</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="item in cartStore.cart"
              :key="item.id"
              class="border-t hover:bg-gray-50 transition"
            >
              <td class="p-4 flex items-center gap-4">
                <img
                  :src="item.image"
                  alt="Product"
                  class="h-16 w-16 object-contain rounded-md"
                />
                <span class="font-medium text-gray-800">{{ item.title }}</span>
              </td>
              <td class="p-4">$ {{ item.price.toFixed(2) }}</td>
              <td class="p-4 flex items-center gap-2">
                <button
                  class="border border-gray-400 rounded-full w-8 h-8 flex justify-center items-center"
                  @click="cartStore.decreaseItems(item.id)"
                >
                  -
                </button>
                <span>{{ item.quantity }}</span>
                <button
                  class="border border-gray-400 rounded-full w-8 h-8 flex justify-center items-center"
                  @click="cartStore.addToCart(item)"
                >
                  +
                </button>
              </td>
              <td class="p-4">
                $ {{ (item.price * item.quantity).toFixed(2) }}
              </td>
              <td class="p-4 text-center">
                <button
                  class="text-red-600 hover:text-red-800"
                  @click="removeFromCart(item.id)"
                >
                  <X />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile Card View -->
      <div class="grid md:hidden gap-6 mt-8">
        <div
          v-for="item in cartStore.cart"
          :key="item.id"
          class="border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-4 shadow-sm"
        >
          <img
            :src="item.image"
            alt="Product"
            class="h-24 w-24 object-contain mx-auto sm:mx-0"
          />

          <div class="flex flex-col flex-1">
            <h2 class="text-lg font-semibold">{{ item.title }}</h2>
            <p class="text-gray-600">$ {{ item.price.toFixed(2) }}</p>

            <div class="flex items-center gap-3 mt-3">
              <button
                class="border border-gray-400 rounded-full w-8 h-8 flex justify-center items-center"
                @click="cartStore.decreaseItems(item.id)"
              >
                -
              </button>
              <span>{{ item.quantity }}</span>
              <button
                class="border border-gray-400 rounded-full w-8 h-8 flex justify-center items-center"
                @click="cartStore.addToCart(item)"
              >
                +
              </button>
            </div>

            <div class="flex justify-between items-center mt-3">
              <p class="font-medium">
                Subtotal: $ {{ (item.price * item.quantity).toFixed(2) }}
              </p>
              <button
                class="text-red-600 hover:text-red-800"
                @click="cartStore.removeFromCart(item.id)"
              >
                <X />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        class="flex flex-col sm:flex-row justify-between sm:justify-end items-center mt-8 gap-4 sm:gap-10 bg-gray-100 p-5 rounded-3xl"
      >
        <p class="text-base sm:text-lg">
          Total Products: <strong>{{ cartStore.totalItems }}</strong>
        </p>
        <p class="text-base sm:text-lg">
          Total Bill:
          <strong>$ {{ cartStore.totalPrice.toFixed(2) }}</strong>
        </p>
      </div>

      <div class="flex justify-center sm:justify-end mt-6">
        <button
          @click="checkOut"
          class="w-full sm:w-auto px-6 py-3 bg-black font-semibold text-white rounded-lg shadow hover:scale-105 transition"
        >
          Check Out
        </button>
      </div>
    </div>
  </div>
</template>
