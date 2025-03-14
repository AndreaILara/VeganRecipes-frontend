import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Navbar.css";
import logo from "/logo.png";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <img src={logo} alt="Tu Rincón Vegano" />
          </Link>
        </div>

        <ul className="navbar-menu">
          <li><Link to="/">Inicio</Link></li>
          <li
            className="dropdown"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <span>Recetas ▼</span>
            {showDropdown && (
              <ul className="dropdown-menu">
                <li><Link to="/recetas/categoria/desayunos">Desayunos</Link></li>
                <li><Link to="/recetas/categoria/comidas">Comidas</Link></li>
                <li><Link to="/recetas/categoria/meriendas">Meriendas</Link></li>
                <li><Link to="/recetas/categoria/cenas">Cenas</Link></li>
              </ul>
            )}
          </li>
        </ul>

        {user ? (
          <div className="user-menu">
            <Link to="/perfil" className="user-profile">
              <img src={user.avatar || "/default-avatar.jpg"} alt="Perfil" className="profile-pic-navbar" />
            </Link>
            <Link to="/favoritos" className="btn-favorites">❤️</Link>
            {user.role === "admin" && <Link to="/admin" className="btn-admin">➕</Link>}
            <button onClick={logout} className="btn-logout">Cerrar sesión</button>
          </div>
        ) : (
          <Link to="/register" className="btn-login">Únete</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
