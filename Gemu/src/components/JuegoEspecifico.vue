<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { JuegoApi } from '@/stores/juegoApi'
import { ImagenesApi } from '@/stores/imagenesApi';
import { CategoriaApi } from '@/stores/categoriasApi';
import { CarritoApi } from '@/stores/carritoApi';
import { UsuarioApi } from '@/stores/usuarioApi';
import { reseñaApi } from '@/stores/reseñaApi';
import ErrorUrlView from "@/views/ErrorUrlView.vue";
import Juegos from '@/components/Paginados/JuegosCategoriaPaginado.vue'

const props = defineProps<{
    idJuego: number;
}>();

const storeJuego = JuegoApi()
const storeReseña = reseñaApi()
const storeImagenes = ImagenesApi()
const storeUsuario = UsuarioApi();
const storeCategoria = CategoriaApi()
const storeCarrito = CarritoApi()


const responseMessage = ref('');

const IdUsuario = storeUsuario.$state.usuarioId?.idUsuario
const calificacion = ref<number>(0)
const listaReseñas = ref<any[]>([])

const ID = ref<number>()
const nombreJuego = ref()
const descripcion = ref()
const precio = ref<number>()
const precioFinal = ref<number>()
const descuento = ref<number>()
const plataforma = ref<string>()

const idsCategoria = ref<number[]>([])
const imagenes = ref<string[]>([])
const mostrarEtiquetas = ref<any>()
const categoriasApi = ref<any[]>([])

onMounted(() => {
    fetchData(props.idJuego);
});

watch(() => props.idJuego, (newVal) => {
    fetchData(newVal);
});

const fetchData = async (idJuego: number) => {
    try {

        await storeCategoria.GetCategoriaSeccion('juegos')
        await storeCategoria.GetCategoriasJuego(idJuego)
        await storeJuego.GetJuego(idJuego)
        await storeImagenes.GetImagenesJuego(idJuego)
        await storeReseña.listaReseñasJuego(props.idJuego)

        listaReseñas.value = storeReseña.listReseñasJuego.filter(r => r.solicitud === "aprobada")

        ID.value = storeJuego.juego?.idJuego
        nombreJuego.value = storeJuego.juego?.titulo
        precio.value = storeJuego.juego?.precio
        precioFinal.value = storeJuego.juego?.precioFinal
        descripcion.value = storeJuego.juego?.descripcion
        descuento.value = storeJuego.juego?.descuento
        plataforma.value = storeJuego.juego?.plataforma
        calificacion.value = storeJuego.juego?.calificacionPromedio != null ? storeJuego.juego?.calificacionPromedio : 0

        categoriasApi.value = storeCategoria.listaCategoriaSeccion
        mostrarEtiquetas.value = storeCategoria.listCategoriasJuego;

        idsCategoria.value = storeCategoria.listCategoriasJuego.map(categoria => categoria.categoriaId)
        imagenes.value = storeImagenes.imagenesJuegos.map(d => 'data:image/png;base64,' + d.datos)

    } catch (error) {
        if (error instanceof Error) {
            console.error(error);
            responseMessage.value = error.message || 'Error al cargar datos del juego.';
        } else {
            throw new Error(String(error));
        }
    }
}

const addJuegoCarrito = async () => {
    try {

        if (IdUsuario && ID.value) {

            const datosUser = {
                idUsuario: IdUsuario,
                token: storeUsuario.getToken(),
                idCarrito: storeUsuario.$state.usuarioId?.idCarrito
            }

            await storeCarrito.AñadirJuego(ID.value, datosUser)

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
                    <h2 style="margin-left: 20px;">{{ nombreJuego }}</h2>
                </div>
            </div>
            <div class="cont-info-compra">
                <div style="text-align: left;">
                    <h3>Titulo: {{ nombreJuego }}</h3>
                    <h3>Plataforma: {{ plataforma }}</h3>
                    <div v-if="descuento != 0 && descuento != null">
                        <h3>Precio: {{ precioFinal }} €</h3>
                        <div style="display: flex; font-size: 12px;">
                            <h3><s> {{ precio }} € </s></h3>
                            <h3 style="color: greenyellow;"> Ahorra {{ descuento }} %</h3>
                        </div>

                    </div>
                    <div v-else>
                        <h3>Precio: {{ precioFinal != 0 ? precioFinal + ' €' : 'Gratis' }} </h3>
                    </div>
                </div>
                <button class="boton-compra">Comprar ahora</button>
                <button class="boton-carrito" @click="addJuegoCarrito()">Añadir al carrito</button>
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
                            <img :src="imagen" alt="imagen juego" style="height: 150px;">
                        </v-card>
                    </v-slide-group-item>
                </v-slide-group>
            </v-sheet>
        </div>
        <div class="producto-relacionado">
            <h2>Productos relacionados</h2>
            <Juegos :validacion="true" :ids-categorias="idsCategoria"></Juegos>
        </div>
        <div class="juegos-Reseñas">
            <div class="cont-top-resenas">
                <h2>Reseñas</h2>
                <RouterLink
                    :to="{ name: 'resena', params: { producto: 'juego', nombre: nombreJuego, id: ID, lista: '' } }">
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
                    :to="{ name: 'resena', params: { producto: 'juego', nombre: nombreJuego, id: ID, lista: 'reseñas-juego' } }">
                    <button class="boton-mostrar-mas">
                        Mostrar todo
                    </button>
                </RouterLink>
            </div>
            <div v-else>
                <p style="text-align: center; margin: 80px 0 80px  0;">
                    Este juego no tiene reseñas. ¡Se el primero en comentar!
                </p>
            </div>
        </div>
        <div class="juegos-descripcion">
            <h2>Descripción</h2>
            <div class="categorias">
                <div v-for="categoria of mostrarEtiquetas" :key="categoria.idJuego">
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
</style>