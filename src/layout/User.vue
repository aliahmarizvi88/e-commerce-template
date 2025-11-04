<script setup>
import Nav from '../components/Nav.vue';
import Footer from '../components/Footer.vue';
</script>

<template>
  <Nav />
  <div class="scroll-smooth">
    <router-view />
  </div>
  <Footer />
</template>
