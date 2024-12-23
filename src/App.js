import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import FeaturedProducts from "./components/FeaturedProducts/FeaturedProducts";
import BrandLogos from "./components/BrandLogos/BrandLogos";
import { lampProducts } from "./data/data";
import Articles from "./components/Articles/Articles";
import Footer from "./components/Footer/Footer";
function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedProducts products={lampProducts} />
      <BrandLogos />
      <Articles />
      <Footer />
    </>
  );
}

export default App;
