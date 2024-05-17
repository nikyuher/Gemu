<script setup lang="ts">
import { ref } from "vue";
import ErrorUrlView from "@/views/ErrorUrlView.vue";

const props = defineProps<{
    idJuego: number;
}>();

</script>

<template>
    <div v-if="Number.isNaN(props.idJuego)">
        <ErrorUrlView></ErrorUrlView>
    </div>
    <div v-else>
        <div>Juego {{ props.idJuego }}</div>
    </div>
</template>