import { useState } from "react";
import "../styles/Faq.css";

const faqs = [
  {
    question: "¿Qué es el veganismo?",
    answer:
      "El veganismo es un estilo de vida que excluye todos los productos de origen animal en la alimentación y otros aspectos de la vida diaria.",
  },
  {
    question: "¿Es saludable seguir una dieta vegana?",
    answer:
      "Sí, una dieta vegana bien planificada puede proporcionar todos los nutrientes esenciales. Es recomendable consultar con un profesional de la salud.",
  },
  {
    question: "¿Dónde obtengo proteína en una dieta vegana?",
    answer:
      "Las fuentes de proteína en una dieta vegana incluyen legumbres, tofu, quinoa, frutos secos y semillas.",
  },
  {
    question: "¿Cómo reemplazo los lácteos en mi dieta?",
    answer:
      "Puedes reemplazar la leche de vaca con bebidas vegetales como leche de almendra, soja o avena. Para quesos, hay opciones veganas elaboradas con frutos secos.",
  },
  {
    question: "¿Qué hago si mis amigos y familiares no apoyan mi decisión?",
    answer:
      "Educar e inspirar a los demás es clave. Puedes compartir información y recetas deliciosas para mostrar lo fácil y beneficioso que es el veganismo.",
  },
  {
    question: "¿Es caro ser vegano?",
    answer:
      "No necesariamente. Muchos alimentos básicos veganos como legumbres, arroz y verduras son accesibles y económicos.",
  },
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-page">
      <header className="hero-faq">
        <h1>Preguntas Frecuentes</h1>
        <p>Encuentra respuestas a las dudas más comunes sobre el veganismo y nuestra comunidad.</p>
      </header>

      <section className="faq-section">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              <h3>{faq.question}</h3>
              <span className="faq-icon">{activeIndex === index ? "−" : "+"}</span>
            </div>
            {activeIndex === index && <p className="faq-answer">{faq.answer}</p>}
          </div>
        ))}
      </section>
    </div>
  );
};

export default Faq;
