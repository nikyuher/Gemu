<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ProductoApi } from '@/stores/productoApi'
import { ImagenesApi } from '@/stores/imagenesApi';
import { CategoriaApi } from '@/stores/categoriasApi';
import { CarritoApi } from '@/stores/carritoApi';
import { UsuarioApi } from '@/stores/usuarioApi';
import ErrorUrlView from "@/views/ErrorUrlView.vue";
const props = defineProps<{
    idProducto: number;
}>();

const storeProducto = ProductoApi()
const storeImagenes = ImagenesApi()
const storeUsuario = UsuarioApi();
const storeCategoria = CategoriaApi()
const storeCarrito = CarritoApi()


const responseMessage = ref('');

const IdUsuario = storeUsuario.$state.usuarioId?.idUsuario
const ID = ref<number>()
const nombreProducto = ref()
const imagenes = ref<string[]>([])
const precio = ref()
const descripcion = ref()
const estado = ref<string>('nuevo')
const cantidad = ref()
const mostrarEtiquetas = ref<any>()
const categoriasApi = ref<any[]>([])

onMounted(async () => {
    try {
        await storeCategoria.GetCategoriaSeccion('marketplace')
        await storeCategoria.GetCategoriasProducto(props.idProducto)
        await storeProducto.GetProducto(props.idProducto)
        await storeImagenes.GetImagenesProducto(props.idProducto)

        ID.value = storeProducto.producto?.idProducto
        nombreProducto.value = storeProducto.producto?.nombre
        precio.value = storeProducto.producto?.precio
        descripcion.value = storeProducto.producto?.descripcion

        if (storeProducto.producto?.estado) {
            estado.value = storeProducto.producto?.estado
        }

        cantidad.value = storeProducto.producto?.cantidad
        categoriasApi.value = storeCategoria.listaCategoriaSeccion

        mostrarEtiquetas.value = storeCategoria.listCategoriasProducto;

        imagenes.value = storeImagenes.imagenesProductos.map(d => 'data:image/png;base64,' + d.datos)

    } catch (error) {
        if (error instanceof Error) {
            console.error(error);
            responseMessage.value = error.message || 'Error al cargar datos del producto.';
        } else {
            throw new Error(String(error));
        }
    }
})

const addProductoCarrito = async () => {
    try {

        if (IdUsuario && ID.value) {

            await storeCarrito.AñadirProducto(IdUsuario, ID.value)
        }

        responseMessage.value = 'Añadido correctamente'
        setTimeout(() => {
            responseMessage.value = '';
        }, 3000);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error);
            responseMessage.value = error.message || 'Error al actualizar el producto.';
            setTimeout(() => {
                responseMessage.value = '';
            }, 3000);
        } else {
            throw new Error(String(error));
        }

    }
}

</script>

<template>
    <div v-if="!ID">
        <ErrorUrlView></ErrorUrlView>
    </div>
    <div v-else class=prodcuto>
        <div class="cont-portada">
            <div class="cont-info-portada">
                <div class="cont-img-portada">
                    <img :src="imagenes[0]" alt="">
                </div>
                <p>nombre: {{ nombreProducto }}</p>
            </div>
            <div class="cont-info-compra">
                <div style="text-align: left;">
                    <h3>Titulo: {{ nombreProducto }}</h3>
                    <h3>Estado: {{ estado }}</h3>
                    <h3>Precio: {{ precio }} €</h3>
                </div>
                <button class="boton-compra">Comprar ahora</button>
                <button class="boton-carrito" @click="addProductoCarrito()">Añadir al carrito</button>
                <v-alert v-if="responseMessage" :value="true"
                    :type="responseMessage.includes('correctamente') ? 'success' : 'error'">
                    {{ responseMessage }}
                </v-alert>
            </div>
        </div>
        <div class="cont-img-muestra">
            <div v-for="(imagen, index) in imagenes.slice(1)" :key="index">
                <img :src="imagen" alt="" style="width: 100px;">
            </div>
        </div>
        <div class="producto-relacionado">
            <h2>Productos relacionados</h2>
        </div>
    </div>
</template>
<style scoped>
/* Contenedor global */
.prodcuto {
    width: 90%;
    margin: auto;
}

/* Contenedor portada */
.cont-portada {
    display: flex;
    justify-content: space-between;
}

/* Img y nombre */
.cont-info-portada {
    display: flex;
}

.cont-img-portada {
    width: 300px;
}

.cont-img-portada img {
    width: 100%
}

/* Diseño compra */
.cont-info-compra {
    background-color: #491F6A;
    padding: 20px;
    min-width: 200px;
    align-items: center;
    text-align: center;
}

.boton-carrito {
    margin: auto;
    border: 2px solid #FFFFFF;
    width: 100%;
}

.boton-compra {
    background-color: #F8C032;
    color: #000000;
    width: 100%;
    margin: 20px 0;
}

.boton-compra:hover {
    background-color: #9e7323;
    color: #FFFFFF;
}

.boton-carrito:hover {
    background-color: #2c123f;
}

/* Img Muestra */
.cont-img-muestra {
    display: flex;
}
</style>