<script setup lang="ts">
import { UsuarioApi } from '@/stores/usuarioApi';
import { JuegoApi } from '@/stores/juegoApi';
import { ImagenesApi } from '@/stores/imagenesApi';
import { CategoriaApi } from '@/stores/categoriasApi';
import { ref, onMounted } from 'vue'

const storeUsuario = UsuarioApi();
const storeJuego = JuegoApi()
const storeImagenes = ImagenesApi()
const storeCategoria = CategoriaApi()

const idJuego = ref<number | null>(null);
const categoriasApi = ref<any[]>([])
const responseMessage = ref('');

const token = storeUsuario.getToken()

const tituloJuego = ref()
const imagenes = ref<string[]>([])
const precio = ref()
const descripcion = ref()
const plataforma = ref('PC')
const descuento = ref()
const categoriasSelecionadas = ref<number[]>([])

const mostrarEtiquetas = ref<string>('')
const fileInputRef = ref<HTMLInputElement | null>(null);



const limpiarDatos = () => {
    tituloJuego.value = ''
    imagenes.value = []
    plataforma.value = 'PC'
    descripcion.value = ''
    descuento.value = 0
    precio.value = 0
    categoriasSelecionadas.value = []
    mostrarEtiquetas.value = ''
}

onMounted(async () => {
    try {

        await storeCategoria.GetCategoriaSeccion('juegos')
        await storeCategoria.GetCategoriaSeccion('plataforma')

        categoriasApi.value = [...storeCategoria.listaCategoriaPlataforma, ...storeCategoria.listaCategoriaSeccion]

    } catch (error) {
        console.log('No se pudo obtener el id');
        responseMessage.value = 'Hubo un problema al cargar las categorias';
        limpiarDatos()
        setTimeout(() => {
            responseMessage.value = '';
        }, 3000);
    }
})

const CrearProducto = async () => {
    try {
        const newJuego = {
            titulo: tituloJuego.value,
            descripcion: descripcion.value,
            precio: precio.value,
            descuento: descuento.value,
            plataforma: plataforma.value
        }

        if (token) {
            await storeJuego.CrearDatosJuego(newJuego, token)
        }

        idJuego.value = storeJuego.juego?.idJuego ?? null;

        if (idJuego.value && token) {
            await storeImagenes.AddImagenesJuego(idJuego.value, imagenes.value.map(img => img.split(',')[1]))
            await storeCategoria.AsignarCategoriaJuego(idJuego.value, token, categoriasSelecionadas.value)
            responseMessage.value = 'Publicado exitosamente';
        } else {
            console.log('No se pudo obtener el id');
            responseMessage.value = 'Hubo un problema al incluir las imagenes';
            setTimeout(() => {
                responseMessage.value = '';
            }, 3000);
        }

        limpiarDatos()

        setTimeout(() => {
            responseMessage.value = '';
        }, 3000);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error);
            responseMessage.value = error.message || 'Error al crear el juego.';
            setTimeout(() => {
                responseMessage.value = '';
            }, 3000);
        } else {
            throw new Error(String(error));
        }
    }
}

const cambiarCategoria = (categoria: any) => {
    const index = categoriasSelecionadas.value.indexOf(categoria.idCategoria)
    if (index === -1) {
        categoriasSelecionadas.value.push(categoria.idCategoria)
        mostrarEtiquetas.value += (mostrarEtiquetas.value ? ', ' : '') + categoria.nombre
    } else {
        categoriasSelecionadas.value.splice(index, 1)
        mostrarEtiquetas.value = mostrarEtiquetas.value
            .split(', ')
            .filter(nombre => nombre !== categoria.nombre)
            .join(', ')
    }
}

