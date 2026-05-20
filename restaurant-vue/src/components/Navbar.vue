<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <header class="navbar">
    <RouterLink to="/" class="brand">Réservation resto</RouterLink>
    <nav class="links">
      <RouterLink to="/">Accueil</RouterLink>
      <RouterLink to="/about">À propos</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.navbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e0e0e0;
}

.brand {
  font-size: 1.25rem;
  font-weight: 700;
  text-decoration: none;
  color: inherit;
}

.links {
  display: flex;
  gap: 1rem;
}
</style>
