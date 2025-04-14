import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiRequest } from "../utils/apiRequest";
import Loader from "../components/Loader";
import "../styles/Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordHelp, setPasswordHelp] = useState("");
  const navigate = useNavigate();

  // Validar requisitos de la contraseña mientras escribe
  useEffect(() => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.]).{8,}$/;
    if (formData.password && !regex.test(formData.password)) {
      setPasswordHelp("La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un símbolo.");
    } else {
      setPasswordHelp("");
    }
  }, [formData.password]);

  // Comprobar si el email ya existe (en tiempo real)
  const checkEmailAvailability = async (email) => {
    if (!email) return;
    try {
      const res = await apiRequest({
        endpoint: "users/check-email",
        method: "POST",
        body: { email },
      });

      if (res.exists) {
        setEmailError("❌ Este correo ya está registrado.");
      } else {
        setEmailError("");
      }
    } catch (error) {
      console.error("Error al verificar email:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "email") {
      checkEmailAvailability(value);
    }
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
      if (error.message.includes("El email ya está en uso")) {
        setMessage("❌ El email ya está registrado.");
      } else if (error.message.includes("El nombre de usuario ya está en uso")) {
        setMessage("❌ El nombre de usuario ya existe.");
      } else if (error.message.includes("contraseña")) {
        setMessage("❌ La contraseña no cumple con los requisitos.");
      } else {
        setMessage("❌ Error al registrarse. Inténtalo de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="fullpage-loader">
        <Loader />
      </div>
    );
  }

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Crear una cuenta</h2>
        {message && <p className={`message ${message.includes("❌") ? "error" : "success"}`}>{message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Nombre de usuario</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {emailError && <p className="input-error">{emailError}</p>}
          </div>

          <div className="input-group">
            <label>Contraseña</label>
            <div className="password-wrapper">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setPasswordVisible((prev) => !prev)}
              >
                {passwordVisible ? "🙈" : "👁️"}
              </button>
            </div>
            {passwordHelp && <p className="input-help">{passwordHelp}</p>}
          </div>

          <button
            type="submit"
            className="btn-register"
            disabled={loading || emailError !== ""}
          >
            Registrarse
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
