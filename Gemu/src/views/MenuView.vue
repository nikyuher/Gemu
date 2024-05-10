<script setup lang="ts">
import { UsuarioApi } from '@/stores/usuarioApi';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { watchEffect } from 'vue';
import informacionGeneral from '@/components/InformacionGeneral.vue'

const router = useRouter();
const datosUsuario = UsuarioApi();


const cerrarSesion = () => {
    datosUsuario.removeUsuarioid()
    datosUsuario.removeToken()
    router.push("/")
}

const isAuthenticated = computed(() => datosUsuario.isAuthenticated);
watchEffect(() => {
    if (!isAuthenticated.value) {
        router.push('/');
    }
});

</script>

<template>
    <div v-if="isAuthenticated">
        <div class="bloqueHeader">
            <div class="logoHeader">
                <RouterLink to="/">
                    <h1>Gēmu</h1>
                    <p>ゲーム</p>
                </RouterLink>
            </div>
            <div class="Usuario">
                <h2>{{ datosUsuario.$state.usuarioId?.nombre }}</h2>
                <v-icon>mdi-account-circle</v-icon>
            </div>
        </div>
        <div class="bloqueInvisible">
            <p>a</p>
        </div>
        <main>
            <div class="layout">
                <div class="Barra">
                    <div class="mi-cuenta">
                        <div class="cont-desplegable">
                            <h3>Mi cuenta</h3>
                            <v-icon class="icono1">mdi-chevron-up</v-icon>
                            <v-icon class="icono2">mdi-chevron-down</v-icon>
                        </div>
                        <p>Informacion general</p>
                    </div>
                    <div class="cerrarSesion" @click="cerrarSesion">
                        <h3>Cerrar</h3>
                    </div>
                </div>
                <div class="bloqueRelleno">a</div>
                <div class="contenido">
                    <informacionGeneral></informacionGeneral>
                </div>
            </div>
        </main>
        <div class="bloqueFooter">
            <div class="footer-superior">
                <div class="sobre-gemu">
                    <h2>Sobre Gēmu</h2>
                    <RouterLink to="/about">Sobre nosotros</RouterLink>
                    <RouterLink to="/trabajo">Trabaja con nostros</RouterLink>
                </div>
                <div class="ayuda">
                    <h2>Ayuda</h2>
                    <RouterLink to="/ayuda-vender">Como vender en Gēmu</RouterLink>
                </div>
                <div class="redes">
                    <h2>Siguenos</h2>
                    <a href="https://www.youtube.com" target="_blank">
                        <v-icon>mdi-youtube</v-icon>
                    </a>
                    <a href="https://twitter.com/" target="_blank">
                        <v-icon>mdi-twitter</v-icon>
                    </a>
                    <a href="https://www.instagram.com" target="_blank">
                        <v-icon>mdi-instagram</v-icon>
                    </a>
                    <a href="https://www.discord.com" target="_blank">
                        <font-awesome-icon :icon="['fab', 'discord']" class="custom-icon" />
                    </a>
                </div>
            </div>
            <div class="footer-inferior">
                <div class="logo">
                    <RouterLink to="/">
                        <h1>Gēmu</h1>
                        <p>ゲーム</p>
                    </RouterLink>
                    <h3>© 2024 Gēmu. Todos los derechos reservados.</h3>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.bloqueHeader {
    position: fixed;
    display: flex;
    justify-content: space-between;
    z-index: 1000;
    width: 100%;
    background-color: rgb(0, 0, 0);
}

.bloqueInvisible {
    width: 100%;
    height: 170px;
    background-color: #E0E0E0;
}


.Usuario {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
}

.Usuario .v-icon {
    font-size: 50px;
}

/* Logo */
.logoHeader {
    padding: 20px 0 10px 20px;
}

.logoHeader a {
    color: rgb(255, 255, 255);
    text-decoration: none;
}

.logoHeader h1 {
    font-size: 50px;
    line-height: 0.8;
}

.logoHeader p {
    font-size: 32px;
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
    /* Columna izquierda de 300px, columna derecha ocupando el resto */
    height: 100%;
}

/* Logo */
.logo a {
    color: rgb(255, 255, 255);
    text-align: center;
    text-decoration: none;

}

.logo h1 {
    font-size: 50px;
    line-height: 0.8;
}

.logo p {
    font-size: 32px;
}

/* Barra Opciones*/
.bloqueRelleno {
    width: 250px;
    height: 100%;
    background-color: red;

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

/* Mi cuenta */

.mi-cuenta {
    min-height: 40px;
    align-items: center;
}

.mi-cuenta p {
    display: none;
    margin-left: 40px;
    padding: 20px 20px;
    font-size: 15px;
}

.mi-cuenta:hover {
    background-color: #240C2F;
    transition: background-color 0.3s ease-in-out;
}

.mi-cuenta:hover p {
    display: block;
    transition: display 0.3s ease-in-out;
}

.cont-desplegable {
    display: flex;
    justify-content: space-between;
}

.cont-desplegable .v-icon {
    padding-right: 20px;
}

.icono2 {
    display: none;
}

.mi-cuenta:hover .icono1 {
    display: none;
}

.mi-cuenta:hover .icono2 {
    display: block;
    padding-right: 35px;
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

.cerrarSesion:active {
    background-color: #362041;
}

/* Footer */
.bloqueFooter {
    color: white;
    background-color: black;
    margin-left: 250px;
}

.footer-superior {
    display: flex;
    justify-content: space-evenly;
    padding: 50px 0 50px 0;
}

.footer-inferior h3 {
    font-size: 15px;
    font-family: Arial, Helvetica, sans-serif;
    text-align: center;
    padding-bottom: 100px;
}

.sobre-gemu a {
    display: block;
}

.sobre-gemu a {
    color: white;
    text-decoration: none
}

.sobre-gemu a:hover {
    color: gray;
}

.ayuda a {
    color: white;
    text-decoration: none
}

.ayuda a:hover {
    color: gray;
}

.custom-icon {
    font-size: 22px;
    color: white;
}
</style>