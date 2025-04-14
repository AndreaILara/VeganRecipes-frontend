import { createContext, useState, useEffect } from "react";
import { apiRequest } from "../utils/apiRequest";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));

      const validateSession = async () => {
        try {
          const res = await apiRequest({ endpoint: "users/profile", method: "GET" });

          if (!res) {
            console.warn("⚠️ Token inválido o sesión no válida. Cerrando sesión.");
            logout();
            return;
          }

          // ✅ Si el token es válido, actualizamos los datos del usuario
          setUser(res);
        } catch (error) {
          console.error("❌ Error al validar sesión:", error);
          logout(); // cerramos sesión si hay error inesperado
        }
      };

      validateSession();
    }
  }, []);

  const login = (userData, token) => {
    if (!token) {
      console.error("❌ Error: No hay token recibido en login.");
      return;
    }

    console.log("✅ Guardando sesión...");
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    console.log("🚨 Cerrando sesión. Eliminando token y usuario...");
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
