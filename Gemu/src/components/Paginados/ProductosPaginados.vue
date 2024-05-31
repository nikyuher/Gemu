<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { ProductoApi } from '@/stores/productoApi';

const props = defineProps<{
    validacion?: boolean;
}>();


const storeProducto = ProductoApi();

const loading = computed(() => storeProducto.loading);
const hasMorePaginados = computed(() => storeProducto.hasMorePaginados);
const showProgress = ref(false);

const productos = computed(() => storeProducto.productosPaginados);

onMounted(async () => {
    storeProducto.resetCurrentPagePaginados()
    await storeProducto.GetProductosPaginados();
});

const mostrarMas = async () => {
    if (!loading.value && hasMorePaginados.value) {
        showProgress.value = true;
        await storeProducto.GetProductosPaginados();
        setTimeout(() => {
            showProgress.value = false;
        }, 1000);
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
    <div v-if="props.validacion">
        <RouterLink to="/marketplace">
            <button class="boton-mostrar-mas">
                Mostrar todo
            </button>
        </RouterLink>
    </div>
    <div v-else-if="showProgress" class="d-flex align-center justify-center">
        <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
    </div>
    <div v-else>
        <button @click="mostrarMas" :class="{ 'ocultar': loading || !hasMorePaginados }" class="boton-mostrar-mas">
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
    margin: 40px auto;
    max-width: 400px;
}

.producto-item:hover {
    background-color: #301347;
}

.boton-mostrar-mas {
    display: flex;
    margin: 20pxs auto;
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