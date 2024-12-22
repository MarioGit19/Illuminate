import React from "react";
import "../../styles/components/featuredproducts.css";

const FeaturedProducts = ({ products }) => {
  console.log("All products:", products); // Debug log
  const saleProducts = products.filter((product) => product.onSale).slice(0, 4);
  console.log("Sale products:", saleProducts); // Debug log

  return (
    <section className="featured-products">
      <h2>Featured Products</h2>
      <div className="featured-products-grid">
        {saleProducts.length > 0 ? (
          saleProducts.map((product) => (
            <div key={product.id} className="featured-product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <span className="sale-badge">Sale</span>
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
    </section>
  );
};

export default FeaturedProducts;
