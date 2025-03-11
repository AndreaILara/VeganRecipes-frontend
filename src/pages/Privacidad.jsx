import "../styles/Privacidad.css";

const Privacidad = () => {
  return (
    <div className="privacidad-page">
      <header className="hero-privacidad">
        <h1>Aviso de Privacidad</h1>
        <p>Última actualización: Marzo 2025</p>
      </header>

      <section className="content">
        <h2>1. Introducción</h2>
        <p>
          En <strong>Tu Rincón Vegano</strong>, valoramos tu privacidad y nos comprometemos a proteger tu información personal. Este aviso explica cómo recopilamos, utilizamos y protegemos tus datos.
        </p>

        <h2>2. Información que recopilamos</h2>
        <ul>
          <li>Datos de contacto como nombre, dirección de correo electrónico y número de teléfono.</li>
          <li>Información de navegación y uso del sitio web a través de cookies y tecnologías similares.</li>
          <li>Detalles sobre interacciones con nuestros servicios, incluyendo registros de usuario.</li>
        </ul>

        <h2>3. Uso de la información</h2>
        <p>
          Utilizamos tu información personal para:
          <ul>
            <li>Proporcionar y mejorar nuestros servicios.</li>
            <li>Personalizar tu experiencia en nuestra web.</li>
            <li>Enviar comunicaciones relevantes sobre novedades y actualizaciones.</li>
            <li>Garantizar la seguridad y cumplimiento legal de nuestra plataforma.</li>
          </ul>
        </p>

        <h2>4. Compartición de datos</h2>
        <p>
          No vendemos ni compartimos tu información personal con terceros sin tu consentimiento, excepto en los siguientes casos:
        </p>
        <ul>
          <li>Cuando sea requerido por ley.</li>
          <li>Para proteger nuestros derechos y seguridad.</li>
          <li>Con proveedores de servicios que nos ayudan a operar la plataforma.</li>
        </ul>

        <h2>5. Protección de datos</h2>
        <p>
          Implementamos medidas de seguridad adecuadas para proteger tu información contra accesos no autorizados, pérdida o alteración.
        </p>

        <h2>6. Tus derechos</h2>
        <p>
          Tienes derecho a acceder, corregir o eliminar tu información personal. También puedes solicitar restricciones en su uso o retirar tu consentimiento en cualquier momento.
        </p>

        <h2>7. Cookies y tecnologías de rastreo</h2>
        <p>
          Utilizamos cookies para mejorar tu experiencia en nuestra web. Puedes consultar nuestra <a href="/cookies">Política de Cookies</a> para más detalles sobre su uso y cómo gestionarlas.
        </p>

        <h2>8. Cambios en esta política</h2>
        <p>
          Nos reservamos el derecho de actualizar este aviso de privacidad en cualquier momento. Te recomendamos revisarlo periódicamente.
        </p>

        <h2>9. Contacto</h2>
        <p>
          Si tienes dudas sobre esta política, contáctanos a través de nuestra página de <a href="/contacto">Contacto</a>.
        </p>
      </section>
    </div>
  );
};

export default Privacidad;
