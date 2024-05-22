<script setup lang="ts">

</script>

<template>
    <main>
        <div class="contenedorError">
            <v-empty-state headline="Whoops" title="Parece que la dirección URL no es correcta"
                image="https://vuetifyjs.b-cdn.net/docs/images/components/v-empty-state/astro-cat.svg">
            </v-empty-state>
        </div>
    </main>
</template>

<style scoped>
.contenedorError {
    margin: 150px auto;
    text-align: center;
    color: none;
}
</style>