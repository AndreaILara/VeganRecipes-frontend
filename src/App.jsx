import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HeroSlider from "./components/HeroSlider";
import { AuthProvider } from "./context/AuthContext";
import "./styles/style.css";

function App() {
  return (
    <AuthProvider>
      <div className="app-wrapper">
        <Navbar />
        <main className="main-content">
          <HeroSlider />
        </main>
        <Footer />
      </div>
    </AuthProvider>

  );
}

export default App;
