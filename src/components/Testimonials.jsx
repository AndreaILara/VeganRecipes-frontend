import { useState } from "react";
import "../styles/Testimonials.css";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
      message: "Cada día me siento más comprometida con la causa vegana. Creo que es la mejor forma de cuidar de mi salud y del planeta. ¡Juntos podemos hacer la diferencia!",
      name: "María L.",
      image: "/animal5.jpg",
      role: "Activista por los Animales",
    },
    {
      _id: "6",
      message: "Estoy muy agradecida por todo el apoyo que he recibido en este grupo. Gracias a ustedes, he podido superar los obstáculos y seguir adelante con mi decisión de ser vegana.",
      name: "Juan C.",
      image: "/animal6.jpg",
      role: "Amante de los Animales",
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="testimonials">
      <h2>Lo que dicen nuestros usuarios</h2>
      <div className="testimonials-slider">
        <button className="arrow left" onClick={prevTestimonial}>&#10094;</button>

        <div className="testimonials-track" style={{ transform: `translateX(-${(currentIndex % testimonials.length) * 33.33}%)` }}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={`testimonial-card ${index === currentIndex ? "active" : ""}`}>
              <img src={testimonial.image} alt={testimonial.name} />
              <h3>{testimonial.name}</h3>
              <p className="testimonial-role">{testimonial.role}</p>
              <p>"{testimonial.message}"</p>
            </div>
          ))}
        </div>

        <button className="arrow right" onClick={nextTestimonial}>&#10095;</button>
      </div>
    </section>
  );
};

export default Testimonials;
