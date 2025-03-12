import { mainRoute } from "../data/mainRoutes"; // Asegúrate de importar correctamente

export const apiRequest = async ({ endpoint, id = "", method = "GET", body }) => {
  const token = localStorage.getItem("token");

  const options = {
    method: method.toUpperCase(),
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }), // Solo agregar Authorization si hay token
    },
    ...(body && { body: JSON.stringify(body) }), // Solo agregar body si hay datos
  };

  try {
    const url = id ? `${mainRoute}/${endpoint}/${id}` : `${mainRoute}/${endpoint}`;
    console.log("🔍 Fetching:", url, options); // 🔥 Para depuración
    const res = await fetch(url, options);

    if (!res.ok) {
      const errorData = await res.json().catch(() => null); // Intenta obtener un mensaje de error JSON
      throw new Error(errorData?.message || `HTTP error! Status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("❌ Error en apiRequest:", error.message);
    throw error;
  }
};

