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
const tipoProducto = ref(route.params.categoria);

const listaCategorias = ref<any[]>([])
const listaPlataforma = ref<any[]>([])
const listaIdsCategoria = ref<number[]>([]);
const listaEstados = ['nuevo', 'casiNuevo', 'buenEstado', 'usado']

const estadosSeleccionados = ref<string[]>([]);
const selectedOption = ref('normal');

const dialogVisible = ref(false);

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
        <h2>{{ tipoProducto === 'general' ? 'Productos Generales' : 'Productos de ' + tipoProducto }}</h2>
        <v-btn class="btn-ordenar-filtrar" @click="dialogVisible = true" color="#491F6A">
            <v-icon>mdi-tune</v-icon>
            Ordenar y filtrar
        </v-btn>
        <v-dialog v-model="dialogVisible" persistent max-width="300" transition="dialog-top-transition">
            <v-card color="#301347">
                <v-card-title>
                    <v-icon>mdi-tune</v-icon>
                    <span class="headline">Filtros</span>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="dialogVisible = false" color="#491F6A">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
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
                </v-card-text>
            </v-card>
        </v-dialog>
        <div class="cont-filtro">
            <div class="opciones-filtro filtro-desktop">
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
                <div class="diseño-select">
                    <v-icon>mdi-tune</v-icon>
                    <select v-model="selectedOption">
                        <option value="normal">Normal</option>
                        <option value="mayor">Mayor a menor precio</option>
                        <option value="menor">Menor a mayor precio</option>
                    </select>
                </div>
                <ProductoCategoria :ids-categorias="[...listaIdsCategoria]" :estados="[...estadosSeleccionados]"
                    :orden-precio="selectedOption">
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

.diseño-select {
    text-align: right;
}

.diseño-select option {
    background-color: #491F6A;

}

.btn-ordenar-filtrar {
    display: none;
}

@media (max-width: 870px) {
    .btn-ordenar-filtrar {
        display: block;
        margin-bottom: 20px;
    }

    .filtro-desktop {
        display: none;
    }
}
</style>