<script setup>
import Footer from '@/components/Footer.vue';
import Navbar from '@/components/Navbar.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="main-layout">
    <Navbar />
    <main class="content">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
</style>
