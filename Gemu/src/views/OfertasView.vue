<script setup lang="ts">
import JuegosOfertasPaginados from "@/components/Paginados/JuegosOfertasPaginados.vue";
</script>

<template>
  <main>
    <div class="banner">
      <img src="@/assets/Images/Ofertas.jpg" alt="IMAGEN">
    </div>
    <section>
      <article>
        <JuegosOfertasPaginados></JuegosOfertasPaginados>
      </article>
    </section>
  </main>
</template>

<style>
* {
  color: white;
}

.banner img {
  width: 100%;
}

main {
  margin: auto;
}

.banner img {
  width: 100%;
}
</style>
