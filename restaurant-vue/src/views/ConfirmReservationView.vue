<script setup>
import ButtonCancel from '@/components/reservation/ButtonCancel.vue';
import ButtonConfirm from '@/components/reservation/ButtonConfirm.vue';
import { cancelReservation, getReservationByToken } from '@/api/reservation';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    token: {
        type: String,
        required: true,
    },
});

const router = useRouter();
const reservation = ref(null);
const isLoading = ref(true);
const errorMessage = ref('');

const isTokenValid = computed(() => Boolean(reservation.value?.id));

onMounted(async () => {
    try {
        reservation.value = await getReservationByToken(props.token);
        if (!reservation.value?.id) {
            errorMessage.value = 'Token invalide ou reservation introuvable.';
        }
    } catch (error) {
        errorMessage.value = 'Impossible de verifier la reservation.';
    } finally {
        isLoading.value = false;
    }
});

const handleCancel = async () => {
    if (!reservation.value?.id) {
        return;
    }
    const response = await cancelReservation(reservation.value.id, props.token);
    alert(response.message || 'Reservation annulee.');
    router.push('/restaurants');
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

