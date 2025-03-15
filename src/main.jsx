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
import Recipes from "./pages/Recipes";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Nosotros from "./pages/Nosotros";
import Contacto from "./pages/Contacto";
import Terminos from "./pages/Terminos";
import Faq from "./pages/Faq";
import Cookies from "./pages/Cookies";
import Privacidad from "./pages/Privacidad";
import RecipeDetail from "./pages/RecipeDetail";
import "/style.css";
import "toastify-js/src/toastify.css";
import { apiRequest } from "./utils/apiRequest.js";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import EditRecipe from "./pages/EditRecipe"; // Importamos la nueva página de edición
import CategoriesPage from "./components/CategoriesPage";
import RecipesByCategory from "./components/RecipesByCategory"; // El componente que mostrará las recetas de cada categoría

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
          <Route path="/" element={<Home />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/perfil" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/perfil" />} />
          <Route path="/recuperar-contraseña" element={<RecuperarContraseña />} /> {/* Ajusta esta ruta */}
          <Route path="/verificacion" element={<CodigoVerificacion />} />
          <Route path="/nueva-contraseña" element={<NuevaContraseña />} />
          <Route path="/perfil" element={user ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/recetas" element={<CategoriesPage />} />
          <Route path="/recetas/categoria/:category" element={<RecipesByCategory />} />
          <Route path="/receta/:id" element={<RecipeDetail />} />
          <Route path="/editar-receta/:id" element={user?.role === "admin" ? <EditRecipe /> : <Navigate to="/" />} />



          {/* Rutas adicionales */}
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/terminos" element={<Terminos />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/privacidad" element={<Privacidad />} />
          <Route path="/editar-receta/:id" element={user?.role === "admin" ? <EditRecipe /> : <Navigate to="/" />} />


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
