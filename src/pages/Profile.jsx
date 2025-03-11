import { useState, useEffect, useContext } from "react";
import { apiRequest } from "../utils/apiRequest";
import { AuthContext, AuthProvider } from "../context/AuthContext";

import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [avatar, setAvatar] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({ username: user.username, email: user.email, password: "" });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await apiRequest({
        endpoint: "users/profile",
        method: "PUT",
        body: formData,
      });
      setMessage("✅ Perfil actualizado");
    } catch (error) {
      setMessage("❌ Error al actualizar perfil");
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar tu cuenta?")) {
      await apiRequest({ endpoint: "users/delete", method: "DELETE" });
      logout();
      navigate("/");
    }
  };

  return (
    <div className="profile-page">
      <h1>Perfil de Usuario</h1>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} required />

        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Contraseña (nueva)</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} />

        <label>Foto de perfil</label>
        <input type="file" onChange={handleAvatarChange} />

        <button type="submit">Actualizar Perfil</button>
      </form>

      <button className="delete-button" onClick={handleDeleteAccount}>Eliminar Cuenta</button>
    </div>
  );
};

export default Profile;
