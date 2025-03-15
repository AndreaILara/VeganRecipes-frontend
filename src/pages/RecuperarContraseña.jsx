import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RecuperarContraseña.css";

const RecuperarContraseña = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/users/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "No se pudo enviar el correo.");

      // Guardar el email en localStorage para la siguiente etapa
      localStorage.setItem("resetEmail", email);
      setMessage("✅ Código enviado a tu correo. Revisa tu bandeja.");

      setTimeout(() => navigate("/verificacion"), 2000); // Redirigir a verificación
    } catch (error) {
      setMessage("❌ No se pudo enviar el correo.");
    }
  };

  return (
    <div className="recuperar-page">
      <div className="recuperar-container">
        <h2>Recuperar Contraseña</h2>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <button type="submit" className="cta-button">Enviar Código</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default RecuperarContraseña;
