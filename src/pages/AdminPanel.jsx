import { useEffect, useState, useContext } from "react";
import { apiRequest } from "../utils/apiRequest";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";
import "../styles/AdminPanel.css";

const AdminPanel = () => {
  const { user } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
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
    if (!user || user.role !== "admin") return;

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchRecipes(), fetchUsers()]);
      setLoading(false);
    };

    fetchData();
  }, [user]);

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
    Object.entries(newRecipe).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      setLoading(true);
      const response = await apiRequest({
        endpoint: "recipes",
        method: "POST",
        body: formData,
        isFormData: true,
      });

      if (response) {
        alert("✅ Receta añadida con éxito");
        setNewRecipe({
          title: "",
          ingredients: "",
          steps: "",
          category: "Desayuno",
          prepTime: "",
          cookTime: "",
          servings: "",
          image: null,
        });
        fetchRecipes();
      }
    } catch (error) {
      console.error("❌ Error al enviar receta:", error);
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  if (!user || user.role !== "admin") {
    return <p className="error-message">⛔ Acceso denegado. Sólo los administradores pueden acceder a este panel.</p>;
  }

  if (loading) {
    return (
      <div className="fullpage-loader">
        <Loader />
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <h2>Panel de Administración</h2>

      <section className="add-recipe">
        <h3>Añadir Nueva Receta</h3>
        <form onSubmit={handleRecipeSubmit}>
          <input type="text" placeholder="Título" value={newRecipe.title} onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })} required />
          <textarea placeholder="Ingredientes" value={newRecipe.ingredients} onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value })} required />
          <textarea placeholder="Pasos" value={newRecipe.steps} onChange={(e) => setNewRecipe({ ...newRecipe, steps: e.target.value })} required />
          <input type="number" placeholder="⏳ Tiempo de preparación (min)" value={newRecipe.prepTime} onChange={(e) => setNewRecipe({ ...newRecipe, prepTime: e.target.value })} required />
          <input type="number" placeholder="🔥 Tiempo de cocción (min)" value={newRecipe.cookTime} onChange={(e) => setNewRecipe({ ...newRecipe, cookTime: e.target.value })} required />
          <input type="number" placeholder="🍽️ Porciones" value={newRecipe.servings} onChange={(e) => setNewRecipe({ ...newRecipe, servings: e.target.value })} required />
          <select value={newRecipe.category} onChange={(e) => setNewRecipe({ ...newRecipe, category: e.target.value })}>
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
