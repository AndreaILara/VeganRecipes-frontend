import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { apiRequest } from "../utils/apiRequest";
import "../styles/RecipeDetail.css";

const RecipeDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await apiRequest({ endpoint: `recipes/${id}`, method: "GET" });

        if (!res) {
          console.warn("⚠️ No se obtuvo la receta, pero NO cerramos sesión.");
          return;
        }

        setRecipe(res);
      } catch (error) {
        console.error("❌ Error al obtener detalles de la receta:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <p className="recipe-loading">Cargando receta...</p>;
  if (!recipe) return <p className="recipe-error">No se encontró la receta.</p>;

  return (
    <div className="recipe-detail-container">
      <div className="recipe-detail">
        <img src={recipe.image} alt={recipe.title} className="recipe-detail-image" />
        <div className="recipe-detail-info">
          <h1 className="recipe-title">{recipe.title}</h1>

          <h2 className="recipe-subtitle">Ingredientes:</h2>
          <ul className="recipe-list">
            {recipe.ingredients
              ? recipe.ingredients.split(",").map((ing, index) => (
                <li key={index} className="recipe-list-item">{ing.trim()}</li>
              ))
              : <li>No hay ingredientes disponibles.</li>}
          </ul>

          <h2 className="recipe-subtitle">Pasos:</h2>
          <ol className="recipe-steps">
            {recipe.steps
              ? recipe.steps.split(".").map((step, index) =>
                step.trim() && <li key={index} className="recipe-step-item">{step.trim()}.</li>
              )
              : <li>No hay pasos disponibles.</li>}
          </ol>

          {user?.role === "admin" && (
            <button onClick={() => navigate(`/editar-receta/${id}`)} className="recipe-edit-button">
              ✏️ Editar Receta
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
