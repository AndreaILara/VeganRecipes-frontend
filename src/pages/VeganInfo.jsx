import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/VeganInfo.css";

const VeganInfo = () => {
  const navigate = useNavigate();

  return (
    <motion.section 
      className="vegan-info"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          🌱 ¿Por qué ser vegano?
        </motion.h1>

        <motion.p 
          className="vegan-intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          El veganismo no es solo una dieta, es un estilo de vida que busca 
          reducir el sufrimiento animal, proteger el planeta y mejorar nuestra salud.  
        </motion.p>

        <motion.div 
          className="benefits-section"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <h2>🌍 Beneficios del veganismo</h2>
          <ul>
            <motion.li 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <strong>🥦 Salud:</strong> Reduce el riesgo de enfermedades cardíacas, diabetes y obesidad.  
            </motion.li>
            <motion.li 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <strong>🌎 Medio ambiente:</strong> Disminuye la deforestación, la contaminación del agua y las emisiones de CO2.  
            </motion.li>
            <motion.li 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <strong>🐾 Ética:</strong> Evita el sufrimiento y explotación de millones de animales cada año.  
            </motion.li>
            <motion.li 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <strong>💰 Economía:</strong> Una alimentación vegana bien planificada puede ser más accesible y económica.  
            </motion.li>
          </ul>
        </motion.div>

        <motion.div 
          className="vegan-start"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <h2>🍏 ¿Cómo empezar?</h2>
          <p>
            Adoptar una alimentación basada en plantas es más fácil de lo que crees.  
            Puedes comenzar con pequeños cambios:
          </p>
          <ul>
            <motion.li whileHover={{ scale: 1.05 }}>✅ Prueba una comida vegana al día.</motion.li>
            <motion.li whileHover={{ scale: 1.05 }}>✅ Descubre nuevos ingredientes y recetas.</motion.li>
            <motion.li whileHover={{ scale: 1.05 }}>✅ Infórmate sobre la nutrición vegana.</motion.li>
          </ul>
        </motion.div>

        <motion.button
          className="back-button"
          onClick={() => navigate(-1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          🔙 Volver
        </motion.button>
      </div>
    </motion.section>
  );
};

export default VeganInfo;
