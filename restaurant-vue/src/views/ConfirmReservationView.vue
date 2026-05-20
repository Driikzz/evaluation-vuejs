<script setup>
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia'; 
import { useReservationStore } from '@/stores/reservationStore';
import ButtonCancel from '@/components/reservation/ButtonCancel.vue';
import ButtonConfirm from '@/components/reservation/ButtonConfirm.vue';

const props = defineProps({
  token: {
    type: String,
    required: true,
  },
});

const router = useRouter();

const reservationStore = useReservationStore();

const { 
  currentReservation: reservation, 
  isLoading, 
  error: errorMessage 
} = storeToRefs(reservationStore);

const isTokenValid = computed(() => Boolean(reservation.value?.id));

onMounted(async () => {
  await reservationStore.fetchReservationByToken(props.token);
});

const handleCancel = async () => {
  if (!reservation.value?.id) return;
  
  try {
    const response = await reservationStore.abortReservation(reservation.value.id, props.token);
    alert(response.message || 'Réservation annulée.');
    router.push('/restaurants');
  } catch (error) {
    alert("Une erreur est survenue lors de l'annulation.");
  }
};

const goToRestaurants = () => {
  router.push('/restaurants');
};
</script>

<template>
    <section class="confirm-view">
        <p v-if="isLoading">Chargement...</p>

        <template v-else-if="isTokenValid">
            <h1>Reservation confirmee</h1>
            <p><strong>Restaurant :</strong> {{ reservation.restaurantName || reservation.restaurantId }}</p>
            <p><strong>Nombre de personne :</strong> {{ reservation.covers }}</p>
            <p><strong>Adresse :</strong> {{ reservation.restaurantAddress || '-' }}</p>
            <p><strong>Creneau :</strong> {{ reservation.startTime }} - {{ reservation.endTime }}</p>
            <ButtonCancel @click="handleCancel" />
        </template>

        <template v-else>
            <h1>Confirmation impossible</h1>
            <p>{{ errorMessage }}</p>
            <ButtonConfirm @click="goToRestaurants" />
        </template>
    </section>
</template>
<style scoped>
.confirm-view {
    border: 1px solid #d1d5db;
    border-radius: 12px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>

