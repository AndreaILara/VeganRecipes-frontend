import HeroSlider from "../components/HeroSlider";
import FeaturedRecipes from "../components/FeaturedRecipes";
import HowToStart from "../components/HowToStart";
import Benefits from "../components/Benefits";
import WhyVegan from "../components/WhyVegan";
import Testimonials from "../components/Testimonials";
import "../styles/Home.css";

const Home = () => {
  return (
    <div>
      <HeroSlider />

      <section className="home-section">
        <WhyVegan />
      </section>

      <section className="home-section">
        <FeaturedRecipes />
      </section>

      <section className="home-section">
        <HowToStart />
      </section>

      <section className="home-section">
        <Benefits />
      </section>

      <section className="home-section">
        <Testimonials />
      </section>
    </div>
  );
};

export default Home;
