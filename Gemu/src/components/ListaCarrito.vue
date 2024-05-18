<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { CarritoApi } from "@/stores/carritoApi";
import { UsuarioApi } from '@/stores/usuarioApi';

const storeUsuario = UsuarioApi();
const storeCarrito = CarritoApi()

const IdUsuario = storeUsuario.$state.usuarioId?.idUsuario
const listaCarrito = ref<any[]>([])

onMounted(async () => {
    try {

        if (IdUsuario) {
            await storeCarrito.ListaCarrito(IdUsuario)
            listaCarrito.value = storeCarrito.listaCarrito
        }
    } catch (error) {
        console.log(error);

    }
})

const EliminarProducto = async (idProducto: number) => {

    try {
        if (IdUsuario) {
            await storeCarrito.DeleteProductoCarrito(idProducto, IdUsuario)
            listaCarrito.value.forEach((carrito: any) => {
                const index = carrito.carritoProductos.findIndex((productoCarrito: any) => productoCarrito.carritoProductoId === idProducto);
                if (index !== -1) {
                    carrito.carritoProductos.splice(index, 1);
                }
            });
        }
    } catch (error) {
        console.log(error);

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
                        <v-btn @click="EliminarProducto(productoCarrito.carritoProductoId)" color="transparent"
                            style="width: 5px; margin: auto;">
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
</template>

<style scoped>
.lista {
    background-color: #491F6A;
    padding: 20px;
    border-radius: 5px;
    margin-right: 20px;
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