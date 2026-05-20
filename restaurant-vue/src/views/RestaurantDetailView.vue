<script setup>
import { storeToRefs } from 'pinia'; 
import { useRestaurantStore } from '@/stores/restaurantStore';
import SlotAndReservation from '@/components/restaurant/SlotAndReservation.vue';
import { onMounted} from 'vue';


const props = defineProps({
  restaurantId: {
    type: String,
    required: true,
  },
});

const restaurantStore = useRestaurantStore();

const { selectedRestaurant: restaurant } = storeToRefs(restaurantStore); 

onMounted(async () => {
  await restaurantStore.fetchRestaurantDetails(props.restaurantId);
});
</script>

<template>
    <section class="restaurant-detail">
        <p v-if="!restaurant">Chargement...</p>
        <div v-else>
            <h1>{{ restaurant.name }}</h1>
            <div>
                <img :src="restaurant.imageUrl" :alt="restaurant.name" class="restaurant-image" />
            </div>
            <p class="restaurant-description">{{ restaurant.description }}</p>
            <p class="restaurant-address">{{ restaurant.address }}</p>
            <p class="restaurant-cuisine-type">{{ restaurant.cuisineType }}</p>
        </div>
        <SlotAndReservation v-if="restaurant" :restaurant-id="restaurant.id" />
    </section>

</template>

<style scoped>
.restaurant-detail {
    display: flex;
    justify-content: space-between;
    margin: 20px auto;
    padding: 20px;
}

.restaurant-image {
    width: 800px;
    height: 300px;
    object-fit: cover;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
}

.restaurant-description {
    font-size: 20px;
    margin-bottom: 10px;
    color: #333;
}

.restaurant-address {
    font-size: 20px;
    margin-bottom: 10px;
    color: #075ea0;
}

.restaurant-cuisine-type {
    font-size: 20px;
    margin-bottom: 10px;
    font-weight: bold;
    color: #333;
}
</style>