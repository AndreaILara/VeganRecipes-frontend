import { useEffect, useState } from "react";
import { apiRequest } from "../utils/apiRequest";
import "../styles/AdminPanel.css";

const AdminPanel = () => {
  const [recipes, setRecipes] = useState([]);
  const [users, setUsers] = useState([]);
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    ingredients: "",
    steps: "",
    category: "Desayuno",
    image: null,
  });

  useEffect(() => {
    fetchRecipes();
    fetchUsers();
  }, []);

  const fetchRecipes = async () => {
    const data = await apiRequest({ endpoint: "recipes" });
    if (data) setRecipes(data);
  };

  const fetchUsers = async () => {
    const data = await apiRequest({ endpoint: "users" });
    if (data) setUsers(data);
  };

  const handleDeleteRecipe = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar esta receta?")) {
      await apiRequest({ endpoint: `recipes/${id}`, method: "DELETE" });
      fetchRecipes();
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este usuario?")) {
      await apiRequest({ endpoint: `users/${id}`, method: "DELETE" });
      fetchUsers();
    }
  };

  const handleRecipeSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("title", newRecipe.title);
    formData.append("ingredients", newRecipe.ingredients);
    formData.append("steps", newRecipe.steps);
    formData.append("category", newRecipe.category);
    formData.append("image", newRecipe.image); // ⚠️ Asegúrate de que la imagen se está añadiendo
  
    try {
      const response = await apiRequest({
        endpoint: "recipes",
        method: "POST",
        body: formData,
        isFormData: true, // ⚠️ IMPORTANTE: Esto le dice a `apiRequest.js` que no establezca `Content-Type`
      });
  
      if (response) {
        alert("✅ Receta añadida con éxito");
        fetchRecipes(); // Recargar la lista de recetas después de añadir una
      }
    } catch (error) {
      console.error("❌ Error al enviar receta:", error);
    }
  };
  

  return (
    <div className="admin-panel">
      <h2>Panel de Administración</h2>
      <section className="add-recipe">
        <h3>Añadir Nueva Receta</h3>
        <form onSubmit={handleRecipeSubmit}>
          <input type="text" placeholder="Título" onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })} required />
          <textarea placeholder="Ingredientes" onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value })} required />
          <textarea placeholder="Pasos" onChange={(e) => setNewRecipe({ ...newRecipe, steps: e.target.value })} required />
          <select onChange={(e) => setNewRecipe({ ...newRecipe, category: e.target.value })}>
            <option value="Desayuno">Desayuno</option>
            <option value="Comida">Comida</option>
            <option value="Merienda">Merienda</option>
            <option value="Cena">Cena</option>
          </select>
          <input type="file" accept="image/*" onChange={(e) => setNewRecipe({ ...newRecipe, image: e.target.files[0] })} required />
          <button type="submit">Añadir Receta</button>
        </form>
      </section>

      <section className="users-list">
        <h3>Usuarios Registrados</h3>
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              {user.username} ({user.email})
              <button onClick={() => handleDeleteUser(user._id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </section>

      <section className="recipes-list">
        <h3>Recetas Publicadas</h3>
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe._id}>
              {recipe.title}
              <button onClick={() => handleDeleteRecipe(recipe._id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminPanel;
