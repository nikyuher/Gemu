<script setup lang="ts">
import { ref } from "vue";
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import FiltrosJuegos from '@/components/FiltrosJuegos.vue';
import FiltroProductos from '@/components/Marketplace/FiltroProductos.vue';
import ErrorUrlView from "./ErrorUrlView.vue";

const route = useRoute();
const opcion = ref(route.params.opcion);
const idCategoria = ref(route.params.id);

onBeforeRouteUpdate((to) => {
    opcion.value = to.params.opcion;
    idCategoria.value = to.params.id
});

</script>

<template>
    <main>
        <div v-if="opcion === 'juegos'">
            <FiltrosJuegos :id-categoria="Number(idCategoria)"></FiltrosJuegos>
        </div>
        <div v-else-if="opcion === 'productos'">
            <FiltroProductos :id-categoria="Number(idCategoria)"></FiltroProductos>
        </div>
        <div v-else>
            error en view
            <ErrorUrlView></ErrorUrlView>
        </div>
    </main>
</template>

<style scoped></style>