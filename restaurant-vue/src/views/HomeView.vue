<script setup>
import { getRestaurants } from '@/api/restaurant';
import LongCardRestaurant from '@/components/restaurant/LongCardRestaurant.vue';
import SmallCardRestaurant from '@/components/restaurant/SmallCardRestaurant.vue';
import { computed, onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia'; 
import { useRestaurantStore } from '@/stores/restaurantStore'; 


const restaurantStore = useRestaurantStore();

const { restaurants } = storeToRefs(restaurantStore);

const featuredId = ref('');

const previewRestaurants = computed(() => restaurants.value.slice(0, 3));

onMounted(async () => {
  await restaurantStore.fetchAllRestaurants();
  
  if (restaurants.value.length > 0) {
    featuredId.value = restaurants.value[0].id;
  }
});
</script>

<template>
  <div class="home">
    <section v-if="featuredId" class="block">
      <h2 class="title">Restaurant</h2>
      <LongCardRestaurant :restaurant-id="featuredId" />
    </section>
    
    <section v-if="previewRestaurants.length" class="block">
      <div class="row-title">
        <h2 class="title">Restaurants</h2>
        <RouterLink to="/restaurants" class="voir-plus">Voir plus</RouterLink>
      </div>
      <div class="cards-row">
        <SmallCardRestaurant
          v-for="r in previewRestaurants"
          :key="r.id"
          :restaurant-id="r.id"
          :restaurant="r"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.block {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.title {
  margin: 0;
  font-size: 1.25rem;
}

.row-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.voir-plus {
  font-size: 0.95rem;
}

.cards-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>
