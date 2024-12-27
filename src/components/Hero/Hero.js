import React from "react";
import "../../styles/components/hero.css";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const handleCatalogueClick = () => {
    navigate("/products");
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="animate-text">Step into the light with us</h1>
        <button className="catalogue-btn" onClick={handleCatalogueClick}>
          Catalogue
        </button>
      </div>
    </section>
  );
};

export default Hero;
