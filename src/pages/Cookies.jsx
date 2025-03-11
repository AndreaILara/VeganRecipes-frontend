import "../styles/Cookies.css";

const Cookies = () => {
  return (
    <div className="cookies-page">
      <header className="hero-cookies">
        <h1>Política de Cookies</h1>
        <p>Última actualización: Marzo 2025</p>
      </header>

      <section className="content">
        <h2>1. ¿Qué son las cookies?</h2>
        <p>
          Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Nos ayudan a mejorar tu experiencia al recordar tus preferencias y visitas anteriores.
        </p>

        <h2>2. ¿Por qué usamos cookies?</h2>
        <p>
          Usamos cookies para mejorar la navegación, analizar el tráfico y ofrecer contenido personalizado. También nos permiten ofrecer publicidad basada en tus intereses.
        </p>

        <h2>3. Tipos de cookies que utilizamos</h2>
        <ul>
          <li><strong>Cookies esenciales:</strong> Necesarias para el funcionamiento del sitio web.</li>
          <li><strong>Cookies de análisis:</strong> Nos ayudan a entender cómo interactúan los usuarios con nuestro sitio.</li>
          <li><strong>Cookies de funcionalidad:</strong> Permiten recordar preferencias y configuraciones personalizadas.</li>
          <li><strong>Cookies publicitarias:</strong> Se utilizan para mostrar anuncios relevantes para cada usuario.</li>
        </ul>

        <h2>4. ¿Cómo gestionar las cookies?</h2>
        <p>
          Puedes configurar o rechazar el uso de cookies a través de la configuración de tu navegador. También puedes eliminar las cookies almacenadas en tu dispositivo en cualquier momento.
        </p>

        <h2>5. Cambios en esta política</h2>
        <p>
          Podemos actualizar esta política en cualquier momento para reflejar cambios en nuestro uso de cookies. Te recomendamos revisar esta página periódicamente.
        </p>

        <h2>6. Contacto</h2>
        <p>
          Si tienes dudas sobre nuestra Política de Cookies, puedes contactarnos a través de nuestra página de <a href="/contacto">Contacto</a>.
        </p>
      </section>
    </div>
  );
};

export default Cookies;
