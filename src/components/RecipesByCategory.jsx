import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiRequest } from "../utils/apiRequest";
import "../styles/RecipesByCategory.css";

const RecipesByCategory = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 15; // 🔥 3x5 en escritorio

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

  // 🔹 Paginación
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  return (
    <section className="recipes-category">
      <h1 className="category-title">Recetas de {category.charAt(0).toUpperCase() + category.slice(1)}</h1>

      <div className="recipes-grid">
        {currentRecipes.length > 0 ? (
          currentRecipes.map((recipe) => (
            <div
              key={recipe._id}
              className="recipe-card"
              onClick={() => navigate(`/receta/${recipe._id}`)}
            >
              <img src={recipe.image} alt={recipe.title} className="recipe-image" />
              <h2 className="recipe-title">{recipe.title}</h2>
            </div>
          ))
        ) : (
          <p>No hay recetas disponibles en esta categoría.</p>
        )}
      </div>

      {/* 🔹 Paginación */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            ← Anterior
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`pagination-btn ${index + 1 === currentPage ? "active" : ""}`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            Siguiente →
          </button>
        </div>
      )}
    </section>
  );
};

export default RecipesByCategory;
