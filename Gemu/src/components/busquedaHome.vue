<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { buscadorApi } from "@/stores/buscadorApi";

const props = defineProps<{
    busqueda: string;
}>();

const storeBusqueda = buscadorApi()

const listaBusqueda = ref<any[]>([])

const search = async (nombre: string) => {

    try {
        if (nombre != '') {
            await storeBusqueda.busqueda(nombre)
            listaBusqueda.value = storeBusqueda.listaBusqueda
        } else {
            storeBusqueda.listaBusqueda = []
            listaBusqueda.value = []
        }
    } catch (error) {
        console.log(error);

    }
}

const clickProducto = async () => {
    listaBusqueda.value = []
}

onMounted(() => {
    search(props.busqueda);
});

watch(() => props.busqueda, (newVal) => {
    search(newVal);
}, { deep: true });
</script>

<template>
    <div v-if="listaBusqueda != null" class="cont-datos-obtenidos">
        <div v-for="juegos of listaBusqueda" :key="juegos.idJuego" style="height: 600px;
    overflow-y: auto;">
            <div v-for="(juego, index) in juegos.juegos.slice(0, 4)" :key='index'>
                <RouterLink @click="clickProducto()"
                    :to="{ name: 'producto', params: { producto: 'juego', id: juego.idJuego } }">
                    <div class="datos">
                        <img :src="'data:image/png;base64,' + juego.imgsJuego[0].datos" alt="portada"
                            style="width: 100px;">
                        <div>
                            <p class="titulo-truncado">{{ juego.titulo }}</p>
                            <p>{{ juego.plataforma }}</p>
                        </div>
                        <p style="color: greenyellow; font-size: 16px">
                            {{ juego.descuento != 0 && juego.descuento != null ? juego.descuento + '%' :
                                ''
                            }}
                        </p>
                        <p>{{ juego.precioFinal != 0 ? juego.precioFinal + '€' : 'Gratis' }}</p>
                    </div>
                </RouterLink>
            </div>
            <div v-for="(producto, index) in juegos.productos.slice(0, 4)" :key='index'>
                <RouterLink @click="clickProducto()"
                    :to="{ name: 'producto', params: { producto: 'producto', id: producto.idProducto } }">
                    <div class="datos">
                        <img :src="'data:image/png;base64,' + producto.imgsProducto[0].datos" alt="portada"
                            style="width: 100px;">
                        <div>
                            <p class="titulo-truncado">{{ producto.nombre }}</p>
                            <p>{{ producto.estado }}</p>
                        </div>
                        <p>{{ producto.precio != 0 ? producto.precio + '€' : 'Gratis' }}</p>
                    </div>
                </RouterLink>
            </div>
        </div>
    </div>
</template>
<style scoped>
.cont-datos-obtenidos {
    position: absolute;
    top: 100px;
    left: 0;
    right: 0;
    background-color: rgba(35, 13, 39, 0.466);
    z-index: 9999;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    padding: 10px;
}

.datos {
    background-color: rgb(119, 64, 170);
    width: 400px;
    text-align: center;
    align-items: center;
    margin: auto;
    display: flex;
    padding: 20px;
    justify-content: space-around;
}

.titulo-truncado {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 150px;
}
</style>