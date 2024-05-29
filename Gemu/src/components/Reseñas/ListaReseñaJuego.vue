<script setup lang="ts">
import { ref, onMounted } from "vue";
import { JuegoApi } from '@/stores/juegoApi'
import { reseñaApi } from '@/stores/reseñaApi';
import ErrorUrlView from "@/views/ErrorUrlView.vue";

const props = defineProps<{
    idJuego: number;
}>();
const storeJuego = JuegoApi()
const storeReseña = reseñaApi()

const ID = ref<number>()
const calificacion = ref<number>(0)
const listaReseñas = ref<any[]>([])

onMounted(async () => {
    try {

        await storeReseña.listaReseñasJuego(props.idJuego)

        listaReseñas.value = storeReseña.listReseñasJuego.filter(r => r.solicitud === "aprobada")
        ID.value = storeJuego.juego?.idJuego
        calificacion.value = storeJuego.juego?.calificacionPromedio != null ? storeJuego.juego?.calificacionPromedio : 0
    } catch (error) {
        console.error(error);
    }
});

</script>

<template>
    <div v-if="!ID">
        <ErrorUrlView></ErrorUrlView>
    </div>
    <div v-else class=prodcuto>
        <div class="juegos-Reseñas">
            <div v-if="listaReseñas.length > 0">
                <div v-for="resenas of listaReseñas" :key="resenas.idReseña">
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
            </div>
            <div v-else>
                <p style="text-align: center; margin: 80px 0 80px  0;">
                    Este juego no tiene reseñas
                </p>
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
    margin: 30px auto;
    padding: 10px;
    width: 80%;
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

.prodcuto {
    min-height: 400px;
}
</style>
