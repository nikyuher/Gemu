<script setup lang="ts">
import { ref } from "vue";
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import JuegoEspecifico from "@/components/JuegoEspecifico.vue";
import ProductoEspecifico from "@/components/ProductoEspecifico.vue";
import ErrorUrlView from "./ErrorUrlView.vue";
const route = useRoute();

const tipoJuego = ref(route.params.producto);
const idProducto = ref(route.params.id);

onBeforeRouteUpdate((to) => {
    tipoJuego.value = to.params.producto;
    idProducto.value = to.params.id;
});

</script>

<template>
    <div v-if="tipoJuego === 'juego'">
        <JuegoEspecifico :id-juego="Number(idProducto)"></JuegoEspecifico>
    </div>
    <div v-else-if="tipoJuego === 'producto'">
        <ProductoEspecifico :id-producto="Number(idProducto)"></ProductoEspecifico>
    </div>
    <div v-else>
        <ErrorUrlView></ErrorUrlView>
    </div>
</template>