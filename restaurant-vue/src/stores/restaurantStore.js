import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getRestaurants, getRestaurantById, getSlotsForRestaurant } from '@/api/restaurant';

export const useRestaurantStore = defineStore('restaurant', () => {
  // --- STATE ---
  const restaurants = ref([]);
  const selectedRestaurant = ref(null);
  const availableSlots = ref([]);
  const isLoading = ref(false);

  // --- ACTIONS ---
  
  // Charger tous les restaurants
  async function fetchAllRestaurants() {
    if (restaurants.value.length > 0) return; 
    
    isLoading.value = true;
    try {
      restaurants.value = await getRestaurants();
    } catch (err) {
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  }

  // Charger un restaurant spécifique
  async function fetchRestaurantDetails(id) {
    isLoading.value = true;
    try {
      selectedRestaurant.value = await getRestaurantById(id);
    } catch (err) {
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  }

  // Charger les créneaux (slots) dispo pour un resto et une date donnée
  async function fetchSlots(restaurantId, date) {
    isLoading.value = true;
    try {
      availableSlots.value = await getSlotsForRestaurant(restaurantId, date);
    } catch (err) {
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    restaurants,
    selectedRestaurant,
    availableSlots,
    isLoading,
    fetchAllRestaurants,
    fetchRestaurantDetails,
    fetchSlots
  };
});