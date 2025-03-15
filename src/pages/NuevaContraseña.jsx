import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RecuperarContraseña.css";

const NuevaContraseña = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  // Recuperamos email y código desde localStorage
  const email = localStorage.getItem("resetEmail");
  const resetToken = localStorage.getItem("resetToken");

  // 🔥 Si no hay código o email, redirigir automáticamente al login
  useEffect(() => {
    if (!email || !resetToken) {
      navigate("/login");
    }
  }, [email, resetToken, navigate]);

  // Validar contraseña con regex
  const validarContraseña = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarContraseña(password)) {
      setMessage("❌ La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un símbolo especial.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("❌ Las contraseñas no coinciden.");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/users/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, resetToken, newPassword: password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error al cambiar contraseña.");

      // ✅ Limpiar localStorage después del éxito
      localStorage.removeItem("resetEmail");
      localStorage.removeItem("resetToken");

      setMessage("✅ Contraseña actualizada. Redirigiendo al login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error("❌ Error en handleSubmit:", error);
      setMessage("❌ Error al cambiar la contraseña.");
    }
  };

  return (
    <div className="recuperar-page">
      <div className="recuperar-container">
        <h2>Nueva Contraseña</h2>
        <form onSubmit={handleSubmit}>
          <label>Nueva Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Confirmar Contraseña</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="cta-button">Actualizar Contraseña</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default NuevaContraseña;
