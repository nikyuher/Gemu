<script setup lang="ts">
import { UsuarioApi } from '@/stores/usuarioApi';
import { transaccionApi } from '@/stores/transacciones';
import { ref } from 'vue'

const datosUsuario = UsuarioApi();

const idUser = datosUsuario.$state.usuarioId?.idUsuario
const responseMessage = ref('');

const nombreProducto = ref()
const precio = ref()
const descripcion = ref()

const AñadirFondos = async () => {
    try {



        responseMessage.value = 'Publicado exitosamente';

        setTimeout(() => {
            responseMessage.value = '';
        }, 3000);
    } catch (error) {

        responseMessage.value = '' + error;
        setTimeout(() => {
            responseMessage.value = '';
        }, 3000);
        console.error('Error al añadir fondos:', error);
    }
}

</script>

<template>
    <div class="cont-Info">
        <h2>Crear anuncio</h2>

        <div class="bloque">
            <form @submit.prevent="AñadirFondos()">
                <div class="cajas">
                    <div class="conInput">
                        <div class="cajas2">
                            <h3>Nombre del producto</h3>
                            <input type="text" class="cont-numero" v-model="nombreProducto"
                                placeholder="Nombre del producto">
                        </div>
                    </div>
                </div>
                <div class="cajas">
                    <div class="cajas2">
                        <h3>Fotos</h3>
                    </div>
                </div>
                <div class="cajas">
                    <div class="cajas2">
                        <h3>Describe el estado</h3>
                        <select>
                            <option value="nuevo">Nuevo</option>
                            <option value="casiNuevo">Casi nuevo</option>
                            <option value="buenEstado">Buen estado</option>
                            <option value="usado">Usado</option>
                        </select>
                        <h3>Proporcion mas detalles del producto</h3>
                        <textarea name="descripcion" v-model="descripcion"
                            placeholder="Proporciona más detalles del producto" maxlength="500" rows="4"
                            style="color: black; width: 500px; max-height: 200px; resize: none;"></textarea>
                    </div>
                </div>
                <div class="cajas">
                    <div class="caja2">
                        <h3>Precio</h3>
                        <div class="conInput">
                            <input type="number" class="cont-numero" v-model="precio">
                            <div class="tipoMoneda">
                                <p>Euro(€)</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cajas">
                    <div class="cajas2">
                        <h3>Etiquetas</h3>
                    </div>
                </div>
                <v-alert v-if="responseMessage" :value="true"
                    :type="responseMessage.includes('exitosamente') ? 'success' : 'error'">
                    {{ responseMessage }}
                </v-alert>
                <div class="confirmar">
                    <input type="submit" value="Publicar">
                </div>
            </form>
        </div>
    </div>
</template>
<style scoped>
.cajas2 select,
option {
    color: black;
}

/* Boton Vender */
/* Vender */
.tipoMoneda {
    color: black;
    border: 2px solid #714FAA;
    height: 30px;
    width: 100px;
    text-align: center;
    margin-left: 30px;
}

.conInput {
    display: flex;
    margin: 10px 0;
}

.cont-numero {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    outline: none;

    width: 90%;
    background-color: transparent;
    border: 2px solid #714FAA;
    height: 30px;
    color: black;
}

.confirmar {
    background-color: #F8C032;
    border-radius: 3px;
    color: black;
    padding: 5px 10px 5px 10px;
    text-align: center;
    margin: 10px 0;
    width: 200px;
}

.confirmar input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    outline: none;

    width: 100%;
    height: 50px;
}

.confirmar a {
    color: inherit;
    text-decoration: none;
}

.confirmar:hover {
    background-color: #e48820;
    border-radius: 3px;
    color: rgb(255, 255, 255);
    padding: 5px 10px 5px 10px;
}

p,
h3 {
    color: black;
}

h5 {
    color: gray;
}

.saldo {
    margin-left: 20px;
    color: rgb(35, 175, 35);
    font-size: 30px;
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
    padding-left: 30px
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
</style>