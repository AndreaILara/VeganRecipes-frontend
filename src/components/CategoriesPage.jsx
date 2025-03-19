import { useNavigate } from "react-router-dom";
import "../styles/CategoriesPage.css";

const CategoriesPage = () => {
  const navigate = useNavigate();

  const categories = [
    { name: "Desayunos", image: "/desayunos.jpg" },
    { name: "Comidas", image: "/comidas.jpg" },
    { name: "Meriendas", image: "/meriendas.jpg" },
    { name: "Cenas", image: "/cenas.jpg" },
  ];

  return (
    <section className="categories-page">
      <h1 className="categories-title">Explora Recetas por Categoría</h1>
      <div className="categories-container">
        {categories.map((category, index) => (
          <div
            key={index}
            className="category-card"
            onClick={() => navigate(`/recetas/categoria/${category.name.toLowerCase()}`)}
          >
            <img src={category.image} alt={category.name} className="category-image" />
            <h2 className="category-name">{category.name}</h2>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesPage;
