<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { CarritoApi } from "@/stores/carritoApi";
import { UsuarioApi } from '@/stores/usuarioApi';

const storeUsuario = UsuarioApi();
const storeCarrito = CarritoApi()

const IdUsuario = storeUsuario.$state.usuarioId?.idUsuario
const listaCarrito = computed(() => storeCarrito.listaCarrito);
const idsProducto = ref<number[]>([])
const idsJuego = ref<number[]>([])

onMounted(async () => {
    try {

        if (IdUsuario) {
            storeUsuario.getUsuarioId(IdUsuario)
            await storeCarrito.ListaCarrito(IdUsuario)

            // listaCarrito.value = storeCarrito.listaCarrito
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

const EliminarProducto = async (idLista: number, productoId: number) => {

    try {
        if (IdUsuario) {
            await storeCarrito.DeleteProductoCarrito(idLista, IdUsuario)
            await storeCarrito.ListaCarrito(IdUsuario);
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

const EliminarJuego = async (idLista: number, juegoId: number) => {
    try {
        if (IdUsuario) {
            await storeCarrito.DeleteJuegoCarrito(idLista, IdUsuario)
            await storeCarrito.ListaCarrito(IdUsuario);
            listaCarrito.value.forEach((carrito: any) => {
                const index = carrito.carritoJuegos.findIndex((juegoCarrito: any) => juegoCarrito.carritoJuegoId === idLista);
                if (index !== -1) {
                    carrito.carritoJuegos.splice(index, 1);

                    const idIndex = idsJuego.value.indexOf(juegoId);
                    if (idIndex !== -1) {
                        idsJuego.value.splice(idIndex, 1);
                    }
                }
            });
        }
    } catch (error) {
        console.log(error);
    }
}

const totalCantidad = computed(() => {
    return listaCarrito.value.reduce((total: number, carrito: any) => {
        const cantidadProducto = carrito.carritoProductos.length
        const cantidadJuego = carrito.carritoJuegos.length
        return total + cantidadProducto + cantidadJuego;
    }, 0);
});

const totalPrecio = computed(() => {
    return listaCarrito.value.reduce((total: number, carrito: any) => {
        const totalJuego = carrito.carritoJuegos.reduce((sum: number, juego: any) => sum + juego.juego.precio, 0)
        const totalProducto = carrito.carritoProductos.reduce((sum: number, producto: any) => sum + producto.producto.precio, 0)
        return total + totalProducto + totalJuego;
    }, 0);
});

watch(totalCantidad, (newVal) => {
    storeCarrito.setCatidadCarrito(newVal);
});

watch(totalPrecio, (newVal) => {
    storeCarrito.setTotalPrecio(newVal);
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
                                <p style="margin-top: 71px; padding-left: 10px;">Apartado: {{
                                    productoCarrito.carritoProductoId }}</p>
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
                <div v-for="juegoCarrito in carrito.carritoJuegos" :key="juegoCarrito.carritoJuegoId">
                    <div class="caja-producto">
                        <div style="display: flex;">
                            <img :src="'data:image/png;base64,' + juegoCarrito.juego.imgsJuego[0].datos"
                                alt="Imagen del producto">
                            <div>
                                <p style="padding-left: 10px;">{{ juegoCarrito.juego.titulo }}</p>
                                <p style="margin-top: 71px; padding-left: 10px;">Plataforma:{{
                                    juegoCarrito.juego.plataforma }}
                                </p>
                            </div>
                        </div>
                        <div style="text-align: center;">
                            <v-btn @click="EliminarJuego(juegoCarrito.carritoJuegoId, juegoCarrito.juegoId)"
                                color="transparent" style="width: 5px; margin: auto;">
                                <v-icon size="25">mdi-delete</v-icon>
                            </v-btn>
                            <p style="margin-top: 60px ;">{{ juegoCarrito.juego.precio }} €</p>
                        </div>
                    </div>
                </div>
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