<script setup>
defineEmits(['click']);
</script>

<template>
    <button type="button" @click="$emit('click')">Annuler la reservation</button>
</template>

<style scoped>
button {
    background-color: #075ea0;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
}
</style>