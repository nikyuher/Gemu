<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

</script>

<template>
  <header>
    <div class="nav-superior">
      <div class="logo">
        <RouterLink to="/">
          <h1>Gēmu</h1>
          <p>ゲーム</p>
        </RouterLink>
      </div>

      <div class="cont-nav">
        <div class="search">
          <input type="search" placeholder="Buscar...">
          <v-icon>mdi-magnify</v-icon>
        </div>
        <div class="idiomas">
          <v-icon>mdi-earth</v-icon>
          <select>
            <option value="es">Español</option>
            <option value="en">Inglés</option>
          </select>
        </div>
        <div class="carrito">
          <v-icon>mdi-cart</v-icon>
        </div>
        <div class="cuentaUsuario">
          <RouterLink to="/inicioSesion">InicioSesion</RouterLink>
          <RouterLink to="/registrarse" style="border-left:2px solid white ;">Registrarse</RouterLink>
        </div>
        <div class="vender">
          <RouterLink to="/vender">Vender</RouterLink>
        </div>
      </div>
    </div>
    <div class="nav-inferior">
      <RouterLink to="/marketplace">Marketplace</RouterLink>
      <RouterLink to="/ofertas">Ofertas</RouterLink>
      <RouterLink to="/juegosBaratos">Juegos Baratos</RouterLink>
      <RouterLink to="/juegosPopulares">Más Populares</RouterLink>
    </div>
  </header>

  <RouterView />

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
        <a href="https://www.youtube.com">
          <v-icon>mdi-youtube</v-icon>
        </a>
        <a href="https://twitter.com/">
          <v-icon>mdi-twitter</v-icon>
        </a>
        <a href="https://www.instagram.com">
          <v-icon>mdi-instagram</v-icon>
        </a>
        <a href="https://www.discord.com">
          <v-icon>mdi-discord</v-icon>
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
/* Barra de navegacion */
header {
  background-color: rgb(0, 0, 0);
}

.nav-superior {
  align-items: center;
  display: flex;
  padding: 20px 0 20px 20px;
  justify-content: space-between;
}

.cont-nav {
  display: flex;
  justify-content: space-around;
}

.nav-inferior {
  height: 30px;
  background-color: rgb(231, 231, 231);
  display: flex;
  align-items: center;
}

.nav-inferior a {
  color: #7b387c;
  text-decoration: none;
  padding-left: 20px;
}

.nav-inferior a:hover {
  color: #d742da;
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


/* Buscador */
.search {
  display: flex;
  text-align: center;
  align-items: center;
  background-color: rgb(46, 42, 42);
  border: solid 2px rgb(255, 255, 255);
  width: 300px;
  height: 35px;
  margin: 0 10px 0 30px;
}

.search input {
  /* Quitar estilos de cualquier navegador  */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  /* Quitar bordes y fondo */
  border: none;
  outline: none;
  background-color: transparent;

  /* Estilos personalizados */
  padding: 8px;
  width: 90%;
  box-sizing: border-box;
  color: rgb(255, 255, 255)
}

.v-icon {
  color: rgb(255, 255, 255);
  font-size: 30px;
}

/* Idiomas */
.idiomas select {
  /* Quitar bordes y fondo */
  border-left: 2px solid rgb(255, 255, 255);
  outline: none;
  background-color: transparent;
  margin-left: 10px;
  padding-left: 10px;
  color: rgb(255, 255, 255);
}

.idiomas select:hover {
  color: gray;
}

.idiomas select option {
  color: rgb(0, 0, 0);
}

/* Carrito */
.carrito {
  margin: 0 0 0 80px;
}

.carrito .v-icon:hover {
  color: gray;
}

/* InicioSecion/Registrar/Cuenta Usuario */
.cuentaUsuario {
  margin: 0 20px 0 20px;
}

.cuentaUsuario a {
  color: rgb(255, 255, 255);
  text-decoration: none;
  padding: 5px;
}

.cuentaUsuario a:hover {
  color: gray;
}

/* Vender */
.vender {
  background-color: #F8C032;
  border-radius: 3px;
  color: black;
  padding: 5px 10px 5px 10px;
  margin: 0 30px 0 30px;
}

.vender a {
  color: inherit;
  text-decoration: none;
}

.vender:hover {
  background-color: #ce7c1e;
  border-radius: 3px;
  color: rgb(218, 218, 218);
  padding: 5px 10px 5px 10px;
}

/* Footer */
footer {
  color: white;
  background-color: black;
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
</style>
