<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { transaccionApi } from '@/stores/transacciones';
import { UsuarioApi } from '@/stores/usuarioApi';

const datosUsuario = UsuarioApi();
const transactionStore = transaccionApi();

const saldoActual = ref(datosUsuario.$state.saldoActual)
const IdUsuario = datosUsuario.$state.usuarioId?.idUsuario
const historial = ref<any[]>([]);

const ordenSeleccionado = ref('inicio-fin');

const ordenarHistorial = () => {
    if (ordenSeleccionado.value === 'inicio-fin') {
        historial.value.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
    } else {
        historial.value.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
    }
}

const formatoFecha = (fecha: string) => {
    const date = new Date(fecha);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${month}/${day}/${year}`;
}

onMounted(async () => {
    try {
        IdUsuario && await transactionStore.historialTransacciones(IdUsuario)
        historial.value = transactionStore.listaTransacciones;
    } catch (error) {
        console.log(error)
    }
})

watch(ordenSeleccionado, ordenarHistorial);
</script>

<template>
    <div class="cont-Info">
        <h2>Informacion billetera</h2>
        <div class="bloque">
            <div class="cajas">
                <h2>Mi billetera</h2>
            </div>
            <div class="cajas">
                <p>Saldo actual: </p>
                <p class="saldo"> {{ saldoActual }} €</p>
            </div>
        </div>
        <div class="bloque">
            <div class="cajas">
                <h2>Historial</h2>
            </div>
            <div class="ordenar">
                <label>Ordenar por fecha:</label>
                <select v-model="ordenSeleccionado">
                    <option style="color: black;" value="inicio-fin">Inicio a Fin</option>
                    <option style="color: black;" value="fin-inicio">Fin a Inicio</option>
                </select>
            </div>
            <div class="cajas2">
                <div class="anotaciones top-tabla">
                    <h3>Total</h3>
                    <h3>Fecha</h3>
                    <h3>Cantidad</h3>
                    <h3>Motivo</h3>
                </div>
                <div v-if="historial.length === 0">
                    <p style="text-align: center; margin-top: 60px;">No tienes un historial</p>
                </div>
                <div v-else>
                    <div v-for=" transaccion of historial" :key="transaccion.idTransaccion">
                        <div class="anotaciones">
                            <p> {{ transaccion.total }} €</p>
                            <p>{{ formatoFecha(transaccion.fecha) }}</p>
                            <p> {{ transaccion.cantidad }} €</p>
                            <p>{{ transaccion.nota }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.top-tabla {
    background-color: #DFC0F6;
}

/* Anotaciones */
.anotaciones {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    text-align: center;
}

.anotaciones h3 {
    color: #7852A9;
}

.anotaciones p {
    margin-top: 10px;
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