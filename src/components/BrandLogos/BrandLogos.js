import React, { useState } from "react";
import "./brandlogos.css";

const BrandLogos = () => {
  const [loadedImages, setLoadedImages] = useState(new Set());

  const brands = [
    {
      name: "Artemide",
      logo: "/images/brands/artemide-logo.png",
      fallback: "https://placehold.co/120x60?text=Artemide",
    },
    {
      name: "Flos",
      logo: "/images/brands/flos-logo.png",
      fallback: "https://placehold.co/120x60?text=Flos",
    },
    {
      name: "Baccarat",
      logo: "/images/brands/baccarat-logo.png",
      fallback: "https://placehold.co/120x60?text=Baccarat",
    },
    {
      name: "Louis Poulsen",
      logo: "/images/brands/louis-poulsen-logo.png",
      fallback: "https://placehold.co/120x60?text=Louis+Poulsen",
    },
    {
      name: "Tom Dixon",
      logo: "/images/brands/tom-dixon-logo.png",
      fallback: "https://placehold.co/120x60?text=Tom+Dixon",
    },
    {
      name: "Moooi",
      logo: "/images/brands/moooi-logo.png",
      fallback: "https://placehold.co/120x60?text=Moooi",
    },
    {
      name: "Vibia",
      logo: "/images/brands/vibia-logo.png",
      fallback: "https://placehold.co/120x60?text=Vibia",
    },
  ];

  const handleImageError = (e, fallback) => {
    if (!loadedImages.has(e.target.src)) {
      e.target.src = fallback;
      setLoadedImages((prev) => new Set([...prev, e.target.src]));
    }
  };

  const handleImageLoad = (e) => {
    e.target.classList.add("loaded");
  };

  return (
    <div className="brands-container">
      <div className="brands-slider">
        <div className="slide-track">
          {[...brands, ...brands].map((brand, index) => (
            <div className="slide" key={index}>
              <img
                src={brand.logo}
                alt={brand.name}
                onError={(e) => handleImageError(e, brand.fallback)}
                onLoad={handleImageLoad}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandLogos;
