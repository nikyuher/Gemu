<template>
  <div class="about">
    <div class="container">
      <h1>Sobre Nosotros</h1>
      <img src="@/assets/Images/BannerHome.jpg" alt="Imagen de Bienvenida" class="responsive-image" />
      <p>
        Bienvenido a Gēmu, tu tienda en línea especializada en videojuegos. Nuestra misión es ofrecer una plataforma
        conveniente y accesible para la compra y venta de videojuegos, tanto nuevos como de segunda mano.
      </p>
      <h2>Nuestra Misión</h2>
      <img src="@/assets/Images/BannerHome.jpg" alt="Imagen de Misión" class="responsive-image" />
      <p>
        En Gēmu, creemos en la importancia de ofrecer una experiencia de compra sin complicaciones, donde los usuarios
        puedan encontrar y adquirir sus juegos favoritos de manera rápida y segura. También fomentamos la economía
        circular al permitir la venta de juegos usados, consolas y accesorios.
      </p>
      <h2>Nuestra Visión</h2>
      <p>
        Aspiramos a ser la plataforma líder en la compra y venta de videojuegos, reconocida por nuestra variedad de
        productos, precios competitivos y excelente atención al cliente.
      </p>
      <h2>Nuestros Valores</h2>
      <ul>
        <li><strong>Calidad:</strong> Nos esforzamos por ofrecer productos y servicios de alta calidad.</li>
        <li><strong>Innovación:</strong> Nos mantenemos a la vanguardia de las tendencias tecnológicas para mejorar
          continuamente nuestra plataforma.</li>
        <li><strong>Confianza:</strong> Valoramos la confianza de nuestros usuarios y trabajamos para garantizar
          transacciones seguras y transparentes.</li>
        <li><strong>Sostenibilidad:</strong> Promovemos prácticas sostenibles mediante la reutilización de productos de
          segunda mano.</li>
      </ul>
      <h2>El Equipo</h2>
      <img src="@/assets/Images/BannerHome.jpg" alt="Imagen del Equipo" class="responsive-image" />
      <p>
        Nuestro equipo está compuesto por entusiastas de los videojuegos y expertos en tecnología que comparten una
        pasión común por ofrecer el mejor servicio a nuestra comunidad. Trabajamos arduamente para mejorar continuamente
        nuestra plataforma y satisfacer las necesidades de nuestros usuarios.
      </p>
    </div>
  </div>
</template>

<style scoped>
.about {
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

strong {
  color: rgb(201, 139, 25);
}

.responsive-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
}
</style>
