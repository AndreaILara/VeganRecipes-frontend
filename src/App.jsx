import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HeroSlider from "./components/HeroSlider";
import { AuthProvider } from "./context/AuthContext"; // 🔥 Asegura el contexto
import "./styles/style.css";

function App() {
  return (
    <AuthProvider>
      <div>
        <Navbar />
        <main>
          <HeroSlider />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
