# VeganRecipes-frontend

[![Estado del proyecto](https://img.shields.io/badge/estado-completado-green.svg)](https://github.com/AndreaILara/VeganRecipes-frontend)
[![Desplegado en Vercel](https://img.shields.io/badge/deploy-Vercel-black.svg)](https://vegan-recipes-frontend.vercel.app)

## Descripción

**VeganRecipes-frontend** es la interfaz de usuario de la aplicación **Vegan Recipes**, una plataforma que permite a los usuarios explorar, guardar y gestionar recetas veganas. Está construido con **React** y diseñado para ofrecer una experiencia fluida y atractiva tanto en escritorio como en dispositivos móviles.

🔗 **Frontend desplegado:** [Vegan Recipes](https://vegan-recipes-frontend.vercel.app)  
🔗 **Backend del proyecto:** [VeganRecipes-backend](https://github.com/AndreaILara/VeganRecipes-backend)

## Tabla de Contenidos

- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Funcionalidades de la Web](#funcionalidades-de-la-web)
- [Contribuciones](#contribuciones)

---

## Características

✅ **Navegación clara y accesible**  
✅ **Sistema de autenticación** (registro e inicio de sesión con JWT)  
✅ **Gestión de recetas y favoritos**  
✅ **Comentarios en recetas** con sistema de moderación  
✅ **Roles de usuario (`user` y `admin`)**  
✅ **Carga y gestión de imágenes con Cloudinary**  
✅ **Sistema de sugerencias** mediante formulario de contacto  
✅ **Diseño responsivo y optimizado para SEO**  

---

## Tecnologías Utilizadas

- **React** → Librería principal para el desarrollo del frontend.
- **React Router** → Manejo de navegación entre páginas.
- **Axios** → Peticiones HTTP al backend.
- **Context API** → Gestión de estado global.
- **Cloudinary** → Subida y gestión de imágenes.
- **CSS Modules** → Estilos modulares y reutilizables.
- **Vercel** → Despliegue del frontend.

---

## Instalación

Sigue estos pasos para ejecutar el frontend en tu entorno local:

1. **Clona este repositorio**:

   ```bash
   git clone https://github.com/AndreaILara/VeganRecipes-frontend.git
   ```

2. **Navega al directorio del proyecto**:

   ```bash
   cd VeganRecipes-frontend
   ```

3. **Instala las dependencias**:

   ```bash
   npm install
   ```

4. **Configura las variables de entorno**:

   Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

   ```env
   VITE_API_URL=https://tu-api-backend.com/api
   VITE_CLOUDINARY_UPLOAD_URL=https://api.cloudinary.com/v1_1/tu_cloud/upload
   VITE_CLOUDINARY_PRESET=tu_preset
   ```

5. **Inicia la aplicación**:

   ```bash
   npm run dev
   ```

   La aplicación estará disponible en `http://localhost:5173`.

---

## Uso

Una vez ejecutada la aplicación, puedes navegar a través de las siguientes páginas principales:

- **Inicio** → Presentación de la plataforma con recetas destacadas.
- **Categorías** → Recetas divididas en desayuno, comida, merienda y cena.
- **Detalle de receta** → Página individual con descripción, ingredientes y comentarios.
- **Mis favoritos** → Recetas guardadas por el usuario.
- **Perfil** → Datos del usuario con opciones para modificar información.
- **Admin Panel** → Sección exclusiva para administradores donde pueden gestionar recetas y usuarios.

---

## Estructura del Proyecto

```plaintext
VeganRecipes-frontend/
│── public/                  # Archivos públicos
│── src/
│   ├── components/           # Componentes reutilizables
│   ├── pages/                # Páginas principales
│   ├── context/              # Context API (estado global)
│   ├── hooks/                # Custom hooks
│   ├── services/             # Llamadas a la API
│   ├── styles/               # CSS Modules
│   ├── App.jsx               # Componente principal
│   ├── main.jsx              # Punto de entrada
│── .env                      # Variables de entorno
│── package.json              # Dependencias del proyecto
│── README.md                 # Documentación
```

---

## Funcionalidades de la Web

### 🌱 **Autenticación y Gestión de Usuarios**
- Registro e inicio de sesión con **JWT**.
- Acceso restringido a ciertas funcionalidades según el **rol** del usuario (`user` o `admin`).
- Posibilidad de modificar datos del perfil.

### 📖 **Exploración y Gestión de Recetas**
- Listado de recetas por **categorías**.
- Página individual con **ingredientes, tiempos y preparación**.
- **Sistema de favoritos** para guardar recetas.
- **Subida de imágenes** con Cloudinary.

### 💬 **Sistema de Comentarios**
- Usuarios autenticados pueden **comentar recetas**.
- **Administradores** pueden eliminar comentarios inapropiados.

### 🛠 **Funcionalidades Exclusivas para Administradores**
- **Añadir nuevas recetas** desde el frontend.
- **Eliminar recetas** y **gestionar comentarios**.
- **Eliminar cuentas de usuario**.

### 📩 **Sistema de Contacto y Sugerencias**
- Formulario donde los usuarios pueden enviar sugerencias de recetas.
- Envío de correos de prueba para verificar que el sistema funciona correctamente.

### 📱 **Diseño Responsivo**
- Adaptado a **móviles, tablets y escritorio**.
- **Optimización SEO** para mejor indexación.

---

## Contribuciones

Las contribuciones son bienvenidas. Si deseas colaborar, sigue estos pasos:

1. **Fork** este repositorio.
2. Crea una nueva rama:

   ```bash
   git checkout -b nombre-de-tu-rama
   ```

3. Realiza tus cambios y haz commits descriptivos.
4. Envía los cambios al repositorio remoto:

   ```bash
   git push origin nombre-de-tu-rama
   ```

5. Abre una **Pull Request** en este repositorio.

---

🚀 **Desarrollado con ❤️ por [Andrea Iñigo Lara](https://github.com/AndreaILara).**
