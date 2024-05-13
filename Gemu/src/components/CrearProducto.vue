<script setup lang="ts">
import { UsuarioApi } from '@/stores/usuarioApi';
import { ProductoApi } from '@/stores/productoApi';
import { ref } from 'vue'

const datosUsuario = UsuarioApi();

const idUser = datosUsuario.$state.usuarioId?.idUsuario
const storeProducto = ProductoApi()
const responseMessage = ref('');

const nombreProducto = ref()
const imagenes = ref<string[]>([])
const precio = ref()
const descripcion = ref()
const estado = ref()
const cantidad = ref()

const fileInputRef = ref<HTMLInputElement | null>(null);
const AñadirFondos = async () => {
    try {
        const newProducto = {
            nombre: nombreProducto.value,
            precio: precio.value,
            descripcion: descripcion.value,
            estado: estado.value,
            cantidad: cantidad.value
        }


        await storeProducto.CrearProducto(newProducto)

        await storeProducto.ImagenesJuego(1, imagenes.value.map(img => img.split(',')[1]))

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


const handleFileInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.onload = (e) => {
                const base64String = e.target?.result as string;
                imagenes.value.push(base64String);
            };
            const fileInput = fileInputRef.value as HTMLInputElement;
            fileInput.value = '';
            reader.readAsDataURL(file);
            storeProducto.guardarImagenes(imagenes.value)
        }
    }
};

const eliminarImagen = (index: number) => {
    imagenes.value.splice(index, 1);
    const fileInput = fileInputRef.value as HTMLInputElement;
    fileInput.value = '';
};

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
                        <input ref="fileInputRef" type="file" multiple @change="handleFileInput" style="color: black;">
                        <div class="imagenes-container">
                            <div v-for="(imagen, index) in imagenes" :key="index" class="imagen-container">
                                <img :src="imagen" class="imagen" alt="Imagen" width="80">
                                <v-icon @click="eliminarImagen(index)"
                                    style="color: #722121; font-size: 40px;">mdi-delete</v-icon>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cajas">
                    <div class="cajas2">
                        <h3>Describe el estado</h3>
                        <select v-model="estado">
                            <option value="nuevo">Nuevo</option>
                            <option value="casiNuevo">Casi nuevo</option>
                            <option value="buenEstado">Buen estado</option>
                            <option value="usado">Usado</option>
                        </select>
                        <div class="conInput">
                            <input type="number" class="cont-numero" v-model="cantidad"
                                placeholder="Numero de productos">
                        </div>
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
.imagenes-container {
    display: flex;
    flex-wrap: wrap;
}

.imagen-container {
    margin-right: 10px;
    margin-bottom: 10px;
}

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