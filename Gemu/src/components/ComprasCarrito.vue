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
const idsProducto = ref<number[]>([])
const idsJuego = ref<number[]>([])
const saldoActual = computed(() => storeUsuario.getSaldoActual());

const totalCantidad = computed(() => storeCarrito.getCatidadCarrito());
const totalPrecio = computed(() => storeCarrito.getTotalPrecio());

const responseMessage = ref('')

onMounted(async () => {
    try {

        if (IdUsuario) {
            storeUsuario.getUsuarioId(IdUsuario)
            await storeCarrito.ListaCarrito(IdUsuario)

            listaCarrito.value = storeCarrito.listaCarrito

            idsProducto.value = listaCarrito.value.flatMap(carrito =>
                carrito.carritoProductos.map((productoCarrito: any) => productoCarrito.productoId)
            );
            idsJuego.value = listaCarrito.value.flatMap(carrito =>
                carrito.carritoJuegos.map((juegoCarrito: any) => juegoCarrito.juegoId)
            );
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


            if (IdUsuario && idsProducto.value != null) {

                const idsCarritoProducto = listaCarrito.value.flatMap(carrito =>
                    carrito.carritoProductos.map((productoCarrito: any) => productoCarrito.carritoProductoId)
                );
                const idsCarritoJuego = listaCarrito.value.flatMap(carrito =>
                    carrito.carritoJuegos.map((juegoCarrito: any) => juegoCarrito.carritoJuegoId)
                );

                await storetransacciones.restarFondos(transaccion)

                await storeBiblioteca.AñadirProductoBiblioteca(IdUsuario, idsProducto.value)
                await storeBiblioteca.AñadirJuegosBiblioteca(IdUsuario, idsJuego.value)

                await storeCarrito.DeleteProductosCompra(idsCarritoProducto, IdUsuario)
                await storeCarrito.DeleteJuegosCompra(idsCarritoJuego, IdUsuario)

                await storeCarrito.ListaCarrito(IdUsuario);
                storeUsuario.getUsuarioId(IdUsuario)
                listaCarrito.value = []
            }
            responseMessage.value = 'Compra exitosa';

            setTimeout(() => {
                responseMessage.value = '';
            }, 3000);

        }

    } catch (error) {
        responseMessage.value = '' + error;
        setTimeout(() => {
            responseMessage.value = '';
        }, 3000);
        console.error('Error al comprar producto:', error);
    }
}

</script>

<template>
    <div class="carrito">
        <ListaCarrito></ListaCarrito>
        <div class="info">
            <h2>Resumen</h2>
            <h2>Cantidad: {{ totalCantidad }} </h2>
            <h2>Total: {{ totalPrecio }} €</h2>
            <button>Continuar con la compra</button>
        </div>
    </div>
    <div class="pago">
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

.info button {
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
</style>