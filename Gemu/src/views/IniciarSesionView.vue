<script setup lang="ts">
import InicioSesion from "@/components/InicioSesion.vue";

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
        <InicioSesion></InicioSesion>
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
    align-items: center;
    min-height: 100vh;
}
</style>