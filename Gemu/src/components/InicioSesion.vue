<script setup lang="ts">
import { ref, computed, watchEffect } from "vue";
import { RouterLink } from 'vue-router'
import { UsuarioApi } from '@/stores/usuarioApi'
import { useRouter } from 'vue-router';

const store = UsuarioApi();
const router = useRouter();

const isAuthenticated = computed(() => store.isAuthenticated);

watchEffect(() => {
    if (isAuthenticated.value) {
        router.push('/');
    }
});

const correo = ref('')
const contraseña = ref('')
const responseMessage = ref('');

const login = async () => {
    try {
        const login = {
            correo: correo.value,
            contraseña: contraseña.value
        };

        await store.loginUsuario(login, router)

        correo.value = '';
        contraseña.value = '';

    } catch (error) {
        if (error instanceof Error) {
            console.error(error);

            responseMessage.value = error.message || 'Error al Iniciar Sesion.';
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
    <div v-if="!isAuthenticated" class="cont-login">
        <h1>Iniciar Sesion</h1>
        <div>
            <form @submit.prevent="login">
                <label for="">Correo</label>
                <input type="email" v-model="correo" placeholder="correo@gmail.com" class="input-diseño" required>
                <label for="">Contraseña</label>
                <input type="password" v-model="contraseña" placeholder="CONTRAseña123@" class="input-diseño" required>
                <label for="terminos">
                    <input type="checkbox">Guardar contraseña
                    <RouterLink to="/registrarse" style=" padding-left: 10px;">Registrarse</RouterLink>
                </label>
                <input type="submit" value="Iniciar Sesion" class="btn-crear-cuenta input-diseño">
                <v-alert v-if="responseMessage" :value="true"
                    :type="responseMessage.includes('Correctamente') ? 'success' : 'error'">
                    {{ responseMessage }}
                </v-alert>
            </form>
        </div>
    </div>
</template>

<style scoped>
.cont-login {
    width: 400px;
}

.input-diseño {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    outline: none;

    width: 100%;
    background-color: #491F6A;
    border: 1px solid #D550F6;
    height: 50px;
    padding-left: 10px;
}

.btn-crear-cuenta {
    color: black;
    background-color: #F8C032;
}

.btn-crear-cuenta:hover {
    color: rgb(255, 255, 255);
    background-color: #af851c;
}
</style>