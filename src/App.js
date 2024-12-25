import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import FeaturedProducts from "./components/FeaturedProducts/FeaturedProducts";
import BrandLogos from "./components/BrandLogos/BrandLogos";
import { lampProducts } from "./data/data";
import Articles from "./components/Articles/Articles";
import Footer from "./components/Footer/Footer";
import About from "./components/About/About";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <FeaturedProducts products={lampProducts} />
              <BrandLogos />
              <Articles />
            </>
          }
        />
        <Route path="/about" element={<About />} />
        <Route
          path="/products"
          element={<FeaturedProducts products={lampProducts} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
