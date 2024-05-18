<script setup lang="ts">
import { UsuarioApi } from '@/stores/usuarioApi';
import { computed } from 'vue';
import ListaCarrito from '@/components/ListaCarrito.vue'
import ErrorUrlView from './ErrorUrlView.vue';

const datosUsuario = UsuarioApi();
const isAuthenticated = computed(() => datosUsuario.isAuthenticated);
</script>
<template>
    <header>
        <div class="logo">
            <RouterLink to="/">
                <h1>Gēmu</h1>
                <p>ゲーム</p>
            </RouterLink>
        </div>
    </header>
    <main>
        <div v-if="isAuthenticated">
            <ListaCarrito></ListaCarrito>
        </div>
        <div v-else>
            <ErrorUrlView></ErrorUrlView>
        </div>
    </main>
</template>
<style scoped>
.logo {
    display: flex;
    padding: 20px 0 10px 20px;
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

header {
    background-color: black;
    height: 100px;
    text-align: center;
    align-items: center;
}

header a {
    text-decoration: none;
}

main {
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    min-height: 60vh;
    margin: 100px 0;
}
</style>