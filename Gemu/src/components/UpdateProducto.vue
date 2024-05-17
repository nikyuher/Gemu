<script setup lang="ts">
import { ProductoApi } from '@/stores/productoApi';
import { ImagenesApi } from '@/stores/imagenesApi';
import { CategoriaApi } from '@/stores/categoriasApi';
import { ref, onMounted } from 'vue'

const props = defineProps<{
    idProducto: number;
}>();

const idProducto = ref(props.idProducto);

const storeProducto = ProductoApi()
const storeImagenes = ImagenesApi()
const storeCategoria = CategoriaApi()

const categoriasApi = ref<any[]>([])
const responseMessage = ref('');

const nombreProducto = ref()
const imagenes = ref<string[]>([])
const precio = ref()
const descripcion = ref()
const estado = ref<string>('nuevo')
const cantidad = ref()
const categoriasSelecionadas = ref<number[]>([])

const mostrarEtiquetas = ref<string>('')
const fileInputRef = ref<HTMLInputElement | null>(null);



onMounted(async () => {
    try {

        responseMessage.value = '';

        await storeCategoria.GetCategoriaSeccion('marketplace')
        await storeCategoria.GetCategoriasProducto(props.idProducto)
        await storeProducto.GetProducto(props.idProducto)
        await storeImagenes.GetImagenesProducto(props.idProducto)

        nombreProducto.value = storeProducto.producto?.nombre
        precio.value = storeProducto.producto?.precio
        descripcion.value = storeProducto.producto?.descripcion
        if (storeProducto.producto?.estado) {
            estado.value = storeProducto.producto?.estado
        }
        cantidad.value = storeProducto.producto?.cantidad
        categoriasApi.value = storeCategoria.listaCategoriaSeccion

        mostrarEtiquetas.value = storeCategoria.listCategoriasProducto.productoCategorias.map(pc => pc.categoria.nombre).join(', ');
        categoriasSelecionadas.value = storeCategoria.listCategoriasProducto.productoCategorias.map(pc => pc.categoria.idCategoria)

        imagenes.value = storeImagenes.imagenesProductos.map(d => 'data:image/png;base64,' + d.datos)

    } catch (error) {
        if (error instanceof Error) {
            console.error(error);
            responseMessage.value = error.message || 'Error al cargar datos del producto.';
        } else {
            throw new Error(String(error));
        }
    }
})

const ActualizarProducto = async () => {
    try {
        const newProducto = {
            idProducto: idProducto.value,
            nombre: nombreProducto.value,
            precio: precio.value,
            descripcion: descripcion.value,
            estado: estado.value,
            cantidad: cantidad.value
        }

        await storeProducto.UpdateDatosProducto(newProducto)

        if (idProducto.value) {
            await storeImagenes.EliminarImagenesProducto(idProducto.value)
            await storeImagenes.AddImagenesProducto(idProducto.value, imagenes.value.map(img => img.split(',')[1]))
            await storeCategoria.AsignarCategoriaProducto(idProducto.value, categoriasSelecionadas.value)
        } else {
            console.log('No se pudo obtener el id');
            responseMessage.value = 'Hubo un problema al incluir las imagenes';
        }

        responseMessage.value = 'Actualizado exitosamente';

        setTimeout(() => {
            responseMessage.value = '';
        }, 3000);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error);
            responseMessage.value = error.message || 'Error al actualizar el producto.';
        } else {
            throw new Error(String(error));
        }
    }
}

const cambiarCategoria = (categoria: any) => {
    const etiquetasArray = mostrarEtiquetas.value.split(', ').map(etiqueta => etiqueta.trim());
    const categoriaNombre = categoria.nombre.trim();
    const index = etiquetasArray.indexOf(categoriaNombre);

    if (index === -1) {
        // Si la categoría no está en mostrarEtiquetas, la añade
        categoriasSelecionadas.value.push(categoria.idCategoria);
        mostrarEtiquetas.value += (mostrarEtiquetas.value ? ', ' : '') + categoriaNombre;
    } else {
        // Si la categoría ya está en mostrarEtiquetas, la elimina
        categoriasSelecionadas.value.splice(index, 1);
        etiquetasArray.splice(index, 1);
        mostrarEtiquetas.value = etiquetasArray.join(', ');
    }
}


const eliminarImagen = (index: number) => {
    imagenes.value.splice(index, 1);
    const fileInput = fileInputRef.value as HTMLInputElement;
    fileInput.value = '';
};


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

</script>

<template>
    <div class="bloque">
        {{ idProducto }}
        <form @submit.prevent="ActualizarProducto()">
            <div class="cajas">
                <div class="conInput">
                    <div style="width: 300px;">
                        <h3>Nombre del producto</h3>
                        <input type="text" class="cont-numero" v-model="nombreProducto"
                            placeholder="Nombre del producto" required>
                    </div>
                </div>
            </div>
            <div class="cajas" style="padding-bottom: 20px;">
                <div class="cajas2">
                    <h3>Fotos</h3>
                    <h4 style="color: orange;">La primera imagen sera considerada portada</h4>
                    <input ref="fileInputRef" type="file" multiple @change="ConvertorImgBase64" style="color: black;">
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
                    <select v-model="estado" required>
                        <option value="nuevo">Nuevo</option>
                        <option value="casiNuevo">Casi nuevo</option>
                        <option value="buenEstado">Buen estado</option>
                        <option value="usado">Usado</option>
                    </select>
                    <h3>Cantidad</h3>
                    <div class="conInput">
                        <input type="number" class="cont-numero" v-model="cantidad" placeholder="Numero de productos"
                            required>
                    </div>
                    <h4 style="color: gray;">Proporcion mas detalles del producto</h4>
                    <textarea name="descripcion" v-model="descripcion"
                        placeholder="Escribir un minimo de 300 caracteres" maxlength="500" rows="4"
                        style="color: black; width: 500px; max-height: 200px; resize: none;" required
                        class="diseño-Text-Area"></textarea>
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
                    <div class="diseño-input-etiquetas">
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

    width: 90%;
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