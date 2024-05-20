<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { JuegoApi } from '@/stores/juegoApi';

const juegoStore = JuegoApi();
const { GetJuegosPaginados, hasMore, loading } = juegoStore;
const juegos = computed(() => juegoStore.juegos);
onMounted(async () => {
    await GetJuegosPaginados();
});

const mostrarMas = async () => {
    if (!loading && hasMore) {
        await GetJuegosPaginados();
    }
};


const mostrarId = async (number: number) => {
    console.log(number);

}
</script>

<template>
    <div>
        <h1>Juegos</h1>
        <div v-for="juego in juegos" :key="juego.idJuego" class="juego-item">
            <h3>{{ juego.titulo }}</h3>
            <p>{{ juego.descripcion }}</p>
            <div v-if="juego.imgsJuego.length > 0">
                <img :src="'data:image/png;base64,' + juego.imgsJuego[0].datos" alt="Portada del juego"
                    style="height: 200px;" />
            </div>
            <div v-if="juego.juegoCategorias.length">
                Categorías:
                <span v-for="categoria in juego.juegoCategorias" :key="categoria.categoria.idCategoria">
                    {{ categoria.categoria.nombre }}
                </span>
            </div>
            <button @click="mostrarId(juego.idJuego)">MostrarId</button>
        </div>
        <button @click="mostrarMas" :disabled="loading || !hasMore">
            {{ loading ? 'Cargando...' : 'Mostrar Más' }}
        </button>
    </div>
</template>

<style scoped>
.juego-item {
    /* Estilos para cada item de juego */
}
</style>