<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { UsuarioApi } from '@/stores/usuarioApi';
import { AnuncioApi } from '@/stores/anuncioApi';
import { ProductoApi } from '@/stores/productoApi';
import UpdateProducto from '@/components/MenuUsuario/UpdateProducto.vue'

const storeAnuncio = AnuncioApi();
const storeUsuario = UsuarioApi();
const storeProducto = ProductoApi()

const token = storeUsuario.getToken()


const IdUsuario = storeUsuario.$state.usuarioId?.idUsuario
const historial = ref<any[]>([]);
const terminosBusqueda = ref('');

const getImagenURL = (base64StringArray: any) => {
    const base64String = base64StringArray[0]?.datos;
    return base64String ? `data:image/png;base64,${base64String}` : '';
};

onMounted(async () => {
    try {
        if (IdUsuario) {
            await storeAnuncio.GetAnunciosUsuario(IdUsuario);
            historial.value = storeAnuncio.listaAnuncios;
        } else {
            console.error('IdUsuario no definido');
        }
    } catch (error) {
        console.log(error)
    }
})

const EliminarProducto = async (idProducto: number) => {

    if (idProducto && IdUsuario && token) {
        try {
            await storeProducto.EliminarProducto(idProducto, token);

            const index = historial.value.findIndex(anuncio => anuncio.producto.idProducto === idProducto);
            if (index !== -1) {
                historial.value.splice(index, 1);
            }
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
    }
}

const historialFiltrado = computed(() => {
    if (!terminosBusqueda.value) {
        return historial.value;
    } else {
        const filtro = terminosBusqueda.value.toLowerCase();
        return historial.value.filter(anuncio => {
            return anuncio.producto.nombre.toLowerCase().includes(filtro);
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
        <h2>Mis anuncios</h2>
        <div class="bloque">
            <div class="cajas">
                <div class="search">
                    <input type="search" v-model="terminosBusqueda" placeholder="Buscar por nombre de producto">
                </div>
            </div>
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
                <div v-if="historialFiltrado.length > 0" style="padding-bottom: 30px;">
                    <div v-for="anuncio of historialFiltrado" :key="anuncio.idAnuncio" class="anotaciones">
                        <v-btn @click="EliminarProducto(anuncio.producto.idProducto)" color="red"
                            style="width: 5px; margin: auto;">
                            <v-icon size="25">mdi-delete</v-icon>
                        </v-btn>
                        <img :src="getImagenURL(anuncio.producto.imgsProducto)" style="width: 70px; margin: auto;">
                        <p>{{ formatoFecha(anuncio.fecha) }}</p>
                        <p>{{ anuncio.producto.nombre }}</p>
                        <p>{{ anuncio.producto.precio }} €</p>
                        <v-dialog max-width="500">
                            <template v-slot:activator="{ props: activatorProps }">
                                <v-btn v-bind="activatorProps" rounded color="purple" style="width: 5px; margin: auto;">
                                    <v-icon size="25">mdi-pencil</v-icon>
                                </v-btn>
                            </template>
                            <template v-slot:default>
                                <div class="caja-key update-producto-container">
                                    <UpdateProducto :id-producto="anuncio.producto.idProducto"></UpdateProducto>
                                </div>
                            </template>
                        </v-dialog>
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
}

.anotaciones img {
    padding-top: 20px;
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

@media (max-width: 670px) {
    .caja-key {
        margin: 0;
    }
}
</style>