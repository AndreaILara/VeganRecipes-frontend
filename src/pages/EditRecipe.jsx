import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiRequest } from "../utils/apiRequest";
import "../styles/EditRecipe.css";

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: "",
    steps: "",
    category: "",
    prepTime: "",
    cookTime: "",
    servings: "",
    image: "",
  });
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
      setRecipe({ ...recipe, image: file });
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
    formData.append("prepTime", recipe.prepTime);
    formData.append("cookTime", recipe.cookTime);
    formData.append("servings", recipe.servings);

    // 🔹 Solo añadir imagen si el usuario selecciona una nueva
    if (newImage) {
      console.log("📸 Subiendo nueva imagen:", newImage);
      formData.append("image", newImage);
    }

    try {
      const updatedRecipe = await apiRequest({
        endpoint: `recipes/${id}`,
        method: "PUT",
        body: formData,
        isFormData: true,
      });

      setMessage("✅ Receta actualizada correctamente.");

      // 🔹 Actualizar la imagen en el estado
      if (updatedRecipe.image) {
        setRecipe((prev) => ({ ...prev, image: updatedRecipe.image }));
      }

      setTimeout(() => navigate(`/receta/${id}`), 2000);
    } catch (error) {
      console.error("❌ Error en la actualización:", error);
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

        <label className="edit-recipe-label">Categoría</label>
        <select name="category" value={recipe.category} onChange={handleChange} className="edit-recipe-select" required>
          <option value="">Selecciona una categoría</option>
          <option value="Desayuno">Desayuno</option>
          <option value="Comida">Comida</option>
          <option value="Merienda">Merienda</option>
          <option value="Cena">Cena</option>
        </select>

        {/* 🔹 NUEVOS CAMPOS */}
        <label className="edit-recipe-label">Tiempo de preparación</label>
        <input type="text" name="prepTime" value={recipe.prepTime} onChange={handleChange} className="edit-recipe-input" placeholder="Ej: 10m" required />

        <label className="edit-recipe-label">Tiempo de cocción</label>
        <input type="text" name="cookTime" value={recipe.cookTime} onChange={handleChange} className="edit-recipe-input" placeholder="Ej: 20m" required />

        <label className="edit-recipe-label">Porciones</label>
        <input type="text" name="servings" value={recipe.servings} onChange={handleChange} className="edit-recipe-input" placeholder="Ej: 2" required />

        <label className="edit-recipe-label">Imagen</label>
        <input type="file" accept="image/*" onChange={handleImageChange} className="edit-recipe-file" />

        {recipe.image && (
          <img src={newImage ? URL.createObjectURL(newImage) : recipe.image} alt="Previsualización" className="edit-recipe-preview" />
        )}

        <button type="submit" className="edit-recipe-button">Actualizar Receta</button>
        <button type="button" className="delete-recipe-button" onClick={handleDelete}>🗑️ Eliminar Receta</button>
      </form>
    </div>
  );
};

export default EditRecipe;
