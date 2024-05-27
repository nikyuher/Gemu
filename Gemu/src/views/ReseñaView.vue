<script setup lang="ts">
import { ref } from "vue";
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import ErrorUrlView from "./ErrorUrlView.vue";
import JuegoReseña from "@/components/Reseñas/JuegoReseña.vue";
import ProductoReseña from "@/components/Reseñas/ProductoReseña.vue";

const route = useRoute();
const tipoProducto = ref(route.params.producto);
const idProducto = ref(route.params.id);

onBeforeRouteUpdate((to) => {
    tipoProducto.value = to.params.producto;
    idProducto.value = to.params.id
});
</script>
<template>
    <main>
        <div v-if="tipoProducto === 'juego'">
            <JuegoReseña :id-juego="Number(idProducto)"></JuegoReseña>
        </div>
        <div v-else-if="tipoProducto === 'producto'">
            <ProductoReseña :id-producto="Number(idProducto)"></ProductoReseña>
        </div>
        <div v-else>
            <ErrorUrlView></ErrorUrlView>
        </div>
    </main>
</template>
<style scoped></style>