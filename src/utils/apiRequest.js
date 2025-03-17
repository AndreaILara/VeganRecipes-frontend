import { mainRoute } from "../data/mainRoutes";

export const apiRequest = async ({ endpoint, id = "", method = "GET", body, isFormData = false }) => {
  const token = localStorage.getItem("token");

  console.log(`🛠️ Token actual en localStorage:`, token); // ✅ Verifica si el token está presente

  const headers = {
    ...(isFormData
      ? { Authorization: `Bearer ${token}` } // ✅ Si es FormData, se omite Content-Type
      : {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      }),
  };

  const options = {
    method: method.toUpperCase(),
    headers,
    ...(body && { body: isFormData ? body : JSON.stringify(body) }),
  };

  try {
    const url = id ? `${mainRoute}/${endpoint}/${id}` : `${mainRoute}/${endpoint}`;
    console.log("🔍 Fetching:", url, options);

    const res = await fetch(url, options);

    if (res.status === 401) {
      console.warn("⚠️ Token inválido. No eliminamos sesión.");
      return { error: "Unauthorized" };
    }

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(errorData?.message || `HTTP error! Status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("❌ Error en apiRequest:", error.message);
    return null;
  }
};
