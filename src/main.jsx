import React, { useEffect, useContext } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecuperarContraseña from "./pages/RecuperarContraseña";
import CodigoVerificacion from "./pages/CodigoVerificacion.jsx";
import NuevaContraseña from "./pages/NuevaContraseña.jsx";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Nosotros from "./pages/Nosotros";
import Contacto from "./pages/Contacto";
import Terminos from "./pages/Terminos";
import Faq from "./pages/Faq";
import Cookies from "./pages/Cookies";
import Privacidad from "./pages/Privacidad";
import RecipeDetail from "./pages/RecipeDetail";
import CategoriesPage from "./components/CategoriesPage";
import RecipesByCategory from "./components/RecipesByCategory";
import AdminPanel from "./pages/AdminPanel.jsx";
import EditRecipe from "./pages/EditRecipe";
import Favorites from "./pages/Favorites"; // 🆕 Importar Favorites.jsx
import WhyVegan from "./components/WhyVegan";
import VeganInfo from "./pages/VeganInfo";
import "/style.css";
import "toastify-js/src/toastify.css";
import { apiRequest } from "./utils/apiRequest.js";
import { AuthProvider, AuthContext } from "./context/AuthContext";

const AppRoutes = () => {
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await apiRequest({ endpoint: "users/profile", method: "GET" });

        if (res?.id) {
          setUser(res);
          localStorage.setItem("user", JSON.stringify(res));
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
        }
      } catch (error) {
        console.error("❌ Error al validar el token:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
      }
    };

    validateToken();
  }, [setUser]);

  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
          <Route path="/recuperar-contraseña" element={<RecuperarContraseña />} />
          <Route path="/verificacion" element={<CodigoVerificacion />} />
          <Route path="/nueva-contraseña" element={<NuevaContraseña />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/terminos" element={<Terminos />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/privacidad" element={<Privacidad />} />
          <Route path="/" element={<WhyVegan />} />
          <Route path="/vegan-info" element={<VeganInfo />} />

          {/* Rutas protegidas (solo usuarios logueados) */}
          <Route path="/perfil" element={user ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/recetas" element={<CategoriesPage />} />
          <Route path="/recetas/categoria/:category" element={<RecipesByCategory />} />
          <Route path="/receta/:id" element={<RecipeDetail />} />
          <Route path="/favoritos" element={user ? <Favorites /> : <Navigate to="/login" />} /> {/* 🆕 Nueva ruta */}

          {/* Rutas exclusivas para admins */}
          <Route path="/admin" element={user?.role === "admin" ? <AdminPanel /> : <Navigate to="/" />} />
          <Route path="/editar-receta/:id" element={user?.role === "admin" ? <EditRecipe /> : <Navigate to="/" />} />

          {/* Ruta para páginas no encontradas */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <AppRoutes />
  </AuthProvider>
);
