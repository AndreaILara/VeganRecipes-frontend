import "../styles/HeroSlider.css";

const HeroSlider = () => {
  return (
    <section className="hero-slider">
      <div className="hero-content">
        <h1>Bienvenido a Tu Rincón Vegano</h1>
        <p>Descubre recetas veganas deliciosas y saludables</p>
        <a href="/recetas" className="btn-explore">Explorar Recetas</a>
      </div>
    </section>
  );
};

export default HeroSlider;
