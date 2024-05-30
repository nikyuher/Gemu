<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { RouterLink } from 'vue-router'
import { CategoriaApi } from '@/stores/categoriasApi';

const props = defineProps<{
    plataforma?: boolean;
}>();

const storeCategoria = CategoriaApi()
const mostrarTodo = ref(false);

const listaCategorias = ref<any[]>([])

onMounted(async () => {

    await storeCategoria.GetCategoriaSeccion('juegos')
    listaCategorias.value = storeCategoria.listaCategoriaSeccion

    if (props.plataforma) {
        await storeCategoria.GetCategoriaSeccion('plataforma')
        listaCategorias.value = storeCategoria.listaCategoriaPlataforma
    }
})

const categoriasFiltradas = computed(() => {
    return mostrarTodo.value ? listaCategorias.value : listaCategorias.value.slice(0, 4);
});

const toggleMostrarTodo = () => {
    mostrarTodo.value = !mostrarTodo.value;
};
</script>
<template>
    <div v-if="plataforma">
        <div class="plataformas">
            <div v-for="categoria of categoriasFiltradas" :key="categoria.idCategoria">
                <router-link
                    :to="{ name: 'filtro', params: { opcion: 'juegos', categoria: categoria.nombre, id: categoria.idCategoria } }">
                    <div class="caja">
                        <v-icon>{{ categoria.icono }}</v-icon>
                        <p>{{ categoria.nombre }}</p>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
    <div v-else>
        <h2>Categorias</h2>
        <div class="categorias">
            <div class="ajustes-categoria">
                <div v-for="categoria of categoriasFiltradas" :key="categoria.idCategoria">
                    <router-link
                        :to="{ name: 'filtro', params: { opcion: 'juegos', categoria: categoria.nombre, id: categoria.idCategoria } }">
                        <div class="caja">
                            <v-icon>{{ categoria.icono }}</v-icon>
                            <p>{{ categoria.nombre }}</p>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="boton">
            <button @click="toggleMostrarTodo">
                {{ mostrarTodo ? 'Mostrar menos' : 'Mostrar todo' }}
            </button>
        </div>
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

.plataformas {
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: space-evenly;
    margin: 100px 0;
}
</style>
