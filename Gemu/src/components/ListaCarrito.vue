<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { CarritoApi } from "@/stores/carritoApi";
import { UsuarioApi } from '@/stores/usuarioApi';
import { BibliotecaApi } from '@/stores/bibliotecaAPI';
import { transaccionApi } from '@/stores/transacciones';

const storetransacciones = transaccionApi()
const storeBiblioteca = BibliotecaApi();
const storeUsuario = UsuarioApi();
const storeCarrito = CarritoApi()

const IdUsuario = storeUsuario.$state.usuarioId?.idUsuario
const listaCarrito = ref<any[]>([])
const idsProducto = ref<number[]>([])
const saldoActual = ref(storeUsuario.$state.saldoActual)
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

        }
    } catch (error) {
        console.log(error);

    }
})

const EliminarProducto = async (idLista: number, productoId: number) => {

    try {
        if (IdUsuario) {
            await storeCarrito.DeleteProductoCarrito(idLista, IdUsuario)
            listaCarrito.value.forEach((carrito: any) => {
                const index = carrito.carritoProductos.findIndex((productoCarrito: any) => productoCarrito.carritoProductoId === idLista);
                if (index !== -1) {
                    carrito.carritoProductos.splice(index, 1);

                    const idIndex = idsProducto.value.indexOf(productoId);
                    if (idIndex !== -1) {
                        idsProducto.value.splice(idIndex, 1);
                    }
                }
            });
        }
    } catch (error) {
        console.log(error);

    }
}

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
                const idsCarrito = listaCarrito.value.flatMap(carrito =>
                    carrito.carritoProductos.map((productoCarrito: any) => productoCarrito.carritoProductoId)
                );

                await storetransacciones.restarFondos(transaccion)
                await storeBiblioteca.AñadirProductoBiblioteca(IdUsuario, idsProducto.value)
                await storeCarrito.DeleteProductosCompra(idsCarrito, IdUsuario)

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

const totalCantidad = computed(() => {
    return listaCarrito.value.reduce((total: number, carrito: any) => {
        return total + carrito.carritoProductos.length;
    }, 0);
});

const totalPrecio = computed(() => {
    return listaCarrito.value.reduce((total: number, carrito: any) => {
        return total + carrito.carritoProductos.reduce((sum: number, producto: any) => sum + producto.producto.precio, 0);
    }, 0);
});
</script>

<template>
    <div class="carrito">
        <div class="lista">
            <h2>Mi carrito</h2>
            <div v-for="carrito of listaCarrito" :key="carrito.idCarrito">
                <div v-for="productoCarrito in carrito.carritoProductos" :key="productoCarrito.carritoProductoId">
                    <div class="caja-producto">
                        <div style="display: flex;">
                            <img :src="'data:image/png;base64,' + productoCarrito.producto.imgsProducto[0].datos"
                                alt="Imagen del producto">
                            <div>
                                <p style="padding-left: 10px;">{{ productoCarrito.producto.nombre }}</p>
                                <p style="margin-top: 71px; padding-left: 10px;">Apartado:</p>
                            </div>
                        </div>
                        <div style="text-align: center;">
                            <v-btn
                                @click="EliminarProducto(productoCarrito.carritoProductoId, productoCarrito.productoId)"
                                color="transparent" style="width: 5px; margin: auto;">
                                <v-icon size="25">mdi-delete</v-icon>
                            </v-btn>
                            <p style="margin-top: 60px ;">{{ productoCarrito.producto.precio }} €</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
            <div class="lista">
                <div v-for="carrito of listaCarrito" :key="carrito.idCarrito">
                    <div v-for="productoCarrito in carrito.carritoProductos" :key="productoCarrito.carritoProductoId">
                        <div class="caja-producto">
                            <div style="display: flex;">
                                <img :src="'data:image/png;base64,' + productoCarrito.producto.imgsProducto[0].datos"
                                    alt="Imagen del producto">
                                <div>
                                    <p style="padding-left: 10px;">{{ productoCarrito.producto.nombre }}</p>
                                    <p style="margin-top: 71px; padding-left: 10px;">Apartado:</p>
                                </div>
                            </div>
                            <div style="text-align: center;">
                                <v-btn
                                    @click="EliminarProducto(productoCarrito.carritoProductoId, productoCarrito.productoId)"
                                    color="transparent" style="width: 5px; margin: auto;">
                                    <v-icon size="25">mdi-delete</v-icon>
                                </v-btn>
                                <p style="margin-top: 60px ;">{{ productoCarrito.producto.precio }} €</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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