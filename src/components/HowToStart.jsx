import "../styles/HowToStart.css";
import { FaCheckCircle } from "react-icons/fa";

const steps = [
  { id: 1, text: "Empieza con recetas fáciles y deliciosas." },
  { id: 2, text: "Sustituye productos de origen animal por vegetales." },
  { id: 3, text: "Aprende sobre la nutrición vegana y sus beneficios." },
  { id: 4, text: "Descubre nuevas marcas y productos veganos." },
  { id: 5, text: "Únete a comunidades veganas y encuentra apoyo." },
];

const HowToStart = () => {
  return (
    <section className="how-to-start">
      <h2>¿Cómo empezar con el veganismo?</h2>
      <ul className="steps-list">
        {steps.map((step) => (
          <li key={step.id} className="step-item">
            <FaCheckCircle className="step-icon" />
            <span>{step.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default HowToStart;
