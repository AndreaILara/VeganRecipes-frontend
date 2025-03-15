import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RecuperarContraseña.css";

const CodigoVerificacion = () => {
  const [codigo, setCodigo] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const email = localStorage.getItem("resetEmail"); // Obtener email desde localStorage

  if (!email) {
    return <p className="error-message">❌ No tienes un email válido para verificar.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`🔍 Código ingresado en el frontend: ${codigo}`);

    // Guardar el código en localStorage sin hacer verificación previa (ya se validará en el backend)
    localStorage.setItem("resetToken", codigo);

    setMessage("✅ Código ingresado. Redirigiendo...");
    setTimeout(() => navigate("/nueva-contraseña"), 2000);
  };

  return (
    <div className="recuperar-page">
      <div className="recuperar-container">
        <h2>Verificar Código</h2>
        <form onSubmit={handleSubmit}>
          <label>Introduce el código recibido</label>
          <input
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            required
          />
          <button type="submit" className="cta-button">Verificar Código</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default CodigoVerificacion;
