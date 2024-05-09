<script setup lang="ts">
import { ref } from 'vue'

const nombre = ref()
const correo = ref()
const contraseña = ref()

</script>

<template>
    <header>
        <div class="logo">
            <RouterLink to="/">
                <h1>Gēmu</h1>
                <p>ゲーム</p>
            </RouterLink>
        </div>
    </header>
    <main>
        <div class="cont-login">
            <h1>Crear cuenta</h1>
            <div>
                <form>
                    <label for="">Nombre</label>
                    <input v-model="nombre" type="text" placeholder="Usuario123" class="input-diseño" required>
                    <label for="">Correo</label>
                    <input v-model="correo" type="text" placeholder="correo@gmail.com" class="input-diseño" required>
                    <label for="">Contraseña</label>
                    <input v-model="contraseña" type="text" placeholder="CONTRAseña123@" class="input-diseño" required>
                    <label for="terminos">
                        <input type="checkbox" id="terminos" required>
                        Acepto los <a href="https://policies.google.com/terms" target="_blank">términos</a> y <a
                            href="https://policies.google.com/privacy" target="_blank">condiciones</a>
                    </label>
                    <input type="submit" value="Crear Cuenta" class="btn-crear-cuenta input-diseño">
                </form>
            </div>
        </div>
    </main>
</template>
<style scoped>
.logo {
    display: flex;
    padding: 20px 0 10px 20px;
}
/* Logo */
.logo a {
  color: rgb(255, 255, 255);
  text-align: center;
  text-decoration: none;

}

.logo h1 {
  font-size: 50px;
  line-height: 0.8;
}

.logo p {
  font-size: 32px;
}

header {
    background-color: black;
    height: 100px;
    text-align: center;
    align-items: center;
}

header a {
    text-decoration: none;
}

main {
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

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