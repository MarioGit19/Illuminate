import React from "react";
import "../../styles/components/hero.css";
import { useNavigate } from "react-router-dom";
// import heroImage from "https://mass-light.ba/assets/photos/product/original/190830-scaled.jpg?v1735316133";

const Hero = () => {
  const navigate = useNavigate();

  const handleCatalogueClick = () => {
    navigate("/products");
  };

  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(https://mass-light.ba/assets/photos/product/original/190830-scaled.jpg?v1735316133)`,
      }}
    >
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
