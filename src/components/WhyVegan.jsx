import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/WhyVegan.css";

const WhyVegan = () => {
  const navigate = useNavigate();

  return (
    <section className="why-vegan">
      <div className="container">
        <div className="why-vegan-content">
          <h2>¿Por qué ser vegano?</h2>
          <p>
            Descubre los beneficios de una alimentación basada en plantas para
            tu salud, el medio ambiente y los animales.
          </p>
          <button onClick={() => navigate("/vegan-info")}>Descubre más</button>
        </div>
        <div className="why-vegan-image">
          <img
            src="/vegan-benefits.jpg"
            alt="Beneficios de una dieta vegana"
          />
        </div>
      </div>
    </section>
  );
};

export default WhyVegan;
