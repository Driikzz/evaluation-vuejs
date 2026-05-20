<script setup>
import { getRestaurantById } from '@/api/restaurant';
import SlotAndReservation from '@/components/restaurant/SlotAndReservation.vue';
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
    <div class="restaurant-detail">
        <div>
            <h1>{{ restaurant.name }}</h1>
            <div>
                <img :src="restaurant.imageUrl" :alt="restaurant.name" />
            </div>
            <p>{{ restaurant.description }}</p>
            <p>{{ restaurant.address }}</p>
            <p>{{ restaurant.cuisineType }}</p>
            <div>
                Nombre de couverts : {{ restaurant.totalCapacity }} / Nombre de couverts réservés : {{ restaurant.bookedCovers }}
            </div>
        </div>
        <SlotAndReservation :restaurant-id="restaurant.id" />
    </div>

</template>

<style scoped>
.restaurant-detail {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>