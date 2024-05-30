<script setup lang="ts">
import { ref } from 'vue'
import { UsuarioApi } from '@/stores/usuarioApi'
import { useRouter } from 'vue-router';

const store = UsuarioApi();
const router = useRouter();

const nombre = ref()
const correo = ref()
const contraseña = ref()
const terminos = ref(false);

const responseMessage = ref('');

const validarEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validarPassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
};

const validarName = (name: string): boolean => {
    return name.length >= 4;
};

const register = async () => {

    try {

        if (!validarName(nombre.value)) {
            responseMessage.value = 'El nombre debe tener al menos 4 caracteres';
            setTimeout(() => {
                responseMessage.value = '';
            }, 2000);
            return;
        }

        if (!validarEmail(correo.value)) {
            responseMessage.value = 'Por favor ingrese un correo electrónico válido';
            setTimeout(() => {
                responseMessage.value = '';
            }, 2000);
            return;
        }

        if (!validarPassword(contraseña.value)) {
            responseMessage.value = 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número';
            setTimeout(() => {
                responseMessage.value = '';
            }, 3000);
            return;
        }


        if (!terminos.value) {
            responseMessage.value = 'Por favor acepte los Términos & Condiciones';
            setTimeout(() => {
                responseMessage.value = '';
            }, 2000);
            return;
        }

        const userData = {
            nombre: nombre.value,
            correo: correo.value,
            contraseña: contraseña.value
        };

        await store.registrarse(userData, router)

        nombre.value = '';
        correo.value = '';
        contraseña.value = '';
        terminos.value = false;

        responseMessage.value = 'Registrado Correctamente.';

        setTimeout(() => {
            responseMessage.value = '';
        }, 2000);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error);

            responseMessage.value = error.message || 'Error al Registrarte.';
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

    <div class="cont-login">
        <h1>Crear cuenta</h1>
        <div>
            <form @submit.prevent="register">
                <label for="">Nombre</label>
                <input v-model="nombre" type="text" placeholder="Usuario123" class="input-diseño" required>
                <label for="">Correo</label>
                <input v-model="correo" type="text" placeholder="correo@gmail.com" class="input-diseño" required>
                <label for="">Contraseña</label>
                <input v-model="contraseña" type="text" placeholder="CONTRAseña123@" class="input-diseño" required>
                <label for="terminos">
                    <input type="checkbox" id="terminos" v-model="terminos" required>
                    Acepto los <a href="https://policies.google.com/terms" target="_blank">términos</a> y <a
                        href="https://policies.google.com/privacy" target="_blank">condiciones</a>
                </label>
                <input type="submit" value="Crear Cuenta" class="btn-crear-cuenta input-diseño">
                <v-alert v-if="responseMessage" :value="true"
                    :type="responseMessage.includes('Registrado') ? 'success' : 'error'">
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