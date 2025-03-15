import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiRequest } from "../utils/apiRequest";
import "../styles/FeaturedRecipes.css";

const FeaturedRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await apiRequest({ endpoint: "recipes" });

        if (!data || data.error) {
          console.warn("⚠️ No se pudieron obtener recetas destacadas.");
          setRecipes([]);
          return;
        }

        // Selecciona 10 recetas aleatorias
        const shuffled = data.sort(() => 0.5 - Math.random()).slice(0, 10);
        setRecipes(shuffled);
      } catch (error) {
        console.error("❌ Error al obtener recetas:", error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <section className="featured-recipes">
      <h2 className="carousel-title">Recetas Destacadas</h2>
      <div className="carousel">
        <div className="carousel-track">
          {recipes.map((recipe, index) => (
            <div
              key={index}
              className="recipe-card"
              onClick={() => navigate(`/receta/${recipe._id}`)}
            >
              <img src={recipe.image} alt={recipe.title} className="recipe-image" />
              <h3>{recipe.title}</h3>
              <button className="recipe-button">Ver Receta</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRecipes;
