<template>
    <div class="trabajo">
        <div class="container">
            <h1>Trabaja con Nosotros</h1>
            <img src="@/assets/Images/BannerHome.jpg" alt="Imagen del Equipo" class="responsive-image" />
            <p>
                En Gēmu, estamos siempre en busca de personas talentosas y apasionadas por los videojuegos y la
                tecnología. Si quieres formar parte de un equipo dinámico y contribuir a una plataforma innovadora,
                ¡esta es tu oportunidad!
            </p>
            <h2>Oportunidades de Empleo</h2>
            <ul>
                <li><strong>Desarrollador Frontend:</strong> Buscamos desarrolladores con experiencia en Vue.js, HTML,
                    CSS y Vuetify.</li>
                <li><strong>Desarrollador Backend:</strong> Necesitamos expertos en C# y .NET para mantener y mejorar
                    nuestras APIs.</li>
                <li><strong>Especialista en Marketing Digital:</strong> Ayúdanos a llegar a más usuarios mediante
                    estrategias de SEO, SEM y marketing en redes sociales.</li>
                <li><strong>Gerente de Producto:</strong> Responsable de la planificación y ejecución del ciclo de vida
                    del producto.</li>
            </ul>
            <h2>Cultura de la Empresa</h2>
            <img src="@/assets/Images/BannerHome.jpg" alt="Imagen de Cultura" class="responsive-image" />
            <p>
                En Gēmu, valoramos la innovación, la colaboración y el desarrollo personal. Nuestro ambiente de trabajo
                es inclusivo y diverso, fomentando la creatividad y la resolución de problemas.
            </p>
            <h2>Beneficios de Trabajar en Gēmu</h2>
            <ul>
                <li>Horario flexible y posibilidad de trabajo remoto.</li>
                <li>Ambiente de trabajo dinámico y colaborativo.</li>
                <li>Acceso a los últimos videojuegos y tecnologías.</li>
                <li>Oportunidades de desarrollo profesional y crecimiento dentro de la empresa.</li>
            </ul>
            <h2>Cómo Postularse</h2>
            <p>
                Si estás interesado en unirte a nuestro equipo, envía tu CV y una carta de presentación a <a
                    href="mailto:trabajo@gemu.com">trabajo@gemu.com</a>. ¡Esperamos saber de ti!
            </p>
        </div>
    </div>
</template>

<style scoped>
.trabajo {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
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

strong {
    color: rgb(201, 139, 25);
}

a:hover {
    text-decoration: underline;
}

.responsive-image {
    max-width: 100%;
    height: auto;
    margin-bottom: 20px;
}
</style>