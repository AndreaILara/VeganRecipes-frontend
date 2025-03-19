import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { apiRequest } from "../utils/apiRequest";
import "../styles/RecipeDetail.css";
import heartRed from "../../public/heart-red.png";
import heartBig from "../../public/heart-big.png";

const RecipeDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recipeRes, favoritesRes, commentsRes] = await Promise.all([
          apiRequest({ endpoint: `recipes/${id}`, method: "GET" }),
          user ? apiRequest({ endpoint: "users/favorites", method: "GET" }) : null,
          apiRequest({ endpoint: `comments/${id}`, method: "GET" }),
        ]);

        if (recipeRes) setRecipe(recipeRes);
        if (commentsRes) setComments(commentsRes);

        if (favoritesRes?.favorites?.some((fav) => fav._id === id)) {
          setIsFavorite(true);
          localStorage.setItem(`favorite_${id}`, "true");
        } else {
          setIsFavorite(false);
          localStorage.removeItem(`favorite_${id}`);
        }
      } catch (error) {
        console.error("❌ Error al obtener datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, user]);

  const handleToggleFavorite = async () => {
    if (!user) {
      alert("Debes iniciar sesión para añadir favoritos.");
      return;
    }

    setIsFavorite((prev) => !prev);
    const newState = !isFavorite;

    try {
      const method = newState ? "POST" : "DELETE";
      const res = await apiRequest({
        endpoint: "users/favorites",
        method,
        body: { recipeId: id },
      });

      if (!res?.message) {
        console.error("⚠️ Error al modificar favoritos:", res);
        setIsFavorite(!newState);
      }
    } catch (error) {
      console.error("❌ Error al modificar favorito:", error);
      setIsFavorite(!newState);
    }
  };

  const handleAddComment = async () => {
    if (!user) {
      alert("Debes iniciar sesión para comentar.");
      return;
    }
    if (!newComment.trim()) return;

    try {
      const res = await apiRequest({
        endpoint: "comments",
        method: "POST",
        body: {
          recipeId: id,
          content: newComment,
          parentComment: replyingTo || null,
        },
      });

      if (res?._id) {
        setComments([...comments, {
          _id: res._id,
          content: newComment,
          createdBy: {
            username: user.username,
            avatar: user.avatar || "/default-avatar.png",
          }
        }]);
        setNewComment("");
        setReplyingTo(null);
      } else {
        console.error("⚠️ No se pudo publicar el comentario.", res);
      }
    } catch (error) {
      console.error("❌ Error al publicar comentario:", error);
    }
  };


  const handleDeleteComment = async (commentId) => {
    if (!user) return;

    try {
      const res = await apiRequest({
        endpoint: `comments/${commentId}`,
        method: "DELETE",
      });

      if (res?.message) {
        setComments(comments.filter((comment) => comment._id !== commentId));
      } else {
        console.error("⚠️ No se pudo eliminar el comentario.", res);
      }
    } catch (error) {
      console.error("❌ Error al eliminar comentario:", error);
    }
  };

  if (loading) return <p className="recipe-loading">Cargando receta...</p>;
  if (!recipe) return <p className="recipe-error">No se encontró la receta.</p>;

  return (
    <div className="recipe-detail-container">
      <div className="recipe-header">
        <img src={recipe.image} alt={recipe.title} className="recipe-detail-image" />
        <div className="recipe-overlay"></div>
        <h1 className="recipe-title-overlay">{recipe.title}</h1>

        <button className={`favorite-button ${isFavorite ? "active" : ""}`} onClick={handleToggleFavorite}>
          <img src={isFavorite ? heartBig : heartRed} alt="Favorito" className="favorite-icon" />
        </button>
      </div>

      {/* 🔹 Barra de información de la receta */}
      <div className="recipe-info-bar">
        <span>⏳ Tiempo de preparación: {recipe.prepTime || "10m"}</span>
        <span>🔥 Cocción: {recipe.cookTime || "20m"}</span>
        <span>🍽️ Porciones: {recipe.servings || "2"}</span>
      </div>
      {user?.role === "admin" && (
        <button className="edit-recipe-button" onClick={() => navigate(`/editar-receta/${id}`)}>
          ✏️ Editar Receta
        </button>
      )}

      {/* 🔹 Ingredientes y Pasos */}
      <div className="recipe-content">
        <div className="recipe-ingredients">
          <h2 className="recipe-subtitle">Ingredientes</h2>
          <ul className="recipe-list">
            {recipe.ingredients
              ? recipe.ingredients.split(",").map((ing, index) => (
                <li key={index} className="recipe-list-item">{ing.trim()}</li>
              ))
              : <li>No hay ingredientes disponibles.</li>}
          </ul>
        </div>

        <div className="recipe-steps">
          <h2 className="recipe-subtitle">Preparación</h2>
          <ol>
            {recipe.steps
              ? recipe.steps.split(".").map((step, index) =>
                step.trim() && <li key={index} className="recipe-step-item">{step.trim()}.</li>
              )
              : <li>No hay pasos disponibles.</li>}
          </ol>
        </div>
      </div>
      <button className="back-button" onClick={() => {
        const formattedCategory = recipe.category.toLowerCase().replace(/\s+/g, "-") + "s";
        navigate(`/recetas/categoria/${formattedCategory}`);
      }}>
        ← Volver a {recipe.category}s
      </button>

      <div className="comments-section">
        <h2 className="comments-title">Comentarios</h2>

        {user && (
          <div className="comment-input">
            <img src={user.avatar || "/default-avatar.jpg"} alt="Avatar" className="comment-avatar" />
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escribe un comentario..."
            />
            <button onClick={handleAddComment} className="comment-button">Comentar</button>
          </div>
        )}

        {comments.length === 0 ? (
          <p className="no-comments">Aún no hay comentarios. Sé el primero en opinar.</p>
        ) : (
          <ul className="comments-list">
            {comments.map((comment) => (
              <li key={comment._id} className="comment-item">
                <img src={comment.createdBy.avatar || "/default-avatar.png"} alt="Avatar" className="comment-avatar" />
                <div className="comment-content">
                  <span className="comment-username">{comment.createdBy.username}</span>
                  <p>{comment.content}</p>
                  {user && (user._id === comment.createdBy._id || user.role === "admin") && (
                    <span className="delete-comment" onClick={() => handleDeleteComment(comment._id)}>Eliminar</span>
                  )}
                </div>
              </li>
            ))}

          </ul>
        )}
      </div>
    </div>
  );
};

export default RecipeDetail;
