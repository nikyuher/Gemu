<script setup lang="ts">
import { UsuarioApi } from '@/stores/usuarioApi';
import { ref } from 'vue'

const datosUsuario = UsuarioApi();

const idUser = datosUsuario.$state.usuarioId?.idUsuario
const responseMessage = ref('');

const nombre = ref(datosUsuario.$state.usuarioId?.nombre)
const correo = ref(datosUsuario.$state.usuarioId?.correo)

const direccion = ref(datosUsuario.$state.usuarioId?.direccion)
const codigoPostal = ref(datosUsuario.$state.usuarioId?.codigoPostal)

const putDatosUser = async () => {
    try {

        const newData = {
            idUsuario: idUser,
            nombre: nombre.value,
            correo: correo.value
        }

        await datosUsuario.updateDatos(newData)

        responseMessage.value = 'Cambio exitoso';

        setTimeout(() => {
            responseMessage.value = '';
        }, 3000);

    } catch (error) {
        if (error instanceof Error) {
            console.error(error);

            responseMessage.value = error.message || 'Error al actualizar.';
            setTimeout(() => {
                responseMessage.value = '';
            }, 3000);
        } else {
            throw new Error(String(error));
        }
    }
}

const putDireccionUser = async () => {
    try {

        const newData = {
            idUsuario: idUser,
            direccion: direccion.value,
            codigoPostal: codigoPostal.value
        }

        await datosUsuario.updateDireccion(newData)

        responseMessage.value = 'Cambio exitoso';

        setTimeout(() => {
            responseMessage.value = '';
        }, 3000);

    } catch (error) {
        if (error instanceof Error) {
            console.error(error);

            responseMessage.value = error.message || 'Error al actualizar.';
            setTimeout(() => {
                responseMessage.value = '';
            }, 3000);
        } else {
            throw new Error(String(error));
        }
    }
}

</script>

<template>
    <div class="cont-Info">
        <h2>Información Personal</h2>
        <div class="bloque">
            <div class="cajas">
                <div class="cajas2">
                    <h2>Datos Usuario</h2>
                    <v-dialog max-width="500">
                        <template v-slot:activator="{ props: activatorProps }">
                            <v-btn v-bind="activatorProps" rounded>
                                <v-icon size="25">mdi-pencil</v-icon>
                            </v-btn>
                        </template>
                        <template v-slot:default>
                            <div class="cajaPut">
                                <form @submit.prevent="putDatosUser()">
                                    <label for="nombre">Nombre</label>
                                    <input type="text" v-model="nombre" required class="input-diseño">
                                    <label for="nombre">Correo</label>
                                    <input type="text" v-model="correo" required class="input-diseño">
                                    <input type="submit" value="Enviar" class="botonEnviar">
                                    <v-alert v-if="responseMessage" :value="true"
                                        :type="responseMessage.includes('exitoso') ? 'success' : 'error'">
                                        {{ responseMessage }}
                                    </v-alert>
                                </form>
                            </div>
                        </template>
                    </v-dialog>
                    <h4>Nombre</h4>
                    <p>{{ nombre }}</p>
                    <h4>Correo</h4>
                    <p>{{ correo }}</p>
                </div>
            </div>
        </div>
        <div class="bloque">
            <div class="cajas">
                <div class="cajas2">
                    <h2>Datos Direccion</h2>
                    <v-dialog max-width="500">
                        <template v-slot:activator="{ props: activatorProps }">
                            <v-btn v-bind="activatorProps" rounded>
                                <v-icon size="25">mdi-pencil</v-icon>
                            </v-btn>
                        </template>
                        <template v-slot:default>
                            <div class="cajaPut">
                                <form @submit.prevent="putDireccionUser()">
                                    <label for="nombre">Direccion</label>
                                    <input type="text" id="nombre" v-model="direccion" required class="input-diseño">
                                    <label for="nombre">Codigo postal</label>
                                    <input type="number" id="nombre" v-model="codigoPostal" required
                                        class="input-diseño">
                                    <input type="submit" value="Enviar" class="botonEnviar">
                                    <v-alert v-if="responseMessage" :value="true"
                                        :type="responseMessage.includes('exitoso') ? 'success' : 'error'">
                                        {{ responseMessage }}
                                    </v-alert>
                                </form>
                            </div>
                        </template>
                    </v-dialog>
                    <h4>Direccion</h4>
                    <p>{{ direccion || 'Falta rellenar' }}</p>
                    <h4>Codigo postal</h4>
                    <p>{{ codigoPostal }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
input {
    color: black
}

label {
    color: rgb(119, 39, 165);
    font-size: 20px;
}

.cajaPut {
    min-width: 400px;
    background-color: white;
    display: block;
    padding: 20px;
}

.cajaPut label,
input {
    width: 100%;
}

.botonEnviar {
    color: black;
    background-color: #F8C032;
    height: 30px;
}

.botonEnviar:hover {
    color: rgb(255, 255, 255);
    background-color: #af851c;
}

.input-diseño {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    outline: none;

    width: 100%;
    background-color: #c0c0c0;
    border: 1px solid #D550F6;
    height: 50px;
}

/* contenedores */
.cont-Info {
    width: 95%;
}

.cont-Info h2 {
    color: #7852A9;
}

.cajas {
    min-height: 80px;
    background-color: #FFFFFF;
    align-items: center;
    margin: 6px 0 6px 0;
    display: flex;
    padding-left: 30px;
}

.cajas2 p {
    color: rgb(143, 143, 143);
}

.cajas .v-icon {
    color: black;
    font-size: 50px;
}

.cajas h2 {
    color: black;
}

.bloque {
    margin: 50px 0 20px 0;
}

h4 {
    color: black;
}
</style>