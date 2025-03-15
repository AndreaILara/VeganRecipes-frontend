import "../styles/HeroSlider.css";
import { useNavigate } from "react-router-dom"; // ✅ Importa useNavigate

const HeroSlider = () => {
  const navigate = useNavigate(); // ✅ Inicializa useNavigate

  return (
    <section className="hero-slider">
      <div className="hero-content">
        <h1>Bienvenido a Tu Rincón Vegano</h1>
        <p>Descubre recetas veganas deliciosas y saludables</p>
        <button onClick={() => navigate("/recetas")} className="btn-explore">
          Explorar Recetas
        </button> {/* ✅ Cambia <a> por <button> con navigate() */}
      </div>
    </section>
  );
};

export default HeroSlider;
