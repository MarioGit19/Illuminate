import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../Context/CartContext";
import { lampProducts } from "../../data/data";
import "../../styles/components/productpage.css";
import { toast } from "react-toastify";

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [mainImage, setMainImage] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const product = lampProducts.find((p) => p.id === parseInt(id));

  useEffect(() => {
    if (product) {
      setMainImage(product.image);
      setActiveIndex(0);
    }
  }, [product]);

  if (!product) {
    return <div className="product-page">Product not found</div>;
  }

  const allImages = [product.image, ...product.other_images];

  const handleImageClick = (image, index) => {
    setMainImage(image);
    setActiveIndex(index);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className="product-page">
      <div className="product-container">
        <div className="product-image-container">
          <img
            src={mainImage || product.image}
            alt={product.name}
            className="main-image"
          />
          {product.onSale && <span className="sale-badge">Sale</span>}

          <div className="image-carousel">
            {allImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} view ${index + 1}`}
                className={`carousel-image ${
                  index === activeIndex ? "active" : ""
                }`}
                onClick={() => handleImageClick(image, index)}
              />
            ))}
          </div>
        </div>

        <div className="product-details">
          <h1>{product.name}</h1>
          {/* <h3>
            {product.onSale && <span className="sale-subtitle">ON SALE</span>}
          </h3> */}

          <div className="price-container">
            {product.onSale ? (
              <>
                <span className="original-price">${product.price}</span>
                <span className="sale-price">${product.salePrice}</span>
              </>
            ) : (
              <span className="regular-price">${product.price}</span>
            )}
          </div>

          <p className="description">{product.description}</p>

          <button className="add-to-cart-button" onClick={handleAddToCart}>
            <FaShoppingCart /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
