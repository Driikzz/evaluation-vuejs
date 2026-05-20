const BASE_URL = "http://localhost:3000";

export async function getRestaurants() {
  try {
    const response = await fetch(`${BASE_URL}/restaurants`);
    return response.json();
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
}

export async function getRestaurantById(id) {
  try {
    const response = await fetch(`${BASE_URL}/restaurants/${id}`);
    return response.json();
  } catch (error) {
    console.error("Error fetching restaurant by id:", error);
    throw error;
  }
}

export async function getSlotsForRestaurant(restaurantId, date) {
  try {
    const response = await fetch(`${BASE_URL}/restaurants/${restaurantId}/slots?date=${date}`);
    return response.json();
  } catch (error) {
    console.error("Error fetching slots for restaurant:", error);
    throw error;
  }
}
