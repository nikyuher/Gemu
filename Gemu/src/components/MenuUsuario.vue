<script setup lang="ts">
import { ref } from 'vue';
import { UsuarioApi } from '@/stores/usuarioApi';
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router';
import { CarritoApi } from "@/stores/carritoApi";
import informacionGeneral from '@/components/MenuUsuario/InforGeneral.vue'
import AñadirFondos from '@/components/MenuUsuario/AñadirFondos.vue'
import RestarFondos from '@/components/MenuUsuario/RestarFondos.vue'
import infoBilletera from "@/components/MenuUsuario/InforBilletera.vue";
import Ajustes from "@/components/MenuUsuario/AjustesUsuario.vue";
import JuegosComprados from "@/components/MenuUsuario/JuegosComprados.vue";
import ProductosComprados from "@/components/MenuUsuario/ProductosComprados.vue";
import crearProducto from "@/components/MenuUsuario/CrearProducto.vue";
import MisAnuncios from "@/components/MenuUsuario/AnunciosUsuario.vue";

const route = useRoute();
const opcion = ref<string | undefined>(route.params.opcion as string | undefined);

onBeforeRouteUpdate((to) => {
    opcion.value = to.params.opcion as string | undefined;
});

const router = useRouter();
const datosUsuario = UsuarioApi();
const storeCarrito = CarritoApi()

const cuentaVisible1 = ref(false);
const cuentaVisible2 = ref(false);
const cuentaVisible3 = ref(false);
const cuentaVisible4 = ref(false);
const cuentaVisible5 = ref(false);

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

const isMenuOpen = ref(false);
const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

</script>

<template>

    <main>
        <div class="layout">
            <div class="menu-button" @click="toggleMenu">
                <v-icon>mdi-menu</v-icon>
            </div>
            <div class="Barra" :class="{ 'is-open': isMenuOpen }">
                <div class=" desplegable mantenerClick" :style="{ backgroundColor: cuentaVisible1 ? '#240C2F' : '' }">
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
                        <h3>Saldo</h3>
                        <v-icon class="icono1" :class="{ oculto: cuentaVisible2 }">mdi-chevron-up</v-icon>
                        <v-icon class="icono2" :class="{ oculto: !cuentaVisible2 }">mdi-chevron-down</v-icon>
                    </div>
                    <p :class="{ activo: cuentaVisible2 }" @click="mostrarView('infoBilletera')">Informacion saldo
                    </p>
                    <p :class="{ activo: cuentaVisible2 }" @click="mostrarView('addFondos')">Añadir fondos</p>
                    <p :class="{ activo: cuentaVisible2 }" @click="mostrarView('retirarFondos')">Retirar fondos</p>
                </div>
                <div class="desplegable mantenerClick" :style="{ backgroundColor: cuentaVisible3 ? '#240C2F' : '' }">
                    <div class="cont-desplegable" :class="{ activo: cuentaVisible3 }"
                        @click="cuentaVisible3 = !cuentaVisible3">
                        <h3>Mi biblioteca</h3>
                        <v-icon class="icono1" :class="{ oculto: cuentaVisible3 }">mdi-chevron-up</v-icon>
                        <v-icon class="icono2" :class="{ oculto: !cuentaVisible3 }">mdi-chevron-down</v-icon>
                    </div>
                    <p :class="{ activo: cuentaVisible3 }" @click="mostrarView('juegos')">Juegos comprados</p>
                    <p :class="{ activo: cuentaVisible3 }" @click="mostrarView('productos')">Productos comprados</p>
                </div>
                <div class="desplegable mantenerClick" :style="{ backgroundColor: cuentaVisible4 ? '#240C2F' : '' }">
                    <div class="cont-desplegable" :class="{ activo: cuentaVisible4 }"
                        @click="cuentaVisible4 = !cuentaVisible4">
                        <h3>Anuncios</h3>
                        <v-icon class="icono1" :class="{ oculto: cuentaVisible4 }">mdi-chevron-up</v-icon>
                        <v-icon class="icono2" :class="{ oculto: !cuentaVisible4 }">mdi-chevron-down</v-icon>
                    </div>
                    <p :class="{ activo: cuentaVisible4 }" @click="mostrarView('crearAnuncio')">Crear anuncio</p>
                    <p :class="{ activo: cuentaVisible4 }" @click="mostrarView('misAnuncios')">Mis anuncios</p>
                </div>
                <div class="desplegable mantenerClick" :style="{ backgroundColor: cuentaVisible5 ? '#240C2F' : '' }">
                    <div class="cont-desplegable" :class="{ activo: cuentaVisible5 }"
                        @click="cuentaVisible5 = !cuentaVisible5">
                        <h3>Ajustes</h3>
                        <v-icon class="icono1" :class="{ oculto: cuentaVisible5 }">mdi-chevron-up</v-icon>
                        <v-icon class="icono2" :class="{ oculto: !cuentaVisible5 }">mdi-chevron-down</v-icon>
                    </div>
                    <p :class="{ activo: cuentaVisible5 }" @click="mostrarView('ajustes')">Actualizar informacion</p>
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
                <div v-if="opcionActual === 'infoBilletera'">
                    <infoBilletera></infoBilletera>
                </div>
                <div v-if="opcionActual === 'addFondos'">
                    <AñadirFondos></AñadirFondos>
                </div>
                <div v-if="opcionActual === 'retirarFondos'">
                    <RestarFondos></RestarFondos>
                </div>
                <div v-if="opcionActual === 'juegos'">
                    <JuegosComprados></JuegosComprados>
                </div>
                <div v-if="opcionActual === 'productos'">
                    <ProductosComprados></ProductosComprados>
                </div>
                <div v-if="opcionActual === 'misAnuncios'">
                    <MisAnuncios></MisAnuncios>
                </div>
                <div v-if="opcionActual === 'crearAnuncio'">
                    <crearProducto></crearProducto>
                </div>
                <div v-if="opcionActual === 'ajustes'">
                    <Ajustes></Ajustes>
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
    color: rgb(212, 212, 212);
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

.cont-desplegable h3 {
    width: 80%;
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
    padding-top: 170px;
    padding-right: 50px;
}

.menu-button {
    display: none;
}

@media (max-width: 975px) {
    .Barra {
        display: none;
    }

    .layout {
        padding-top: 118px;
        padding-right: 0;
        display: block;
    }

    .menu-button {
        display: block;
        top: 118px;
        background-color: #491F6A;
        padding: 20px 20px;
    }

    .bloqueInvisible {
        height: 120px;
    }

    .bloqueRelleno {
        display: none;
    }

    .Barra.is-open {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 170px;
        left: 0;
        background-color: #491F6A;
        width: 300px;
        z-index: 1;
    }

}
</style>