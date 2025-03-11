import { useEffect, useState } from "react";
import { apiRequest } from "../utils/apiRequest";
import { useNavigate } from "react-router-dom";
import "../styles/FeaturedRecipes.css";

const FeaturedRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await apiRequest({ endpoint: "recipes" });

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
      <h2>Recetas Destacadas</h2>
      <div className="carousel">
        <div className="carousel-track">
          {[...recipes, ...recipes].map((recipe, index) => (
            <div key={index} className="recipe-card">
              <img src={recipe.image} alt={recipe.title} />
              <h3>{recipe.title}</h3>
              <button onClick={() => navigate(`/recetas/${recipe._id}`)}>Ver Receta</button>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default FeaturedRecipes;
