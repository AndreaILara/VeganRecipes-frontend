import { useState, useEffect, useContext } from "react";
import { apiRequest } from "../utils/apiRequest";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";
import imageCompression from "browser-image-compression";
import Loader from "../components/Loader";


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
        setAvatar(reader.result);
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

      localStorage.setItem("user", JSON.stringify(updatedUser.user));
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

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("⚠️ Esta acción eliminará tu cuenta permanentemente. ¿Estás seguro?");
    if (!confirmDelete) return;

    try {
      const res = await apiRequest({
        endpoint: "users/delete",
        method: "DELETE",
      });

      if (res?.message === "Cuenta eliminada") {
        alert("Tu cuenta ha sido eliminada con éxito.");
        logout();
        navigate("/");
      }
    } catch (error) {
      console.error("❌ Error al eliminar cuenta:", error);
      alert("No se pudo eliminar la cuenta.");
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

        <button className="btn-delete-account" onClick={handleDeleteAccount}>
          Eliminar mi cuenta
        </button>
      </div>
    </div>
  );
};

export default Profile;
