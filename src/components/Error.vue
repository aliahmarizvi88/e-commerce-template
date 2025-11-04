<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <div class="flex flex-col justify-center items-center gap-6 text-gray-400">
    <p class="text-lg">Error!</p>
    <h1 class="font-bold text-8xl text-black">404</h1>
    <p class="font-semi text-2xl">Page: '{{ route.name }}' NOT FOUND</p>
    <p class="text-md"><b>REASON: </b>Page Under Development</p>
  </div>
</template>
