<script setup lang="ts">
import { onMounted, computed, watch } from 'vue';
import { JuegoApi } from '@/stores/juegoApi';

const props = defineProps<{
    idsCategorias: number[];
}>();

const juegoStore = JuegoApi();

const { hasMoreCategoria, loading } = juegoStore;

const juegos = computed(() => juegoStore.JuegosCategoriaPaginado);
const lista = props.idsCategorias

onMounted(() => {
    fetchData(props.idsCategorias);
});

watch(() => props.idsCategorias, (newVal) => {
    fetchData(newVal);
});

const fetchData = async (lista: number[]) => {
    await juegoStore.resetCurrentPageGratis();
    await juegoStore.GetJuegosCategoriaPaginados(lista);
};

const mostrarMas = async () => {
    if (!loading && hasMoreCategoria) {
        await juegoStore.GetJuegosCategoriaPaginados(lista);
    }
};


</script>

<template>
    <div style="display: flex; flex-wrap: wrap;">
        <div v-for="juego in juegos" :key="juego.idJuego" class="juego-item">
            <RouterLink :to="{ name: 'producto', params: { producto: 'juego', id: juego.idJuego } }"
                style="text-decoration: none;">
                <div v-if="juego.imgsJuego.length > 0">
                    <img :src="'data:image/png;base64,' + juego.imgsJuego[0].datos" alt="Portada del juego"
                        style="height: 250px; width: 185px;" />
                </div>
                <h3>{{ juego.titulo }}</h3>
                <p>{{ juego.plataforma }}</p>
                <p>desde</p>
                <p>{{ juego.precio }} €</p>
            </RouterLink>
        </div>
    </div>
    <button @click="mostrarMas" :disabled="loading || !hasMoreCategoria" class="boton-mostrar-mas">
        {{ loading ? 'Cargando...' : 'Mostrar Más' }}
    </button>
</template>

<style scoped>
.juego-item {
    border: 1px solid #D550F6;
    background-color: #491F6A;
    color: white;
    padding: 20px;
    margin-right: 20px;
    margin-bottom: 20px;
    max-width: 400px;
}

.juego-item:hover {
    background-color: #301347;
}

.boton-mostrar-mas {
    display: flex;
    margin: auto;
    text-align: center;
    align-items: center;
    background-color: #682E83;
    border: 1px solid white;
    padding: 10px 20px 10px 20px;
}
</style>