<script setup lang="ts">
import CategoriasHome from '@/components/CategoriasHome.vue';


</script>

<template>
  <main>
    <div class="banner">
      <img src="@/assets/Images/BannerHome.jpg" alt="IMAGEN">
    </div>
    <section>
      <article>
        <div class="plataformas">
          <div class="caja">
            <v-icon>mdi-laptop</v-icon>
            <p>PC</p>
          </div>
          <div class="caja">
            <v-icon>mdi-sony-playstation</v-icon>
            <p>PlayStation</p>
          </div>
          <div class="caja">
            <v-icon>mdi-microsoft-xbox</v-icon>
            <p>Xbox</p>
          </div>
          <div class="caja">
            <v-icon>mdi-nintendo-switch</v-icon>
            <p>Nintendo</p>
          </div>
        </div>
      </article>
      <article>
        <h2>Juegos Recomendados</h2>
      </article>
      <article>
        <h2>Juegos Gratuitos</h2>
      </article>
      <article>
        <h2>Productos en Venta</h2>
      </article>
      <article>
        <CategoriasHome></CategoriasHome>
      </article>
      <article>
        <div class="ProximosLanzamientos">
          <h2>Proximos Lanzamientos</h2>
        </div>
      </article>
    </section>
  </main>
</template>

<style>
* {
  color: white;
}

article {
  width: 95%;
  margin: auto;
}

main {
  margin: auto;
}

.banner img {
  width: 100%;
}

.plataformas {
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-evenly;
  margin: 100px 0;
}

.caja {
  padding: 30px;
  background-color: #491F6A;
  border: 1px solid #D550F6;
}

.caja .v-icon {
  font-size: 90px;
}

.ProximosLanzamientos {
  background-color: #412360;
}
</style>
