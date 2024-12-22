import React from "react";
import "./brandlogos.css";

const BrandLogos = () => {
  const brands = [
    { name: "Artemide", logo: "/images/brands/artemide-logo.png" },
    { name: "Flos", logo: "/images/brands/flos-logo.png" },
    { name: "Baccarat", logo: "/images/brands/baccarat-logo.png" },
    { name: "Louis Poulsen", logo: "/images/brands/louis-poulsen-logo.png" },
    { name: "Tom Dixon", logo: "/images/brands/tom-dixon-logo.png" },
    { name: "Moooi", logo: "/images/brands/moooi-logo.png" },
    { name: "Vibia", logo: "/images/brands/vibia-logo.png" },
  ];

  return (
    <div className="brands-container">
      <div className="brands-slider">
        <div className="slide-track">
          {/* Double the brands array to create seamless loop */}
          {[...brands, ...brands].map((brand, index) => (
            <div className="slide" key={index}>
              <img src={brand.logo} alt={brand.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandLogos;
