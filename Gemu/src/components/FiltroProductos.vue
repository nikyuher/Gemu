<script setup lang="ts">
import { ref } from "vue";
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import juegosCategoria from '@/components/Paginados/JuegosCategoriaPaginado.vue'

const route = useRoute();
const tipoJuego = ref(route.params.categoria);

onBeforeRouteUpdate((to) => {
    tipoJuego.value = to.params.categoria;
});

</script>

<template>
    <div>
        <h2>Juego de {{ tipoJuego }}</h2>
        <div class="cont-filtro">
            <div class="opciones-filtro">

            </div>
            <div class="productos-filtrados">
                <!-- <juegosCategoria></juegosCategoria> -->
            </div>
        </div>
    </div>
</template>

<style scoped></style>