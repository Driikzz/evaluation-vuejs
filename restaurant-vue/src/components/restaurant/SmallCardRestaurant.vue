<script setup>
import { getRestaurantById } from '@/api/restaurant';
import { onMounted, ref, watch } from 'vue';

const display = ref(null);

const props = defineProps({
  restaurantId: {
    type: String,
    required: true,
  },
});

async function load() {
  if (props.restaurant) {
    display.value = props.restaurant;
    return;
  }
  display.value = await getRestaurantById(props.restaurantId);
}

onMounted(load);
watch(
  () => [props.restaurantId, props.restaurant],
  load,
  { deep: true },
);

const handleCardClick = (id) => {
  console.log('Test id:', id);
  console.log('Test display:', display.value);
};

</script>

<template>
  <article class="small-card" @click="handleCardClick(display.id)" :class="{ 'is-clickable': display }">
    <p v-if="!display" class="muted">Chargement…</p>
    <template v-else>
      <p class="small-name">{{ display.name }}</p>
      <p class="small-type">{{ display.cuisineType }}</p>
      <p class="small-address">{{ display.address }}</p>
    </template>
  </article>
</template>

<style scoped>
.small-card {
  flex: 1 1 140px;
  min-width: 140px;
  padding: 1rem;
  border-radius: 12px;
  background: #f5f5f5;
  border: 1px solid #e0e0e0;
}

.small-name {
  margin: 0 0 0.35rem;
  font-weight: 600;
}

.small-type {
  margin: 0 0 0.35rem;
  font-size: 0.9rem;
}

.small-address {
  margin: 0;
  font-size: 0.85rem;
  color: #555;
}

.muted {
  margin: 0;
  color: #888;
}

.is-clickable {
  cursor: pointer;
}
</style>
