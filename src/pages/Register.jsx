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

  // Manejar el envío del formulario
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

      setMessage("✅ Registro exitoso. Redirigiendo...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setMessage("❌ Error al registrarse. Inténtalo de nuevo.");
      console.error("Error en el registro:", error);
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
