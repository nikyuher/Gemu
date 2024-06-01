<script setup lang="ts">
import CategoriasHome from '@/components/CategoriasHome.vue';
import JuegosGratisPaginado from '@/components/Paginados/JuegosGratisPaginado.vue';
import JuegosPaginados from '@/components/Paginados/JuegosPaginados.vue';
import ProductosPaginados from '@/components/Paginados/ProductosPaginados.vue';

</script>

<template>
  <main>
    <div class="banner">
      <img src="@/assets/Images/BannerHome.jpg" alt="IMAGEN">
    </div>
    <section>
      <article>
        <CategoriasHome :plataforma="true"></CategoriasHome>
      </article>
      <article>
        <h2>Juegos Generales</h2>
        <JuegosPaginados :validacion="true"></JuegosPaginados>
      </article>
      <article>
        <h2>Juegos Gratuitos</h2>
        <JuegosGratisPaginado :validacion="true"></JuegosGratisPaginado>
      </article>
      <article>
        <h2>Productos en Venta</h2>
        <ProductosPaginados :validacion="true"></ProductosPaginados>
      </article>
      <article>
        <CategoriasHome></CategoriasHome>
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
