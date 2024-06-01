<script setup lang="ts">
import { ref, computed } from "vue";
import { reseñaApi } from '@/stores/reseñaApi'
import { UsuarioApi } from '@/stores/usuarioApi'
import router from "@/router";

const props = defineProps<{
    idJuego: number;
}>();

const storeUsuario = UsuarioApi()
const storeReseña = reseñaApi()

const authenticated = computed(() => storeUsuario.isAuthenticated)
const token = storeUsuario.getToken()

const idUsuario = storeUsuario.usuarioId?.idUsuario
const idJuego = props.idJuego
const comentario = ref('');
const calificacion = ref(0);

const responseMessage = ref('')
const hoverCalificacion = ref(0);

const setCalificacion = (rating: number) => {
    calificacion.value = rating;
};

const setHover = (rating: number) => {
    hoverCalificacion.value = rating;
};

const isFormValid = computed(() => {
    return calificacion.value > 0 && comentario.value.length >= 150 && comentario.value.length <= 400;
});

const characterCount = computed(() => {
    return comentario.value.length;
});

const formReseña = async () => {
    try {

        if (!authenticated.value) {
            throw new Error("No has iniciado sesión");
        }


        if (idUsuario && idJuego != null) {

            const datosReseña = {
                token: token,
                idUsuario: idUsuario,
                idJuego: idJuego,
                comentario: comentario.value,
                calificacion: calificacion.value
            }

            await storeReseña.crearReseñaJuego(datosReseña)
            comentario.value = ''
            calificacion.value = 0

            responseMessage.value = 'Creado exitosamente';
            setTimeout(() => {
                responseMessage.value = '';
                router.push("/")
            }, 2000);

        }

    } catch (error) {
        if (error instanceof Error) {
            console.error(error);

            responseMessage.value = error.message || 'Error mandar la reseña.';
            setTimeout(() => {
                responseMessage.value = '';
            }, 2000);
        } else {
            throw new Error(String(error));
        }
    }
}

</script>

<template>
    <div class="opinion-container">
        <h2>Opinión</h2>
        <p>¡Ayuda a otros jugadores a elegir! Esta reseña debe contener tu opinión personal del
            juego en términos de jugabilidad, gráficos, banda sonora e historia.</p>
        <p>Para garantizar la calidad, tu opinión será revisada por moderadores de Gēmu.com.
            Recibirás una notificación cuando se publique.</p>
        <p>Tu reseña debe contener al menos 150 caracteres.</p>

        <h2>Mi valoración</h2>
        <form @submit.prevent="formReseña()">
            <div class="rating">
                <v-icon v-for="star in 5" :key="star" @mouseover="setHover(star)" @mouseleave="setHover(0)"
                    @click="setCalificacion(star)" class="star"
                    :class="{ 'star-seleccionada': (hoverCalificacion >= star || calificacion >= star) }">
                    {{ (hoverCalificacion >= star || calificacion >= star) ? 'mdi-star' : 'mdi-star-outline' }}
                </v-icon>
            </div>
            <p>{{ characterCount }}/400 caracteres</p>
            <v-textarea v-model="comentario" outlined rows="4" placeholder="Escribe tu opinión aquí..."
                maxlength="400"></v-textarea>
            <p v-if="!isFormValid">Por favor, asegúrate de seleccionar una valoración y que tu opinión
                tenga entre 150 y 400 caracteres.</p>
            <v-btn type="submit" class="submit-btn" :disabled="!isFormValid">Confirmar</v-btn>
        </form>
        <v-alert v-if="responseMessage" :value="true"
            :type="responseMessage.includes('exitosamente') ? 'success' : 'error'">
            {{ responseMessage }}
        </v-alert>
    </div>
</template>

<style scoped>
.opinion-container {
    background-color: #4A1C70;
    color: white;
    padding: 20px;
    border-radius: 8px;
    width: 500px;
    margin: auto;
}

.rating {
    display: flex;
    align-items: center;
}

.star {
    cursor: pointer;
    margin-right: 5px;
}

.star-seleccionada {
    color: #DFB23C;
}

.submit-btn {
    background-color: #FFC107;
    color: black;
    margin-top: 20px;
    align-self: center;
}

.submit-btn:hover {
    background-color: #bb9216;
}

h2 {
    margin-bottom: 10px;
}

p {
    margin-bottom: 10px;
}

@media (max-width: 522px) {
    .opinion-container {
        width: 100%;
    }

}
</style>
