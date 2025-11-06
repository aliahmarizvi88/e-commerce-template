<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { useCategoryStore } from '../store/GET/CategoryStore';
import { ShoppingCart, Star, UserRound } from 'lucide-vue-next';

const categoryStore = useCategoryStore();
const router = useRouter();

const isOpen = ref(false);
const dropdownOpen = ref(false);
const dropdownRef = ref(null);

const toggleDropDown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const selectCategory = () => {
  dropdownOpen.value = false;
};

const links = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/category', label: 'Category' },
];

const handleClickOutside = (e) => {
  if (!dropdownOpen.value) return;

  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    dropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div
    class="flex gap-10 bg-black items-center justify-between text-white p-10"
  >
    <h1
      class="lg:text-4xl md:text-3xl font-extrabold cursor-pointer"
      @click="router.push('/')"
    >
      e-commerce
    </h1>

    <!-- Desktop Nav -->
    <nav
      class="hidden md:flex gap-10 font-semibold relative items-center"
      ref="dropdownRef"
    >
      <div
        v-for="link in links"
        :key="link.label"
        class="relative flex items-center"
      >
        <div v-if="link.label === 'Category'" class="relative">
          <button
            @click.stop="toggleDropDown"
            class="px-2 py-1 cursor-pointer text-base font-semibold hover:text-gray-300 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
          >
            {{ link.label }}
          </button>

          <div
            :class="[
              'absolute top-[2.7rem] left-1/2 -translate-x-1/2 w-56 bg-white text-black rounded-xl shadow-xl z-50 transition-all duration-300 ease-in-out origin-top transform',
              dropdownOpen
                ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 scale-95 -translate-y-2 pointer-events-none',
            ]"
          >
            <router-link
              v-for="cat in categoryStore.category"
              :key="cat"
              :to="`/category/${cat}`"
              class="block px-4 py-2 hover:bg-gray-100 hover:rounded-2xl cursor-pointer text-left capitalize"
              @click="selectCategory(cat)"
            >
              {{ cat }}
            </router-link>
          </div>
        </div>

        <router-link
          v-else
          :to="link.to"
          class="px-2 py-1 text-base font-semibold relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
          exact-active-class="after:w-full text-white"
        >
          {{ link.label }}
        </router-link>
      </div>
    </nav>

    <!-- Desktop Buttons -->
    <div class="hidden md:flex gap-3">
      <button
        class="cursor-pointer bg-white text-black text-xl rounded-full p-2 hover:scale-110 transition duration-300"
        @click="router.push('/cart')"
      >
        <ShoppingCart fill="black" />
      </button>
      <button
        class="cursor-pointer bg-white text-black text-xl rounded-full p-2 hover:scale-110 transition duration-300"
        @click="router.push('/wishList')"
      >
        <Star fill="black" />
      </button>
      <button
        class="cursor-pointer bg-white text-black text-xl rounded-full p-2 hover:scale-110 transition duration-300"
        @click="router.push('/profile')"
      >
        <UserRound fill="black" />
      </button>
    </div>

    <!-- Mobile Nav -->
    <div class="md:hidden relative">
      <button
        class="relative w-8 h-8 flex flex-col justify-between items-center"
        @click="isOpen = !isOpen"
      >
        <span
          class="block h-1 w-8 bg-white rounded transition-all duration-300"
          :class="isOpen ? 'rotate-45 translate-y-3' : ''"
        ></span>
        <span
          class="block h-1 w-8 bg-white rounded transition-all duration-300"
          :class="isOpen ? 'opacity-0' : ''"
        ></span>
        <span
          class="block h-1 w-8 bg-white rounded transition-all duration-300"
          :class="isOpen ? '-rotate-45 -translate-y-3' : ''"
        ></span>
      </button>

      <div
        v-show="isOpen"
        class="absolute right-0 mt-3 w-48 bg-black text-white rounded-lg shadow-lg flex flex-col p-3 z-50"
      >
        <router-link
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="px-2 py-1 hover:text-gray-300 [&.router-link-active]:text-white"
          @click="isOpen = false"
        >
          {{ link.label }}
        </router-link>

        <div class="flex gap-3 mt-4">
          <button
            class="cursor-pointer bg-white text-black rounded-full p-2"
            @click="
              router.push('/cart');
              isOpen = false;
            "
          >
            <ShoppingCart fill="black" />
          </button>
          <button
            class="cursor-pointer bg-white text-black rounded-full p-2"
            @click="
              router.push('/wishList');
              isOpen = false;
            "
          >
            <Star fill="black" />
          </button>
          <button
            class="cursor-pointer bg-white text-black rounded-full p-2"
            @click="router.push('/profile')"
          >
            <UserRound fill="black" />
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="overflow-hidden bg-[#eeee] mb-5">
    <div
      class="marquee-content flex gap-8 items-center animate-ecom-marquee min-w-full"
    >
      <p
        class="text-center whitespace-nowrap text-black text-sm font-bold tracking-widest"
      >
        WELCOME TO OUR NEW STORE! —
      </p>
      <p
        class="text-center whitespace-nowrap text-black text-sm font-bold tracking-widest"
      >
        GETTING A NEW SALE SOON ENOUGH!
      </p>

      <p
        class="text-center whitespace-nowrap text-black text-sm font-bold tracking-widest"
      >
        WELCOME TO OUR NEW STORE! —
      </p>
      <p
        class="text-center whitespace-nowrap text-black text-sm font-bold tracking-widest"
      >
        GETTING A NEW SALE SOON ENOUGH!
      </p>

      <p
        class="text-center whitespace-nowrap text-black text-sm font-bold tracking-widest"
      >
        WELCOME TO OUR NEW STORE! —
      </p>
      <p
        class="text-center whitespace-nowrap text-black text-sm font-bold tracking-widest"
      >
        GETTING A NEW SALE SOON ENOUGH!
      </p>
    </div>
  </div>
</template>
