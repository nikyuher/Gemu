<script setup lang="ts">
import { UsuarioApi } from '@/stores/usuarioApi';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import informacionGeneral from '@/components/InforGeneral.vue'
import AñadirFondos from '@/components/AñadirFondos.vue'
import RestarFondos from '@/components/RestarFondos.vue'
import infoBilletera from "@/components/InforBilletera.vue";
import Ajustes from "@/components/AjustesUsuario.vue";
import Biblioteca from "@/components/BibliotecaUsuario.vue";
import crearProducto from "@/components/CrearProducto.vue";
import MisAnuncios from "@/components/AnunciosUsuario.vue";

const router = useRouter();
const datosUsuario = UsuarioApi();

const cuentaVisible1 = ref(false);
const cuentaVisible2 = ref(false);
const cuentaVisible3 = ref(false);
const cuentaVisible4 = ref(false);
const cuentaVisible5 = ref(false);

const cerrarSesion = () => {
    datosUsuario.removeUsuarioid()
    datosUsuario.removeToken()
    router.push("/")
}

const opcionActual = ref<string>('informacion');

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
                    <p :class="{ activo: cuentaVisible3 }" @click="mostrarView('biblioteca')">Mis compras</p>
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
                <div v-if="opcionActual === 'biblioteca'">
                    <Biblioteca></Biblioteca>
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
}
</style>