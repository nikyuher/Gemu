<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { UsuarioApi } from '@/stores/usuarioApi';

const storeUsuario = UsuarioApi();

const token = storeUsuario.getToken();

const idAdmin = storeUsuario.$state.usuarioId?.idUsuario;
const listaUsuarios = computed(() => storeUsuario.listaUsuarios);
const rolSelect = ref<string>('1');
const rolFiltro = ref<string>('todos');
const responseMessage = ref('');
const terminosBusqueda = ref('');

onMounted(async () => {
    try {
        if (idAdmin) {
            await storeUsuario.getAllUsuario();
        } else {
            console.error('IdUsuario no definido');
        }
    } catch (error) {
        console.log(error);
    }
});

const EliminarUsuario = async (idUsuario: number) => {
    if (idUsuario && idAdmin && token) {
        try {
            await storeUsuario.EliminarUsuario(idUsuario);

            const index = listaUsuarios.value.findIndex(anuncio => anuncio.idUsuario === idUsuario);
            if (index !== -1) {
                listaUsuarios.value.splice(index, 1);
            }
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
        }
    }
};

const ActualizarRol = async (idUsuario: number) => {
    try {
        if (idUsuario && idAdmin && token) {
            const datos = {
                idUsuario: idUsuario,
                idRol: Number(rolSelect.value),
            };
            await storeUsuario.updateRol(datos);
            await storeUsuario.getAllUsuario();

            responseMessage.value = 'Actualizado exitosamente';
            setTimeout(() => {
                responseMessage.value = '';
            }, 3000);
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error(error);
            responseMessage.value = error.message || 'Error al actualizar el rol.';
            setTimeout(() => {
                responseMessage.value = '';
            }, 3000);
        } else {
            throw new Error(String(error));
        }
    }
};

const usuariosFiltrado = computed(() => {
    let usuarios = listaUsuarios.value;

    if (terminosBusqueda.value) {
        const filtro = terminosBusqueda.value.toLowerCase();
        usuarios = usuarios.filter(usuario => usuario.nombre.toLowerCase().includes(filtro));
    }

    if (rolFiltro.value !== 'todos') {
        usuarios = usuarios.filter(usuario => usuario.rol === rolFiltro.value);
    }

    return usuarios;
});
</script>

<template>
    <div class="cont-Info">
        <h2>Lista Usuarios</h2>
        <div class="bloque">
            <div class="cajas">
                <div class="search">
                    <input type="search" v-model="terminosBusqueda" placeholder="Buscar por nombre">
                </div>
            </div>
        </div>
        <div class="ordenar">
            <label>Filtrar por rol:</label>
            <select v-model="rolFiltro">
                <option value="todos">Todos</option>
                <option value="Usuario">Usuario</option>
                <option value="Admin">Admin</option>
            </select>
        </div>
        <div class="bloque">
            <div class="cajas2">
                <div class="anotaciones top-tabla">
                    <p></p>
                    <h3>Nombre</h3>
                    <h3>Correo</h3>
                    <h3>Rol</h3>
                </div>
                <div v-if="usuariosFiltrado.length > 0" style="padding-bottom: 30px;">
                    <div v-for="usuario of usuariosFiltrado" :key="usuario.idUsuario" class="anotaciones">
                        <v-btn @click="EliminarUsuario(usuario.idUsuario)" color="red"
                            style="width: 5px; margin: auto;">
                            <v-icon size="25">mdi-delete</v-icon>
                        </v-btn>
                        <p>{{ usuario.nombre }}</p>
                        <p>{{ usuario.correo }}</p>
                        <p>{{ usuario.rol }}</p>
                        <v-dialog max-width="500">
                            <template v-slot:activator="{ props: activatorProps }">
                                <v-btn v-bind="activatorProps" rounded color="purple"
                                    style="width: 10px; margin: auto;">
                                    <v-icon size="25">mdi-pencil</v-icon>
                                </v-btn>
                            </template>
                            <template v-slot:default>
                                <div class="caja-key update-producto-container">
                                    <div class="cont-put-rol">
                                        <h3>Actualizar Rol</h3>
                                        <p>Rol actual: {{ usuario.rol }}</p>
                                        <select v-model="rolSelect">
                                            <option value="1">Usuario</option>
                                            <option value="2">Admin</option>
                                        </select>
                                        <v-btn @click="ActualizarRol(usuario.idUsuario)" color="orange"
                                            style="margin: auto;">
                                            Actualizar
                                        </v-btn>
                                        <v-alert v-if="responseMessage" :value="true"
                                            :type="responseMessage.includes('exitosamente') ? 'success' : 'error'">
                                            {{ responseMessage }}
                                        </v-alert>
                                    </div>
                                </div>
                            </template>
                        </v-dialog>
                    </div>
                </div>
                <div v-else>
                    <p style="text-align: center; margin-top: 60px;">No hay datos disponibles</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.cont-put-rol {
    background-color: #FFFFFF;
    display: grid;
    min-width: 300px;
    min-height: 300px;
    align-items: center;
}

.cont-put-rol h3 {
    color: #682E83;
    font-size: 23px;
}

select,
option {

    text-align: center;
    color: black;
}

.boton-mostrar-mas {
    display: flex;
    margin: auto;
    text-align: center;
    align-items: center;
    background-color: #682E83;
    border: 1px solid white;
    padding: 10px 20px 10px 20px;
}

.ocultar {
    display: none;
}

.update-producto-container {
    max-height: 600px;
    overflow-y: auto;
    overflow-x: hidden;
}

.update-producto-container::-webkit-scrollbar {
    display: none;
}

/* Search */
.search {
    border: 2px solid #714FAA;
    height: 40px;
    width: 300px;
    align-items: center;
    text-align: center;
}

.search input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    outline: none;
    width: 90%;
    height: 40px;
    color: black;

}

/* Boton key juego */
.caja-key {
    background-color: #491F6A;
    max-width: 600px;
    text-align: center;
    align-items: center;
    border-radius: 10px;
    margin: auto
}

.top-tabla {
    background-color: #DFC0F6;
}

/* Anotaciones */
.anotaciones {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    text-align: center;
    align-items: center;
}


.anotaciones h3 {
    color: #7852A9;
}

.anotaciones p {
    margin-top: 10px;
    padding: 20px 0;
}

/* Saldo Actual */
p {
    color: black;
}

.saldo {
    margin-left: 20px;
    color: rgb(35, 175, 35);
    font-size: 30px;
}

/* contenedores */

.cont-Info {
    width: 100%;
}

.cont-Info h2 {
    color: #7852A9;
}

.cajas {
    min-height: 80px;
    background-color: #FFFFFF;
    align-items: center;
    display: flex;
    margin: 6px 0 6px 0;
    padding-left: 30px;
    color: black;
}

.cajas2 {
    min-height: 200px;
    background-color: #FFFFFF;
    margin: 6px 0 6px 0;
    color: black;
}

.cajas .v-icon {
    color: black;
    font-size: 50px;
}

.cajas h2 {
    color: black;
}

.bloque {
    margin: 50px 0 20px 0
}

/* Ordenar select */
.ordenar {
    display: flex;
    justify-content: flex-end;
    margin: 10px;
    align-items: center;
}

.ordenar label {
    margin-right: 10px;
    color: #7852A9;
}

.ordenar select {
    padding: 5px;
    color: #7852A9;
}
</style>