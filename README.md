### code snippets and notes.

### Hero component

```jsx
const Hero = ({ startAnimation }) => {
  const navigate = useNavigate();
### click handler for the catalogue button navigation.
  const handleCatalogueClick = () => {
    navigate("/products");
  };
  ### simple return of the hero background image, text and button.
  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(https://mass-light.ba/assets/photos/product/original/190830-scaled.jpg?v1735316133)`,
      }}
    >
      <div className="hero-content">
        <h1 className={startAnimation ? "animate-text" : ""}>
          Step into the light with us
        </h1>
        <button className="catalogue-btn" onClick={handleCatalogueClick}>
          Catalogue
        </button>
      </div>
    </section>
  );
};
```

### Hero css

```css
//setting the hero height to 100vh and width to 100%
.hero {
  height: 100vh;
  width: 100%;
  background-image: url("https://mass-light.ba/assets/photos/product/original/190830-scaled.jpg?v1735316133");
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
  /* background-attachment: fixed; */
  position: relative;
  overflow: hidden;
}

//setting the hero before element to absolute and setting the top, left, width and height to 100%
.hero::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60%;
  /* background-color: rgba(0, 0, 0, 0.2); */
  background-color: var(--color-background);
  backdrop-filter: blur(1px);
  z-index: -1;
}
The ::before pseudo-element in CSS is used to insert content before the content of a selected element. It allows you to add decorative elements or additional content without modifying the HTML structure. This pseudo-element is styled using CSS properties and is often used for adding icons, labels, or visual effects, enhancing the design while keeping the HTML clean. The content property is essential for displaying anything with ::before.

//setting the hero content to absolute and setting the top, left, transform and text align to center
.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 5rem;
  position: absolute;
  top: 92%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: var(--color-primary-text);
  z-index: 1;
}

//setting the animate text to font size 3rem, margin bottom 2rem, text shadow, opacity 0 and animation to fadeIn 2s ease-in forwards
.animate-text {
  font-size: 3rem;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  opacity: 0;
  animation: fadeIn 2s ease-in forwards;
}

//media query for mobile devices
@media screen and (max-width: 768px) {
  .animate-text {
    font-size: 2rem;
  }
}

