import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { apiRequest } from "../utils/apiRequest";
import "../styles/RecipesByCategory.css";

const RecipesByCategory = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);

  const normalizeCategory = (category) => {
    const formattedCategory = category.toLowerCase();
    const replacements = {
      "desayunos": "Desayuno",
      "comidas": "Comida",
      "meriendas": "Merienda",
      "cenas": "Cena"
    };
    return replacements[formattedCategory] || formattedCategory;
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const formattedCategory = normalizeCategory(category);
        const res = await apiRequest({ endpoint: `recipes/category/${formattedCategory}` });

        if (!res || res.error) {
          console.warn("⚠️ No se pudieron obtener recetas.");
          setRecipes([]);
          return;
        }

        setRecipes(res);
      } catch (error) {
        console.error("❌ Error al obtener recetas por categoría:", error);
      }
    };

    fetchRecipes();
  }, [category]);

  return (
    <section className="recipes-category">
      <h1 className="category-title">Recetas de {category.charAt(0).toUpperCase() + category.slice(1)}</h1>
      <div className="recipes-grid">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="recipe-card"
              onClick={() => navigate(`/receta/${recipe._id}`)}
            >
              <img src={recipe.image} alt={recipe.title} />
              <h2>{recipe.title}</h2>
              <button className="btn-view">Ver Receta</button>
            </div>
          ))
        ) : (
          <p>No hay recetas disponibles en esta categoría.</p>
        )}
      </div>
    </section>
  );
};

export default RecipesByCategory;
