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
const precio = ref()
const descripcion = ref()
const estado = ref<string>('nuevo')
const cantidad = ref()

const imagenes = ref<string[]>([])
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

            const datosUser = {
                idUsuario: IdUsuario,
                token: storeUsuario.getToken(),
                idCarrito: storeUsuario.$state.usuarioId?.idCarrito
            }


            await storeCarrito.AñadirProducto(ID.value, datosUser)

            const cantidad = storeCarrito.getCatidadCarrito() + 1;
            const sumaPrecio = precio.value ? precio.value : 0

            const total = storeCarrito.getTotalPrecio() + sumaPrecio;
            await storeCarrito.setCatidadCarrito(cantidad)
            await storeCarrito.setTotalPrecio(total)
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
                <h2 style="margin-left: 20px;">{{ nombreProducto }}</h2>
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
            <v-sheet elevation="8" max-width="800" style="background-color: transparent; box-shadow: none !important ;">
                <v-slide-group class="pa-4" center-active show-arrows>
                    <v-slide-group-item v-for="(imagen, index) in imagenes.slice(1)" :key="index"
                        v-slot="{ isSelected, toggle }">
                        <v-card :color="isSelected ? 'primary' : 'grey-lighten-1'" class="ma-4" @click="toggle">
                            <img :src="imagen" alt="imagen producto" style="height: 150px;">
                        </v-card>
                    </v-slide-group-item>
                </v-slide-group>
            </v-sheet>
        </div>
        <div class="producto-relacionado">
            <h2>Productos relacionados</h2>
        </div>
        <div class="productos-Reseñas">
            <h2>Reseñas</h2>
        </div>
        <div class="productos-descripcion">
            <h2>Descripción</h2>
            <div class="categorias">
                <div v-for="categoria of mostrarEtiquetas" :key="categoria.idProducto">
                    <p>{{ categoria.categoria.nombre }}</p>
                </div>
            </div>
            <div class="contenido-desc">
                <p>{{ descripcion }}</p>
            </div>
        </div>
    </div>
</template>
<style scoped>
.contenido-desc {
    background-color: #491F6A;
    padding: 20px;
    min-height: 200px;
    margin-bottom: 20px;
}

.categorias {
    display: flex;
}

.categorias p {
    background-color: #491F6A;
    border: 1px solid white;
    padding: 5px;
    min-width: 80px;
    text-align: center;
    margin: 10px 10px 20px 0;
}

/* Contenedor global */
.prodcuto {
    width: 90%;
    margin: auto;
}

/* Contenedor portada */
.cont-portada {
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
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