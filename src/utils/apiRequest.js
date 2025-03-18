import { mainRoute } from "../data/mainRoutes";

export const apiRequest = async ({ endpoint, method = "GET", body, isFormData = false }) => {
  const token = localStorage.getItem("token");

  const headers = {
    ...(isFormData
      ? { Authorization: `Bearer ${token}` } // ✅ Si es FormData, omitimos `Content-Type`
      : {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        }),
  };

  const options = {
    method: method.toUpperCase(),
    headers,
    ...(body && { body: isFormData ? body : JSON.stringify(body) }), // ✅ Enviar el `FormData` tal cual
  };

  try {
    const url = `${mainRoute}/${endpoint}`;
    console.log("🔍 Fetching:", url, options);

    const res = await fetch(url, options);
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
