import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiRequest } from "../utils/apiRequest";
import "../styles/Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const newUser = await apiRequest({
        endpoint: "users/register",
        method: "POST",
        body: formData,
      });

      if (!newUser || newUser.error) {
        throw new Error(newUser.message || "Error desconocido en el registro.");
      }

      setMessage("✅ Registro exitoso. Redirigiendo...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("❌ Error en el registro:", error);

      // 🔥 Capturar el mensaje de error enviado desde el backend
      if (error.message.includes("El email ya está en uso")) {
        setMessage("❌ El email ya está registrado. Intenta con otro.");
      } else if (error.message.includes("El nombre de usuario ya está en uso")) {
        setMessage("❌ El nombre de usuario ya existe. Prueba con otro.");
      } else if (error.message.includes("contraseña")) {
        setMessage("❌ La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un símbolo especial.");
      } else {
        setMessage("❌ Error al registrarse. Inténtalo de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Crear una cuenta</h2>
        {message && <p className={`message ${message.includes("❌") ? "error" : "success"}`}>{message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Nombre de usuario</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Contraseña</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>

          <button type="submit" className="btn-register" disabled={loading}>
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        <p className="switch-auth">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
