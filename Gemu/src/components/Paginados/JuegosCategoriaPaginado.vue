<script setup lang="ts">
import { onMounted, computed, watch, ref } from 'vue';
import { JuegoApi } from '@/stores/juegoApi';

const props = defineProps<{
    idsCategorias: number[];
    validacion: boolean;
    option?: string;
}>();

const juegoStore = JuegoApi();


const loading = computed(() => juegoStore.loading);
const hasMoreCategoria = computed(() => juegoStore.hasMoreCategoria);
const showProgress = ref(false);

const juegos = ref<any[]>([])

const fetchData = async (ids: number[]) => {
    try {
        await juegoStore.resetCurrentPageCategoria();
        await juegoStore.GetJuegosCategoriaPaginados(ids);
        juegos.value = juegoStore.JuegosCategoriaPaginado
    } catch (error) {
        console.error('Error en el fetchData:', error);
    }
};

const filtroPrecios = computed(() => {
    if (props.option === 'mayorMenor') {
        return juegos.value.slice().sort((a, b) => b.precioFinal - a.precioFinal);
    } else if (props.option === 'menorMayor') {
        return juegos.value.slice().sort((a, b) => a.precioFinal - b.precioFinal);
    }
    return juegos.value;
});

onMounted(() => {
    fetchData(props.idsCategorias);
});

watch(() => props.idsCategorias, (newVal) => {
    fetchData(newVal);
}, { deep: true });

const mostrarMas = async () => {
    if (!loading.value && hasMoreCategoria.value) {
        showProgress.value = true;
        await juegoStore.GetJuegosCategoriaPaginados(props.idsCategorias);
        juegos.value = juegoStore.JuegosCategoriaPaginado
        setTimeout(() => {
            showProgress.value = false;
        }, 1000);
    }
};

</script>

<template>
    <div style="display: flex; flex-wrap: wrap;">
        <div v-for="juego in filtroPrecios" :key="juego.idJuego" class="juego-item">
            <RouterLink :to="{ name: 'producto', params: { producto: 'juego', id: juego.idJuego } }"
                style="text-decoration: none;">
                <div v-if="juego.imgsJuego.length > 0">
                    <img :src="'data:image/png;base64,' + juego.imgsJuego[0].datos" alt="Portada del juego"
                        style="height: 250px; width: 185px;" />
                </div>
                <h3>{{ juego.titulo }}</h3>
                <p><b style="color: #70C778;">{{ juego.plataforma }}</b></p>
                <div v-if="juego.descuento != 0 && juego.descuento != null">
                    <p style="font-size: 14px;">desde <s>{{ juego.precio }} €</s></p>
                    <p style="font-size: 20px;">{{ juego.precioFinal != 0 ? juego.precioFinal + ' €' : 'Gratis' }}</p>
                    <p style="color: greenyellow; font-size: 14px">
                        {{ juego.descuento != 0 && juego.descuento != null ? 'Ahorra ' + juego.descuento + '%' : '' }}
                    </p>
                </div>
                <div v-else>
                    <p>{{ juego.precioFinal != 0 ? juego.precioFinal + ' €' : 'Gratis' }}</p>
                </div>
            </RouterLink>
        </div>
    </div>
    <div v-if="props.validacion">
        <RouterLink :to="{ name: 'filtro', params: { opcion: 'juegos', categoria: 'general', id: 0 } }">
            <button @click="mostrarMas" class="boton-mostrar-mas">
                Mostrar todo
            </button>
        </RouterLink>
    </div>
    <div v-else-if="showProgress" class="d-flex align-center justify-center">
        <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
    </div>
    <div v-else>
        <button @click="mostrarMas" :class="{ 'ocultar': loading || !hasMoreCategoria }" class="boton-mostrar-mas">
            Mostrar Más
        </button>
    </div>
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

.ocultar {
    display: none;
}
</style>