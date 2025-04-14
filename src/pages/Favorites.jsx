import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { apiRequest } from "../utils/apiRequest";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import "../styles/Favorites.css";

const Favorites = () => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const res = await apiRequest({ endpoint: "users/favorites", method: "GET" });

        if (!res || res.error) {
          console.warn("⚠️ No se pudieron obtener favoritos.");
        } else {
          setFavorites(res.favorites);
        }
      } catch (error) {
        console.error("❌ Error al obtener favoritos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (recipeId) => {
    try {
      const res = await apiRequest({
        endpoint: "users/favorites",
        method: "DELETE",
        body: { recipeId },
      });

      if (res?.message) {
        setFavorites((prev) => prev.filter((recipe) => recipe._id !== recipeId));
      } else {
        console.warn("⚠️ No se pudo eliminar la receta de favoritos.");
      }
    } catch (error) {
      console.error("❌ Error al eliminar de favoritos:", error);
    }
  };

  if (!user) return <p className="favorites-error">Debes iniciar sesión para ver tus favoritos.</p>;

  if (loading) {
    return (
      <div className="fullpage-loader">
        <Loader />
      </div>
    );
  }

  const totalPages = Math.ceil(favorites.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleFavorites = favorites.slice(startIndex, endIndex);

  return (
    <div className="favorites-container">
      <h1 className="favorites-title">Mis Recetas Favoritas</h1>
      {favorites.length === 0 ? (
        <p className="favorites-empty">Aún no tienes recetas en favoritos.</p>
      ) : (
        <>
          <div className="favorites-list">
            {visibleFavorites.map((recipe) => (
              <div key={recipe._id} className="favorite-card">
                <img src={recipe.image} alt={recipe.title} className="favorite-image" />
                <div className="favorite-info">
                  <h3 className="favorite-title">{recipe.title}</h3>
                  <p className="favorite-category">{recipe.category}</p>
                </div>
                <div className="favorite-actions">
                  <button className="favorite-view" onClick={() => navigate(`/receta/${recipe._id}`)}>
                    Ver Receta
                  </button>
                  <button className="favorite-remove" onClick={() => handleRemoveFavorite(recipe._id)}>
                    Quitar
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pagination">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              ⬅ Anterior
            </button>

            <span className="pagination-info">Página {currentPage} de {totalPages}</span>

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pagination-button"
            >
              Siguiente ➡
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Favorites;

