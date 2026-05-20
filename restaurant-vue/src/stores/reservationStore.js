import { defineStore } from 'pinia';
import { ref } from 'vue';
import { createReservation, getReservationByToken, cancelReservation } from '@/api/reservation';

export const useReservationStore = defineStore('reservation', () => {
  // --- STATE (Les données en mémoire) ---
  const currentReservation = ref(null);
  const isLoading = ref(false);
  const error = ref(null);

  // --- ACTIONS (Les fonctions logiques) ---
  
  // Créer une réservation
  async function makeReservation(reservationData) {
    isLoading.value = true;
    error.value = null;
    try {
      const data = await createReservation(reservationData);
      currentReservation.value = data;
      return data;
    } catch (err) {
      error.value = err.message || "Impossible de créer la réservation";
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  // Récupérer une réservation existante via son Token
  async function fetchReservationByToken(token) {
    isLoading.value = true;
    error.value = null;
    try {
      const data = await getReservationByToken(token);
      currentReservation.value = data;
    } catch (err) {
      error.value = err.message || "Réservation introuvable";
    } finally {
      isLoading.value = false;
    }
  }

  // Annuler une réservation
  async function abortReservation(id, token) {
    isLoading.value = true;
    error.value = null;
    try {
      const data = await cancelReservation(id, token);
      currentReservation.value = data; 
      return data;
    } catch (err) {
      error.value = err.message || "Impossible d'annuler la réservation";
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    currentReservation,
    isLoading,
    error,
    makeReservation,
    fetchReservationByToken,
    abortReservation
  };
});