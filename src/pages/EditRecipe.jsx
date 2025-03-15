import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiRequest } from "../utils/apiRequest";
import "../styles/EditRecipe.css";

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({ title: "", ingredients: "", steps: "", category: "", image: "" });
  const [message, setMessage] = useState("");
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await apiRequest({ endpoint: `recipes/${id}`, method: "GET" });
        setRecipe(res);
      } catch (error) {
        console.error("Error al obtener receta para editar:", error);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      setRecipe({ ...recipe, image: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const formData = new FormData();
    formData.append("title", recipe.title);
    formData.append("ingredients", recipe.ingredients);
    formData.append("steps", recipe.steps);
    formData.append("category", recipe.category);
    if (recipe.image instanceof File) {
      formData.append("image", recipe.image);
    }

    try {
      await apiRequest({
        endpoint: `recipes/${id}`,
        method: "PUT",
        body: formData,
        isFormData: true,
      });

      setMessage("✅ Receta actualizada correctamente.");
      setTimeout(() => navigate(`/receta/${id}`), 2000);
    } catch (error) {
      setMessage("❌ No se pudo actualizar la receta.");
    }
  };

  const handleDelete = async () => {
    try {
      await apiRequest({ endpoint: `recipes/${id}`, method: "DELETE" });
      navigate("/recetas");
    } catch (error) {
      setMessage("❌ Error al eliminar la receta.");
    }
  };

  return (
    <div className="edit-recipe-container">
      <h1 className="edit-recipe-title">Editar Receta</h1>
      {message && <p className={`edit-recipe-message ${message.includes("❌") ? "error" : "success"}`}>{message}</p>}

      <form onSubmit={handleSubmit} className="edit-recipe-form">
        <label className="edit-recipe-label">Título</label>
        <input type="text" name="title" value={recipe.title} onChange={handleChange} className="edit-recipe-input" required />

        <label className="edit-recipe-label">Ingredientes</label>
        <textarea name="ingredients" value={recipe.ingredients} onChange={handleChange} className="edit-recipe-textarea" required />

        <label className="edit-recipe-label">Pasos</label>
        <textarea name="steps" value={recipe.steps} onChange={handleChange} className="edit-recipe-textarea" required />

        <label className="edit-recipe-label">Imagen</label>
        <input type="file" accept="image/*" onChange={handleImageChange} className="edit-recipe-file" />

        {recipe.image && <img src={recipe.image} alt="Previsualización" className="edit-recipe-preview" />}

        <button type="submit" className="edit-recipe-button">Actualizar Receta</button>
        <button type="button" className="delete-recipe-button" onClick={handleDelete}>🗑️ Eliminar Receta</button>
      </form>
    </div>
  );
};

export default EditRecipe;
