<script setup lang="ts">
import { ref } from "vue";
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import ErrorUrlView from "./ErrorUrlView.vue";
import JuegoReseña from "@/components/Reseñas/JuegoReseña.vue";
import ListaReseñaJuego from "@/components/Reseñas/ListaReseñaJuego.vue";
import ProductoReseña from "@/components/Reseñas/ProductoReseña.vue";
import ListaReseñaProducto from "@/components/Reseñas/ListaReseñaProducto.vue";

const route = useRoute();
const tipoProducto = ref(route.params.producto);
const idProducto = ref(route.params.id);
const NameLista = ref(route.params.lista)

onBeforeRouteUpdate((to) => {
    tipoProducto.value = to.params.producto;
    idProducto.value = to.params.id;
    NameLista.value = to.params.lista;
});
</script>
<template>
    <main>
        <div v-if="tipoProducto === 'juego' && NameLista === ''">
            <JuegoReseña :id-juego="Number(idProducto)"></JuegoReseña>
        </div>
        <div v-else-if="NameLista === 'reseñas-juego'">
            <ListaReseñaJuego :id-producto="Number(idProducto)"></ListaReseñaJuego>
        </div>
        <div v-else-if="tipoProducto === 'producto' && NameLista === ''">
            <ProductoReseña :id-producto="Number(idProducto)"></ProductoReseña>
        </div>
        <div v-else-if="NameLista === 'reseñas-producto'">
            <ListaReseñaProducto :id-producto="Number(idProducto)"></ListaReseñaProducto>
        </div>
        <div v-else>
            <ErrorUrlView></ErrorUrlView>
        </div>
    </main>
</template>
<style scoped></style>