import { useState, useRef } from "react";
import "../styles/Testimonials.css";

const Testimonials = () => {
  const testimonials = [
    {
      _id: "1",
      message: "Adoptar un estilo de vida vegano ha sido la mejor decisión de mi vida. No solo me siento mejor físicamente, sino que también tengo la tranquilidad de saber que estoy contribuyendo a un mundo mejor.",
      name: "Laura M.",
      image: "/animal1.jpg",
      role: "Defensora del Medio Ambiente",
    },
    {
      _id: "2",
      message: "Desde que empecé a seguir las recetas de esta página, mi alimentación ha cambiado por completo. Cada platillo es delicioso y muy fácil de preparar. ¡Gracias por todo!",
      name: "Carlos G.",
      image: "/animal2.jpg",
      role: "Cocinero Aficionado",
    },
    {
      _id: "3",
      message: "Nunca imaginé que una alimentación vegana pudiera ser tan variada y rica. Me encanta descubrir nuevas recetas y compartirlas con mis amigos.",
      name: "Sofía R.",
      image: "/animal3.jpg",
      role: "Entusiasta de la Vida Sana",
    },
    {
      _id: "4",
      message: "Al principio tenía muchas dudas sobre el veganismo, pero gracias a esta comunidad he aprendido muchísimo. No solo se trata de la comida, sino de todo un estilo de vida más consciente.",
      name: "David P.",
      image: "/animal4.jpg",
      role: "Nuevo en el Veganismo",
    },
    {
      _id: "5",
      message: "Cada día me sorprende más la cantidad de opciones veganas que existen. Ahora puedo disfrutar de mis platillos favoritos sin sacrificar sabor ni textura.",
      name: "María L.",
      image: "/animal5.jpg",
      role: "Amante de la Cocina",
    },
    {
      _id: "6",
      message: "Gracias a este sitio web, he descubierto un mundo de posibilidades en la cocina vegana. Me encanta experimentar con ingredientes nuevos y compartir mis creaciones con mi familia.",
      name: "Pedro S.",
      image: "/animal6.jpg",
      role: "Padre de Familia",
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(1);
  const touchStartX = useRef(null);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  // Detecta inicio del gesto táctil
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  // Detecta final del gesto táctil y decide si mover izquierda o derecha
  const handleTouchEnd = (e) => {
    if (!touchStartX.current) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) nextTestimonial(); // Deslizar a la izquierda (siguiente)
    else if (diff < -50) prevTestimonial(); // Deslizar a la derecha (anterior)

    touchStartX.current = null;
  };

  return (
    <section className="testimonials">
      <h2>Lo que dicen nuestros usuarios</h2>
      <div
        className="testimonials-slider"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button className="arrow left" onClick={prevTestimonial}>&#10094;</button>

        <div className="testimonials-track">
          {testimonials.map((testimonial, index) => {
            let position = "inactive";

            if (index === currentIndex) {
              position = "active";
            } else if (index === (currentIndex - 1 + testimonials.length) % testimonials.length) {
              position = "left";
            } else if (index === (currentIndex + 1) % testimonials.length) {
              position = "right";
            }

            return (
              <div key={index} className={`testimonial-card ${position}`}>
                <img src={testimonial.image} alt={testimonial.name} />
                <h3>{testimonial.name}</h3>
                <p className="testimonial-role">{testimonial.role}</p>
                <p>"{testimonial.message}"</p>
              </div>
            );
          })}
        </div>

        <button className="arrow right" onClick={nextTestimonial}>&#10095;</button>
      </div>
    </section>
  );
};

export default Testimonials;
