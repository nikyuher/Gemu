<script setup lang="ts">

</script>

<template>
    <header>
        <div class="bloqueHeader">
            <div class="logoHeader">
                <RouterLink to="/">
                    <h1>Gēmu</h1>
                    <p>ゲーム</p>
                </RouterLink>
            </div>
        </div>
        <div class="bloqueInvisible">
            <p>a</p>
        </div>
    </header>
    <main>
        <div class="layout">
            <div class="Barra">
                <div class="mi-cuenta">
                    <h3>Mi cuenta</h3>
                </div>
            </div>
            <div class="bloqueRelleno">a</div>
            <div class="contenido">
                <h1>Informacion Persona</h1>
            </div>
        </div>
    </main>
    <footer>
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
    </footer>
</template>

<style scoped>
header {
    width: 100%;
    background-color: rgb(0, 0, 0);
}

.bloqueHeader {
    position: fixed;
    z-index: 1000;
    width: 100%;
    background-color: rgb(0, 0, 0);
}

.bloqueInvisible {
    width: 100%;
    height: 170px;
    background-color: #E0E0E0;
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
  grid-template-columns: 300px 1fr; /* Columna izquierda de 300px, columna derecha ocupando el resto */
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

/* Footer */
footer {
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