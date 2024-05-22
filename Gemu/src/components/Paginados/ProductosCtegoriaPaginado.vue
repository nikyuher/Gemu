<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { ProductoApi } from '@/stores/productoApi';

const props = defineProps<{
    idsCategorias: number[];
}>();

const storeProducto = ProductoApi();

const { hasMoreCategoria, loading } = storeProducto;

const productos = computed(() => storeProducto.productosCategoriaPaginados);
const lista = props.idsCategorias
onMounted(async () => {
    storeProducto.resetCurrentPageCategoria()
    await storeProducto.GetProductoCategoriaPaginados(lista);
});

const mostrarMas = async () => {
    if (!loading && hasMoreCategoria) {
        await storeProducto.GetProductoCategoriaPaginados(lista);
    }
};

</script>

<template>
    <div style="display: flex; flex-wrap: wrap;">
        <div v-for="producto in productos" :key="producto.idProducto" class="producto-item">
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
    <button @click="mostrarMas" :disabled="loading || !hasMoreCategoria" class="boton-mostrar-mas">
        {{ loading ? 'Cargando...' : 'Mostrar Más' }}
    </button>
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
</style>