import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiRequest } from "../utils/apiRequest";
import { AuthContext, AuthProvider } from "../context/AuthContext";
import "../styles/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const data = await apiRequest({
        endpoint: "users/login",
        method: "POST",
        body: formData,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      login(data.user);
      console.log("✅ Login exitoso:", data);
      navigate("/perfil");
    } catch (error) {
      console.error("❌ Error en login:", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>Contraseña</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="cta-button">Iniciar Sesión</button>
        </form>

        <p className="switch-auth">
          ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
        </p>

        <p className="switch-auth">
          <Link to="/recuperar">¿Olvidaste tu contraseña?</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
