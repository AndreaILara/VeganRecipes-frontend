import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { apiRequest } from "../utils/apiRequest";
import "../styles/RecipeDetail.css";
import heartOutline from "../../public/heart-outline.png";
import heartFilled from "../../public/heart-fill.png";

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
        setComments([...comments, res]); // Agrega el nuevo comentario
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
      <div className="recipe-detail">
        <img src={recipe.image} alt={recipe.title} className="recipe-detail-image" />
        <div className="recipe-detail-info">
          <h1 className="recipe-title">{recipe.title}</h1>

          {/* Botón de favorito */}
          <button className="favorite-button" onClick={handleToggleFavorite}>
            <img src={isFavorite ? heartFilled : heartOutline} alt="Favorito" className="favorite-icon" />
          </button>

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

      {/* Sección de comentarios */}
      <div className="comments-section">
        <h2 className="comments-title">Comentarios</h2>

        {user && (
          <div className="comment-input">
            {replyingTo && <p>Respondiendo a un comentario...</p>}
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escribe un comentario..."
            />
            <button onClick={handleAddComment}>Comentar</button>
          </div>
        )}

        {comments.length === 0 ? (
          <p className="no-comments">Aún no hay comentarios. Sé el primero en opinar.</p>
        ) : (
          <ul className="comments-list">
            {comments.map((comment) => (
              <li key={comment._id} className="comment-item">
                <p><strong>{comment.createdBy.username}:</strong> {comment.content}</p>
                
                <div className="comment-actions">
                  {user && (
                    <button onClick={() => setReplyingTo(comment._id)} className="reply-button">
                      Responder
                    </button>
                  )}
                  {user && (user._id === comment.createdBy._id || user.role === "admin") && (
                    <button onClick={() => handleDeleteComment(comment._id)} className="delete-button">
                      🗑️ Eliminar
                    </button>
                  )}
                </div>

                {/* Mostrar respuestas */}
                {comment.replies && comment.replies.length > 0 && (
                  <ul className="replies-list">
                    {comment.replies.map((reply) => (
                      <li key={reply._id} className="reply-item">
                        <p><strong>{reply.createdBy.username}:</strong> {reply.content}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RecipeDetail;
