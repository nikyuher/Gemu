<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { UsuarioApi } from '@/stores/usuarioApi';
import { JuegoApi } from '@/stores/juegoApi';
import UpdateJuego from '@/components/MenuAdmin/UpdateJuego.vue';

const storeUsuario = UsuarioApi();
const storeJuego = JuegoApi()

const token = storeUsuario.getToken()

const loading = computed(() => storeJuego.loading);
const hasMorePaginados = computed(() => storeJuego.hasMorePaginados);
const showProgress = ref(false);

const IdUsuario = storeUsuario.$state.usuarioId?.idUsuario
const listaJuegos = computed(() => storeJuego.JuegosPaginados);
const terminosBusqueda = ref('');
const ordenFecha = ref('masReciente');

const getImagenURL = (base64StringArray: any) => {
    const base64String = base64StringArray[0]?.datos;
    return base64String ? `data:image/png;base64,${base64String}` : '';
};

onMounted(async () => {
    try {
        if (IdUsuario) {
            storeJuego.resetCurrentPagePaginados();
            await storeJuego.GetJuegosPaginados();
        } else {
            console.error('IdUsuario no definido');
        }
    } catch (error) {
        console.log(error)
    }
})

const EliminarJuego = async (idJuego: number) => {

    if (idJuego && IdUsuario && token) {
        try {
            await storeJuego.EliminarJuego(idJuego, token);

            const index = listaJuegos.value.findIndex(juego => juego.idJuego === idJuego);
            if (index !== -1) {
                listaJuegos.value.splice(index, 1);
            }
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
    }
}

const juegosFiltrado = computed(() => {
    let juegos = listaJuegos.value;

    if (terminosBusqueda.value) {
        const filtro = terminosBusqueda.value.toLowerCase();
        juegos = juegos.filter(juego => juego.titulo.toLowerCase().includes(filtro));
    }

    if (ordenFecha.value === 'masReciente') {
        juegos = juegos.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
    } else {
        juegos = juegos.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
    }

    return juegos;
});

const formatoFecha = (fecha: string) => {
    const date = new Date(fecha);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${month}/${day}/${year}`;
}

const mostrarMas = async () => {
    if (!loading.value && hasMorePaginados.value) {
        showProgress.value = true;
        await storeJuego.GetJuegosPaginados();
        // listaJuegos.value = storeJuego.JuegosPaginados
        setTimeout(() => {
            showProgress.value = false;
        }, 1000);
    }
};

</script>

<template>
    <div class="cont-Info">
        <h2>Lista Juegos</h2>
        <div class="bloque">
            <div class="cajas">
                <div class="search">
                    <input type="search" v-model="terminosBusqueda" placeholder="Buscar por nombre de producto">
                </div>
            </div>
        </div>
        <div class="ordenar">
            <label for="ordenFecha">Ordenar por fecha:</label>
            <select id="ordenFecha" v-model="ordenFecha">
                <option style="color: black;" value="masReciente">Más antiguos</option>
                <option style="color: black;" value="masAntiguo">Más recientes</option>
            </select>
        </div>
        <div class="bloque">
            <div class="cajas2">
                <div class="anotaciones top-tabla">
                    <h3> </h3>
                    <h3>Portada</h3>
                    <h3>Fecha</h3>
                    <h3>Nombre producto</h3>
                    <h3>Precio</h3>
                </div>
                <div v-if="juegosFiltrado.length > 0" style="padding-bottom: 30px;">
                    <div v-for="juego of juegosFiltrado" :key="juego.idJuego" class="anotaciones">
                        <v-btn @click="EliminarJuego(juego.idJuego)" color="red" style="width: 5px; margin: auto;">
                            <v-icon size="25">mdi-delete</v-icon>
                        </v-btn>
                        <img :src="getImagenURL(juego.imgsJuego)" style="width: 70px; margin: auto;">
                        <p>{{ formatoFecha(juego.fecha) }}</p>
                        <p>{{ juego.titulo }}</p>
                        <p>{{ juego.precio }} €</p>
                        <v-dialog>
                            <template v-slot:activator="{ props: activatorProps }">
                                <v-btn v-bind="activatorProps" rounded color="purple" style="width: 5px; margin: auto;">
                                    <v-icon size="25">mdi-pencil</v-icon>
                                </v-btn>
                            </template>
                            <template v-slot:default>
                                <div class="caja-key update-producto-container">
                                    <UpdateJuego :id-juego="juego.idJuego"></UpdateJuego>
                                </div>
                            </template>
                        </v-dialog>
                    </div>
                    <div v-if="showProgress" class="d-flex align-center justify-center">
                        <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                    </div>
                    <div v-else>
                        <button @click="mostrarMas" :class="{ 'ocultar': loading || !hasMorePaginados }"
                            class="boton-mostrar-mas">
                            Mostrar Más
                        </button>
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
.boton-mostrar-mas {
    display: flex;
    margin: auto;
    text-align: center;
    align-items: center;
    background-color: #682E83;
    border: 1px solid white;
    padding: 10px 20px 10px 20px;
}

.ocultar {
    display: none;
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
    border-radius: 20px;
    margin: auto
}

.caja-key p {
    color: white;
    background-color: #7852A9;
    font-size: 25px;
    width: 80%;
    margin: auto;
    border-radius: 50px;
    border: 2px solid rgb(152, 28, 163);
}

.top-tabla {
    background-color: #DFC0F6;
}

/* Anotaciones */
.anotaciones {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    text-align: center;
    align-items: center;
    border-bottom: 1px solid rgb(177, 177, 177);

}

.anotaciones img {
    padding: 20px 0;
}

.anotaciones h3 {
    color: #7852A9;
}

.anotaciones p {
    margin-top: 10px;
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
    width: 100%;
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

/* Ordenar select */
.ordenar {
    display: flex;
    justify-content: flex-end;
    margin: 10px;
    align-items: center;
}

.ordenar label {
    margin-right: 10px;
    color: #7852A9;
}

.ordenar select {
    padding: 5px;
    color: #7852A9;
}

@media (max-width: 670px) {
    .caja-key {
        margin: 0;
    }
}
</style>