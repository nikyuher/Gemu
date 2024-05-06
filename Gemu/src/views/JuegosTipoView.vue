<script setup lang="ts">
import { ref } from "vue";
import { useRoute, onBeforeRouteUpdate } from 'vue-router';

const route = useRoute(); // Hook para acceder a la información de la ruta actual
const tipoJuego = ref(route.params.tipo);

onBeforeRouteUpdate((to) => {
    // Esta función se ejecuta cuando cambia la ruta
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