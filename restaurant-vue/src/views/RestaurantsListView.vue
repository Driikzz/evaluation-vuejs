<script setup>
import { getRestaurants } from '@/api/restaurant';
import SmallCardRestaurant from '@/components/restaurant/SmallCardRestaurant.vue';
import { onMounted, ref } from 'vue';

const restaurants = ref([]);

onMounted(async () => {
  restaurants.value = await getRestaurants();
});
</script>

<template>
  <div class="all-restaurants">
    <h1>Tous les restaurants</h1>
    <div v-if="restaurants.length" class="cards-grid">
      <SmallCardRestaurant
        v-for="r in restaurants"
        :key="r.id"
        :restaurant-id="r.id"
        :restaurant="r"
      />
    </div>
    <p v-else class="empty">Chargement…</p>
  </div>
</template>

<style scoped>
.all-restaurants {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.cards-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.empty {
  margin: 0;
  color: #888;
}
</style>
