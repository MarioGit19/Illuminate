import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import FeaturedProducts from "./components/FeaturedProducts/FeaturedProducts";
import BrandLogos from "./components/BrandLogos/BrandLogos";
import { lampProducts } from "./data/data";
function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedProducts products={lampProducts} />
      <BrandLogos />
    </>
  );
}

export default App;
