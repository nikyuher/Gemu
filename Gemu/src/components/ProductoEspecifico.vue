<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { ProductoApi } from '@/stores/productoApi'
import { ImagenesApi } from '@/stores/imagenesApi';
import { CategoriaApi } from '@/stores/categoriasApi';
import { CarritoApi } from '@/stores/carritoApi';
import { UsuarioApi } from '@/stores/usuarioApi';
import { reseñaApi } from '@/stores/reseñaApi';
import ErrorUrlView from "@/views/ErrorUrlView.vue";
import ProductosCtegoriaPaginado from "@/components/Paginados/ProductosCtegoriaPaginado.vue";

const props = defineProps<{
    idProducto: number;
}>();

const storeProducto = ProductoApi()
const storeImagenes = ImagenesApi()
const storeReseña = reseñaApi()
const storeUsuario = UsuarioApi();
const storeCategoria = CategoriaApi()
const storeCarrito = CarritoApi()


const responseMessage = ref('');

const IdUsuario = storeUsuario.$state.usuarioId?.idUsuario
const calificacion = ref<number>(0)
const listaReseñas = ref<any[]>([])

const ID = ref<number>()
const nombreProducto = ref()
const precio = ref()
const descripcion = ref()
const estado = ref<string>('nuevo')
const cantidad = ref()

const idsCategoria = ref<number[]>([])
const imagenes = ref<string[]>([])
const mostrarEtiquetas = ref<any>()
const categoriasApi = ref<any[]>([])

onMounted(() => {
    fetchData(props.idProducto);
});

watch(() => props.idProducto, (newVal) => {
    fetchData(newVal);
});

const fetchData = async (idProducto: number) => {
    try {
        await storeCategoria.GetCategoriaSeccion('marketplace')
        await storeCategoria.GetCategoriasProducto(idProducto)
        await storeProducto.GetProducto(idProducto)
        await storeImagenes.GetImagenesProducto(idProducto)
        await storeReseña.listaReseñasProducto(props.idProducto)

        listaReseñas.value = storeReseña.listReseñasProducto.filter(r => r.solicitud === "aprobada")

        ID.value = storeProducto.producto?.idProducto
        nombreProducto.value = storeProducto.producto?.nombre
        precio.value = storeProducto.producto?.precio
        descripcion.value = storeProducto.producto?.descripcion

        calificacion.value = storeProducto.producto?.calificacionPromedio != null ? storeProducto.producto?.calificacionPromedio : 0

        if (storeProducto.producto?.estado) {
            estado.value = storeProducto.producto?.estado
        }

        cantidad.value = storeProducto.producto?.cantidad

        categoriasApi.value = storeCategoria.listaCategoriaSeccion
        mostrarEtiquetas.value = storeCategoria.listCategoriasProducto;

        idsCategoria.value = storeCategoria.listCategoriasProducto.map(categoria => categoria.categoriaId)
        imagenes.value = storeImagenes.imagenesProductos.map(d => 'data:image/png;base64,' + d.datos)

    } catch (error) {
        if (error instanceof Error) {
            console.error(error);
            responseMessage.value = error.message || 'Error al cargar datos del producto.';
        } else {
            throw new Error(String(error));
        }
    }
}

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
            responseMessage.value = 'Añadido correctamente'
            setTimeout(() => {
                responseMessage.value = '';
            }, 3000);
        } else {
            responseMessage.value = 'No estas registrado'
            setTimeout(() => {
                responseMessage.value = '';
            }, 3000);
        }

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

const showModal = ref(false);
const selectedImageIndex = ref<number>(0);

const showImage = (index: number) => {
    selectedImageIndex.value = index;
    showModal.value = true;
}

const nextImage = () => {
    if (selectedImageIndex.value !== null && selectedImageIndex.value < imagenes.value.length - 1) {
        selectedImageIndex.value += 1;
    }
}

