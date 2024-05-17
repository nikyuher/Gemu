<script setup lang="ts">
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router'

const mostrarTodo = ref(false);

const categorias = [
    { nombre: 'Terror', icono: 'mdi-ghost' },
    { nombre: 'Aventura', icono: 'mdi-sword' },
    { nombre: 'Accion', icono: 'mdi-kabaddi' },
    { nombre: 'Fps', icono: 'mdi-car-light-high' },
    { nombre: 'Carrera', icono: 'mdi-car-sports' },
    { nombre: 'Un jugador', icono: 'mdi-account' },
    { nombre: 'Lucha', icono: 'mdi-karate' },
    { nombre: 'Multijugador', icono: 'mdi-controller-classic' },
    { nombre: 'Mundo abierto', icono: 'mdi-island-variant' },
    { nombre: 'Estrategia', icono: 'mdi-chess-pawn' }
];

const categoriasFiltradas = computed(() => {
    return mostrarTodo.value ? categorias : categorias.slice(0, 4);
});

const toggleMostrarTodo = () => {
    mostrarTodo.value = !mostrarTodo.value;
};
</script>
<template>
    <h2>Categorias</h2>
    <div class="categorias">
        <div class="ajustes-categoria">
            <div v-for="(categoria, index) in categoriasFiltradas" :key="index">
                <div class="caja">
                    <v-icon>{{ categoria.icono }}</v-icon>
                    <p>{{ categoria.nombre }}</p>
                </div>
            </div>
        </div>
    </div>
    <div class="boton">
        <button @click="toggleMostrarTodo">
            {{ mostrarTodo ? 'Mostrar menos' : 'Mostrar todo' }}
        </button>
    </div>
</template>
<style scoped>
.ajustes-categoria {
    width: 80%;
    display: flex;
    margin: auto;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
}

.boton {
    text-align: center;
    margin: 50px;
}

.boton button {
    width: 200px;
    background-color: #682E83;
    border: 2px solid #FFFFFF;
}

.categorias {
    display: flex;
    align-items: center;
    text-align: center;
}

.caja {
    padding: 30px;
    background-color: #491F6A;
    border: 1px solid #D550F6;
}

.caja:hover {
    padding: 30px;
    background-color: #2a113d;
    border: 1px solid #D550F6;
}

.caja .v-icon {
    font-size: 90px;
}
</style>
