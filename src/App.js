import React, { useState } from "react";
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
import Collections from "./components/Collections/Collections";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import ProductPage from "./components/ProductPage/ProductPage";
import ThankYouPage from "./components/ThankYou/ThankYouPage";
import SuccessAnimation from "./components/SuccessAnimation/SuccessAnimation";
import IntroOverlay from "./components/IntroOverlay/IntroOverlay";

function App() {
  const [showOverlay, setShowOverlay] = useState(true);

  const handleOverlayComplete = () => {
    setShowOverlay(false);
  };

  return (
    <CartProvider>
      <Router>
        {showOverlay && <IntroOverlay onComplete={handleOverlayComplete} />}
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
            element={<Collections products={lampProducts} />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
        </Routes>
        <Footer />
      </Router>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <SuccessAnimation />
    </CartProvider>
  );
}

export default App;
