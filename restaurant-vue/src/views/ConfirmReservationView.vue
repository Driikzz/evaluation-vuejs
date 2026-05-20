<script setup>
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia'; 
import { useReservationStore } from '@/stores/reservationStore';
import { useRestaurantStore } from '@/stores/restaurantStore';
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
const restaurantStore = useRestaurantStore();

const { 
  currentReservation: reservation, 
  isLoading, 
  error: errorMessage 
} = storeToRefs(reservationStore);
const { selectedRestaurant } = storeToRefs(restaurantStore);

const isTokenValid = computed(() => Boolean(reservation.value?.id));
const restaurantName = computed(
  () =>
    reservation.value?.restaurant?.name ||
    selectedRestaurant.value?.name ||
    reservation.value?.restaurantName ||
    reservation.value?.restaurantId ||
    '-',
);
const restaurantAddress = computed(
  () => selectedRestaurant.value?.address || reservation.value?.restaurantAddress || '-',
);
const slotLabel = computed(() => {
  const slotStart = reservation.value?.slot?.startTime;
  const slotEnd = reservation.value?.slot?.endTime;
  if (slotStart && slotEnd) {
    return `${slotStart} - ${slotEnd}`;
  }

  const directStart = reservation.value?.startTime;
  const directEnd = reservation.value?.endTime;
  const nestedStart = reservation.value?.timeSlot?.startTime;
  const nestedEnd = reservation.value?.timeSlot?.endTime;

  const start = directStart || nestedStart;
  const end = directEnd || nestedEnd;

  if (start && end) {
    return `${start} - ${end}`;
  }

  return reservation.value?.timeSlotId || 'Creneau non disponible';
});

onMounted(async () => {
  await reservationStore.fetchReservationByToken(props.token);
  const restaurantIdFromReservation =
    reservation.value?.restaurant?.id || reservation.value?.restaurantId;
  if (restaurantIdFromReservation) {
    await restaurantStore.fetchRestaurantDetails(restaurantIdFromReservation);
  }
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
            <p><strong>Restaurant :</strong> {{ restaurantName }}</p>
            <p><strong>Nombre de personne :</strong> {{ reservation.covers }}</p>
            <p><strong>Adresse :</strong> {{ restaurantAddress }}</p>
            <p><strong>Creneau :</strong> {{ slotLabel }}</p>
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

