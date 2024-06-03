<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { CarritoApi } from "@/stores/carritoApi";
import { UsuarioApi } from '@/stores/usuarioApi';
import { BibliotecaApi } from '@/stores/bibliotecaAPI';
import { transaccionApi } from '@/stores/transacciones';
import ListaCarrito from '@/components/ListaCarrito.vue';

const storetransacciones = transaccionApi()
const storeBiblioteca = BibliotecaApi();
const storeUsuario = UsuarioApi();
const storeCarrito = CarritoApi()

const IdUsuario = storeUsuario.$state.usuarioId?.idUsuario
const listaCarrito = ref<any[]>([])
const idsProducto = computed(() => storeCarrito.getIdsProducto());
const idsJuego = computed(() => storeCarrito.getIdsJuego());
const saldoActual = computed(() => storeUsuario.getSaldoActual());

const totalCantidad = computed(() => storeCarrito.getCatidadCarrito());
const totalPrecio = computed(() => storeCarrito.getTotalPrecio());

const direccionUser = ref<string>()
const codigoPostalUsuer = ref<number>()

const responseMessage = ref('')
const showCarrito = ref(true);
const showDireccion = ref(true);

const datosUser = {
    idUsuario: IdUsuario,
    token: storeUsuario.getToken(),
    idCarrito: storeUsuario.$state.usuarioId?.idCarrito
}

onMounted(async () => {
    try {

        if (IdUsuario) {
            storeUsuario.getUsuarioId(IdUsuario)
            await storeCarrito.ListaCarrito(datosUser)

            listaCarrito.value = storeCarrito.listaCarrito

            direccionUser.value = storeUsuario.$state.usuarioId ? storeUsuario.$state.usuarioId?.direccion : ''
            codigoPostalUsuer.value = storeUsuario.$state.usuarioId?.codigoPostal
        }
    } catch (error) {
        console.log(error);
    }
})

const comprarProducto = async () => {
    try {

        if (totalCantidad.value > 0) {

            const nota = totalCantidad.value > 1 ? 'Compra productos' : "Compra producto"

            const transaccion = {
                idUsuario: IdUsuario,
                cantidad: totalPrecio.value,
                nota: nota
            }

            if (idsProducto.value.length != 0 || idsJuego.value.length != 0) {

                const idsCarritoProducto = listaCarrito.value.flatMap(carrito =>
                    carrito.carritoProductos.map((productoCarrito: any) => productoCarrito.carritoProductoId)
                );
                const idsCarritoJuego = listaCarrito.value.flatMap(carrito =>
                    carrito.carritoJuegos.map((juegoCarrito: any) => juegoCarrito.carritoJuegoId)
                );

                await storetransacciones.restarFondos(transaccion)

                IdUsuario && await storeBiblioteca.AñadirProductoBiblioteca(IdUsuario, idsProducto.value)
                IdUsuario && await storeBiblioteca.AñadirJuegosBiblioteca(IdUsuario, idsJuego.value)

                IdUsuario && await storeCarrito.DeleteProductosCompra(idsCarritoProducto, datosUser)
                IdUsuario && await storeCarrito.DeleteJuegosCompra(idsCarritoJuego, datosUser)

                IdUsuario && await storeCarrito.ListaCarrito(datosUser);
                IdUsuario && storeUsuario.getUsuarioId(IdUsuario)
                listaCarrito.value = []
                responseMessage.value = 'Compra exitosa';

                setTimeout(() => {
                    responseMessage.value = '';
                }, 3000);
            }

        }

    } catch (error) {
        responseMessage.value = '' + error;
        setTimeout(() => {
            responseMessage.value = '';
        }, 3000);
        console.error('Error al comprar producto:', error);
    }
}


const continuarCompra1 = () => {
    showCarrito.value = false;
}
const continuarCompra2 = () => {
    showDireccion.value = false;
}

const validarDireccion = computed(() => {

    return direccionUser.value != '' && codigoPostalUsuer.value != 0;
});

</script>

