import { useState, useEffect, useContext } from "react";
import { apiRequest } from "../utils/apiRequest";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";
import imageCompression from "browser-image-compression";

const Profile = () => {
  const { user, logout, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [avatar, setAvatar] = useState(user?.avatar || "/default-avatar.jpg");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({ username: user.username, email: user.email, password: "" });
      setAvatar(user.avatar || "/default-avatar.jpg");
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const options = {
        maxSizeMB: 0.2,
        maxWidthOrHeight: 400,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => {
        setAvatar(reader.result); // Guardamos la imagen en base64 antes de enviarla
      };
    } catch (error) {
      console.error("❌ Error al comprimir la imagen:", error);
      setMessage("❌ No se pudo procesar la imagen.");
    }
  };

  const validarContraseña = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const updateData = { username: formData.username, email: formData.email, avatar };

      // Solo incluir la contraseña si el usuario la cambió
      if (formData.password) {
        if (!validarContraseña(formData.password)) {
          setMessage("❌ La nueva contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un símbolo especial.");
          setLoading(false);
          return;
        }
        updateData.password = formData.password;
      }

      const updatedUser = await apiRequest({
        endpoint: "users/profile",
        method: "PUT",
        body: updateData,
      });

      localStorage.setItem("user", JSON.stringify(updatedUser.user)); // Guardar en localStorage
      setUser(updatedUser.user);
      setAvatar(updatedUser.user.avatar);

      setMessage("✅ Perfil actualizado correctamente.");
    } catch (error) {
      console.error("Error en actualización:", error);
      setMessage("❌ No se pudo actualizar el perfil.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1 className="profile-title">Perfil de Usuario</h1>

        {message && <p className={`message ${message.includes("❌") ? "error" : "success"}`}>{message}</p>}

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="profile-pic-container">
            <img src={avatar} alt="Perfil" className="profile-pic-large" />
            <label className="file-label">
              Cambiar Imagen
              <input type="file" onChange={handleAvatarChange} className="file-input" />
            </label>
          </div>

          <div className="input-group">
            <label>Nombre</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Contraseña (nueva)</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
          </div>

          <button type="submit" className="btn-update" disabled={loading}>
            {loading ? "Actualizando..." : "Actualizar Perfil"}
          </button>
        </form>

        <button className="btn-logout" onClick={logout}>Cerrar Sesión</button>
      </div>
    </div>
  );
};

export default Profile;
