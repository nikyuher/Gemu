<template>
    <div class="sell-products">
        <div class="container">
            <h1>Cómo Vender Productos de Segunda Mano en Gēmu</h1>
            <p>
                En Gēmu, ofrecemos una plataforma segura y fácil de usar para que puedas vender tus productos de segunda
                mano. Sigue estos sencillos pasos para comenzar a vender y alcanzar a una amplia audiencia de
                entusiastas de los videojuegos.
            </p>

            <h2>Paso 1: Crear una Cuenta</h2>
            <p>
                Si aún no tienes una cuenta en Gēmu, regístrate fácilmente
                <RouterLink to="/registrarse">aquí</RouterLink>. Completa el
                formulario con tus datos personales y verifica tu dirección de correo electrónico.
            </p>

            <h2>Paso 2: Listar tu Producto</h2>
            <p>
                Una vez que hayas iniciado sesión, dirígete a la sección de "Vender Producto". Llena el formulario con
                la siguiente información:
            </p>
            <ul>
                <li><strong>Nombre del Producto:</strong> Un título claro y conciso.</li>
                <li><strong>Imágenes:</strong> Imágenes claras y de alta calidad del producto desde diferentes ángulos.
                </li>
                <li><strong>Estado:</strong> Escoge el estado del producto.</li>
                <li><strong>Descripción:</strong> Detalles sobre el estado del producto, su uso y cualquier información
                    relevante.</li>
                <li><strong>Precio:</strong> El precio al que deseas vender tu producto.</li>
                <li><strong>Etiquetas:</strong> Coloca las etiquetas necesarias para facilitar la busqueda del producto.
                </li>
            </ul>
            <img src="@/assets/Images/formulario-ejemplo.png" alt="Formulario de Listado de Producto"
                class="responsive-image" />
            <h2>Paso 3: Publicar y Gestionar tus Listados</h2>
            <p>
                Revisa toda la información y haz clic en "Publicar". Tu producto ahora estará visible para todos los
                usuarios de Gēmu. Puedes gestionar tus listados desde tu perfil, editando la información o eliminando el
                producto cuando se haya vendido.
            </p>

            <h2>Consejos para Vender Rápidamente</h2>
            <ul>
                <li><strong>Fotos de Calidad:</strong> Asegúrate de que tus fotos sean claras y muestren el producto
                    desde varios ángulos.</li>
                <li><strong>Descripción Detallada:</strong> Sé honesto y detallado en la descripción del producto.</li>
                <li><strong>Precio Competitivo:</strong> Investiga precios similares para asegurarte de que tu producto
                    esté a un precio competitivo.</li>
            </ul>

            <h2>Políticas de Venta</h2>
            <p>
                En Gēmu, tenemos políticas claras para asegurar una experiencia positiva para todos los usuarios:
            </p>
            <ul>
                <li>Los productos deben estar en buenas condiciones y ser descritos con precisión.</li>
                <li>Está prohibida la venta de productos ilegales o pirateados.</li>
                <li>El vendedor es responsable de los costos de envío y la entrega del producto.</li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.sell-products {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    text-align: justify;
}

.container {
    max-width: 800px;
    margin: 0 auto;
}

h1 {
    font-size: 2.5em;
    margin-bottom: 20px;
}

h2 {
    font-size: 1.8em;
    margin-top: 20px;
    margin-bottom: 10px;
}

p {
    font-size: 1.2em;
    line-height: 1.5;
    margin-bottom: 20px;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    font-size: 1.2em;
    line-height: 1.5;
    margin-bottom: 10px;
}

a {
    color: #007BFF;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

.responsive-image {
    max-width: 50%;
    height: auto;
    margin: auto;
}
</style>