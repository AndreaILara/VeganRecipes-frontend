import "../styles/Terminos.css";

const Terminos = () => {
  return (
    <div className="terminos-page">
      <header className="hero-terminos">
        <h1>Términos y Condiciones</h1>
        <p>Última actualización: Marzo 2025</p>
      </header>

      <section className="content">
        <h2>1. Introducción</h2>
        <p>
          Bienvenido a <strong>Tu Rincón Vegano</strong>. Al acceder y utilizar nuestro sitio web, aceptas cumplir con los siguientes términos y condiciones de uso. Si no estás de acuerdo con estos términos, te recomendamos no utilizar nuestros servicios.
        </p>

        <h2>2. Uso del sitio web</h2>
        <p>
          Este sitio tiene como propósito proporcionar información sobre el veganismo y compartir recetas veganas. No nos hacemos responsables de cualquier problema derivado del uso de la información proporcionada.
        </p>
        <ul>
          <li>Todo el contenido publicado es solo para fines informativos.</li>
          <li>Las recetas y consejos ofrecidos no sustituyen asesoramiento médico o nutricional profesional.</li>
          <li>No garantizamos la exactitud de la información en todo momento.</li>
        </ul>

        <h2>3. Registro de usuarios</h2>
        <p>
          Para acceder a ciertas funciones del sitio, los usuarios pueden registrarse. Es tu responsabilidad proporcionar información precisa y mantener la confidencialidad de tu cuenta. Nos reservamos el derecho de suspender cuentas en caso de uso indebido.
        </p>
        <ul>
          <li>No compartas tu contraseña con terceros.</li>
          <li>Tu cuenta es personal e intransferible.</li>
          <li>Nos reservamos el derecho de eliminar cuentas en caso de incumplimiento.</li>
        </ul>

        <h2>4. Propiedad intelectual</h2>
        <p>
          Todo el contenido, imágenes y materiales publicados en este sitio son propiedad de <strong>Tu Rincón Vegano</strong>, salvo indicación en contrario. No está permitido copiar, reproducir o distribuir el contenido sin autorización previa.
        </p>
        <ul>
          <li>Las recetas y artículos son de uso exclusivo del sitio.</li>
          <li>Se prohíbe la reproducción sin autorización.</li>
          <li>El uso indebido del contenido puede llevar a acciones legales.</li>
        </ul>

        <h2>5. Privacidad y cookies</h2>
        <p>
          Respetamos tu privacidad. Puedes consultar nuestra <a href="/privacidad">Política de Privacidad</a> y <a href="/cookies">Política de Cookies</a> para más información. Utilizamos cookies para mejorar la experiencia del usuario.
        </p>
        <ul>
          <li>Recopilamos datos para mejorar tu experiencia en el sitio.</li>
          <li>Puedes administrar tus preferencias de cookies en cualquier momento.</li>
          <li>Tu información no será compartida con terceros sin tu consentimiento.</li>
        </ul>

        <h2>6. Modificaciones a los términos</h2>
        <p>
          Nos reservamos el derecho de modificar estos términos en cualquier momento. Te recomendamos revisarlos periódicamente para estar al tanto de cualquier cambio.
        </p>
        <ul>
          <li>Publicaremos cualquier cambio en esta página.</li>
          <li>El uso continuado del sitio implica la aceptación de los términos actualizados.</li>
        </ul>

        <h2>7. Contacto</h2>
        <p>
          Si tienes dudas sobre estos términos, contáctanos a través de nuestra página de <a href="/contacto">Contacto</a>.
        </p>
      </section>
    </div>
  );
};

export default Terminos;
