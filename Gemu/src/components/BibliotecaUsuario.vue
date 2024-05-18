    <script setup lang="ts">
    import { ref, onMounted, computed } from 'vue';
    import { BibliotecaApi } from '@/stores/bibliotecaAPI';
    import { UsuarioApi } from '@/stores/usuarioApi';

    const datosUsuario = UsuarioApi();
    const bibliotecaStore = BibliotecaApi();

    const IdUsuario = datosUsuario.$state.usuarioId?.idUsuario
    const historial = ref<any[]>([]);
    const terminosBusqueda = ref('');

    const getImagenURL = (base64StringArray: any) => {
        const base64String = base64StringArray[0]?.datos;
        return base64String ? `data:image/png;base64,${base64String}` : '';
    };

    onMounted(async () => {
        try {
            if (IdUsuario) {
                await bibliotecaStore.historialBiblioteca(IdUsuario);
                historial.value = bibliotecaStore.listabiblioteca;
            } else {
                console.error('IdUsuario no definido');
            }
        } catch (error) {
            console.log(error)
        }
    })

    const matchesSearch = (titulo: string, terminos: string) => {
        return titulo.includes(terminos);
    };

    const juegosFiltrados = computed(() => {
        if (!terminosBusqueda.value) {
            return historial.value;
        } else {
            return historial.value.map(biblioteca => {
                if (biblioteca && biblioteca.bibliotecaJuegos) {
                    const juegosFiltrados = biblioteca.bibliotecaJuegos.filter((juegoBiblioteca: any) =>
                        matchesSearch(juegoBiblioteca.juego.titulo.toLowerCase(), terminosBusqueda.value.toLowerCase())
                    );
                    return { ...biblioteca, bibliotecaJuegos: juegosFiltrados };
                }
                return { ...biblioteca, bibliotecaJuegos: [] };
            }).filter(biblioteca => biblioteca.bibliotecaJuegos.length > 0);
        }
    });

</script>

    <template>
        <div class="cont-Info">
            <h2>Mi biblioteca</h2>
            <div class="bloque">
                <div class="cajas">
                    <div class="search">
                        <input type="search" v-model="terminosBusqueda" placeholder="Buscar por nombre de producto">
                    </div>
                </div>
            </div>
            <div class="bloque">
                <div class="cajas2">
                    <div class="anotaciones top-tabla">
                        <h3>Portada</h3>
                        <h3>Nombre producto</h3>
                        <h3>Precio</h3>
                        <h3>Clave</h3>
                    </div>
                    <div v-if="juegosFiltrados.length > 0" style="padding-bottom: 30px;">
                        <div v-for="biblioteca of juegosFiltrados" :key="biblioteca.idBiblioteca">
                            <div v-for="juegoBilioteca in biblioteca.bibliotecaJuegos"
                                :key="juegoBilioteca.bibliotecaJuegoId" class="anotaciones">
                                <img :src="getImagenURL(juegoBilioteca.juego.imgsJuego)"
                                    style="width: 70px; margin: auto;">
                                <p>{{ juegoBilioteca.juego.titulo }}</p>
                                <p>{{ juegoBilioteca.juego.precio }} €</p>
                                <v-dialog max-width="500">
                                    <template v-slot:activator="{ props: activatorProps }">
                                        <v-btn v-bind="activatorProps" rounded color="purple">
                                            <v-icon size="25">mdi-key-variant</v-icon>
                                        </v-btn>
                                    </template>
                                    <template v-slot:default>
                                        <div class="caja-key">
                                            <h2>Clave de Juego</h2>
                                            <h2>{{ juegoBilioteca.juego.titulo }}</h2>
                                            <p>{{ juegoBilioteca.juego.codigoJuego }}</p>
                                        </div>
                                    </template>
                                </v-dialog>
                            </div>
                            <div v-for="(producto, index) of biblioteca.productos" :key="index">
                                <p>Id del Producto: {{ producto.id }}</p>
                                <p>Nombre del Producto: {{ producto.nombre }}</p>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <p style="text-align: center; margin-top: 60px;">No hay datos disponibles</p>
                    </div>
                </div>
            </div>
        </div>
    </template>

<style scoped>
/* Search */
.search {
    border: 2px solid #714FAA;
    height: 40px;
    width: 300px;
    align-items: center;
    text-align: center;
}

.search input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    outline: none;
    width: 90%;
    height: 40px;
    color: black;

}

/* Boton key juego */
.caja-key {
    background-color: #491F6A;
    height: 300px;
    text-align: center;
    align-items: center;
    border-radius: 20px;
}

.caja-key p {
    color: white;
    background-color: #7852A9;
    font-size: 25px;
    width: 80%;
    margin: auto;
    border-radius: 50px;
    border: 2px solid rgb(152, 28, 163);
}

.top-tabla {
    background-color: #DFC0F6;
}

/* Anotaciones */
.anotaciones {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    text-align: center;
    align-items: center;
}

.anotaciones img {
    padding-top: 20px;
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
    width: 95%;
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
</style>