import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../Context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/components/featuredproducts.css";
import { useNavigate } from "react-router-dom";

const FeaturedProducts = ({ products }) => {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const { addToCart } = useCart();
  const saleProducts = products.filter((product) => product.onSale);
  const navigate = useNavigate();

  // Duplicate products for seamless loop
  const duplicatedProducts = [
    ...saleProducts,
    ...saleProducts,
    ...saleProducts,
    ...saleProducts,
  ];

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <section className="featured-products">
      <h2>Featured Products</h2>
      <div className="featured-products-scroll">
        <div className="featured-products-track">
          {duplicatedProducts.length > 0 ? (
            duplicatedProducts.map((product, index) => (
              <div
                key={`${product.id}-${index}`}
                className="featured-product-card"
                onClick={() => handleProductClick(product.id)}
                onMouseEnter={() => setHoveredProduct(`${product.id}-${index}`)}
                onMouseLeave={() => setHoveredProduct(null)}
                style={{ cursor: "pointer" }}
              >
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  <span className="sale-badge">Sale</span>
                  {hoveredProduct === `${product.id}-${index}` && (
                    <button
                      className="quick-buy-button"
                      onClick={(e) => handleAddToCart(e, product)}
                      title="Quick Add to Cart"
                    >
                      <FaShoppingCart />
                    </button>
                  )}
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <div className="price-container">
                    <span className="original-price">${product.price}</span>
                    <span className="sale-price">${product.salePrice}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No featured products available</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
