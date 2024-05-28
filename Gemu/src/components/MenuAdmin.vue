<script setup lang="ts">
import { UsuarioApi } from '@/stores/usuarioApi';
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router';
import { ref } from 'vue';
import { CarritoApi } from "@/stores/carritoApi";
import informacionGeneral from '@/components/MenuUsuario/InforGeneral.vue'
import ListaJuegos from '@/components/MenuAdmin/ListaJuegos.vue';
import CrearJuego from '@/components/MenuAdmin/CrearJuego.vue';

const route = useRoute();
const router = useRouter();
const storeCarrito = CarritoApi()

onBeforeRouteUpdate((to) => {
    opcion.value = to.params.opcion as string | undefined;
});

const opcion = ref<string | undefined>(route.params.opcion as string | undefined);
const datosUsuario = UsuarioApi();

const cuentaVisible1 = ref(false);
const cuentaVisible2 = ref(false);
const cuentaVisible3 = ref(false);
const cuentaVisible4 = ref(false);

const cerrarSesion = () => {
    storeCarrito.setCatidadCarrito(0)
    storeCarrito.setTotalPrecio(0)
    datosUsuario.removeUsuarioid()
    datosUsuario.removeToken()
    router.push("/")
}

const opcionActual = ref<string>(opcion.value || 'informacion');

const mostrarView = (view: string) => {
    opcionActual.value = view;
};


</script>

<template>
    <div class="bloqueInvisible">
        <p></p>
    </div>
    <main>
        <div class="layout">
            <div class="Barra">
                <div class="desplegable mantenerClick" :style="{ backgroundColor: cuentaVisible1 ? '#240C2F' : '' }">
                    <div class="cont-desplegable" :class="{ activo: cuentaVisible1 }"
                        @click="cuentaVisible1 = !cuentaVisible1">
                        <h3>Mi cuenta</h3>
                        <v-icon class="icono1" :class="{ oculto: cuentaVisible1 }">mdi-chevron-up</v-icon>
                        <v-icon class="icono2" :class="{ oculto: !cuentaVisible1 }">mdi-chevron-down</v-icon>
                    </div>
                    <p :class="{ activo: cuentaVisible1 }" @click="mostrarView('informacion')">Informacion general</p>
                </div>
                <div class="desplegable mantenerClick" :style="{ backgroundColor: cuentaVisible2 ? '#240C2F' : '' }">
                    <div class="cont-desplegable" :class="{ activo: cuentaVisible2 }"
                        @click="cuentaVisible2 = !cuentaVisible2">
                        <h3>Juegos</h3>
                        <v-icon class="icono1" :class="{ oculto: cuentaVisible2 }">mdi-chevron-up</v-icon>
                        <v-icon class="icono2" :class="{ oculto: !cuentaVisible2 }">mdi-chevron-down</v-icon>
                    </div>
                    <p :class="{ activo: cuentaVisible2 }" @click="mostrarView('listaJuegos')">Lista juegos</p>
                    <p :class="{ activo: cuentaVisible2 }" @click="mostrarView('crearJuego')">Crear</p>
                </div>
                <div class="desplegable mantenerClick" :style="{ backgroundColor: cuentaVisible3 ? '#240C2F' : '' }">
                    <div class="cont-desplegable" :class="{ activo: cuentaVisible3 }"
                        @click="cuentaVisible3 = !cuentaVisible3">
                        <h3>Usuarios</h3>
                        <v-icon class="icono1" :class="{ oculto: cuentaVisible3 }">mdi-chevron-up</v-icon>
                        <v-icon class="icono2" :class="{ oculto: !cuentaVisible3 }">mdi-chevron-down</v-icon>
                    </div>
                    <p :class="{ activo: cuentaVisible3 }">Lista usuarios</p>
                </div>
                <div class="desplegable mantenerClick" :style="{ backgroundColor: cuentaVisible4 ? '#240C2F' : '' }">
                    <div class="cont-desplegable" :class="{ activo: cuentaVisible4 }"
                        @click="cuentaVisible4 = !cuentaVisible4">
                        <h3>Peticiones</h3>
                        <v-icon class="icono1" :class="{ oculto: cuentaVisible4 }">mdi-chevron-up</v-icon>
                        <v-icon class="icono2" :class="{ oculto: !cuentaVisible4 }">mdi-chevron-down</v-icon>
                    </div>
                    <p :class="{ activo: cuentaVisible4 }">Lista peticiones</p>
                </div>
                <div class="mantenerClick desplegable" @click="cerrarSesion">
                    <h3>Cerrar</h3>
                </div>
            </div>
            <div class="bloqueRelleno">a</div>
            <div class="contenido">
                <div v-if="opcionActual === 'informacion'">
                    <informacionGeneral></informacionGeneral>
                </div>
                <div v-if="opcionActual === 'listaJuegos'">
                    <ListaJuegos></ListaJuegos>
                </div>
                <div v-if="opcionActual === 'crearJuego'">
                    <CrearJuego></CrearJuego>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
/* Desplegable*/

.desplegable {
    min-height: 40px;
    align-items: center;
    padding-right: 15px;
}

.desplegable p {
    display: none;
    margin-left: 40px;
    padding: 5px 20px;
    font-size: 15px;
}

.desplegable:hover {
    background-color: #240C2F;
    transition: background-color 0.3s ease-in-out;
}

.desplegable p.activo {
    display: block;
}

.desplegable p {
    display: none;
}

/* Icono desplegable */
.cont-desplegable {
    display: flex;
    justify-content: space-between;
}

.desplegable .icono1.oculto {
    display: block;
}

.desplegable .icono2 {
    display: none;
}

.desplegable .icono1 {
    display: none;
}

.desplegable .icono2.oculto {
    display: block;
}

/* Cerrar sesion */
.cerrarSesion {
    min-height: 40px;
    display: flex;
    align-items: center;
}

.cerrarSesion:hover {
    background-color: #240C2F;
}

.mantenerClick:active {
    background-color: #623e74;
}



/* Barra Opciones*/
.bloqueRelleno {
    width: 250px;
    height: 100%;
    background-color: #491F6A;

}

.Barra {
    background-color: #491F6A;
    width: 250px;
    height: 100%;
    position: fixed;
    top: 118px;
}

.Barra h3 {
    margin-left: 40px;
}

.bloqueInvisible {
    width: 100%;
    height: 170px;
    background-color: #E0E0E0;
}

main {
    width: 100%;
    min-height: 600px;
    background-color: #E0E0E0;
    margin: 0;
}

.layout {
    display: grid;
    grid-template-columns: 300px 1fr;
    height: 100%;
}
</style>