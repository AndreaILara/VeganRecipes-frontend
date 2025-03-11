import { useState } from "react";
import { apiRequest } from "../utils/apiRequest";
import "../styles/RecuperarContraseña.css";

const RecuperarContraseña = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiRequest({
        endpoint: "users/forgot-password",
        method: "POST",
        body: { email },
      });
      setMessage("✅ Revisa tu correo para restablecer tu contraseña.");
    } catch (error) {
      setMessage("❌ Error al enviar solicitud.");
    }
  };

  return (
    <div className="recuperar-page">
      <div className="recuperar-container">
        <h2>Recuperar Contraseña</h2>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <button type="submit" className="cta-button">Enviar</button>
        </form>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default RecuperarContraseña;