const prevImage = () => {
    if (selectedImageIndex.value !== null && selectedImageIndex.value > 0) {
        selectedImageIndex.value -= 1;
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
                <div>
                    <div style="margin-left: 10px;" class="rating">
                        <v-icon v-for="star in 5" :key="star" class="star"
                            :class="{ 'star-seleccionada': calificacion >= star }">
                            {{ calificacion >= star ? 'mdi-star' : 'mdi-star-outline' }}
                        </v-icon>
                    </div>
                    <h2 style="margin-left: 20px;">{{ nombreProducto }}</h2>
                </div>
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
                        v-slot="{ isSelected }">
                        <v-card :color="isSelected ? 'primary' : 'grey-lighten-1'" class="ma-4"
                            @click="() => showImage(index + 1)">
                            <img :src="imagen" alt="imagen producto" style="height: 150px;">
                        </v-card>
                    </v-slide-group-item>
                </v-slide-group>
            </v-sheet>
        </div>
        <v-dialog v-model="showModal" max-width="90%">
            <v-icon @click="prevImage" class="navigation-arrow left">mdi-chevron-left</v-icon>
            <div class="image-container">
                <img :src="imagenes[selectedImageIndex]" alt="Imagen del juego">
            </div>
            <v-icon @click="nextImage" class="navigation-arrow right">mdi-chevron-right</v-icon>
        </v-dialog>
        <div class="producto-relacionado">
            <h2>Productos relacionados</h2>
            <ProductosCtegoriaPaginado :ids-categorias="idsCategoria" :validacion="true"></ProductosCtegoriaPaginado>
        </div>
        <div class="productos-Reseñas">
            <div class="cont-top-resenas">
                <h2>Reseñas</h2>
                <RouterLink
                    :to="{ name: 'resena', params: { producto: 'producto', nombre: nombreProducto, id: ID, lista: '' } }">
                    <button>Danos tu opinión</button>
                </RouterLink>
            </div>
            <div v-if="listaReseñas.length > 0">
                <div v-for="resenas of listaReseñas.slice(0, 4)" :key="resenas.idReseña">
                    <div class="diseño-reseña">
                        <v-icon style="font-size: 40px;">mdi-account-circle</v-icon>
                        <div style="margin-left: 10px;">
                            <div class="rating">
                                <v-icon v-for="star in 5" :key="star" class="star"
                                    :class="{ 'star-seleccionada': resenas.calificacion >= star }">
                                    {{ resenas.calificacion >= star ? 'mdi-star' : 'mdi-star-outline' }}
                                </v-icon>
                            </div>
                            <p>{{ resenas.nombreUsuario }}</p>
                            <p>{{ resenas.comentario }}</p>
                        </div>
                    </div>
                </div>
                <RouterLink
                    :to="{ name: 'resena', params: { producto: 'producto', nombre: nombreProducto, id: ID, lista: 'reseñas-producto' } }">
                    <button class="boton-mostrar-mas">
                        Mostrar todo
                    </button>
                </RouterLink>
            </div>
            <div v-else>
                <p style="text-align: center; margin: 80px 0 80px  0;">
                    Este producto no tiene reseñas. ¡Se el primero en comentar!
                </p>
            </div>
        </div>
        <div class="productos-descripcion">
            <h2>Descripción</h2>
            <div class="categorias">
                <div v-for="categoria of mostrarEtiquetas" :key="categoria.productoId">
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
.v-sheet {
    max-width: 80%;
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

.diseño-reseña {
    display: flex;
    align-items: center;
    text-align: justify;
    background-color: #491F6A;
    margin: 20px 0;
    padding: 10px;
}

.rating {
    display: flex;
    align-items: center;
}

.star {
    cursor: pointer;
    margin-right: 5px;
}

.star-seleccionada {
    color: #DFB23C;
}

.cont-top-resenas {
    display: flex;
    margin-top: 30px;
    align-items: center;
    justify-content: space-between;
}

button {
    border: 1px solid #B12FB4;
    padding: 5px 20px 5px 20px
}

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

.navigation-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    font-size: 48px;
    color: #FFFFFF;
    z-index: 10;
}

.navigation-arrow.left {
    left: 1px;
    color: #bf62e4;
}

.navigation-arrow.right {
    right: 1px;
    color: #bf62e4;
}

.image-container {
    width: 80%;
    height: 600px;
    margin: auto;
}

.image-container img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

@media (max-width: 1117px) {

    .cont-portada {
        display: block;
        margin: 50px auto;
        align-items: center;
    }

    .cont-info-portada {
        display: grid;
    }

    .cont-img-portada {
        margin: auto;
    }

    .v-sheet {
        max-width: 100%;
    }
}
</style>