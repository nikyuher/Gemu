<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useRoute } from 'vue-router';
import { UsuarioApi } from '@/stores/usuarioApi';
import { CarritoApi } from "@/stores/carritoApi";
import BusquedaHome from "@/components/busquedaHome.vue";

const storeCarrito = CarritoApi()

const datosUsuario = UsuarioApi();
const isAuthenticated = computed(() => datosUsuario.isAuthenticated);

const totalCantidad = computed(() => storeCarrito.getCatidadCarrito());
const route = useRoute();
const router = useRouter();
const rutasAOcultarHeader = ['/iniciarSesion', '/registrarse', '/user-menu', '/carritoCompra', '/user-menu/crearAnuncio'];
const rutasOcultarFooter = ['/user-menu', '/user-menu/crearAnuncio'];


const ocultarHeader = ref(rutasAOcultarHeader.includes(route.path));
const ocultarFooter = ref(rutasOcultarFooter.includes(route.path));

watch(route, () => {
  ocultarHeader.value = rutasAOcultarHeader.includes(route.path);
  ocultarFooter.value = rutasOcultarFooter.includes(route.path);
});

// Función para remover el token y el usuario ID
const removerTokenYUsuarioId = () => {
  storeCarrito.setCatidadCarrito(0)
  storeCarrito.setTotalPrecio(0)
  datosUsuario.removeToken();
  datosUsuario.removeUsuarioid();
  router.push("/")
};

// Eliminar cada 1 hora
onMounted(async () => {

  if (datosUsuario.getToken()) {
    const datosUser = {
      idUsuario: datosUsuario.$state.usuarioId?.idUsuario,
      token: datosUsuario.getToken(),
      idCarrito: datosUsuario.$state.usuarioId?.idCarrito
    }
    await storeCarrito.ListaCarrito(datosUser)
    setInterval(removerTokenYUsuarioId, 3600000);
  }
});

const busqueda = ref<string>('')
const busquedaMandar = ref<string>('')

const search = async () => {

  try {
    if (busqueda.value != '') {
      busquedaMandar.value = busqueda.value
    } else {
      busquedaMandar.value = ''
    }
  } catch (error) {
    console.log(error);

  }
}

const cerrarBuscador = async() =>{
  busqueda.value=''
  search()
}

const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const toggleMenuClose = () => {
  if (isMenuOpen.value == true) {
    isMenuOpen.value = false
  }
};

</script>

<template>
  <header :style="{ display: ocultarHeader ? 'none' : 'block' }" @click="cerrarBuscador()">
    <div class="nav-superior">
      <div class="logo">
        <RouterLink to="/">
          <h1>Gēmu</h1>
          <p>ゲーム</p>
        </RouterLink>
      </div>
      <div class="menu-button" @click="toggleMenu">
        <v-icon>mdi-menu</v-icon>
      </div>
      <div class="cont-nav" :class="{ 'is-open': isMenuOpen }">
        <div class="search">
          <input @input="search()" type="search" v-model="busqueda" placeholder="Buscar...">
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
          <v-badge :content="totalCantidad" color="red">
            <RouterLink @click="toggleMenuClose()" to="/carritoCompra"> <v-icon>mdi-cart</v-icon></RouterLink>
          </v-badge>
        </div>
        <div v-if="isAuthenticated" class="cuentaUsuario">
          <RouterLink @click="toggleMenuClose()" to="/user-menu">
            {{ datosUsuario.$state.usuarioId?.nombre }}
            <v-icon>mdi-account-circle</v-icon>
          </RouterLink>
        </div>
        <div v-else class="cuentaUsuario">
          <RouterLink @click="toggleMenuClose()" to="/iniciarSesion">InicioSesion</RouterLink>
          <RouterLink @click="toggleMenuClose()" to="/registrarse" style="border-left:2px solid white ;">Registrarse</RouterLink>
        </div>
        <div class="vender">
          <RouterLink @click="toggleMenuClose()" :to="{ name: 'user-menu', params: { opcion: 'crearAnuncio' } }">Vender</RouterLink>
        </div>
        <BusquedaHome @click="toggleMenuClose()" :busqueda="busquedaMandar"></BusquedaHome>

      </div>
    </div>
    <div class="nav-inferior">
      <RouterLink to="/marketplace">Marketplace</RouterLink>
      <RouterLink to="/ofertas">Ofertas</RouterLink>
      <RouterLink :to="{ name: 'juegosTipo', params: { tipo: 'baratos' } }">Juegos Baratos</RouterLink>
    </div>
  </header>

  <RouterView @click="cerrarBuscador(); toggleMenuClose()" />

  <footer :style="{ display: ocultarFooter ? 'none' : 'block' }">
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
/* Barra de navegacion */

header {
  background-color: rgb(0, 0, 0);
}

.menu-button {
  display: none;
  cursor: pointer;
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

.custom-icon {
  font-size: 22px;
  color: white;
}


/* Media Queries */
@media (max-width: 1117px) {
  .cont-nav {
    display: none;
  }

  .menu-button {
    display: block;
    margin-right: 20px;
  }

  .cont-nav.is-open {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 100px;
    right: 0;
    background-color: rgb(0, 0, 0);
    width: 100%;
    z-index: 1;
  }

  .cont-nav .search,
  .cont-nav .idiomas,
  .cont-nav .carrito,
  .cont-nav .cuentaUsuario,
  .cont-nav .vender {
    margin: 10px 20px;
  }

  .cont-nav .search input {
    width: calc(100% - 40px);
  }

  .cont-nav .vender {
    text-align: center
  }
}
</style>
