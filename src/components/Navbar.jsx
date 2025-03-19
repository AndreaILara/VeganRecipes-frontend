import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Navbar.css";
import logo from "/logo.png";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Estado para la hamburguesa

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/">
            <img src={logo} alt="Tu Rincón Vegano" />
          </Link>
        </div>

        {/* Botón menú hamburguesa */}
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        {/* Menú principal */}
        <ul className={`navbar-menu ${menuOpen ? "active" : ""}`}>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Inicio</Link></li>
          <li
            className="dropdown"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <span>Recetas ▼</span>
            {showDropdown && (
              <ul className="dropdown-menu">
                <li><Link to="/recetas/categoria/desayunos" onClick={() => setMenuOpen(false)}>Desayunos</Link></li>
                <li><Link to="/recetas/categoria/comidas" onClick={() => setMenuOpen(false)}>Comidas</Link></li>
                <li><Link to="/recetas/categoria/meriendas" onClick={() => setMenuOpen(false)}>Meriendas</Link></li>
                <li><Link to="/recetas/categoria/cenas" onClick={() => setMenuOpen(false)}>Cenas</Link></li>
              </ul>
            )}
          </li>
        </ul>

        {/* Menú de usuario */}
        <div className="user-menu">
          {user ? (
            <>
              <Link to="/perfil" className="user-profile">
                <img src={user.avatar || "/default-avatar.jpg"} alt="Perfil" className="profile-pic-navbar" />
              </Link>
              <Link to="/favoritos" className="btn-favorites">❤️</Link>
              {user.role === "admin" && <Link to="/admin" className="btn-admin">➕</Link>}
              <button onClick={logout} className="btn-logout">Cerrar sesión</button>
            </>
          ) : (
            <Link to="/register" className="btn-login">Únete</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
