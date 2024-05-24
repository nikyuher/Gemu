<script setup lang="ts">
import { ref, onMounted, watchEffect } from "vue";
import { useRoute } from 'vue-router';
import { CategoriaApi } from '@/stores/categoriasApi';
import ProductoCategoria from '@/components/Paginados/ProductosCtegoriaPaginado.vue'

const props = defineProps<{
    idCategoria: number;
}>();

const storeCategoria = CategoriaApi()
const route = useRoute();
const tipoJuego = ref(route.params.categoria);

const listaCategorias = ref<any[]>([])
const listaPlataforma = ref<any[]>([])
const listaIdsCategoria = ref<number[]>([]);
const listaEstados = ['nuevo', 'casiNuevo', 'buenEstado', 'usado']

const estadosSeleccionados = ref<string[]>([]);

const fetchData = async (idJuego: number) => {
    try {
        if (idJuego === 0) {
            listaIdsCategoria.value = []
        } else {
            listaIdsCategoria.value = [idJuego]
        };
        await storeCategoria.GetCategoriaSeccion('marketplace')
        await storeCategoria.GetCategoriaSeccion('plataforma')
        listaCategorias.value = storeCategoria.listaCategoriaSeccion
        listaPlataforma.value = storeCategoria.listaCategoriaPlataforma
    } catch (error) {
        console.log('Error en el fetchData:', error);
    }
};

const CheckCategoria = (idCategoria: number) => {
    if (listaIdsCategoria.value.includes(idCategoria)) {
        listaIdsCategoria.value = listaIdsCategoria.value.filter(id => id !== idCategoria);
    } else {
        listaIdsCategoria.value.push(idCategoria);
    }
};


const CheckEstado = (estado: string) => {
    if (estadosSeleccionados.value.includes(estado)) {
        estadosSeleccionados.value = estadosSeleccionados.value.filter(e => e !== estado);
    } else {
        estadosSeleccionados.value.push(estado);
    }
};

onMounted(() => {
    fetchData(props.idCategoria);
});

watchEffect(() => {
    fetchData(props.idCategoria);
});


</script>

<template>
    <div class="cont-general">
        <h2>Juego de {{ tipoJuego }}</h2>
        <div class="cont-filtro">
            <div class="opciones-filtro">
                <div class="cajas">
                    <h3>Plataformas</h3>
                    <div v-for="categoria of listaPlataforma" :key="categoria.idCategoria">
                        <div style="display: flex;">
                            <input type="checkbox" :value="categoria.idCategoria" :name="categoria.nombre"
                                :checked="listaIdsCategoria.includes(categoria.idCategoria)"
                                @change="CheckCategoria(categoria.idCategoria)">
                            <label>{{ categoria.nombre }}</label>
                        </div>
                    </div>
                </div>
                <div class="cajas">
                    <h3>Categorias</h3>
                    <div v-for="categoria of listaCategorias" :key="categoria.idCategoria">
                        <div style="display: flex;">
                            <input type="checkbox" :value="categoria.idCategoria" :name="categoria.nombre"
                                :checked="listaIdsCategoria.includes(categoria.idCategoria)"
                                @change="CheckCategoria(categoria.idCategoria)">
                            <label>{{ categoria.nombre }}</label>
                        </div>
                    </div>
                </div>
                <div class="cajas">
                    <h3>Estados</h3>
                    <div v-for="(estado, index) in listaEstados" :key="index">
                        <div style="display: flex;">
                            <input type="checkbox" :value="estado" :name="estado"
                                :checked="estadosSeleccionados.includes(estado)" @change="CheckEstado(estado)">
                            <label>{{ estado }}</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="productos-filtrados">
                <ProductoCategoria :ids-categorias="[...listaIdsCategoria]" :estados="[...estadosSeleccionados]">
                </ProductoCategoria>
            </div>
        </div>
    </div>
</template>

<style scoped>
.cont-general {
    width: 95%;
    margin: 50px auto;
}

.cont-filtro {
    display: flex;
    margin-top: 40px;
}

.opciones-filtro {
    margin-right: 30px;
}

.cajas {
    background-color: #491F6A;
    margin: 10px 0;
    padding: 30px;
    min-width: 180px;
}

.productos-filtrados {
    width: 100%;
    margin: 10px 0;
}
</style>