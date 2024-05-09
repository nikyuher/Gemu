<script setup lang="ts">
import { ref } from "vue";

const comentario = ref('');
</script>
<template>
    <main>
        <div>
            <h2>Opinión</h2>
            <p>¡Ayuda a otros jugadores a elegir! Esta reseña debe contener tu opinión personal del
                juego en términos de jugabilidad, gráficos, banda sonora e historia.</p>
            <p>Para garantizar la calidad, tu opinión será revisada por moderadores de Gēmu.com.
                Recibirás una notificación cuando se publique.</p>
            <p>Tu reseña debe contener al menos 150 caracteres.</p>
            <h2>Mi valoración</h2>
            <form action="">
                <input type="text" v-model="comentario">
                <input type="submit" value="Enviar">
            </form>
        </div>
    </main>
</template>
<style scoped></style>