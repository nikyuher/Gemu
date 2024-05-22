<script setup lang="ts">
import { ref, onMounted, watchEffect } from "vue";
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import juegosCategoria from '@/components/Paginados/JuegosCategoriaPaginado.vue'

const props = defineProps<{
    idCategoria: number;
}>();

const route = useRoute();
const tipoJuego = ref(route.params.categoria);

const listaIdsCategoria = ref<number[]>([]);

const fetchData = async (idJuego: number) => {
    try {
        listaIdsCategoria.value = [idJuego];
    } catch (error) {
        console.log('Error in fetchData:', error);
    }
};

// Utilizamos watchEffect para observar cambios reactivos.
watchEffect(() => {
    fetchData(props.idCategoria);
});

onMounted(() => {
    fetchData(props.idCategoria);
});
</script>

<template>
    <div class="cont-general">
        <h2>Juego de {{ tipoJuego }}</h2>
        <div class="cont-filtro">
            <div class="opciones-filtro">
                <div class="caja">
                    <h2>Plataformas</h2>
                </div>
                <div class="caja">

                </div>
            </div>
            <div class="productos-filtrados">
                <juegosCategoria :ids-categorias="listaIdsCategoria"></juegosCategoria>
            </div>
        </div>
    </div>
</template>

<style scoped>
.cont-general {
    width: 95%;
    margin: auto;
}

.cont-filtro {
    display: flex;
}

.caja {
    background-color: #491F6A
}
</style>