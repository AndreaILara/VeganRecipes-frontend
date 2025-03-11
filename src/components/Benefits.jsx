import "../styles/Benefits.css";

const Benefits = () => {
  return (
    <section className="benefits">
      <h2>¿Por qué elegir un estilo de vida vegano?</h2>
      <div className="benefits-container">
        <div className="benefit-card">
          <img src="/health.jpg" alt="Salud" />
          <h3 className="benefit-title">Salud</h3>
          <p>Reduce el riesgo de enfermedades y mejora tu bienestar general.</p>
        </div>
        <div className="benefit-card">
          <img src="/planet.jpg" alt="Medio ambiente" />
          <h3 className="benefit-title">Medio Ambiente</h3>
          <p>Disminuye la huella ecológica y ayuda a proteger el planeta.</p>
        </div>
        <div className="benefit-card">
          <img src="/animals.jpg" alt="Bienestar Animal" />
          <h3 className="benefit-title">Bienestar Animal</h3>
          <p>Evita el sufrimiento de los animales y fomenta un mundo más ético.</p>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
