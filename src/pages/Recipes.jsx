import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { apiRequest } from "../utils/apiRequest";
import Loader from "../components/Loader"; // 👈 Asegúrate de tener este componente
import "../styles/Recipes.css";

const Recipes = () => {
  const { category } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError("");

      try {
        const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
        const response = await apiRequest({ endpoint: `recipes/category/${formattedCategory}`, method: "GET" });

        if (!response || response.length === 0) {
          setError("No se encontraron recetas en esta categoría.");
        } else {
          setRecipes(response);
        }
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

      {loading ? (
        <div className="fullpage-loader">
          <Loader />
        </div>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
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