const ConvertorImgBase64 = (event: Event) => {
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
            storeImagenes.guardarImagenes(imagenes.value)
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
        <h2>Crear Juego</h2>
        <div class="bloque">
            <form @submit.prevent="CrearProducto()">
                <div class="cajas">
                    <div class="conInput">
                        <div style="width: 300px;">
                            <h3>Nombre del juego</h3>
                            <input type="text" class="cont-numero" v-model="tituloJuego"
                                placeholder="Nombre del producto" required>
                        </div>
                    </div>
                </div>
                <div class="cajas" style="padding-bottom: 20px;">
                    <div class="cajas2">
                        <h3>Imagenes</h3>
                        <h4 style="color: orange;">La primera imagen sera considerada portada</h4>
                        <input ref="fileInputRef" type="file" multiple @change="ConvertorImgBase64"
                            style="color: black;">
                        <div class="imagenes-container">
                            <div v-for="(imagen, index) in imagenes" :key="index" class="imagen-container">
                                <img :src="imagen" class="imagen" alt="Imagen" width="80">
                                <v-icon @click="eliminarImagen(index)"
                                    style="color: #722121; font-size: 40px; margin: auto;">
                                    mdi-delete
                                </v-icon>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cajas">
                    <div class="cajas2">
                        <h3>Plataforma</h3>
                        <select v-model="plataforma" required>
                            <option value="PS5">PS5</option>
                            <option value="PC">PC</option>
                            <option value="XBOX">XBOX</option>
                            <option value="Nintendo">Nintendo</option>
                        </select>
                        <h3>Descuento</h3>
                        <div class="conInput">
                            <input type="number" class="cont-numero" v-model="descuento" placeholder="descuento"
                                required>
                        </div>
                        <h4 style="color: gray;">Proporcion mas detalles del juego</h4>
                        <textarea name="descripcion" v-model="descripcion"
                            placeholder="Escribir un minimo de 300 caracteres" maxlength="500" rows="4"
                            style="color: black; width: 100%; max-height: 200px; resize: none;" required
                            class="diseño-Text-Area">
                        </textarea>
                    </div>
                </div>
                <div class="cajas">
                    <div class="caja2">
                        <h3>Precio</h3>
                        <div class="conInput">
                            <input type="number" class="cont-numero" v-model="precio" required>
                            <div class="tipoMoneda">
                                <p>Euro(€)</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cajas" style="padding-bottom: 10px;">
                    <div>
                        <h3>Etiquetas</h3>
                        <div class="diseño-input-etiquetas" style="width: 100%;">
                            <input type="text" v-model="mostrarEtiquetas" disabled>
                        </div>
                        <div class="cont-etiquetas">
                            <div v-for="categoria of categoriasApi" :key="categoria.idCategoria"
                                @click="cambiarCategoria(categoria)">
                                <div class="etiqueta">
                                    <p>{{ categoria.nombre }}</p>
                                </div>
                            </div>
                        </div>
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
.diseño-input-etiquetas {
    border: 2px solid #9D60BA;
    margin-bottom: 10px;

}

.diseño-input-etiquetas input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    outline: none;

    width: 100%;
    background-color: transparent;
    height: 15px;
    color: black;
    padding-left: 10px;
    margin: 10px;
}

.cont-etiquetas {
    display: flex;
    flex-wrap: wrap;
}

select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    outline: none;
    border: 2px solid #9D60BA;
    text-align: center;
}

option {
    color: black;
}

.etiqueta {
    background-color: #421452;
    border-radius: 10px;
    height: 30px;
    text-align: center;
    align-items: center;
    display: flex;
    min-width: 50px;
    padding: 0 10px 0 10px;
}

.etiqueta p {
    color: white;
}

/* Imagenes */
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
    border: 2px solid #9D60BA;
    height: 30px;
    width: 100px;
    text-align: center;
    margin-left: 30px;
}

.conInput {
    display: flex;
    margin: 10px 0;
}

.diseño-Text-Area {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    outline: none;
    border: 2px solid #9D60BA;
}


.cont-numero {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    outline: none;

    width: 90%;
    background-color: transparent;
    border: 2px solid #9D60BA;
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
    width: 100%;
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
    padding-left: 30px;
    padding-bottom: 10px;
    padding-top: 10px;
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