<script setup>
import { getSlotsForRestaurant } from '@/api/restaurant';
import { onMounted, ref } from 'vue';

const slots = ref([]);
const selectedSlot = ref(null);
const step = ref('slot-selection');

const reservationForm = ref({
    name: '',
    email: '',
    phone: '',
    guests: 1,
});

const props = defineProps({
    restaurantId: {
        type: String,
        required: true,
    },
});

onMounted(async () => {
    slots.value = await getSlotsForRestaurant(props.restaurantId, new Date().toISOString().split('T')[0]);
});

const chooseSlot = (slot) => {
    selectedSlot.value = slot;
};

const goToReservation = () => {
    if (!selectedSlot.value) {
        return;
    }
    step.value = 'reservation-form';
};

const goBackToSlots = () => {
    step.value = 'slot-selection';
};

const confirmReservation = () => {
    alert(
        `Reservation confirmee pour ${reservationForm.value.name} (${reservationForm.value.guests} pers.) sur le creneau ${selectedSlot.value.startTime} - ${selectedSlot.value.endTime}`,
    );
};
</script>


<template>
    <div class="slot-and-reservation">
        <template v-if="step === 'slot-selection'">
            <h2>Creneaux disponibles</h2>
            <div
                class="slot"
                v-for="slot in slots"
                :key="slot.id"
                :class="{ selected: selectedSlot?.id === slot.id }"
                @click="chooseSlot(slot)"
            >
                <p>{{ slot.startTime }} - {{ slot.endTime }}</p>
                <small>{{ slot.totalCapacity }} couverts dispo</small>
            </div>
            <button class="action-button" type="button" :disabled="!selectedSlot" @click="goToReservation">
                Reserver
            </button>
        </template>

        <template v-else>
            <h2>Confirmer la reservation</h2>
            <form class="reservation-form" @submit.prevent="confirmReservation">
                <input v-model="reservationForm.name" type="text" placeholder="Nom" required />
                <input v-model="reservationForm.email" type="email" placeholder="Mail" required />
                <input v-model="reservationForm.phone" type="tel" placeholder="Telephone" required />
                <input v-model.number="reservationForm.guests" type="number" min="1" placeholder="Nombre de personne" required />

                <div class="selected-slot-preview">
                    Creneau selectionne :
                    <strong>{{ selectedSlot.startTime }} - {{ selectedSlot.endTime }}</strong>
                </div>

                <div class="actions">
                    <button class="secondary-button" type="button" @click="goBackToSlots">Retour</button>
                    <button class="action-button" type="submit">Confirmer</button>
                </div>
            </form>
        </template>
    </div>
</template>

<style scoped>
.slot-and-reservation {
    border: 1px solid #d1d5db;
    border-radius: 12px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 500px;
}

.slot {
    border: 1px solid #d1d5db;
    border-radius: 8px;
    padding: 10px;
    cursor: pointer;
}

.slot.selected {
    border-color: #111827;
    background: #f3f4f6;
}

.reservation-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

input {
    border: 1px solid #d1d5db;
    border-radius: 8px;
    padding: 10px;
}

.selected-slot-preview {
    border: 1px solid #d1d5db;
    border-radius: 8px;
    padding: 10px;
    font-size: 16px;
}

.actions {
    display: flex;
    gap: 10px;
}

.action-button,
.secondary-button {
    border: 1px solid #111827;
    border-radius: 8px;
    background: white;
    padding: 10px;
    cursor: pointer;
}

.action-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
</style>