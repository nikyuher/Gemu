<script setup lang="ts">
import { UsuarioApi } from '@/stores/usuarioApi';
import { transaccionApi } from '@/stores/transacciones';
import { ref } from 'vue'

const datosUsuario = UsuarioApi();
const transacciones = transaccionApi()

const idUser = datosUsuario.$state.usuarioId?.idUsuario
const responseMessage = ref('');

const cantidad = ref()

const RestarFondos = async () => {
    try {

        const newTransaction = {
            idUsuario: idUser,
            cantidad: cantidad.value,
            nota: "Retiro"
        }

        await transacciones.restarFondos(newTransaction)

        cantidad.value = 0

        responseMessage.value = 'Retiro exitoso';

        setTimeout(() => {
            responseMessage.value = '';
        }, 3000);
    } catch (error) {
        responseMessage.value = '' + error;
        setTimeout(() => {
            responseMessage.value = '';
        }, 3000);
        console.error('Error al retirar fondos:', error);
    }
}

</script>

<template>
    <div class="cont-Info">
        <h2>Retirar fondos</h2>

        <div class="bloque">
            <div class="cajas">
                <h2>Retirar cantidad</h2>
            </div>
            <form @submit.prevent="RestarFondos()">
                <v-alert v-if="responseMessage" :value="true"
                    :type="responseMessage.includes('exitoso') ? 'success' : 'error'">
                    {{ responseMessage }}
                </v-alert>
                <div class="cajas">
                    <div class="conInput">
                        <input type="number" class="cont-numero" v-model="cantidad">
                        <div class="tipoMoneda">
                            <p>Euro(€)</p>
                        </div>
                    </div>
                </div>
                <div class="confirmar">
                    <input type="submit" value="Confirmar">
                </div>
            </form>
        </div>
    </div>
</template>
<style scoped>
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

    width: 100%;
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