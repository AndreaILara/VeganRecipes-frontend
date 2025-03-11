import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HeroSlider from "./components/HeroSlider";
import "./styles/style.css";

function App() {
  return (
    <div>
      <Navbar />
      <main>
        <HeroSlider />
      </main>
      <Footer />
    </div>
  );
}

export default App;
