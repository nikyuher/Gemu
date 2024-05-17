<script setup lang="ts">
import { ref } from "vue";
import { useRoute, onBeforeRouteUpdate } from 'vue-router';

const route = useRoute();
const tipoJuego = ref(route.params.tipo);

onBeforeRouteUpdate((to) => {
    tipoJuego.value = to.params.tipo;
});
</script>

<template>
    <main>
        <h2>Juegos {{ tipoJuego }}</h2>
        <section>
            <article></article>
        </section>
    </main>
</template>

<style scoped>
main {
    min-height: 600px;
}
</style>