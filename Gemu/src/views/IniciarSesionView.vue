<script setup lang="ts">
</script>

<template>
    <main>
        <div class="cont-login">
            <h1>Iniciar Sesion</h1>
            <div>
                <form>
                    <label for="">Correo</label>
                    <input type="text" placeholder="correo@gmail.com" class="input-diseño" required>
                    <label for="">Contraseña</label>
                    <input type="text" placeholder="CONTRAseña123@" class="input-diseño"  required>
                    <label for="terminos">
                        <input type="checkbox">Guardar contraseña
                    </label>
                    <input type="submit" value="Crear Cuenta" class="btn-crear-cuenta input-diseño">
                </form>
            </div>
        </div>
    </main>
</template>
<style scoped>
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