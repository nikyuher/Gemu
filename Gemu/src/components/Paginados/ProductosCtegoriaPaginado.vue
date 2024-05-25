<script setup lang="ts">
import { onMounted, computed, ref, watch, watchEffect } from 'vue';
import { ProductoApi } from '@/stores/productoApi';

const props = defineProps<{
    idsCategorias: number[];
    estados?: string[];
    validacion?: boolean;
    ordenPrecio?: string;
}>();

const storeProducto = ProductoApi();

const loading = computed(() => storeProducto.loading);
const hasMoreCategoria = computed(() => storeProducto.hasMoreCategoria);
const showProgress = ref(false);

const productos = ref<any[]>([])
const productosFiltrados = ref<any[]>([]);

const fetchData = async (ids: number[]) => {
    try {

        await storeProducto.resetCurrentPageCategoria()
        await storeProducto.GetProductoCategoriaPaginados(ids);
        productos.value = storeProducto.productosCategoriaPaginados
        filtrarProductos();
    } catch (error) {
        console.error('Error en el fetchData:', error);
    }
};

const filtrarProductos = () => {
    let nreProducto = productos.value;

    if (props.estados && props.estados.length > 0) {
        nreProducto = nreProducto.filter(producto =>
            props.estados?.includes(producto.estado)
        );
    }

    if (props.ordenPrecio) {
        if (props.ordenPrecio === 'mayor') {
            nreProducto = nreProducto.sort((a, b) => b.precio - a.precio);
        } else if (props.ordenPrecio === 'menor') {
            nreProducto = nreProducto.sort((a, b) => a.precio - b.precio);
        }
    }

    productosFiltrados.value = nreProducto;
};
watchEffect(() => {
    fetchData(props.idsCategorias);
});

watchEffect(() => {
    filtrarProductos();
});

const mostrarMas = async () => {
    if (!loading.value && hasMoreCategoria.value) {
        showProgress.value = true;
        await storeProducto.GetProductoCategoriaPaginados(props.idsCategorias);
        productos.value = storeProducto.productosCategoriaPaginados
        filtrarProductos();
        setTimeout(() => {
            showProgress.value = false;
        }, 1000);
    }
};

</script>

<template>
    <div style="display: flex; flex-wrap: wrap;">
        <div v-for="producto in productosFiltrados" :key="producto.idProducto" class="producto-item">
            <RouterLink :to="{ name: 'producto', params: { producto: 'producto', id: producto.idProducto } }"
                style="text-decoration: none;">
                <div v-if="producto.imgsProducto.length > 0">
                    <img :src="'data:image/png;base64,' + producto.imgsProducto[0].datos" alt="Portada del producto"
                        style="height: 250px; width: 185px;" />
                </div>
                <h3>{{ producto.nombre }}</h3>
                <p>Estado: {{ producto.estado }}</p>
                <p>desde </p>
                <p>{{ producto.precio }} €</p>
            </RouterLink>
        </div>
    </div>
    <div v-if="props.validacion">
        <RouterLink to="/marketplace">
            <button @click="mostrarMas" class="boton-mostrar-mas">
                Mostrar todo
            </button>
        </RouterLink>
    </div>
    <div v-else-if="showProgress" class="d-flex align-center justify-center ">
        <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
    </div>
    <div v-else>
        <button @click="mostrarMas" :class="{ 'ocultar': loading || !hasMoreCategoria }" class="boton-mostrar-mas">
            Mostrar Más
        </button>
    </div>
</template>

<style scoped>
.producto-item {
    border: 1px solid #D550F6;
    background-color: #491F6A;
    color: white;
    padding: 20px;
    margin-right: 20px;
    margin-bottom: 20px;
    max-width: 400px;
}

.producto-item:hover {
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