//setting the catalogue button to padding 1rem 2rem, font size 1.2rem, background color primary button, color card background, border none, border radius 5px, cursor pointer and transition all 0.3s ease
.catalogue-btn {
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background-color: var(--color-primary-button);
  color: var(--color-card-background);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

//setting the catalogue button hover to background color primary button hover, transform translateY -2px, box shadow md and transition all 0.3s ease
.catalogue-btn:hover {
  background-color: var(--color-primary-button-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

//setting the fadeIn animation to opacity 0, transform translateY 20px and transition all 0.3s ease
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

//setting the hero after element to absolute and setting the bottom, left, transform and width to 80%
.hero::after {
  content: "";
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 150px;
  /* background: radial-gradient(
    ellipse at center,
    rgba(255, 255, 255, 0.8) 0%,
    rgba(255, 255, 255, 0) 70%
  ); */
  z-index: 0;
  pointer-events: none;
}

// Add media query for mobile devices
@media screen and (max-width: 768px) {
  .hero-content {
    top: 80%;
  }
  .hero {
    height: 60vh;
  }
}
```

### FeaturedProducts component

```jsx
import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../Context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/components/featuredproducts.css";
import { useNavigate } from "react-router-dom";

const FeaturedProducts = ({ products }) => {
  ### state for the hovered product and setting it to null
  const [hoveredProduct, setHoveredProduct] = useState(null);
  ### useCart hook for adding products to the cart
  const { addToCart } = useCart();
  ### filtering the products to get only the sale products
  const saleProducts = products.filter((product) => product.onSale);
  ### useNavigate hook for navigation
  const navigate = useNavigate();

  // Duplicate products for seamless loop
  const duplicatedProducts = [
    ...saleProducts,
    ...saleProducts,
    ...saleProducts,
    ...saleProducts,
  ];
  ### click handler for the product card navigation
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  ### click handler for the add to cart button and stopping the event propagation with toastify.
  const handleAddToCart = (e, product) => {



    ###     The e.stopPropagation() method is used to prevent an event from bubbling up the DOM tree. In the context of your code snippet, it is used within the handleAddToCart function to stop the click event from propagating to parent elements.
    ### Why Use e.stopPropagation()?
    ### Prevent Unwanted Parent Event Handlers: If the handleAddToCart function is triggered by a click event on a button inside a product card, e.stopPropagation() ensures that the click event does not trigger any click event handlers attached to parent elements, such as the product card itself.
    ### What Happens Without e.stopPropagation()?
    ### Event Bubbling: Without e.stopPropagation(), the click event would bubble up to parent elements. For example, if the product card has a click event handler for navigation, clicking the "Add to Cart" button might also trigger navigation to the product details page, which is likely not the intended behavior.
    ### In summary, e.stopPropagation() is used to ensure that the click event on the "Add to Cart" button does not inadvertently trigger other event handlers on parent elements, allowing for more precise control over event handling.



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
  ### simple return of the featured products section, title, scroll, track and products.
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
```

### FeaturedProducts css

```css
.featured-products {
  padding: 4rem 0;
  max-width: 100%;
  margin: 0 auto;
  overflow-x: hidden;
}

//setting the regular price to background color rgba(211, 127, 90, 0.1)
.regular-price {
  background-color: rgba(211, 127, 90, 0.1);
}

//setting the sale price to background color rgba(211, 127, 90, 0.1)
.price-stack .sale-price {
  background-color: rgba(211, 127, 90, 0.1);
}

//setting the featured products title to text align center, margin bottom 2rem, font size 2.5rem, color primary text
.featured-products h2 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  color: var(--color-primary-text);
}

//setting the featured products scroll to width 100%, position relative and overflow visible
.featured-products-scroll {
  width: 100%;
  position: relative;
  overflow: visible;
}

//setting the featured products track to display flex, gap 2rem, animation scroll 20s linear infinite, width calc(200% + 2rem) and animation direction reverse
.featured-products-track {
  display: flex;
  gap: 2rem;
  animation: scroll 20s linear infinite;
  width: calc(200% + 2rem);
  animation-direction: reverse;
}

//media query for mobile devices
@media screen and (max-width: 768px) {
  .featured-products-track {
    animation: scroll 40s linear infinite;
    animation-direction: reverse;
  }
}

// Remove the grid styles since we're using a horizontal scroll
.featured-products-grid {
  display: none;
}

//setting the featured product card to min width 280px, background color card background, border radius 8px, box shadow md, transition transform 0.3s ease, position relative and border 1px solid border
.featured-product-card {
  min-width: 280px; /* Set a fixed minimum width for each card */
  background: var(--color-card-background);
  border-radius: 8px;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease;
  position: relative;
  /* border: 1px solid var(--color-border); */
}

//setting the featured product card hover to transform translateY -5px, box shadow lg
.featured-product-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

//setting the product image to position relative, width 100%, height 200px, overflow hidden and border radius 8px 8px 0 0
.product-image {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 8px 8px 0 0;
}

//setting the product image img to width 100%, height 100% and object fit cover
.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

//setting the sale badge to position absolute, top 10px, right 10px, background color primary button, color card background, padding 0.5rem 1rem and border radius 4px
.sale-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: var(--color-primary-button);
  color: var(--color-card-background);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: bold;
}

//setting the product info to padding 1rem
.product-info {
  padding: 1rem;
}

//setting the product info h3 to margin 0 0 0.5rem 0, font size 1.1rem and color muted silver
.product-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  /* color: var(--color-primary-text); */
  color: #a1a5be;
}

//setting the price container to display flex
.price-container {
  display: flex;
}

//setting the original price to text decoration line-through, color accent silver and padding left 0.5rem
.original-price {
  text-decoration: line-through;
  color: var(--color-accent-silver);
  padding-left: 0.5rem;
}

//setting the sale price to color muted terracotta, font weight bold, font size 1.2rem
.sale-price {
  color: var(--color-muted-terracotta);
  font-weight: bold;
  font-size: 1.2rem;
}

//media query for desktop devices
@media (max-width: 1024px) {
  .featured-product-card {
    min-width: 240px;
  }
}

//media query for mobile devices
@media (max-width: 640px) {
  .featured-product-card {
    min-width: 200px;
  }
}

//setting the quick buy button to position absolute, right 15px, bottom 15px, width 40px, height 40px, border radius 50%, background color card background, border 1px solid border, display flex, align items center, justify content center, cursor pointer, box shadow sm, transition all 0.3s ease, opacity 0 and transform translateY 10px
.quick-buy-button {
  position: absolute;
  right: 15px;
  bottom: 15px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--color-card-background);
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(10px);
  z-index: 10;
  color: var(--color-primary-text);
}

//setting the quick buy button hover to opacity 1, transform translateY 0
.featured-product-card:hover .quick-buy-button {
  opacity: 1;
  transform: translateY(0);
}

//setting the quick buy button hover to background color primary button, color card background, transform scale 1.1
.quick-buy-button:hover {
  background-color: var(--color-primary-button);
  color: var(--color-card-background);
  transform: scale(1.1);
}

//setting the scroll animation to from translateX 0 to translateX -100%
@keyframes scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}

// Optional: Pause animation on hover
.featured-products-track:hover {
  animation-play-state: paused;
}

//setting the price container to display flex, flex direction column and align items start
.featured-product-card .product-info .price-container {
  display: flex;
  flex-direction: column;
  align-items: start;
}

//setting the original price to font size 10px
.featured-product-card .product-info .price-container .original-price {
  font-size: 10px;
}

//setting the sale price to font size 14px and padding left 0.5rem
.featured-product-card .product-info .price-container .sale-price {
  font-size: 14px;
  padding-left: 0.5rem;
}
```
