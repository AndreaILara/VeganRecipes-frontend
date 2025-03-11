import { useState } from "react";
import "../styles/Contacto.css";

const Contacto = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Enviando...");

    try {
      const response = await fetch("http://localhost:3000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("✅ Tu mensaje ha sido enviado correctamente.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("❌ Error al enviar el mensaje. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setStatus("❌ Error al enviar el mensaje.");
    }
  };

  return (
    <div className="static-page">
      <header className="hero-contacto">
        <h1>Contáctenos</h1>
        <p>Déjanos tus sugerencias, dudas o comentarios y te responderemos lo antes posible.</p>
      </header>

      <section className="contact-section">
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>Nombre</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />

          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>Asunto</label>
          <input type="text" name="subject" value={formData.subject} onChange={handleChange} required />

          <label>Mensaje</label>
          <textarea name="message" rows="5" value={formData.message} onChange={handleChange} required></textarea>

          <button type="submit" className="cta-button">Enviar</button>
        </form>

        {status && <p className="form-status">{status}</p>}
      </section>
    </div>
  );
};

export default Contacto;
