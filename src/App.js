import React, { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
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
import ScrollToTop from "./components/ScrollToTop";
function App() {
  const [showOverlay, setShowOverlay] = useState(true);

  const handleOverlayComplete = () => {
    setShowOverlay(false);
  };

  return (
    <CartProvider>
      <Router>
        <AppContent
          showOverlay={showOverlay}
          handleOverlayComplete={handleOverlayComplete}
        />
        <ScrollToTop />
      </Router>
    </CartProvider>
  );
}

function AppContent({ showOverlay, handleOverlayComplete }) {
  const location = useLocation();

  return (
    <>
      {showOverlay && <IntroOverlay onComplete={handleOverlayComplete} />}
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
              >
                <Hero />
                <FeaturedProducts products={lampProducts} />
                <BrandLogos />
                <Articles />
              </motion.div>
            }
          />
          <Route
            path="/about"
            element={
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
              >
                <About />
              </motion.div>
            }
          />
          <Route
            path="/products"
            element={
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
              >
                <Collections products={lampProducts} />
              </motion.div>
            }
          />
          <Route
            path="/cart"
            element={
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
              >
                <Cart />
              </motion.div>
            }
          />
          <Route
            path="/product/:id"
            element={
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
              >
                <ProductPage />
              </motion.div>
            }
          />
          <Route
            path="/thank-you"
            element={
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
              >
                <ThankYouPage />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
      <Footer />
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
    </>
  );
}

export default App;
