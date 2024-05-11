<script setup lang="ts">
import { UsuarioApi } from '@/stores/usuarioApi';
import { onMounted } from 'vue';
const datosUsuario = UsuarioApi();

const IdUsuario = datosUsuario.$state.usuarioId?.idUsuario
onMounted(async () => {

    if (!IdUsuario) {
        throw new Error("No se pudo obtener el ID");

    }

    datosUsuario.getUsuarioId(IdUsuario)
}) 
</script>

<template>
    <div class="cont-Info">
        <h2>Informacion General</h2>

        <div class="bloque">
            <div class="cajas">
                <h2>Perfil</h2>
            </div>
            <div class="cajas">
                <v-icon>mdi-account-circle</v-icon>
                <div>
                    <h3>
                        {{ datosUsuario.$state.usuarioId?.nombre }}
                    </h3>
                    <h5>
                        {{ datosUsuario.$state.usuarioId?.correo }}
                    </h5>
                </div>
            </div>
        </div>

        <div class="bloque">
            <div class="cajas">
                <h2>Mi billetera</h2>
            </div>
            <div class="cajas">
                <p>Saldo actual: </p>
                <p class="saldo">$ {{ datosUsuario.$state.usuarioId?.saldoActual }}</p>
            </div>
        </div>

        <div class="bloque">
            <div class="cajas">
                <h2>Ultimas compras</h2>
            </div>
            <div class="cajas">

            </div>
        </div>
    </div>
</template>
<style scoped>
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