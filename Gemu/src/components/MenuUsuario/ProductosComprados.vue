<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { BibliotecaApi } from '@/stores/bibliotecaAPI';
import { UsuarioApi } from '@/stores/usuarioApi';

const datosUsuario = UsuarioApi();
const bibliotecaStore = BibliotecaApi();

const IdUsuario = datosUsuario.$state.usuarioId?.idUsuario
const historial = ref<any[]>([]);
const terminosBusqueda = ref('');

const getImagenURL = (base64StringArray: any) => {
    const base64String = base64StringArray[0]?.datos;
    return base64String ? `data:image/png;base64,${base64String}` : '';
};

onMounted(async () => {
    try {
        if (IdUsuario) {
            await bibliotecaStore.historialBiblioteca(IdUsuario);
            historial.value = bibliotecaStore.listabiblioteca;
        } else {
            console.error('IdUsuario no definido');
        }
    } catch (error) {
        console.log(error)
    }
})

const matchesSearch = (titulo: string, terminos: string) => {
    return titulo.includes(terminos);
};

const juegosFiltrados = computed(() => {
    if (!terminosBusqueda.value) {
        return historial.value;
    } else {
        return historial.value.map(biblioteca => {
            if (biblioteca && biblioteca.bibliotecaProductos) {
                const juegosFiltrados = biblioteca.bibliotecaProductos.filter((bibliotecaProductos: any) =>
                    matchesSearch(bibliotecaProductos.producto.nombre.toLowerCase(), terminosBusqueda.value.toLowerCase())
                );
                return { ...biblioteca, bibliotecaProductos: juegosFiltrados };
            }
            return { ...biblioteca, bibliotecaProductos: [] };
        }).filter(biblioteca => biblioteca.bibliotecaProductos.length > 0);
    }
});

</script>

<template>
    <div class="cont-Info">
        <h2>Mis productos comprados</h2>
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
                    <h3>Portada</h3>
                    <h3>Nombre producto</h3>
                    <h3>Precio</h3>
                    <h3>Estado</h3>
                </div>
                <div v-if="juegosFiltrados.length > 0" style="padding-bottom: 30px;">
                    <div v-for="biblioteca of juegosFiltrados" :key="biblioteca.idBiblioteca">
                        <div v-for="productoBilioteca in biblioteca.bibliotecaProductos"
                            :key="productoBilioteca.bibliotecaProductoId" class="anotaciones">
                            <img :src="getImagenURL(productoBilioteca.producto.imgsProducto)"
                                style="width: 70px; margin: auto;">
                            <p>{{ productoBilioteca.producto.nombre }}</p>
                            <p>{{ productoBilioteca.producto.precio }} €</p>
                            <p>{{ productoBilioteca.producto.estado }}</p>
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
    height: 300px;
    text-align: center;
    align-items: center;
    border-radius: 20px;
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
    grid-template-columns: repeat(4, 1fr);
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
</style>