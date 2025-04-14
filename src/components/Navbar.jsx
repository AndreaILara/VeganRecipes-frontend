import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Navbar.css";
import logo from "/logo.png";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <img src={logo} alt="Tu Rincón Vegano" />
          </Link>
        </div>

        {/* Botón menú hamburguesa */}
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        {/* Menú desplegable */}
        <ul className={`navbar-menu ${menuOpen ? "active" : ""}`}>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Inicio</Link></li>

          <li className="dropdown" onClick={() => setShowDropdown(!showDropdown)}>
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

          {user ? (
            <>
              <li>
                <Link to="/perfil" className="user-profile" onClick={() => setMenuOpen(false)}>
                  <img src={user.avatar || "/default-avatar.jpg"} alt="Perfil" className="profile-pic-navbar" />
                </Link>
              </li>
              <li><Link to="/favoritos" onClick={() => setMenuOpen(false)}>Favoritos</Link></li>
              {user.role === "admin" && (
                <li><Link to="/admin" onClick={() => setMenuOpen(false)}>Panel Admin</Link></li>
              )}
              <li>
                <button onClick={handleLogout} className="btn-logout">Cerrar sesión</button>
              </li>
            </>
          ) : (
            <li><Link to="/register" onClick={() => setMenuOpen(false)}>Únete</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
