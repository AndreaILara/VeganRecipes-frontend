import "../styles/Nosotros.css";

const Nosotros = () => {
  return (
    <div className="static-page">
      <header className="hero-nosotros">
        <h1>Sobre Nosotros</h1>
        <p>Inspirando a más personas a adoptar un estilo de vida vegano.</p>
      </header>

      <section className="about-section">
        <div className="about-text">
          <h2>Nuestra Misión</h2>
          <p>
            En <strong>Tu Rincón Vegano</strong>, creemos en el poder de la alimentación basada en plantas para mejorar la salud,
            proteger el planeta y reducir el sufrimiento animal. Nuestra misión es hacer que el veganismo sea accesible, fácil y
            delicioso para todos.
          </p>
        </div>
        <img src="/mission.jpg" alt="Nuestra misión" className="about-image" />
      </section>

      <section className="about-section reverse">
        <img src="/team.jpg" alt="Nuestro equipo" className="about-image" />
        <div className="about-text">
          <h2>Quiénes Somos</h2>
          <p>
            Somos una comunidad apasionada por compartir recetas, consejos y recursos que faciliten la transición al veganismo.
            A través de nuestro contenido, buscamos apoyar a cada persona en su viaje hacia un estilo de vida más ético y sostenible.
          </p>
        </div>
      </section>

      <section className="about-section">
        <div className="about-text">
          <h2>Únete a Nosotros</h2>
          <p>
            No importa si eres principiante o un vegano experimentado, aquí encontrarás apoyo, información y una comunidad que
            comparte tu interés por una vida más compasiva. ¡Forma parte de este movimiento!
          </p>
          <a href="/register" className="unete-button">Únete Ahora</a>
        </div>
      </section>
    </div>
  );
};

export default Nosotros;
