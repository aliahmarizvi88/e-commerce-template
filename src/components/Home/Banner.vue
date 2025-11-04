<script setup>
import bannerImage_01 from '../../assets/images/HomeBanner/Banner Image/Product_01.jpg';
import bannerImage_02 from '../../assets/images/HomeBanner/Banner Image/Product_02.jpg';
import bannerImage_03 from '../../assets/images/HomeBanner/Banner Image/Product_03.jpg';
import bannerImage_04 from '../../assets/images/HomeBanner/Banner Image/Product_04.jpg';

import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <div
    class="flex flex-col md:flex-row items-center justify-between bg-gray-300 rounded-3xl shadow-lg mx-10 overflow-hidden"
  >
    <div class="grid grid-cols-2 gap-4 p-6">
      <img
        :src="bannerImage_01"
        alt="Product 1"
        class="w-[250px] h-[250px] object-cover rounded-tl-3xl shadow-md"
        loading="lazy"
      />
      <img
        :src="bannerImage_02"
        alt="Product 2"
        class="w-[250px] h-[250px] object-cover rounded-tr-3xl shadow-md"
        loading="lazy"
      />
      <img
        :src="bannerImage_03"
        alt="Product 3"
        class="w-[250px] h-[250px] object-cover rounded-bl-3xl shadow-md"
        loading="lazy"
      />
      <img
        :src="bannerImage_04"
        alt="Product 4"
        class="w-[250px] h-[250px] object-cover rounded-br-3xl shadow-md"
        loading="lazy"
      />
    </div>

    <!-- Text Section -->
    <div class="flex-1 p-8 text-center md:text-left">
      <h1 class="text-4xl font-bold text-gray-800">New Season, New Style</h1>
      <p class="text-lg text-gray-600 mt-4 leading-relaxed">
        Mauris eget porttitor risus. Fusce ac nulla rutrum, pretium est vel,
        gravida mauris. Proin ut augue placerat, volutpat turpis eu, vestibulum
        ante. Cras cursus eros mauris, eu aliquet nulla mollis interdum. Nulla
        eu dui vel diam ullamcorper imperdiet ac vel ante. Pellentesque
        tristique ligula id finibus accumsan. Suspendisse fermentum lorem sed
        neque rutrum, sit amet fermentum nunc faucibus. Duis malesuada neque ut
        ultrices rutrum. Proin ut orci urna. Etiam nec orci eget lectus ornare
        eleifend. Morbi ut luctus metus.
      </p>
      <button
        class="mt-6 px-6 py-3 bg-black text-white rounded-lg shadow hover:scale-110 transition cursor-pointer"
        @click="router.push('/products')"
      >
        Shop Now
      </button>
    </div>
  </div>
</template>
