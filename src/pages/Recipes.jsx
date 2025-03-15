import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { apiRequest } from "../utils/apiRequest";
import "../styles/Recipes.css";

const Recipes = () => {
  const { category } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
        const response = await apiRequest({ endpoint: `recipes/category/${formattedCategory}`, method: "GET" });

        setRecipes(response);
      } catch (err) {
        setError("No se encontraron recetas en esta categoría.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [category]);

  return (
    <div className="recipes-page container">
      <h1>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
      {loading ? <p>Cargando...</p> : error ? <p>{error}</p> : (
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <div key={recipe._id} className="recipe-card">
              <img src={recipe.image} alt={recipe.title} />
              <h3>{recipe.title}</h3>
              <Link to={`/receta/${recipe._id}`}>
                <button>Ver Receta</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recipes;
