import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

const Footer = () => {
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      setShowCookieBanner(true);
    }
  }, []);

  const handleCookieConsent = (consent) => {
    localStorage.setItem("cookieConsent", consent);
    setShowCookieBanner(false);
  };

  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          {/* Sección de Información */}
          <div className="footer-section">
            <h3>Tu Rincón Vegano</h3>
            <p>Inspiramos a la gente a probar el veganismo y adoptar un estilo de vida más saludable.</p>
          </div>

          {/* Sección de Navegación */}
          <div className="footer-section">
            <h3>Conecta</h3>
            <ul>
              <li><Link to="/nosotros">Nosotros</Link></li>
              <li><Link to="/contacto">Contáctanos</Link></li>
            </ul>
          </div>

          {/* Sección de Legal */}
          <div className="footer-section">
            <h3>Legal</h3>
            <ul>
              <li><Link to="/terminos">Términos y Condiciones</Link></li>
              <li><Link to="/faq">Preguntas Frecuentes</Link></li>
              <li><Link to="/cookies">Política de Cookies</Link></li>
              <li><Link to="/privacidad">Aviso de Privacidad</Link></li>
            </ul>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="footer-divider"></div>

        {/* Redes Sociales */}
        <div className="social-container">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube"></i>
          </a>
        </div>

        {/* Derechos reservados */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Tu Rincón Vegano. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* Modal de Cookies */}
      {showCookieBanner && (
        <div className="cookie-banner">
          <p>Usamos cookies para mejorar tu experiencia. ¿Aceptas el uso de cookies?</p>
          <button onClick={() => handleCookieConsent("accepted")}>Aceptar</button>
          <button onClick={() => handleCookieConsent("denied")}>Rechazar</button>
        </div>
      )}
    </>
  );
};

export default Footer;
