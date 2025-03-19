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
    prepTime: "",
    cookTime: "",
    servings: "",
    image: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 10;

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
    formData.append("prepTime", newRecipe.prepTime);
    formData.append("cookTime", newRecipe.cookTime);
    formData.append("servings", newRecipe.servings);
    formData.append("image", newRecipe.image);

    try {
      const response = await apiRequest({
        endpoint: "recipes",
        method: "POST",
        body: formData,
        isFormData: true,
      });

      if (response) {
        alert("✅ Receta añadida con éxito");
        fetchRecipes();
      }
    } catch (error) {
      console.error("❌ Error al enviar receta:", error);
    }
  };

  // 🔹 Paginar recetas
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  return (
    <div className="admin-panel">
      <h2>Panel de Administración</h2>

      <section className="add-recipe">
        <h3>Añadir Nueva Receta</h3>
        <form onSubmit={handleRecipeSubmit}>
          <input type="text" placeholder="Título" onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })} required />
          <textarea placeholder="Ingredientes" onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value })} required />
          <textarea placeholder="Pasos" onChange={(e) => setNewRecipe({ ...newRecipe, steps: e.target.value })} required />

          <input type="number" placeholder="⏳ Tiempo de preparación (min)" onChange={(e) => setNewRecipe({ ...newRecipe, prepTime: e.target.value })} required />
          <input type="number" placeholder="🔥 Tiempo de cocción (min)" onChange={(e) => setNewRecipe({ ...newRecipe, cookTime: e.target.value })} required />
          <input type="number" placeholder="🍽️ Porciones" onChange={(e) => setNewRecipe({ ...newRecipe, servings: e.target.value })} required />

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
          {currentRecipes.map((recipe) => (
            <li key={recipe._id}>
              {recipe.title}
              <button onClick={() => handleDeleteRecipe(recipe._id)}>Eliminar</button>
            </li>
          ))}
        </ul>

        {/* Paginación */}
        <div className="pagination">
          {Array.from({ length: Math.ceil(recipes.length / recipesPerPage) }, (_, i) => (
            <button key={i} onClick={() => setCurrentPage(i + 1)} className={currentPage === i + 1 ? "active" : ""}>
              {i + 1}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminPanel;