<template>
    <div v-if="showCarrito" class="carrito">
        <ListaCarrito></ListaCarrito>
        <div class="info">
            <h2>Resumen</h2>
            <h2>Cantidad: {{ totalCantidad }} </h2>
            <h2>Total: {{ totalPrecio }} €</h2>
            <button @click="continuarCompra1()">Continuar</button>
        </div>
    </div>
    <div v-else-if="idsProducto.length > 0 && showDireccion" class="direccion">
        <div class="diseño-direccion">
            <h2>Direccion</h2>
            <div>
                <p>Direccion </p>
                <input type="text" v-model="direccionUser" placeholder="direccion" required>
                <p>Codigo postal </p>
                <input type="number" v-model="codigoPostalUsuer" placeholder="codigo postal" style="color: black;"
                    required>
                <p v-if="!validarDireccion" style="color: orange;">Rellene su direccion y codigo postal</p>
            </div>
        </div>
        <div>
            <ListaCarrito></ListaCarrito>
            <button @click="continuarCompra2()" :disabled="!validarDireccion"
                style="margin-top: 20px;">Continuar</button>
        </div>
    </div>
    <div v-else class="pago">
        <div>
            <h2>Metodo de pago</h2>
            <div class="forma-pago">
                <h2> Gēmu
                    ゲーム
                </h2>
                <div>
                    <p>Billetera Gēmu </p>
                    <p>Saldo total disponible: {{ saldoActual }} $</p>
                </div>
                <v-icon>mdi-circle-slice-8</v-icon>
            </div>
        </div>
        <div style="max-width: 460px;">
            <ListaCarrito></ListaCarrito>
            <div class="info" style="margin: 20px 0; max-width: 440px; ">
                <h2>Cantidad: {{ totalCantidad }} </h2>
                <h2>Total: {{ totalPrecio }} €</h2>
                <button @click="comprarProducto()">Comprar</button>
                <v-alert v-if="responseMessage" :value="true"
                    :type="responseMessage.includes('exitosa') ? 'success' : 'error'">
                    {{ responseMessage }}
                </v-alert>
                <h5 style="margin-top: 20px;">Al hacer clic en "Continuar", admito que he leído y aceptado los
                    Términos y condiciones incluida la Política de privacidad y los
                    Cookies.
                </h5>
            </div>
        </div>
    </div>
</template>

<style scoped>
.pago {
    display: flex;
}

.direccion {
    display: flex;
}

.diseño-direccion {
    background-color: #491F6A;
    margin-right: 40px;
    min-width: 300px;
    max-height: 300px;
    padding: 10px;
    border-radius: 5px;
}

.diseño-direccion input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    outline: none;

    width: 90%;
    background-color: rgb(213, 200, 236);
    height: 30px;
    color: black;
    padding-left: 10px;
    margin: 10px;
}

.forma-pago {
    background-color: #491F6A;
    display: flex;
    margin-right: 40px;
    max-height: 100px;
    padding: 10px;
    border-radius: 5px;
}

.carrito {
    display: flex;
}

.lista {
    background-color: #491F6A;
    padding: 20px;
    border-radius: 5px;
    margin-right: 20px;
    min-height: 300px;
    min-width: 400px;
}

.caja-producto {
    display: flex;
    background-color: #5C2C83;
    border: 2px solid #A140B9;
    justify-content: space-between;
    min-width: 400px;
    margin: 20px 0;
}

.caja-producto img {
    height: 130px;
}

.info {
    background-color: #491F6A;
    padding: 20px;
    border-radius: 5px;
    margin-left: 20px;
    max-height: 300px;

}

button {
    background-color: #F8C032;
    border-radius: 3px;
    color: black;
    padding: 5px 10px 5px 10px;
    text-align: center;
}

.info button:hover {
    background-color: #af712b;
    color: rgb(255, 255, 255);
}

@media (max-width: 870px) {

    .carrito {
        display: grid;
    }

    .info {
        margin: 20px 0;
    }

    .direccion {
        display: grid;
    }

    .diseño-direccion {
        margin-bottom: 30px;
    }

    .pago {
        display: grid;
    }

    .forma-pago {
        margin-bottom: 20px
    }
}
</style>