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
import { CartProvider } from "../src/Context/CartContext";
import Cart from "./components/Cart/Cart";

function App() {
  return (
    <CartProvider>
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
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
