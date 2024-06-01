<script setup lang="ts">
import { UsuarioApi } from '@/stores/usuarioApi';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { watchEffect } from 'vue';
import menuUsuario from '@/components/MenuUsuario.vue'
import menuAdmin from '@/components/MenuAdmin.vue'

const router = useRouter();
const datosUsuario = UsuarioApi();

const isAuthenticated = computed(() => datosUsuario.isAuthenticated);
const isAdmin = computed(() => datosUsuario.isAdmin);
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
            <p></p>
        </div>
        <div v-if="isAdmin">
            <menuAdmin></menuAdmin>
        </div>
        <div v-else>
            <menuUsuario></menuUsuario>
        </div>
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
/*Diseño Header */
.bloqueHeader {
    position: fixed;
    display: flex;
    justify-content: space-between;
    z-index: 1000;
    width: 100%;
    background-color: rgb(0, 0, 0);
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

@media (max-width: 975px) {
    .bloqueFooter {
        margin: auto
    }
}
</style>