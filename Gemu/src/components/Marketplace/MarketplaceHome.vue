<script setup lang="ts">
import { ref, onMounted } from "vue";
import { CategoriaApi } from '@/stores/categoriasApi';
import { ProductoApi } from '@/stores/productoApi'

const storeCategoria = CategoriaApi()
const storeProducto = ProductoApi()

const listaSecciones = ref<any[]>([])
const productos = ref<any[]>([])


onMounted(async () => {
    try {

        await storeCategoria.GetCategoriaSeccion('marketplace')
        await storeProducto.AllProducts()
        listaSecciones.value = storeCategoria.listaCategoriaSeccion
        productos.value = storeProducto.productos
    } catch (error) {
        console.log('Error en el fetchData:', error);
    }
})


</script>

<template>
    <div class="cont-Market">
        <div class="cont-tipos">
            <RouterLink :to="{ name: 'filtro', params: { opcion: 'productos', categoria: 'general', id: 0 } }"
                style="text-decoration: none;">
                <h2>Tipos de producto</h2>
            </RouterLink>
            <div v-for="seccion of listaSecciones" :key="seccion.idCategoria">
                <RouterLink
                    :to="{ name: 'filtro', params: { opcion: 'productos', categoria: seccion.nombre, id: seccion.idCategoria } }"
                    style="text-decoration: none;">
                    <p style="margin: 20px 0;">{{ seccion.nombre }}</p>
                </RouterLink>
            </div>
        </div>
        <div class="cont-productos">
            <div v-for="seccion in listaSecciones" :key="seccion.idCategoria" class="seccion-productos">
                <h3>{{ seccion.nombre }}</h3>
                <div v-if="productos.filter(p => p.productoCategorias.some(c => c.categoriaId === seccion.idCategoria)).length > 0">
                    <div style="display: flex; flex-wrap: wrap;">
                    <div v-for="producto in productos.filter(p => p.productoCategorias.some(c => c.categoriaId === seccion.idCategoria))
                        .slice(0, 4)" :key="producto.idProducto" class="producto-item">
                        <RouterLink
                            :to="{ name: 'producto', params: { producto: 'producto', id: producto.idProducto } }"
                            style="text-decoration: none;">
                            <div v-if="producto.imgsProducto.length > 0">
                                <img :src="'data:image/png;base64,' + producto.imgsProducto[0].datos"
                                    alt="Portada del producto" style="height: 250px; width: 185px;" />
                            </div>
                            <h3>{{ producto.nombre }}</h3>
                            <p>Estado: {{ producto.estado }}</p>
                            <p>desde </p>
                            <p>{{ producto.precio }} €</p>
                        </RouterLink>
                    </div>
                </div>
                <RouterLink
                    :to="{ name: 'filtro', params: { opcion: 'productos', categoria: seccion.nombre, id: seccion.idCategoria } }">
                    <button class="boton-mostrar-mas">
                        Mostrar todo
                    </button>
                </RouterLink>
                </div>
                <div v-else style="text-align: center; margin: 30px auto;">
                    <p>No hay datos disponibles</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.cont-Market {
    display: flex;
}

.cont-tipos {
    background-color: #491F6A;
    padding: 10px;
    width: 20%;
    max-height: 355px;
    margin-right: 20px;
}

.cont-productos {
    width: 80%;
    padding: 10px;
}

.cont-tipos p {
    padding: 5px;
}

.cont-tipos p:hover {
    background-color: #250f36;
}

.seccion-productos {
    margin-bottom: 40px;
}

.boton-mostrar-todo {
    background-color: #682E83;
    border: 1px solid white;
    padding: 10px 20px;
    color: white;
    cursor: pointer;
}

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

@media (max-width: 870px) {
    .cont-Market {
        display: grid;
    }

    .cont-tipos {
        background-color: #491F6A;
        padding: 10px;
        width: 100%;
    }
}
</style>