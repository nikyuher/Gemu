<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { UsuarioApi } from '@/stores/usuarioApi';
import { reseñaApi } from '@/stores/reseñaApi';

const storeUsuario = UsuarioApi();
const storeResena = reseñaApi();

const token = storeUsuario.getToken()

const idAdmin = storeUsuario.$state.usuarioId?.idUsuario
const listaPeticiones = computed(() => storeResena.listaPeticionesPendiente);
const responseMessage = ref('');
const terminosBusqueda = ref('');

onMounted(async () => {
    try {
        if (idAdmin && token) {
            await storeResena.listaPeticiones(token);
        } else {
            console.error('IdUsuario no definido');
        }
    } catch (error) {
        console.log(error)
    }
})


const EliminarResena = async (idReseña: number) => {

    if (idReseña && idAdmin && token) {
        try {
            await storeResena.EliminarResena(idReseña, idAdmin, token);

            const index = listaPeticiones.value.findIndex(resena => resena.idReseña === idReseña);
            if (index !== -1) {
                listaPeticiones.value.splice(index, 1);
            }
        } catch (error) {
            console.error('Error al eliminar la reseña:', error);
        }
    }
}

const aprobarResena = async (idReseña: number) => {

    try {
        if (idReseña && idAdmin && token) {

            const resenaAprovada = {
                idReseña: idReseña,
                solicitud: 'aprobada'
            }
            await storeResena.updateEstadoResena(resenaAprovada, token);

            const index = listaPeticiones.value.findIndex(resena => resena.idReseña === idReseña);
            if (index !== -1) {
                listaPeticiones.value.splice(index, 1);
            }

            responseMessage.value = 'Actualizado exitosamente';
            setTimeout(() => {
                responseMessage.value = '';
            }, 3000);
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error(error);
            responseMessage.value = error.message || 'Error al actualizar el rol.';
            setTimeout(() => {
                responseMessage.value = '';
            }, 3000);
        } else {
            throw new Error(String(error));
        }
    }
}

const reseñasFiltradas = computed(() => {
    if (!terminosBusqueda.value) {
        return listaPeticiones.value;
    } else {
        const filtro = terminosBusqueda.value.toLowerCase();
        return listaPeticiones.value.filter(resena => {
            return resena.nombreUsuario.toLowerCase().includes(filtro);
        });
    }
});

const formatoFecha = (fecha: string) => {
    const date = new Date(fecha);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${month}/${day}/${year}`;
}

</script>

<template>
    <div class="cont-Info">
        <h2>Lista Usuarios</h2>
        <div class="bloque">
            <div class="cajas">
                <div class="search">
                    <input type="search" v-model="terminosBusqueda" placeholder="Buscar por nombre">
                </div>
            </div>
        </div>
        <div class="bloque">
            <div class="cajas2">
                <div class="anotaciones top-tabla">
                    <h3>Reseña</h3>
                    <h3>Fecha</h3>
                </div>
                <v-alert v-if="responseMessage" :value="true"
                    :type="responseMessage.includes('exitosamente') ? 'success' : 'error'">
                    {{ responseMessage }}
                </v-alert>
                <div v-if="reseñasFiltradas.length > 0" style="padding-bottom: 30px;">
                    <div v-for="resena of reseñasFiltradas" :key="resena.idReseña" class="anotaciones">
                        <div class="diseño-reseña">
                            <v-icon style="font-size: 40px;">mdi-account-circle</v-icon>
                            <div style="margin-left: 10px;">
                                <div class="rating">
                                    <v-icon v-for="star in 5" :key="star" class="star"
                                        :class="{ 'star-seleccionada': resena.calificacion >= star }">
                                        {{ resena.calificacion >= star ? 'mdi-star' : 'mdi-star-outline' }}
                                    </v-icon>
                                </div>
                                <p style="padding: 0;"><b style="color: black;">{{ resena.nombreUsuario }}</b></p>
                                <p style="padding: 0;">{{ resena.comentario }}</p>
                            </div>
                        </div>
                        <p>{{ formatoFecha(resena.fecha) }}</p>
                        <div>
                            <v-btn @click="aprobarResena(resena.idReseña)" rounded color="green"
                                style=" margin: auto; margin-right: 20px;">
                                <v-icon size="25">mdi-check-bold</v-icon>
                            </v-btn>
                            <v-btn @click="EliminarResena(resena.idReseña)" rounded color="red" style=" margin: auto;">
                                <v-icon size="25">mdi-delete</v-icon>
                            </v-btn>
                        </div>

                    </div>
                </div>
                <div v-else>
                    <p style="text-align: center; margin-top: 60px;">No hay datos disponibles</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.diseño-reseña {
    display: flex;
    align-items: center;
    text-align: justify;
    background-color: #dadada;
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

.cont-put-rol {
    background-color: #FFFFFF;
    display: grid;
    min-width: 300px;
    min-height: 300px;
    align-items: center;
}

.cont-put-rol h3 {

    color: #682E83;
    font-size: 23px;
}

select,
option {

    text-align: center;
    color: black;
}


.update-producto-container {
    max-height: 600px;
    overflow-y: auto;
    overflow-x: hidden;
}

.update-producto-container::-webkit-scrollbar {
    display: none;
}

/* Search */
.search {
    border: 2px solid #714FAA;
    height: 40px;
    width: 300px;
    align-items: center;
    text-align: center;
}

.search input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    outline: none;
    width: 90%;
    height: 40px;
    color: black;

}

/* Boton key juego */
.caja-key {
    background-color: #491F6A;
    max-width: 600px;
    text-align: center;
    align-items: center;
    border-radius: 10px;
    margin: auto
}

.top-tabla {
    background-color: #DFC0F6;
}

/* Anotaciones */
.anotaciones {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    text-align: center;
    align-items: center;
    padding-left: 30px;
}


.anotaciones h3 {
    color: #7852A9;
}

.anotaciones p {
    margin-top: 10px;
    padding: 20px 0;
}

/* Saldo Actual */
p {
    color: black;
}

.saldo {
    margin-left: 20px;
    color: rgb(35, 175, 35);
    font-size: 30px;
}

/* contenedores */

.cont-Info {
    width: 95%;
}

.cont-Info h2 {
    color: #7852A9;
}

.cajas {
    min-height: 80px;
    background-color: #FFFFFF;
    align-items: center;
    display: flex;
    margin: 6px 0 6px 0;
    padding-left: 30px;
    color: black;
}

.cajas2 {
    min-height: 200px;
    background-color: #FFFFFF;
    margin: 6px 0 6px 0;
    color: black;
}

.cajas .v-icon {
    color: black;
    font-size: 50px;
}

.cajas h2 {
    color: black;
}

.bloque {
    margin: 50px 0 20px 0
}
</style>