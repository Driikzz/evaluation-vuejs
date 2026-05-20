<script setup>
import { getRestaurantById } from '@/api/restaurant';
import { onMounted, ref } from 'vue';

const restaurant = ref(null);

const props = defineProps({
  restaurantId: {
    type: String,
    required: true,
  },
});

onMounted(async () => {
  restaurant.value = await getRestaurantById(props.restaurantId);
});
</script>

<template>
  <article class="long-card">
    <p v-if="!restaurant" class="muted">Chargement…</p>
    <template v-else>
      <div class="infos">
        <h3 class="name">{{ restaurant.name }}</h3>
        <p class="description">{{ restaurant.description }}</p>
      </div>
      <p class="type">{{ restaurant.cuisineType }}</p>
    </template>
  </article>
</template>

<style scoped>
.long-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-radius: 12px;
  background: #f5f5f5;
  border: 1px solid #e0e0e0;
}

.infos {
  min-width: 0;
}

.name {
  margin: 0 0 0.35rem;
  font-size: 1.1rem;
}

.description {
  margin: 0;
  font-size: 0.9rem;
  color: #555;
  line-height: 1.4;
}

.type {
  margin: 0;
  flex-shrink: 0;
  font-weight: 600;
  font-size: 0.95rem;
}

.muted {
  margin: 0;
  color: #888;
}
</style>
