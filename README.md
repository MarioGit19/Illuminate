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

### Navbar component

```jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import NavbarSearch from "./NavbarSearch";
import "../../styles/components/navbar.css";
import { useCart } from "../../Context/CartContext";
import CartDrawer from "../CartDrawer/CartDrawer";
// import Collections from "../Collections/Collections";

const Navbar = () => {
  ### state for the navbar menu and setting it to false
  const [isOpen, setIsOpen] = useState(false);
  ### useCart hook for the cart items count and setting the cart drawer open state
  const { cartItemsCount, setIsCartOpen } = useCart();
  ### useRef hook for the navbar reference
  const navRef = useRef(null);

  useEffect(() => {
    // Scroll to the top of the page on component mount
    window.scrollTo(0, 0);

    const handleClickOutside = (event) => {
      ### checking if the navbar reference contains the event target and if it does, set the navbar menu state to false
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  ### click handler for the navbar menu and toggling the menu state
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  ### click handler for the navbar menu and closing the menu
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className="navbar" ref={navRef}>
        <div className="nav-container">
          <div className="logo">
            <Link to="/" onClick={closeMenu}>
              <span className="logo-text">illuminate</span>
            </Link>
          </div>

          <ul className={`nav-menu ${isOpen ? "active" : ""}`}>
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link" onClick={closeMenu}>
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/products" className="nav-link" onClick={closeMenu}>
                Products
              </Link>
            </li>
          </ul>

          <div className="nav-right">

            <NavbarSearch />
            <div
              className="cart-icon-container"
              onClick={() => setIsCartOpen(true)}
            >
              <FaShoppingCart className="cart-icon" />
              {cartItemsCount > 0 && (
                <span className="cart-counter">{cartItemsCount}</span>
              )}
            </div>

            <button
              className={`hamburger ${isOpen ? "active" : ""}`}
              onClick={toggleMenu}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>
      <CartDrawer />
    </>
  );
};

### NavbarSearch component

import React, { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { lampProducts } from "../../data/data";
import { useNavigate } from "react-router-dom";

const NavbarSearch = () => {
  ### useNavigate hook for navigation
  const navigate = useNavigate();
  ### state for the search container expanded and setting it to false
  const [isExpanded, setIsExpanded] = useState(false);
  ### state for the search query and setting it to an empty string
  const [searchQuery, setSearchQuery] = useState("");
  ### state for the search results and setting it to an empty array
  const [searchResults, setSearchResults] = useState([]);
  ### state for the search results visibility and setting it to false
  const [showResults, setShowResults] = useState(false);
  ### state for the search results closing animation and setting it to false
  const [isClosing, setIsClosing] = useState(false);
  ### useRef hook for the search container reference
  const searchRef = useRef(null);
  ### useRef hook for the search input reference
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      ### checking if the search container reference contains the event target and if it does, set the search container expanded state to false and call the handleClose function
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsExpanded(false);
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  ### click handler for the search icon and expanding the search container
  const handleExpand = () => {
    setIsExpanded(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  ### click handler for the search results closing animation and setting the search results visibility to false
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowResults(false);
      setIsClosing(false);
      setSearchQuery("");
    }, 200);
  };

  ### click handler for the search input and setting the search query to the input value
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim() === "") {
      handleClose();
      return;
    }

    const results = lampProducts.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
    setSearchResults(results.slice(0, 5));
    setShowResults(true);
  };

  ### click handler for the search results and navigating to the product page
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    setIsExpanded(false);
    handleClose();
  };

  return (
    <div
      className={`search-container ${isExpanded ? "expanded" : ""}`}
      ref={searchRef}
    >
      <div className="search-input-wrapper">
        <FaSearch className="search-icon" onClick={handleExpand} />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearch}
          onFocus={() => searchQuery && setShowResults(true)}
        />
      </div>
      {showResults && searchResults.length > 0 && (
        <div className={`search-results ${isClosing ? "closing" : ""}`}>
          <div className="search-results-inner">
            {searchResults.map((product) => (
              <div
                key={product.id}
                className="search-result-item"
                onClick={() => handleProductClick(product.id)}
                role="button"
                tabIndex={0}
              >
                <div className="image-container">
                  <img src={product.image} alt={product.name} loading="lazy" />
                </div>
                <div className="product-info">
                  <h4>{product.name}</h4>
                  <div className="price-container">
                    {product.onSale ? (
                      <div className="price-stack">
                        <span className="sale-price">${product.salePrice}</span>
                        <span className="original-price">${product.price}</span>
                      </div>
                    ) : (
                      <span className="regular-price">${product.price}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


```

### NavbarSearch css

```css
/* .navbar {
    background-color: #FFFFFF;
    padding: 0.5rem 2rem;
    height: 60px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
} */

@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap");

nav.navbar {
  /* setting the navbar to background color background, backdrop filter blur 10px, webkit backdrop filter blur 10px, padding spacing sm spacing xl, height 60px, box shadow lg, width 100%, position fixed, top 0, display flex, left 0, z index fixed */
  backdrop-filter: blur(10px) !important;
  -webkit-backdrop-filter: blur(10px) !important;
  padding: var(--spacing-sm) var(--spacing-xl) !important;
  height: 60px !important;
  box-shadow: var(--shadow-lg) !important;
  width: 100% !important;
  position: fixed !important;
  top: 0 !important;
  display: flex;
  left: 0 !important;
  z-index: var(--z-fixed) !important;
  background-color: var(--color-background);
}

.nav-container {
  /* setting the nav container to display flex, justify content space between, align items center, max width 1200px, margin 0 auto, position relative */
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

.nav-menu {
  /* setting the nav menu to display flex, list style none, margin 0, padding 0, position relative, color primary text */
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;
  color: var(--color-primary-text);
}

.nav-item {
  /* setting the nav item to margin left 2rem */
  margin-left: 2rem;
}

.nav-link {
  /* setting the nav link to font family body, color primary text, text decoration none, padding spacing sm spacing xl, position relative, display flex, align items center, transition normal */
  font-family: var(--font-body);
  color: var(--color-primary-text);
  text-decoration: none;
  padding: 0.5rem 1rem;
  position: relative;
  display: flex;
  align-items: center;
  transition: var(--transition-normal);
}

.nav-link:hover {
  /* setting the nav link hover to color primary button */
  color: var(--color-primary-button);
}

.nav-link.active {
  /* setting the nav link active to color primary button hover */
  color: var(--color-primary-button-hover);
}

/* Logo styles */
.logo {
  /* setting the logo to display flex, align items center, margin top -10px */
  display: flex;
  align-items: center;
  margin-top: -10px;
}

.logo a {
  /* setting the logo a to text decoration none */
  text-decoration: none;
}

.logo-text {
  /* setting the logo text to font family playfair display, serif, font weight bold, font size 2rem, color primary text, text decoration none */
  font-family: "Playfair Display", serif;
  font-weight: bold;
  font-size: 2rem;
  color: var(--color-primary-text);
  text-decoration: none;
}

/* Hamburger menu styles */
.hamburger {
  /* setting the hamburger to display none */
  display: none;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
}

.hamburger span {
  /* setting the hamburger span to display block, width 25px, height 3px, background primary text, margin 5px 0, transition normal */
  display: block;
  width: 25px;
  height: 3px;
  background: var(--color-primary-text);
  margin: 5px 0;
  transition: all 0.3s ease;
}

/* Mobile styles */
@media screen and (max-width: 768px) {
  .nav-container {
    /* setting the nav container to display grid, grid template columns auto 1fr auto, gap 0.5rem */
    grid-template-columns: auto 1fr auto;
    gap: 0.5rem;
  }

  .nav-menu {
    /* setting the nav menu to position fixed, top 60px, right -100%, background color rgba 245 245 245 0.8, backdrop filter blur 8px, webkit backdrop filter blur 8px, width 250px, flex direction column, gap 0, padding spacing md 0 */
    position: fixed;
    top: 60px;
    right: -100%;
    background-color: rgba(245, 245, 245, 0.8);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    width: 250px;
    flex-direction: column;
    gap: 0;
    padding: var(--spacing-md) 0;
    box-shadow: var(--shadow-lg);
    transition: right var(--transition-normal);
  }

  .nav-menu.active {
    /* setting the nav menu active to right 0 */
    right: 0;
  }

  .nav-item {
    /* setting the nav item to margin 0 */
    margin: 0;
  }

  .nav-link {
    /* setting the nav link to padding spacing sm spacing xl, border left 3px solid transparent */
    padding: 0.75rem 1.5rem;
    border-left: 3px solid transparent;
  }

  .nav-link:hover {
    /* setting the nav link hover to background color beige, border left 3px solid yellow */
    background-color: var(--color-beige);
    border-left: 3px solid var(--color-yellow);
  }

  .hamburger {
    /* setting the hamburger to display block */
    display: block;
  }

  .hamburger.active span:nth-child(1) {
    /* setting the hamburger active span to rotate 45deg translate 5px 5px */
    transform: rotate(45deg) translate(5px, 5px);
  }

  .hamburger.active span:nth-child(2) {
    /* setting the hamburger active span to opacity 0 */
    opacity: 0;
  }

  .hamburger.active span:nth-child(3) {
    /* setting the hamburger active span to rotate -45deg translate 7px -6px */
    transform: rotate(-45deg) translate(7px, -6px);
  }

  .nav-right {
    /* setting the nav right to gap spacing sm */
    gap: var(--spacing-sm);
  }

  .cart-icon-container {
    /* setting the cart icon container to position fixed, bottom 10px, right 10px, z index 1000, background color primary button, border radius 50%, padding 10px, box shadow 0 4px 8px rgba 0 0 0 0.2 */
    position: fixed;
    bottom: 10px;
    right: 10px;
    z-index: 1000;
    background-color: var(--color-primary-button);
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .cart-icon {
    /* setting the cart icon to color white, font size 1.5rem, cursor pointer */
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
  }

  .search-container {
    /* setting the search container to margin left 0.25rem */
    margin-left: 0.25rem;
  }

  .search-container.expanded {
    /* setting the search container expanded to width 200px, margin left 0.5rem */
    width: 200px;
    margin-left: 0.5rem;
  }

  .search-results {
    /* setting the search results to width 100%, max height 250px */
    width: 100%;
    max-height: 250px;
  }

  .search-result-item {
    /* setting the search result item to grid template columns 40px 1fr, gap 6px */
    grid-template-columns: 40px 1fr;
    gap: 6px;
  }

  .image-container {
    /* setting the image container to width 40px, height 40px */
    width: 40px;
    height: 40px;
  }
}

.nav-right {
  /* setting the nav right to grid column 3, justify self end, display flex, align items center, gap spacing md, margin left auto */
  grid-column: 3;
  justify-self: end;
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-left: auto;
}

.cart-icon-container {
  /* setting the cart icon container to position relative, display inline block, cursor pointer */
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.cart-icon {
  /* setting the cart icon to font size 1.5rem, color primary text */
  font-size: 1.5rem;
  color: var(--color-primary-text);
}

.cart-icon:hover {
  /* setting the cart icon hover to color primary button, transition normal */
  color: var(--color-primary-button);
  transition: color var(--transition-normal);
}

.cart-counter {
  /* setting the cart counter to position absolute, top -8px, right -5px, background color primary button, color white, border radius 50%, border solid, padding 2px 6px, font size 0.75rem, min width 18px, text align center */
  position: absolute;
  top: -8px;
  right: -5px;
  background-color: var(--color-primary-button);
  color: white;
  border-radius: 50%;
  border: solid;
  padding: 2px 6px;
  font-size: 0.75rem;
  min-width: 18px;
  text-align: center;
}

.search-container {
  /* setting the search container to position relative, width 40px, transition all 0.3s cubic bezier 0.4 0 0.2 1 */
  position: relative;
  width: 40px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.search-container.expanded {
  /* setting the search container expanded to width 300px */
  width: 300px;
}

.search-input-wrapper {
  /* setting the search input wrapper to position relative, width 100%, overflow hidden */
  position: relative;
  width: 100%;
  overflow: hidden;
}

.search-icon {
  /* setting the search icon to position absolute, left 8px, top 50%, transform translateY -50%, color primary text, cursor pointer, z index 2, font size 1.2rem, transition all 0.3s cubic bezier 0.4 0 0.2 1 */
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-primary-text);
  cursor: pointer;
  z-index: 2;
  font-size: 1.2rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.search-icon:hover {
  /* setting the search icon hover to color primary button */
  color: var(--color-primary-button);
}

.search-input-wrapper input {
  /* setting the search input wrapper input to width 100%, padding 8px 8px 8px 35px, border 1px solid border, border radius 4px, font size 14px, opacity 0, transform translateX 20px, transition all 0.3s cubic bezier 0.4 0 0.2 1, visibility hidden */
  width: 100%;
  padding: 8px 8px 8px 35px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 14px;
  opacity: 0;
  transform: translateX(20px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  visibility: hidden;
}

.search-container.expanded .search-input-wrapper input {
  /* setting the search input wrapper input expanded to opacity 1, transform translateX 0, visibility visible */
  opacity: 1;
  transform: translateX(0);
  visibility: visible;
}

.search-results {
  /* setting the search results to position absolute, top calc 100% 8px, left 50%, transform translateX -50%, width 100%, max width 300px, background color background, border 1px solid border, border radius 4px, box shadow lg, overflow hidden */
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 300px;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  box-shadow: var(--shadow-lg);
  overflow: hidden;
}

.search-results-inner {
  /* setting the search results inner to max height 300px, overflow y auto, overflow x hidden, padding 8px */
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 8px;
}

.search-result-item {
  /* setting the search result item to display grid, grid template columns 50px 1fr, gap 12px, padding 8px, align items center, border bottom 1px solid border, width 100%, transform scale 0.9 */
  display: grid;
  grid-template-columns: 50px 1fr;
  gap: 12px;
  padding: 8px;
  align-items: center;
  border-bottom: 1px solid var(--color-border);
  width: 100%;
  transform: scale(0.9);
}

.search-result-item:last-child {
  /* setting the search result item last child to border bottom none */
  border-bottom: none;
}

.search-result-item:hover {
  /* setting the search result item hover to background color warm beige, cursor pointer, transform scale 1, transition transform normal */
  background-color: var(--color-warm-beige);
  cursor: pointer;
  transform: scale(1);
  transition: transform var(--transition-normal);
}

.image-container {
  /* setting the image container to width 50px, height 50px, min width 50px, position relative */
  width: 50px;
  height: 50px;
  min-width: 50px;
  position: relative;
}

.image-container img {
  /* setting the image container img to width 100%, height 100%, object fit cover, border radius 4px */
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.product-info {
  /* setting the product info to width 100%, min width 0 */
  width: 100%;
  min-width: 0;
}

.product-info h4 {
  /* setting the product info h4 to white space nowrap, overflow hidden, text overflow ellipsis, color primary text */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--color-primary-text);
}

.price-container {
  /* setting the price container to display flex, align items flex start, margin top 4px, background color background, border left 3px solid primary button */
  display: flex;
  align-items: flex-start;
  margin-top: 4px;
  background-color: var(--color-background);
  border-left: 3px solid var(--color-primary-button);
}

.price-stack {
  /* setting the price stack to display flex, flex direction column, gap 2px */
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.sale-price {
  /* setting the sale price to color muted terracotta, font weight 500, font size 13px */
  color: var(--color-muted-terracotta);
  font-weight: 500;
  font-size: 13px;
}

.original-price {
  /* setting the original price to color accent silver, text decoration line through, font size 11px, opacity 0.6 */
  color: var(--color-accent-silver);
  text-decoration: line-through;
  font-size: 11px;
  opacity: 0.6;
}

.regular-price {
  /* setting the regular price to color primary text, font weight 500, font size 13px */
  color: var(--color-primary-text);
  font-weight: 500;
  font-size: 13px;
}

@media screen and (max-width: 440px) {
  /* setting the search container to display none */
  .search-container {
    display: none;
  }
}

.search-result-item .product-info {
  /* setting the product info to display flex, flex direction column, align items flex start */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.search-result-item .product-info .regular-price {
  /* setting the regular price to font size 14px */
  font-size: 14px;
}

.search-result-item .product-info .price-container .sale-price {
  /* setting the sale price to font size 14px, padding left 0.5rem */
  font-size: 14px;
  padding-left: 0.5rem;
}

.search-result-item .product-info .price-container .original-price {
  /* setting the original price to font size 10px */
  font-size: 10px;
}
```

### Articles.js

```js
import { useState, useEffect } from "react";
import { articles } from "../../data/data";
import "../../styles/components/articles.css";

const Articles = () => {
  /* setting the expanded articles to an empty object */
  const [expandedArticles, setExpandedArticles] = useState({});

  useEffect(() => {
    /* setting the handle scroll to a function that adds the fade in class to the article container if the article is visible */
    const handleScroll = () => {
      const articleElements = document.querySelectorAll(".article-container");

      articleElements.forEach((element) => {
        /* setting the rect to the element's bounding client rect */
        const rect = element.getBoundingClientRect();
        /* setting the is visible to true if the rect's top is less than or equal to the window's inner height times 0.75 */
        const isVisible = rect.top <= window.innerHeight * 0.75;

        if (isVisible) {
          /* adding the fade in class to the article container */
          element.classList.add("fade-in");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDescription = (articleId) => {
    /* setting the expanded articles to the previous state with the article id toggled */
    setExpandedArticles((prev) => ({
      ...prev,
      [articleId]: !prev[articleId],
    }));
  };

  const truncateText = (text, wordCount) => {
    /* setting the words to the text split by spaces */
    const words = text.split(" ");
    /* if the words length is less than or equal to the word count, return the text */
    if (words.length <= wordCount) return text;
    /* return the words sliced to the word count and joined with a space and an ellipsis */
    return words.slice(0, wordCount).join(" ") + "...";
  };

  return (
    /* setting the articles section to display flex, flex direction column, align items center, gap spacing md, padding spacing md 0 */
    <section className="articles-section">
      {articles.map((article) => (
        /* setting the article container to display flex, flex direction column, align items center, gap spacing md, padding spacing md 0 */
        <div key={article.article_id} className="article-container">
          <div className="article-image">
            <img src={article.article_image} alt={article.article_title} />
          </div>
          <div className="article-content">
            <h2 className="article-title">
              {article.article_title}{" "}
              <span className="emphasis">{article.article_emphasis}</span>
            </h2>
            <p className="article-description">
              {expandedArticles[article.article_id]
                ? article.description
                : truncateText(article.description, 60)}
            </p>
            <button
              className="see-more-btn"
              onClick={() => toggleDescription(article.article_id)}
            >
              {expandedArticles[article.article_id] ? "See Less" : "See More"}
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Articles;
```

### Articles.css

```css
.articles-section {
  /* setting the articles section to max width 1200px, margin 0 auto, padding 2rem */
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.article-container {
  /* setting the article container to display flex, align items center, gap 3rem, margin bottom 4rem, opacity 0, transform translateY 50px */
  display: flex;
  align-items: center;
  gap: 3rem;
  margin-bottom: 4rem;
  opacity: 0;
  transform: translateY(50px);
}

.article-container.fade-in {
  /* setting the article container fade in to animation fadeInUp 0.8s ease forwards */
  animation: fadeInUp 0.8s ease forwards;
}

.article-container:nth-child(even) {
  /* setting the article container even to flex direction row reverse */
  flex-direction: row-reverse;
}

.article-image {
  /* setting the article image to flex 1, max width 400px */
  flex: 1;
  max-width: 400px;
}

.article-image img {
  /* setting the article image img to width 100%, height auto, border radius 8px, box shadow 0 4px 12px rgba 0 0 0 0.1, border 1px solid border */
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--color-border);
}

.article-content {
  /* setting the article content to flex 1 */
  flex: 1;
}

.article-title {
  /* setting the article title to font size 2rem, margin bottom 1rem, color primary text */
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--color-primary-text);
}

.span-text {
  /* setting the span text to color secondary text, font weight 800, position relative, display inline block */
  color: var(--color-secondary-text);
  font-weight: 800;
  position: relative;
  display: inline-block;
}

.article-title .emphasis {
  /* setting the emphasis to color primary button, font weight 800, position relative, display inline block */
  color: var(--color-primary-button);
  font-weight: 800;
  position: relative;
  display: inline-block;
}

.article-title .emphasis::after {
  /* setting the emphasis after to content empty, position absolute, bottom -2px, left 0, width 100%, height 2px, background color primary button */
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--color-primary-button);
}

.article-description {
  /* setting the article description to color secondary text, line height 1.6, margin bottom 1rem */
  color: var(--color-secondary-text);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.see-more-btn {
  /* setting the see more button to background color primary button, color card background, border none, padding 0.5rem 1.5rem, border radius 4px, font size 1rem, cursor pointer, text decoration none, transition background color 0.3s ease */
  background-color: var(--color-primary-button);
  color: var(--color-card-background);
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.see-more-btn:hover {
  /* setting the see more button hover to background color primary button hover */
  background-color: var(--color-primary-button-hover);
}

@keyframes fadeInUp {
  /* setting the fade in up to from opacity 0, transform translateY 50px */
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  /* setting the article container to flex direction column, text align center */
  .article-container {
    flex-direction: column !important;
    text-align: center;
  }

  .article-image {
    max-width: 100%;
  }
}
```

### About.js

```js
import React, { useEffect } from "react";
import "../../styles/about.css";

const About = () => {
  /* setting the count element to the document query selector for the count class */
  useEffect(() => {
    const countElement = document.querySelector(".count");
    /* setting the target to the data target attribute of the count element parsed as an integer */
    const target = parseInt(countElement.dataset.target);
    /* setting the duration to 2000 milliseconds */
    const duration = 2000; // 2 seconds
    /* setting the step to the target divided by the duration divided by 16 */
    const step = target / (duration / 16);
    /* setting the current to 0 */
    let current = 0;

    const updateCount = () => {
      /* incrementing the current by the step */
      current += step;
      /* if the current is less than the target, set the text content to the current floor value and request animation frame the update count */
      if (current < target) {
        countElement.textContent = Math.floor(current).toLocaleString();
        requestAnimationFrame(updateCount);
      } else {
        countElement.textContent = target.toLocaleString();
      }
    };

    /* starting the count animation on load */
    updateCount();
  }, []);

  return (
    /* setting the about container to display flex, flex direction column, align items center, gap spacing md, padding spacing md 0 */
    <div className="about-container">
      <div className="about-content">
        <h1>About Us</h1>
        <div className="about-grid">
          <div className="about-text">
            <h2>20 Years of Excellence</h2>
            <p>
              For two decades, we've been committed to delivering exceptional
              quality and service to our customers worldwide. Our journey began
              in 2004, and since then, we've maintained our commitment to
              excellence.
            </p>
            <img
              src="https://img.freepik.com/premium-vector/money-back-guarantee-free-shipping-trust-badges-trust-badges-secure-ordering-easy-returns_526569-803.jpg?w=2000"
              alt="Trust badges and guarantees"
            />
          </div>
          <div className="about-features">
            <div className="feature">
              <h3>Lifetime Guarantee</h3>
              <p>
                We stand behind our products with a comprehensive lifetime
                guarantee.
              </p>
            </div>
            <div className="feature">
              <h3>Global Shipping</h3>
              <p>
                We deliver our premium products to customers around the world.
              </p>
            </div>
            <div className="feature">
              <h3>Customer First</h3>
              <p>
                Your satisfaction is our top priority, with dedicated support at
                every step.
              </p>
            </div>
            <div className="customers">
              <h3>Satisfied Customers</h3>
              <div className="counter">
                <span className="count" data-target="100000">
                  0
                </span>
                +
              </div>
              <style jsx>{`
                .counter {
                  font-size: 2rem;
                  font-weight: bold;
                  color: var(--color-primary-text);
                }

                .count {
                  animation: countUp 2s ease-out forwards;
                }

                @keyframes countUp {
                  from {
                    content: "0";
                  }
                  to {
                    content: "100000";
                  }
                }
              `}</style>
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                  const countElement = document.querySelector('.count');
                  const target = parseInt(countElement.dataset.target);
                  const duration = 2000;
                  const step = target / (duration / 16);
                  let current = 0;
                  
                  const updateCount = () => {
                    current += step;
                    if(current < target) {
                      countElement.textContent = Math.floor(current).toLocaleString();
                      requestAnimationFrame(updateCount);
                    } else {
                      countElement.textContent = target.toLocaleString();
                    }
                  };
                  
                  const observer = new IntersectionObserver((entries) => {
                    if(entries[0].isIntersecting) {
                      updateCount();
                      observer.disconnect();
                    }
                  });
                  
                  observer.observe(countElement);
                `,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
```

### About.css

```css
.about-container {
  /* setting the about container to padding 4rem 2rem, background color background, color primary text */
  padding: 4rem 2rem;
  background-color: var(--color-background);
  color: var(--color-primary-text);
}

.about-content {
  /* setting the about content to max width 1200px, margin 0 auto */
  max-width: 1200px;
  margin: 0 auto;
}

.about-content h1 {
  /* setting the about content h1 to text align center, font size 2.5rem, margin bottom 3rem, color primary text */
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: var(--color-primary-text);
}

.about-grid {
  /* setting the about grid to display grid, grid template columns 1fr, gap 3rem */
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}

.about-text {
  /* setting the about text to padding 2rem, background color card background, border radius 8px, box shadow 0 4px 6px rgba 0 0 0 0.1, border 1px solid border, display flex, flex direction column, align items center */
  padding: 2rem;
  background-color: var(--color-card-background);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #e4e6ef;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.about-text h2 {
  /* setting the about text h2 to color primary text, margin bottom 1.5rem, font size 2rem */
  color: var(--color-primary-text);
  margin-bottom: 1.5rem;
  font-size: 2rem;
}

.about-text p {
  /* setting the about text p to line height 1.8, font size 1.1rem, color secondary text */
  line-height: 1.8;
  font-size: 1.1rem;
  color: var(--color-secondary-text);
}

.about-text img {
  /* setting the about text img to max width 100%, height auto, margin top 1.5rem, border radius 4px, width 300px, object fit contain */
  max-width: 100%;
  height: auto;
  margin-top: 1.5rem;
  border-radius: 4px;
  width: 300px;
  object-fit: contain;
}

.about-features {
  /* setting the about features to display grid, grid template columns repeat auto fit, minmax 250px, 1fr, gap 2rem */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature {
  /* setting the feature to padding 1.5rem, background color card background, border radius 8px, box shadow 0 4px 6px rgba 0 0 0 0.1, border none, transition transform 0.3s ease, background color 0.3s ease */
  padding: 1.5rem;
  background-color: var(--color-card-background);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: none;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.feature:hover {
  /* setting the feature hover to transform translateY -5px, background color color mix of primary button 15% and card background, border color primary button, box shadow shadow lg */
  transform: translateY(-5px);
  background-color: color-mix(
    in srgb,
    var(--color-primary-button) 15%,
    var(--color-card-background)
  );
  border-color: var(--color-primary-button);
  box-shadow: var(--shadow-lg);
}

.feature h3 {
  /* setting the feature h3 to color primary text, margin bottom 1rem, font size 1.5rem */
  color: var(--color-primary-text);
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.feature p {
  /* setting the feature p to line height 1.6, color secondary text */
  line-height: 1.6;
  color: var(--color-secondary-text);
}

@media (min-width: 768px) {
  /* setting the about grid to grid template columns 1fr 1fr */
  .about-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .about-container {
    padding: 2rem 1rem;
  }
  /* setting the about content to padding top 40px */
  .about-content {
    padding-top: 40px;
  }
  /* setting the about content h1 to font size 2rem */
  .about-content h1 {
    font-size: 2rem;
  }
  /* setting the about text h2 to font size 1.75rem */
  .about-text h2 {
    font-size: 1.75rem;
  }
}

.about-box {
  /* setting the about box to padding 2rem, border radius 8px, background color card background, box shadow 0 2px 4px rgba 0 0 0 0.1, display flex, flex direction column, align items center, text align center */
  padding: 2rem;
  border-radius: 8px;
  background-color: var(--color-card-background);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.about-box img {
  /* setting the about box img to max width 100%, height auto, margin top 1.5rem, border radius 4px */
  max-width: 100%;
  height: auto;
  margin-top: 1.5rem;
  border-radius: 4px;
}

.counter {
  /* setting the counter to font size 2rem, font weight bold, color primary */
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-primary);
}

.customers {
  /* setting the customers to display flex, flex direction column, align items center, gap 1rem */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.count {
  /* setting the count to animation countUp 2s ease-out forwards */
  animation: countUp 2s ease-out forwards;
}
```

### BrandLogos.js

```js
import React, { useState } from "react";
import "./brandlogos.css";

const BrandLogos = () => {
  /* setting the loaded images to a new set */
  const [loadedImages, setLoadedImages] = useState(new Set());
  /* setting the brands to an array of objects with name, logo, and fallback */
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

  /* setting the handle image error to the event target src and fallback */
  const handleImageError = (e, fallback) => {
    /* if the loaded images set does not have the event target src, set the event target src to the fallback and add the event target src to the loaded images set */
    if (!loadedImages.has(e.target.src)) {
      e.target.src = fallback;
      setLoadedImages((prev) => new Set([...prev, e.target.src]));
    }
  };

  const handleImageLoad = (e) => {
    /* adding the loaded class to the event target */
    e.target.classList.add("loaded");
  };

  return (
    <div className="brands-container">
      <div className="brands-slider">
        <div className="slide-track">
          {/* mapping over the brands array twice to create a sliding effect */}
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
```

### BrandLogos.css

```css
.brands-container {
  width: 100%;
  background: var(--color-card-background);
  overflow: hidden;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.brands-slider {
  position: relative;
  width: 100%;
  padding: 1rem 0;
}

.slide-track {
  display: flex;
  width: calc(250px * 20);
  animation: scroll 40s linear infinite;
}

.slide {
  width: 250px;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-card-background);
}

.slide img {
  max-width: 120px;
  height: auto;
  mix-blend-mode: multiply;
  filter: grayscale(100%) contrast(0.8) brightness(1.2);
  opacity: 0;
  transition: all 0.5s ease;
  padding: 10px;
}

.slide img.loaded {
  opacity: 0.7;
}

.slide img:hover {
  filter: grayscale(0%) contrast(1) brightness(1);
  opacity: 1;
  transform: scale(1.05);
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-250px * 10));
  }
}

.brands-slider:hover .slide-track {
  animation-play-state: paused;
}

@media (max-width: 768px) {
  .slide {
    width: 200px;
    padding: 0.75rem;
  }

  .slide img {
    max-width: 100px;
  }

  .slide-track {
    width: calc(200px * 20);
  }

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(-200px * 10));
    }
  }
}
```

### Collections.js

```js
import React, { useState, useRef, useEffect, useCallback } from "react";
import { FaShoppingCart, FaFilter, FaTimes } from "react-icons/fa";
import { useCart } from "../../Context/CartContext";
import { lampCategories } from "../../data/data";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/components/collections.css";
import { useNavigate } from "react-router-dom";
import Slider from "@mui/material/Slider";
// Collections component handles displaying and filtering product listings
const Collections = ({ products }) => {
  // State for tracking UI interactions and filters
  const [hoveredProduct, setHoveredProduct] = useState(null); // Tracks which product is being hovered
  const [currentPage, setCurrentPage] = useState(1); // Current page number for pagination
  const [selectedCategories, setSelectedCategories] = useState([]); // Selected category filters
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Controls filter sidebar visibility
  const { addToCart } = useCart(); // Cart context for adding items
  const filterRef = useRef(null); // Ref for filter sidebar DOM element
  const navigate = useNavigate(); // Router navigation

  // Price range filter state, initialized with min of 0 and max based on highest product price
  const [selectedPriceRange, setSelectedPriceRange] = useState({
    min: 0,
    max: Math.ceil(Math.max(...products.map((p) => p.price))),
  });

  // Close filter sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isFilterOpen &&
        filterRef.current &&
        !filterRef.current.contains(event.target) &&
        !event.target.classList.contains("filter-button")
      ) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFilterOpen]);

  // Handle pagination page changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Scroll to top when changing pages
  };

  // Filter products based on selected categories and price range
  const filteredProducts = products.filter((product) => {
    // Check if product matches selected categories
    const matchesCategories =
      selectedCategories.length === 0 ||
      selectedCategories.every((cat) => product.categories?.includes(cat));

    // Get effective price (sale price if on sale)
    const price = product.onSale ? product.salePrice : product.price;

    // Check if price is within selected range
    const matchesPrice =
      price >= selectedPriceRange.min && price <= selectedPriceRange.max;

    return matchesCategories && matchesPrice;
  });

  // Pagination calculations
  const productsPerPage = 6;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Toggle category selection in filters
  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1); // Reset to first page when changing filters
  };

  // Toggle filter sidebar visibility
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // Handle adding product to cart
  const handleAddToCart = (e, product) => {
    e.stopPropagation(); // Prevent triggering product click
    addToCart(product);
    // Show success toast notification
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

  // Navigate to product detail page
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Handle filter tab clicks
  const handleFilterToggle = useCallback(
    (e) => {
      // Check if clicking the filter tab element
      const isFilterTab =
        e.target === filterRef.current?.querySelector(".filter-sidebar::after");
      if (isFilterTab) {
        setIsFilterOpen(!isFilterOpen);
      }
    },
    [isFilterOpen]
  );

  // Add/remove filter tab click handler
  useEffect(() => {
    const filterSidebar = filterRef.current;
    if (filterSidebar) {
      filterSidebar.addEventListener("click", handleFilterToggle);
    }
    return () => {
      if (filterSidebar) {
        filterSidebar.removeEventListener("click", handleFilterToggle);
      }
    };
  }, [isFilterOpen, handleFilterToggle]);

  // Handle price range slider changes
  const handleSliderChange = (event, newValue) => {
    setSelectedPriceRange({
      min: newValue[0],
      max: newValue[1],
    });
  };

  return (
    <section className="collections">
      <h2>Our Collection</h2>

      {/* Mobile filter toggle button */}
      <button className="filter-button" onClick={toggleFilter}>
        <FaFilter />
      </button>

      {/* Overlay for mobile filter */}
      <div className={`filter-overlay ${isFilterOpen ? "open" : ""}`} />

      {/* Filter sidebar */}
      <div
        ref={filterRef}
        className={`filter-sidebar ${isFilterOpen ? "open" : ""}`}
      >
        <button className="close-filter" onClick={toggleFilter}>
          <FaTimes />
        </button>
        <div className="filter-tab" onClick={toggleFilter}>
          <FaFilter />
        </div>
        <h3>Categories</h3>
        <div className="category-list">
          {lampCategories.map((category) => (
            <label key={category} className="category-item">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
              />
              {category}
            </label>
          ))}
        </div>

        <h3>
          Price Range: ${selectedPriceRange.min} - ${selectedPriceRange.max}
        </h3>
        <div className="price-filter">
          <Slider
            value={[selectedPriceRange.min, selectedPriceRange.max]}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            min={0}
            max={Math.ceil(Math.max(...products.map((p) => p.price)))}
            minDistance={1}
            disableSwap
            sx={{
              color: "var(--color-accent-gold)",
              "& .MuiSlider-thumb": {
                borderRadius: "50%",
                backgroundColor: "var(--color-primary-button)",
              },
              "& .MuiSlider-track": {
                backgroundColor: "var(--color-primary-button)",
              },
              "& .MuiSlider-rail": {
                backgroundColor: "var(--color-primary-button)",
              },
            }}
          />
        </div>
      </div>

      {/* Product grid */}
      <div className="collections-grid">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => handleProductClick(product.id)}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              style={{ cursor: "pointer" }}
            >
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                {product.onSale && <span className="sale-badge">Sale</span>}
                {hoveredProduct === product.id && (
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
                  {product.onSale ? (
                    <>
                      <span className="original-price">${product.price}</span>
                      <span className="sale-price">${product.salePrice}</span>
                    </>
                  ) : (
                    <span className="regular-price">${product.price}</span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>
              Unfortunately it looks like there are no products matching your
              search results
            </p>
          </div>
        )}
      </div>

      {/* Pagination controls */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`page-button ${
              currentPage === index + 1 ? "active" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Collections;
```

### Collections.css

```css
/* Main collections container layout */
.collections {
  padding: 8rem 2rem 2rem; /* Adds padding around the collections section */
  display: grid; /* Uses CSS Grid layout */
  grid-template-columns: 250px 1fr; /* Creates 2 columns - 250px sidebar and flexible main content */
  gap: 2rem; /* Spacing between grid items */
  max-width: 1400px; /* Maximum width of the container */
  margin: 0 auto; /* Centers the container */
}

/* Collections heading styles */
.collections h2 {
  grid-column: 1 / -1; /* Makes heading span full width across all columns */
  text-align: center;
  margin-bottom: 2rem;
}

/* Sidebar filter styles */
.filter-sidebar {
  padding: 3rem 1rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  height: fit-content; /* Makes sidebar height match content */
  background: var(--color-card-background);
}

.filter-sidebar h3 {
  margin-bottom: 1rem;
}

/* Category filter list styles */
.category-list {
  display: flex;
  flex-direction: column; /* Stacks categories vertically */
  gap: 0.5rem;
}

.category-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: var(--color-primary-text);
}

/* Product grid layout */
.collections-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Creates 3 equal columns */
  gap: 2rem;
  margin-bottom: 2rem;
}

/* Individual product card styles */
.product-card {
  position: relative;
  border: 1px solid #e4e6ef;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease; /* Smooth transition for hover effects */
  background: var(--color-card-background);
  box-shadow: var(--shadow-sm);
}

/* Hover effect for product cards */
.product-card:hover {
  transform: translateY(-5px); /* Lifts card slightly on hover */
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

/* Product image container */
.product-image {
  position: relative;
  aspect-ratio: 4/3; /* Maintains consistent image proportions */
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures image fills container while maintaining aspect ratio */
}

/* Sale badge styling */
.sale-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: red;
  color: #fff;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
}

/* Quick buy button styling */
.quick-buy-button {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: var(--color-card-background);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0; /* Hidden by default */
  transform: translateY(10px);
  z-index: 10;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  color: var(--color-primary-text);
}

/* Shows quick buy button on product card hover */
.product-card:hover .quick-buy-button {
  opacity: 1;
  transform: translateY(0);
}

/* Quick buy button hover effect */
.quick-buy-button:hover {
  background-color: var(--color-primary-button);
  color: var(--color-card-background);
  transform: scale(1.1);
}

/* Product information section */
.product-info {
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.product-info h3 {
  margin: 0;
  font-size: 1rem;
}

/* Price display styles */
.price-container {
  margin-top: 0.5rem;
}

.original-price {
  text-decoration: line-through;
  color: var(--color-accent-silver);
  margin-right: 0.5rem;
}

.sale-price {
  color: var(--color-muted-terracotta);
  font-weight: bold;
}

.regular-price {
  font-weight: bold;
  color: var(--color-primary-text);
}

/* Pagination controls */
.pagination {
  grid-column: 1 / -1; /* Spans full width */
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
}

.page-button {
  padding: 0.5rem 1rem;
  border: none;
  background: var(--color-background);
  box-shadow: var(--shadow-lg);
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s ease;
  color: var(--color-primary-text);
}

/* Pagination button hover and active states */
.page-button:hover {
  background-color: var(--color-primary-button);
  border-color: var(--color-primary-button);
  color: var(--color-card-background);
}

.page-button.active {
  background-color: var(--color-primary-button);
  border-color: var(--color-primary-button);
  color: var(--color-card-background);
  font-weight: bold;
}

/* Mobile responsive styles */
@media (max-width: 768px) {
  /* Adjusts layout for mobile devices */
  .collections {
    grid-template-columns: 1fr; /* Single column layout */
    padding: 5rem 1rem 1rem;
  }

  /* Hides filter tab on mobile */
  .filter-tab {
    display: none;
  }

  /* Adjusts price text size */
  .price-container .regular-price {
    font-size: 1rem;
  }

  /* Changes product grid to 2 columns */
  .collections-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  /* Mobile filter sidebar styling */
  .filter-sidebar {
    position: fixed;
    top: 0;
    left: -100%;
    width: 80%;
    height: 100vh;
    background: var(--color-background);
    z-index: 1001;
    transition: left 0.3s ease;
    box-shadow: var(--shadow-lg);
    padding: 3rem 1rem 1rem;
  }

  /* Shows filter sidebar when open */
  .filter-sidebar.open {
    left: 0;
  }

  /* Mobile filter button */
  .filter-button {
    position: fixed;
    bottom: 85px;
    right: 10px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--color-primary-button);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: var(--shadow-sm);
    z-index: 998;
    color: var(--color-card-background);
  }

  /* Mobile product card adjustments */
  .product-card .product-info {
    display: grid;
  }

  .product-card .product-info h3 {
    font-size: 0.9rem;
  }

  .product-card .product-info .price-container {
    font-size: 0.8rem;
    align-items: start !important;
    justify-content: start !important;
    padding-left: 0.1rem;
  }

  /* Close filter button styling */
  .close-filter {
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-primary-text);
    transition: all 0.3s ease;
    border-radius: 50%;
  }

  /* Close filter button hover effect */
  .close-filter:hover {
    background-color: var(--color-warm-beige);
    color: var(--color-deep-emerald);
    transform: rotate(90deg);
  }

  /* Additional mobile-specific adjustments */
  .product-card {
    padding: 0.5rem;
  }

  .product-image {
    aspect-ratio: 3/2;
  }

  .product-info h3 {
    font-size: 0.9rem;
  }

  .product-info .price-container .original-price {
    font-size: 0.7rem !important;
  }

  .product-info .price-container .sale-price {
    font-size: 0.9rem !important;
  }

  .price-container {
    font-size: 0.8rem;
  }

  .quick-buy-button {
    width: 35px;
    height: 35px;
  }

  .collections-grid .product-card {
    height: auto !important;
    min-height: 250px !important;
  }

  .product-info .price-container {
    display: flex;
    flex-direction: column-reverse;
  }

  .price-container .sale-price {
    padding-left: 0.5rem;
  }

  .collections-grid .product-image {
    aspect-ratio: 3/2 !important;
  }
}

/* Desktop-specific styles */
@media (min-width: 769px) {
  /* Hides mobile filter button */
  .filter-button {
    display: none;
  }

  /* Desktop filter sidebar positioning */
  .filter-sidebar {
    position: fixed;
    left: -250px;
    top: 50%;
    transform: translateY(-50%);
    width: 250px;
    background: var(--color-background);
    transition: left 0.3s ease;
    box-shadow: var(--shadow-lg);
    border-radius: 0 8px 8px 0;
    z-index: 1000;
  }

  /* Filter tab styling */
  .filter-tab {
    position: absolute;
    right: -40px;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 100px;
    background: var(--color-primary-button);
    border-radius: 0 8px 8px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 1.2rem;
    color: var(--color-card-background);
  }

  /* Shows filter sidebar when open */
  .filter-sidebar.open {
    left: 0;
  }

  /* Removes pseudo-element */
  .filter-sidebar::after {
    display: none;
  }

  /* Adjusts main content layout */
  .collections {
    grid-template-columns: 1fr;
    padding-left: 4rem;
  }
}

/* Filter overlay styles */
.filter-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease;
}

/* Shows overlay when filter is open */
.filter-overlay.open {
  opacity: 1;
  visibility: visible;
}

/* Product image hover overlay */
.product-image::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
  opacity: 0;
  transition: opacity 0.3s ease;
}

/* Shows hover overlay */
.product-card:hover .product-image::after {
  opacity: 1;
}

/* Cart icon sizing */
.add-to-cart-button svg {
  width: 20px;
  height: 20px;
}

/* Toast notification styles */
.Toastify__toast {
  border-radius: 8px;
  padding: 16px;
}

.Toastify__toast--success {
  background: #4caf50;
  color: var(--color-card-background);
}

.Toastify__toast-icon svg {
  fill: var(--color-card-background);
}

.Toastify__progress-bar {
  background: rgba(0, 0, 0, 0.2);
}

/* Toast close button styles */
.Toastify__close-button {
  color: var(--color-primary-text);
  opacity: 0.7;
}

.Toastify__close-button:hover {
  opacity: 1;
}

/* Close icon sizing */
.close-filter svg {
  width: 20px;
  height: 20px;
}

/* Filter sidebar close button */
.filter-sidebar .close-filter {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  transition: all 0.3s ease;
  border-radius: 50%;
  z-index: 1002;
}

/* Close button hover effect */
.filter-sidebar .close-filter:hover {
  background-color: rgba(0, 0, 0, 0.05);
  color: #333;
  transform: rotate(90deg);
}

/* Close icon sizing and positioning */
.filter-sidebar .close-filter svg {
  width: 20px;
  height: 20px;
  display: block;
}

/* No results message styling */
.no-results {
  grid-column: 1 / -1;
  text-align: center;
  padding: 3rem;
  border-radius: 8px;
  color: var(--color-primary-text);
  font-size: 1.1rem;
  margin: 2rem 0;
  background: var(--color-warm-beige);
}

.no-results p {
  margin: 0;
  line-height: 1.5;
}

/* Price filter slider styles */
.price-filter {
  position: relative;
  width: 100%;
  height: 40px;
  margin: 1rem 0;
}

.price-slider {
  position: absolute;
  width: 100%;
  height: 2px;
  background: var(--color-primary-button);
  pointer-events: none;
  -webkit-appearance: none;
  top: 50%;
  transform: translateY(-50%);
}

/* Slider thumb styles for webkit browsers */
.price-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  pointer-events: auto;
  width: 16px;
  height: 16px;
  background: var(--color-primary-button);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  margin-top: -7px;
  z-index: 3;
  box-shadow: var(--shadow-sm);
}

/* Slider thumb styles for Firefox */
.price-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background: var(--color-accent-gold);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  z-index: 3;
  box-shadow: var(--shadow-sm);
}

/* Slider track styles */
.price-slider::-webkit-slider-runnable-track {
  width: 100%;
  height: 2px;
  background: transparent;
}

.price-slider::-moz-range-track {
  width: 100%;
  height: 2px;
  background: transparent;
}

/* Active range styling */
.price-slider:nth-child(1) {
  z-index: 1;
}

.price-slider:nth-child(2) {
  z-index: 2;
  background: var(--color-accent-gold);
}

/* Slider thumb hover effects */
.price-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}

.price-slider::-moz-range-thumb:hover {
  transform: scale(1.2);
}

/* Additional slider thumb shadows */
.price-slider::-webkit-slider-thumb {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.price-slider::-moz-range-thumb {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Cart icon sizing */
.add-to-cart-button svg {
  width: 20px;
  height: 20px;
}

/* Filter section spacing */
.filter-sidebar h3 {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.filter-sidebar h3:first-of-type {
  margin-top: 0;
}

/* Checkbox styling */
.category-item input[type="checkbox"] {
  accent-color: var(--color-accent-gold);
}

/* Material UI slider override */
.MuiSlider-track {
  border: none !important;
}
```

### Footer

```js
import React from "react";
import { Link } from "react-router-dom";
import "../../styles/components/footer.css";

// Footer component that displays contact info, hours, and navigation links
const Footer = () => {
  return (
    // Main footer container
    <footer className="footer">
      {/* Content wrapper for the main footer sections */}
      <div className="footer-content">
        {/* Contact information section */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: info@example.com</p>
          <p>Phone: (555) 123-4567</p>
        </div>

        {/* Business hours section */}
        <div className="footer-section">
          <h3>Opening Hours</h3>
          <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
          <p>Saturday: 10:00 AM - 4:00 PM</p>
          <p>Sunday: Closed</p>
        </div>

        {/* Navigation links section */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            {/* Each link uses React Router's Link component for client-side navigation */}
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/faqs">FAQs</Link>
            </li>
            <li>
              <Link to="/shipping">Shipping & Delivery</Link>
            </li>
            <li>
              <Link to="/returns">Returns & Refunds</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms">Terms & Conditions</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright section at the bottom */}
      <div className="footer-bottom">
        <p>
          {/* Dynamic copyright year that updates automatically */}
          &copy; {new Date().getFullYear()} Illuminated. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
```

## Footer.css

```css
/* Main footer container styles */
.footer {
  background-color: var(
    --color-background
  ); /* Sets background color using CSS variable */
  color: var(--color-primary-text); /* Sets text color using CSS variable */
  padding: 40px 0 20px; /* Adds padding: 40px top, 0 sides, 20px bottom */
}

/* Content wrapper styles */
.footer-content {
  max-width: 1200px; /* Limits width of content */
  margin: 0 auto; /* Centers content horizontally */
  display: flex; /* Uses flexbox layout */
  justify-content: space-between; /* Spreads out sections evenly */
  padding: 0 20px; /* Adds horizontal padding */
}

/* Individual footer section styles */
.footer-section {
  flex: 1; /* Makes sections grow equally */
  max-width: 300px; /* Limits section width */
  margin: 0 15px; /* Adds horizontal spacing between sections */
}

/* Section heading styles */
.footer-section h3 {
  color: var(--color-primary-text); /* Sets heading color */
  margin-bottom: 15px; /* Adds space below headings */
  font-size: 1.2rem; /* Sets heading font size */
}

/* Section paragraph styles */
.footer-section p {
  margin-bottom: 10px; /* Adds space between paragraphs */
  color: var(--color-secondary-text); /* Sets paragraph color */
}

/* Quick links list styles */
.footer-section ul {
  list-style: none; /* Removes default bullet points */
  padding: 0; /* Removes default padding */
}

/* List item styles */
.footer-section ul li {
  margin-bottom: 10px; /* Adds space between list items */
}

/* Link styles */
.footer-section ul li a {
  color: var(--color-secondary-text); /* Sets link color */
  text-decoration: none; /* Removes underline */
  transition: color 0.3s ease; /* Smooth color transition on hover */
}

/* Link hover effect */
.footer-section ul li a:hover {
  color: var(--color-primary-button); /* Changes link color on hover */
}

/* Copyright section styles */
.footer-bottom {
  text-align: center; /* Centers copyright text */
  margin-top: 40px; /* Adds space above copyright */
  padding-top: 20px; /* Adds padding above copyright */
  border-top: 1px solid var(--color-border); /* Adds separator line */
}

/* Copyright text styles */
.footer-bottom p {
  color: var(--color-secondary-text); /* Sets copyright text color */
  font-size: 0.9rem; /* Makes copyright text slightly smaller */
}

/* Responsive design for mobile devices */
@media (max-width: 768px) {
  .footer-content {
    flex-direction: column; /* Stacks sections vertically */
    text-align: center; /* Centers all text */
  }

  .footer-section {
    margin: 20px auto; /* Adds vertical spacing between sections */
    max-width: 100%; /* Allows sections to fill width */
  }
}
```

### ProductPage.js

```js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../Context/CartContext";
import { lampProducts } from "../../data/data";
import "../../styles/components/productpage.css";
import { toast } from "react-toastify";

// Main ProductPage component that displays a single product's details
const ProductPage = () => {
  // Get the product ID from URL parameters
  const { id } = useParams();
  // Get addToCart function from cart context
  const { addToCart } = useCart();
  // State for managing the main displayed image and active thumbnail index
  const [mainImage, setMainImage] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Find the product from lampProducts data that matches the URL ID
  const product = lampProducts.find((p) => p.id === parseInt(id));

  // When product changes, set the main image to product's primary image
  // and reset active thumbnail index to 0
  useEffect(() => {
    if (product) {
      setMainImage(product.image);
      setActiveIndex(0);
    }
  }, [product]);

  // Show error message if product not found
  if (!product) {
    return <div className="product-page">Product not found</div>;
  }

  // Combine primary image with other images for carousel
  const allImages = [product.image, ...product.other_images];

  // Handler for clicking thumbnail images
  // Adds transition class, updates main image and active index after delay
  const handleImageClick = (image, index) => {
    const mainImageElement = document.querySelector(".main-image");
    mainImageElement.classList.add("transition");

    setTimeout(() => {
      setMainImage(image);
      setActiveIndex(index);
      mainImageElement.classList.remove("transition");
    }, 500);
  };

  // Handler for adding product to cart
  // Prevents default form submission, adds to cart and shows success toast
  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  // Render product page layout
  return (
    <div className="product-page">
      <div className="product-container">
        {/* Left side - Product images */}
        <div className="product-image-container">
          {/* Main product image */}
          <img
            src={mainImage || product.image}
            alt={product.name}
            className="main-image"
          />
          {/* Sale badge if product is on sale */}
          {product.onSale && <span className="sale-badge">Sale</span>}

          {/* Image carousel/thumbnails */}
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

        {/* Right side - Product details */}
        <div className="product-details">
          {/* Product name */}
          <h1>{product.name}</h1>
          {/* Commented out sale subtitle */}
          {/* <h3>
            {product.onSale && <span className="sale-subtitle">ON SALE</span>}
          </h3> */}

          {/* Price display - shows sale price if on sale, regular price if not */}
          <div className="price-container price-container-product">
            {product.onSale ? (
              <>
                <span className="original-price">${product.price}</span>
                <span className="sale-price">${product.salePrice}</span>
              </>
            ) : (
              <span className="regular-price">${product.price}</span>
            )}
          </div>

          {/* Product description */}
          <p className="description">{product.description}</p>

          {/* Add to cart button with cart icon */}
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            <FaShoppingCart /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
```

### ProductPage.css

```css
/* Main product page container */
.product-page {
  padding: 2rem; /* Add padding around the entire page */
  max-width: 1200px; /* Limit maximum width */
  margin: 80px auto 0; /* Center horizontally with top margin for navbar */
  min-height: calc(
    100vh - 80px
  ); /* Minimum full viewport height minus navbar */
  background-color: var(--color-background); /* Use theme background color */
}

/* Grid container for product layout */
.product-container {
  display: grid; /* Use CSS Grid */
  grid-template-columns: 1fr 1fr; /* Two equal columns */
  gap: 2rem; /* Space between columns */
  padding: 1rem; /* Inner padding */
}

/* Container for product images */
.product-image-container {
  display: flex; /* Use flexbox */
  flex-direction: column; /* Stack children vertically */
  gap: 2rem; /* Space between main image and carousel */
  max-width: 600px; /* Limit maximum width */
}

/* Product image styling */
.product-image-container img {
  width: 100%; /* Full width of container */
  height: auto; /* Maintain aspect ratio */
  border-radius: 8px; /* Rounded corners */
}

/* Commented out sale subtitle styles for future reference */
/* .sale-subtitle {
  color: #e53e3e;
  font-weight: bold;
  font-size: 1.0rem;
  font-style: italic;
  margin-top:0;
} */

/* Product details container */
.product-details {
  display: flex; /* Use flexbox */
  flex-direction: column; /* Stack children vertically */
  gap: 1rem; /* Space between elements */
  min-height: 100%; /* Full height of container */
  position: relative; /* For absolute positioning of children */
  padding: 0 1rem; /* Horizontal padding */
}

/* Product title styling */
.product-details h1 {
  font-size: 2.5rem; /* Large text size */
  margin-bottom: 1.5rem; /* Space below */
  color: var(--color-primary-text); /* Theme text color */
  font-family: var(--font-heading); /* Theme heading font */
}

/* Price container layout */
.product-details .price-container {
  margin: 1.5rem 0; /* Vertical margin */
  display: flex; /* Use flexbox */
  align-items: center; /* Center items vertically */
  gap: 1rem; /* Space between prices */
}

/* Sale price styling */
.sale-price {
  font-size: 1.8rem; /* Large text */
  color: var(--color-primary-button); /* Theme accent color */
  font-weight: bold; /* Bold text */
}

/* Original price styling (crossed out) */
.original-price {
  text-decoration: line-through; /* Strike-through effect */
  color: var(--color-secondary-text); /* Secondary text color */
  font-size: 1.2rem; /* Smaller than sale price */
}

/* Regular price styling */
.regular-price {
  font-size: 1.8rem; /* Large text */
  font-weight: bold; /* Bold text */
  color: var(--color-primary-button); /* Theme accent color */
  padding-left: 0.5rem; /* Left padding */
}

/* Override for regular price background */
.price-container .regular-price {
  background-color: transparent !important; /* Force transparent background */
}

/* Product description text */
.description {
  line-height: 1.8; /* Increased line height for readability */
  color: var(--color-primary-text); /* Theme text color */
  margin-bottom: 2.5rem; /* Space below */
  font-size: 1.1rem; /* Slightly larger than normal text */
}

/* Add to cart button styling */
.add-to-cart-button {
  display: flex !important; /* Force flexbox */
  align-items: center !important; /* Center items vertically */
  justify-content: center !important; /* Center items horizontally */
  gap: 0.75rem; /* Space between icon and text */
  padding: 1.25rem 2.5rem; /* Vertical and horizontal padding */
  background-color: var(--color-primary-button); /* Theme button color */
  color: var(--color-card-background); /* Button text color */
  border: none; /* Remove border */
  border-radius: 8px; /* Rounded corners */
  cursor: pointer; /* Hand cursor on hover */
  font-size: 1.2rem; /* Large text */
  font-weight: bold; /* Bold text */
  width: 100%; /* Full width */
  max-width: 300px; /* Maximum width */
  position: relative; /* For z-index */
  opacity: 1 !important; /* Force full opacity */
  z-index: 1; /* Stack order */
  transition: all 0.3s ease; /* Smooth transitions */
  margin: 2rem auto; /* Center horizontally with vertical margin */
  box-shadow: var(--shadow-md); /* Medium shadow */
}

/* Add to cart button hover effects */
.add-to-cart-button:hover {
  background-color: var(--color-primary-button-hover); /* Darker button color */
  color: var(--color-card-background); /* Maintain text color */
  transform: scale(1.02); /* Slight grow effect */
  box-shadow: var(--shadow-lg); /* Larger shadow */
}

/* Mobile responsive styles */
@media (max-width: 768px) {
  .product-container {
    grid-template-columns: 1fr; /* Single column layout */
  }

  .price-container-product .regular-price {
    font-size: 1.8rem !important; /* Force larger font size */
  }

  .product-page {
    padding: 1rem; /* Reduced padding */
    margin-top: 60px; /* Adjusted top margin */
  }

  .product-details {
    padding-bottom: 2rem; /* Extra bottom padding */
  }
}

/* Main product image styling */
.main-image {
  width: 100%; /* Full width */
  height: auto; /* Maintain aspect ratio */
  object-fit: cover; /* Cover container */
  border-radius: 8px; /* Rounded corners */
  transition: opacity 0.5s ease-in-out; /* Fade transition */
  opacity: 1; /* Full opacity */
}

/* Image transition states */
.main-image.transition {
  opacity: 0; /* Fade out */
}

.main-image.fade-out {
  opacity: 0; /* Fade out */
  transform: scale(0.95); /* Slight shrink */
}

.main-image.fade-in {
  opacity: 1; /* Fade in */
  transform: scale(1); /* Normal size */
}

/* Image carousel layout */
.image-carousel {
  display: grid; /* Use CSS Grid */
  grid-template-columns: repeat(5, 1fr); /* 5 equal columns */
  gap: 1.5rem; /* Space between images */
  padding: 0.5rem; /* Inner padding */
  width: 100%; /* Full width */
  justify-items: center; /* Center items horizontally */
  align-items: center; /* Center items vertically */
}

/* Carousel thumbnail styling */
.carousel-image {
  width: 100%; /* Full width */
  aspect-ratio: 1; /* Square aspect ratio */
  object-fit: cover; /* Cover container */
  cursor: pointer; /* Hand cursor */
  transition: all 0.3s ease; /* Smooth transitions */
  border: 2px solid transparent; /* Transparent border */
  border-radius: 4px; /* Rounded corners */
}

/* Carousel thumbnail hover effect */
.carousel-image:hover {
  opacity: 0.8; /* Slight transparency */
}

/* Active carousel thumbnail */
.carousel-image.active {
  border-color: var(--color-primary-button); /* Highlight border */
  transform: scale(1.1); /* Enlarge slightly */
  box-shadow: var(--shadow-sm); /* Small shadow */
  z-index: 1; /* Stack above others */
}

/* Product card price styles */
.product-card .product-info .price-container .sale-price {
  font-size: 14px; /* Small text */
  padding-left: 0.5rem; /* Left padding */
}

.product-card .product-info .price-container .original-price {
  font-size: 10px; /* Smaller text */
}

.product-card .product-info .price-container .regular-price {
  font-size: 14px; /* Small text */
  padding-left: 0.5rem; /* Left padding */
}

/* Price container alignment */
.product-card .product-info .price-container {
  align-items: center; /* Center items vertically */
}

/* Product page border radius */
.product-page {
  border-top-left-radius: 8px; /* Rounded top corners */
  border-top-right-radius: 8px;
}

/* Hide sale badge in product page */
.product-page .product-container .product-image-container .sale-badge {
  display: none; /* Hide element */
}
```

### SuccessAnimation.js

```js
/* Success Animation Component Styles */

/* Overlay that covers the entire screen */
.success-animation-overlay {
  position: fixed; /* Fixed position to cover viewport */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.95); /* Semi-transparent white background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Ensure it appears above other content */
  opacity: 0; /* Start hidden */
  visibility: hidden;
  transition: opacity 0.3s ease-in-out; /* Smooth fade transition */
}

/* Show overlay when success animation class is added to body */
body.show-success-animation .success-animation-overlay {
  opacity: 1;
  visibility: visible;
}

/* Container for the checkmark animation */
.success-checkmark {
  width: 80px;
  height: 80px;
  position: relative;
  transform: scale(0); /* Start scaled down */
}

/* Scale in animation when success animation is shown */
body.show-success-animation .success-checkmark {
  animation: scale-in 0.3s ease-out forwards;
}

/* Circular container for the checkmark */
.check-icon {
  width: 80px;
  height: 80px;
  position: relative;
  border-radius: 50%;
  box-sizing: content-box;
  border: 4px solid #4CAF50; /* Green border */
}

/* Left part of circular animation */
.check-icon::before {
  top: 3px;
  left: -2px;
  width: 30px;
  transform-origin: 100% 50%;
  border-radius: 100px 0 0 100px;
}

/* Right part of circular animation */
.check-icon::after {
  top: 0;
  left: 30px;
  width: 60px;
  transform-origin: 0 50%;
  border-radius: 0 100px 100px 0;
  animation: rotate-circle 4.25s ease-in;
}

/* Base styles for the checkmark lines */
.icon-line {
  height: 5px;
  background-color: #4CAF50; /* Green color */
  display: block;
  border-radius: 2px;
  position: absolute;
  z-index: 10;
}

/* Short diagonal line of checkmark */
.icon-line.line-tip {
  top: 46px;
  left: 14px;
  width: 25px;
  transform: rotate(45deg);
  animation: icon-line-tip 0.75s; /* Animate drawing the line */
}

/* Long diagonal line of checkmark */
.icon-line.line-long {
  top: 38px;
  right: 8px;
  width: 47px;
  transform: rotate(-45deg);
  animation: icon-line-long 0.75s; /* Animate drawing the line */
}

/* Outer circle with lower opacity */
.icon-circle {
  top: -4px;
  left: -4px;
  z-index: 10;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: absolute;
  box-sizing: content-box;
  border: 4px solid rgba(76, 175, 80, 0.5); /* Semi-transparent green */
}

/* White background fix to hide line ends */
.icon-fix {
  top: 8px;
  width: 5px;
  left: 26px;
  z-index: 1;
  height: 85px;
  position: absolute;
  transform: rotate(-45deg);
  background-color: white;
}

/* Animation for scaling in the checkmark */
@keyframes scale-in {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

/* Animation for drawing the short diagonal line */
@keyframes icon-line-tip {
  0% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  54% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  70% {
    width: 50px;
    left: -8px;
    top: 37px;
  }
  84% {
    width: 17px;
    left: 21px;
    top: 48px;
  }
  100% {
    width: 25px;
    left: 14px;
    top: 46px;
  }
}

/* Animation for drawing the long diagonal line */
@keyframes icon-line-long {
  0% {
    width: 0;
    right: 46px;
    top: 54px;
  }
  65% {
    width: 0;
    right: 46px;
    top: 54px;
  }
  84% {
    width: 55px;
    right: 0px;
    top: 35px;
  }
  100% {
    width: 47px;
    right: 8px;
    top: 38px;
  }
}
```

### ThankYouPage.js

```js
import React from "react";
import "./ThankYouPage.css";
import { useNavigate } from "react-router-dom";

// ThankYouPage component handles displaying order confirmation details after a successful purchase
const ThankYouPage = () => {
  // Get navigation function from react-router
  const navigate = useNavigate();

  // Retrieve the last order details from localStorage
  const rawOrderDetails = localStorage.getItem("lastOrder");

  // Parse the order details, converting the estimatedDelivery string back to a Date object
  const orderDetails = rawOrderDetails
    ? JSON.parse(rawOrderDetails, (key, value) => {
        if (key === "estimatedDelivery") return new Date(value);
        return value;
      })
    : null;

  // If no order details found, display error message and return home button
  if (!orderDetails) {
    return (
      <div className="thank-you-container">
        <div className="thank-you-content">
          <h1>No Order Found</h1>
          <p>Sorry, we couldn't find any order details.</p>
          <button className="back-button" onClick={() => navigate("/")}>
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  // Destructure the order details into individual variables
  const { formData, cartItems, total, estimatedDelivery, orderId } =
    orderDetails;

  // Main thank you page layout
  return (
    <div className="thank-you-container">
      <div className="thank-you-content">
        {/* Header section with success icon and order number */}
        <div className="success-header">
          <div className="success-icon">✓</div>
          <h1>Thank You for Your Order!</h1>
          <p className="order-confirmation">Order #{orderId}</p>
        </div>

        <div className="confirmation-details">
          {/* Shipping information section */}
          <div className="info-section shipping-info">
            <h2>Shipping Information</h2>
            <div className="shipping-info-card">
              {/* Customer name and address details */}
              <div className="shipping-details">
                <p className="shipping-name">
                  {formData.firstName} {formData.lastName}
                </p>
                <p className="shipping-address">{formData.address}</p>
                <p className="shipping-city-zip">
                  {formData.city}, {formData.zipCode}
                </p>
              </div>
              {/* Contact information */}
              <div className="contact-details">
                <p>
                  <span>Email:</span> {formData.email}
                </p>
                <p>
                  <span>Phone:</span> {formData.phone}
                </p>
              </div>
              {/* Estimated delivery date */}
              <div className="delivery-date">
                <p>
                  <span>Estimated Delivery:</span>
                </p>
                <p className="date">{estimatedDelivery.toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Order details section */}
          <div className="info-section order-details">
            <h2>Order Details</h2>
            {/* List of ordered items */}
            <div className="ordered-items">
              {cartItems.map((item) => (
                <div key={item.id} className="ordered-item">
                  <img src={item.image} alt={item.name} />
                  <div className="item-info">
                    <h3>{item.name}</h3>
                    <p>Quantity: {item.quantity}</p>
                    <p className="price">${item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order total summary */}
            <div className="order-summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
```

### ThankYouPage.css

```css
/* Main container that takes up full viewport height and adds padding */
.thank-you-container {
  min-height: 100vh; /* Full viewport height */
  background-color: var(--color-background); /* Background color from theme */
  padding: 2rem; /* Padding around content */
  padding-top: calc(80px + 2rem); /* Extra top padding to account for header */
}

/* Content wrapper with max width and card styling */
.thank-you-content {
  max-width: 1200px; /* Limit maximum width */
  margin: 0 auto; /* Center horizontally */
  background: var(--color-card-background); /* Card background from theme */
  border-radius: 12px; /* Rounded corners */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); /* Subtle shadow */
  overflow: hidden; /* Clip content to border radius */
  border: 1px solid #e4e6ef; /* Light border */
}

/* Green success header section */
.success-header {
  background: #4caf50; /* Green background */
  color: var(--color-card-background); /* White text */
  padding: 2rem; /* Padding around content */
  text-align: center; /* Center text */
}

/* Container for order details */
.confirmation-details {
  background-color: var(--color-background); /* Background color from theme */
}

/* Circular checkmark icon container */
.success-icon {
  width: 60px;
  height: 60px;
  background: var(--color-card-background); /* White background */
  border-radius: 50%; /* Circular shape */
  display: flex;
  align-items: center;
  justify-content: center; /* Center checkmark */
  margin: 0 auto 1rem; /* Center horizontally with bottom margin */
  color: #4caf50; /* Green checkmark */
  font-size: 2rem; /* Large checkmark */
  font-weight: bold;
}

/* Order confirmation number text */
.order-confirmation {
  font-size: 1.2rem; /* Larger text */
  opacity: 0.9; /* Slightly transparent */
  margin-top: 0.5rem; /* Space above */
}

/* Grid layout for shipping and order details */
.confirmation-details {
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 1.5fr; /* Order details section is wider */
  gap: 2rem; /* Space between columns */
}

/* Shared styles for info sections */
.info-section {
  background: var(--color-card-background);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Drop shadow */
}

/* Section headings */
.info-section h2 {
  color: var(--color-primary-text);
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

/* Card style for info content */
.info-card {
  background: var(--color-background);
  padding: 1.5rem;
  border-radius: 8px;
}

/* Customer name styling */
.customer-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: var(--color-primary-text);
}

/* Address text styling */
.address-details {
  margin-bottom: 1rem;
  line-height: 1.6; /* Increased line height for readability */
}

/* Contact and delivery date label styling */
.contact-details span,
.delivery-date span {
  font-weight: 600;
  color: var(--color-secondary-text);
}

/* Delivery date section */
.delivery-date {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee; /* Separator line */
}

/* Delivery date text */
.delivery-date .date {
  color: var(--color-primary-button);
  font-weight: 600;
}

/* Container for ordered items list */
.ordered-items {
  margin-bottom: 2rem;
}

/* Individual ordered item row */
.ordered-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #eee; /* Separator between items */
}

/* Product image in order list */
.ordered-item img {
  width: 80px;
  height: 80px;
  object-fit: cover; /* Maintain aspect ratio */
  border-radius: 8px;
}

/* Product name in order list */
.item-info h3 {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

/* Price text in order list */
.item-info .price {
  color: #2c3e50;
  font-weight: 600;
}

/* Order total summary section */
.order-summary {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
}

/* Row in order summary */
.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

/* Total row in order summary */
.summary-row.total {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 2px solid #eee; /* Thicker separator */
  font-weight: bold;
  font-size: 1.2rem;
}

/* Return to home button */
.back-button {
  background: var(--color-primary-button);
  color: var(--color-card-background);
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
}

/* Button hover state */
.back-button:hover {
  background: var(--color-primary-button-hover);
}

/* Responsive layout for mobile */
@media (max-width: 768px) {
  .confirmation-details {
    grid-template-columns: 1fr; /* Stack sections vertically */
  }

  .thank-you-container {
    padding: 1rem;
    padding-top: calc(80px + 1rem); /* Adjust top padding */
  }
}

/* Shipping details section styling */
.shipping-details .customer-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.75rem;
}

.shipping-details .address {
  color: #4a4a4a;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.shipping-details .city-zip {
  color: #4a4a4a;
  margin-bottom: 1rem;
}

/* Contact details section */
.contact-details {
  padding-top: 1rem;
  border-top: 1px solid #eee;
  margin-bottom: 1rem;
}

.contact-details p {
  margin-bottom: 0.5rem;
  color: #4a4a4a;
}

.contact-details span {
  font-weight: 600;
  color: #666;
  margin-right: 0.5rem;
}

/* Shipping name styling */
.shipping-name {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: var(--color-primary-text);
  text-transform: capitalize; /* Capitalize first letter */
}

/* Shipping address styling */
.shipping-address {
  margin-bottom: 0.5rem;
  line-height: 1.6;
  color: #4a4a4a;
}

/* City and zip code styling */
.shipping-city-zip {
  margin-bottom: 1rem;
  line-height: 1.6;
  color: #4a4a4a;
}

/* Card container for shipping info */
.shipping-info-card {
  background: var(--color-card-background);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  border: 1px solid #e4e6ef;
}
```

### CartContext.js

```js
// Import required dependencies from React
import React, { createContext, useState, useContext, useEffect } from "react";

// Create a new Context object for managing cart state
const CartContext = createContext();

// CartProvider component that wraps the app and provides cart functionality
export const CartProvider = ({ children }) => {
  // State for storing cart items array
  const [cartItems, setCartItems] = useState([]);
  // State for tracking if cart modal/drawer is open
  const [isCartOpen, setIsCartOpen] = useState(false);
  // State for tracking total number of items in cart
  const [cartItemsCount, setCartItemsCount] = useState(0);

  // Effect hook to update cart count whenever items change
  useEffect(() => {
    // Calculate total quantity across all items
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartItemsCount(count);
  }, [cartItems]);

  // Function to add an item to the cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // Check if item already exists in cart
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        // If exists, increment quantity
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // If new item, add to cart with quantity 1
      return [...prevItems, { ...product, quantity: 1 }];
    });
    setCartItemsCount((prev) => prev + 1);
  };

  // Function to remove an item from the cart
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const item = prevItems.find((item) => item.id === productId);
      if (item.quantity > 1) {
        // If quantity > 1, decrement quantity
        return prevItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      // If quantity = 1, remove item completely
      return prevItems.filter((item) => item.id !== productId);
    });
    setCartItemsCount((prev) => prev - 1);
  };

  // Function to calculate total price of items in cart
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      // Use sale price if available, otherwise regular price
      const price = item.salePrice || item.price;
      return total + price * item.quantity;
    }, 0);
  };

  // Function to clear all items from cart
  const clearCart = () => {
    setCartItems([]);
    setCartItemsCount(0);
  };

  // Provide cart context to child components
  return (
    <CartContext.Provider
      value={{
        cartItems, // Array of items in cart
        cartItemsCount, // Total number of items
        addToCart, // Function to add items
        removeFromCart, // Function to remove items
        isCartOpen, // Cart modal open state
        setIsCartOpen, // Function to toggle cart modal
        calculateTotal, // Function to get cart total
        clearCart, // Function to empty cart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to easily access cart context in components
export const useCart = () => useContext(CartContext);
```

### Cart.js

```js
import React, { useState } from "react";
import { useCart } from "../../Context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaMinus,
  FaShoppingBag,
  FaTruck,
  FaUndo,
  FaArrowLeft,
} from "react-icons/fa";
import "../../styles/components/cart.css";
import CheckoutModal from "../Checkout/CheckoutModal";

/**
 * Cart Component
 * Handles displaying and managing the shopping cart interface
 */
const Cart = () => {
  // Extract cart functionality from CartContext using custom hook
  const { cartItems, addToCart, removeFromCart, calculateTotal, clearCart } =
    useCart();

  // State for managing checkout modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hook for programmatic navigation
  const navigate = useNavigate();

  /**
   * Opens the checkout modal when user clicks checkout button
   */
  const handleCheckoutClick = () => {
    setIsModalOpen(true);
  };

  /**
   * Handles successful order completion:
   * 1. Closes checkout modal
   * 2. Clears cart after slight delay
   * 3. Shows success animation
   * 4. Navigates to thank you page
   */
  const handleOrderSuccess = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      clearCart();
    }, 1000);

    document.body.classList.add("show-success-animation");

    setTimeout(() => {
      document.body.classList.remove("show-success-animation");
      navigate("/thank-you");
    }, 2000);
  };

  return (
    <div className="cart-page">
      <div className="cart-container" id="shopping-cart">
        <h1>Shopping Cart</h1>

        {/* Show empty cart message if no items */}
        {cartItems.length === 0 ? (
          <div className="empty-cart-message">
            <FaShoppingBag size={50} />
            <p>Your cart is empty</p>
            <Link to="/products" className="continue-shopping">
              <FaArrowLeft /> Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="cart-content" id="cart-content">
            {/* Cart Items Section */}
            <div className="cart-items-section" id="cart-items-section">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="cart-page-item"
                  id="cart-page-item"
                >
                  {/* Product Image with Link */}
                  <Link to={`/product/${item.id}`} className="product-link">
                    <img src={item.image} alt={item.name} />
                  </Link>

                  {/* Product Details */}
                  <div className="item-details" id="item-details">
                    <Link to={`/product/${item.id}`} className="product-link">
                      <h3>{item.name}</h3>
                      <p className="price">
                        ${(item.salePrice || item.price).toFixed(2)}
                      </p>
                    </Link>

                    {/* Quantity Controls */}
                    <div className="quantity-controls" id="quantity-controls">
                      <button onClick={() => removeFromCart(item.id)}>
                        <FaMinus />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => addToCart(item)}>
                        <FaPlus />
                      </button>
                    </div>
                  </div>

                  {/* Item Total Price */}
                  <div className="item-total" id="item-total">
                    $
                    {((item.salePrice || item.price) * item.quantity).toFixed(
                      2
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Sidebar */}
            <div className="cart-sidebar">
              {/* Order Summary Section */}
              <div className="order-summary">
                <h2>Order Summary</h2>
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <div className="icon-text">
                    <span>Shipping</span>
                  </div>
                  <span>Free</span>
                </div>

                <div className="summary-total">
                  <span>Total</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                <button
                  className="checkout-button"
                  onClick={handleCheckoutClick}
                >
                  Complete Purchase
                </button>
                <Link to="/products" className="continue-shopping">
                  <FaArrowLeft /> Continue Shopping
                </Link>
              </div>

              {/* Shipping Information Cards */}
              <div className="shipping-info">
                <div className="info-card">
                  <FaTruck className="info-icon" />
                  <div className="text-content">
                    <h3>Shipping Information</h3>
                    <p>Standard delivery within 10 working days</p>
                    <p>Free shipping on all orders</p>
                  </div>
                </div>

                <div className="info-card">
                  <FaUndo className="info-icon" />
                  <div className="text-content">
                    <h3>Return Policy</h3>
                    <p>30-day easy return policy</p>
                    <p>Full refund on unused items</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        cartItems={cartItems}
        total={calculateTotal()}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Success Animation Overlay */}
      <div className="success-animation-overlay">
        <div className="success-animation-container">
          <div className="success-checkmark">
            <div className="check-icon">
              <span className="icon-line line-tip"></span>
              <span className="icon-line line-long"></span>
              <div className="icon-circle"></div>
              <div className="icon-fix"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
```

### Cart.css

```css
/* Main cart page container */
.cart-page {
  padding: 2rem; /* Add padding around the entire cart page */
  min-height: calc(
    100vh - 60px
  ); /* Set minimum height to viewport height minus header */
  background-color: var(
    --color-background
  ); /* Set background color from CSS variables */
  padding-top: 80px; /* Extra padding at top to account for fixed header */
}

/* Container to center and constrain cart width */
.cart-container {
  max-width: 1200px; /* Maximum width of cart content */
  margin: 0 auto; /* Center the container horizontally */
}

/* Cart page heading styles */
.cart-container h1 {
  margin-bottom: 2rem; /* Space below the heading */
  color: var(--color-primary-text); /* Heading text color from CSS variables */
}

/* Grid layout for cart content and sidebar */
.cart-content {
  display: grid;
  grid-template-columns: 1fr 350px; /* Two column layout - main content and 350px sidebar */
  gap: 2rem; /* Space between columns */
  align-items: start; /* Align items to top */
}

/* Small screen adjustments for total price */
@media (max-width: 280px) {
  #item-total {
    font-size: 0.7rem; /* Smaller font size on very small screens */
  }
}

/* Tablet and smaller screen adjustments */
@media (max-width: 768px) {
  /* Switch to single column layout */
  .cart-content {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }

  /* Adjust cart item layout */
  .cart-page-item {
    grid-template-columns: 1fr 1fr 1fr !important;
    gap: 1rem !important;
    padding: 1rem 0 !important;
  }

  /* Reduce container padding */
  .cart-container {
    padding: 0 0.5rem;
  }

  /* Adjust page padding */
  .cart-page {
    padding: 1rem;
    padding-top: 80px;
  }

  /* Reduce section padding */
  .cart-items-section,
  .order-summary {
    padding: 1rem;
  }

  /* Adjust cart item grid layout */
  .cart-page-item {
    grid-template-columns: 70px 1fr auto;
    gap: 0.5rem;
  }

  /* Reduce image size */
  .cart-page-item img {
    width: 70px;
    height: 70px;
  }

  /* Reduce text sizes */
  .item-details h3,
  .item-details .price {
    font-size: 0.9rem;
  }

  /* Adjust button sizes */
  .quantity-controls button {
    padding: 0.25rem;
    font-size: 0.8rem;
  }

  /* Adjust total price size */
  .item-total {
    font-size: 1rem;
  }

  /* Reduce button sizes */
  .checkout-button,
  .continue-shopping {
    padding: 0.5rem;
    font-size: 0.8rem;
  }

  /* Reduce heading sizes */
  .order-summary h2 {
    font-size: 1rem;
  }

  /* Adjust summary text sizes */
  .summary-row,
  .summary-total {
    font-size: 0.9rem;
  }

  /* Reduce info card heading size */
  .shipping-info .info-card h3 {
    font-size: 0.9rem;
  }
}

/* Mobile screen adjustments */
@media (max-width: 426px) {
  /* Handle horizontal overflow */
  #shopping-cart {
    overflow-x: hidden;
    padding: 0 clamp(0.2rem, 1vw, 0.3rem);
  }

  /* Single column responsive layout */
  #cart-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: clamp(0.1rem, 0.5vw, 0.2rem);
    width: 100%;
  }

  /* Responsive cart item layout */
  #cart-page-item {
    display: grid;
    grid-template-columns: clamp(50px, 15vw, 60px) 1fr auto;
    gap: clamp(0.1rem, 0.5vw, 0.2rem);
    width: 100%;
  }

  /* Responsive image sizing */
  #cart-page-item img {
    width: clamp(50px, 15vw, 60px);
    height: clamp(50px, 15vw, 60px);
  }

  /* Fluid typography for various elements */
  #item-details h3,
  #item-details .price {
    font-size: clamp(0.7rem, 2vw, 0.75rem);
  }

  #quantity-controls button {
    padding: clamp(0.1rem, 0.5vw, 0.15rem);
    font-size: clamp(0.6rem, 1.5vw, 0.65rem);
  }

  #item-total {
    font-size: clamp(0.8rem, 2vw, 0.85rem);
  }

  /* Responsive button styling */
  .checkout-button,
  .continue-shopping {
    padding: clamp(0.2rem, 1vw, 0.3rem);
    font-size: clamp(0.65rem, 1.5vw, 0.7rem);
    width: 100%;
  }

  /* Full width order summary */
  .order-summary {
    width: 100%;
  }

  /* Responsive text sizing */
  .order-summary h2 {
    font-size: clamp(0.8rem, 2vw, 0.85rem);
  }

  .summary-row,
  .summary-total,
  .shipping-info .info-card h3 {
    font-size: clamp(0.7rem, 1.5vw, 0.75rem);
  }

  /* Center empty cart message */
  .empty-cart-message {
    text-align: center;
    font-size: clamp(0.7rem, 1.5vw, 0.75rem);
  }

  /* Center success animation */
  .success-animation-overlay {
    justify-content: center;
    align-items: center;
  }
}

/* Cart items section styling */
.cart-items-section {
  background: var(--color-card-background);
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: var(--shadow-md);
  border: 1px solid #e4e6ef;
  height: fit-content;
}

/* Individual cart item styling */
.cart-page-item {
  display: grid;
  grid-template-columns: 120px 1fr auto;
  gap: 1.5rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--color-border);
}

/* Remove border from last item */
.cart-page-item:last-child {
  border-bottom: none;
}

/* Product image styling */
.cart-page-item img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
}

/* Product details text styling */
.item-details h3 {
  margin: 0 0 0.5rem 0;
  color: #3f4254;
}

.item-details .price {
  color: #a1a5be;
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

/* Quantity control buttons */
.quantity-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.quantity-controls button {
  background: none;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;
}

.quantity-controls button:hover {
  background-color: var(--color-warm-beige);
}

/* Item total price */
.item-total {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--color-primary-text);
}

/* Cart sidebar layout */
.cart-sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Order summary section */
.order-summary {
  background: var(--color-background);
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: var(--shadow-md);
  border: 1px solid #e4e6ef;
}

/* Order summary heading */
.order-summary h2 {
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid var(--color-border);
}

/* Summary row layout */
.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.5rem 0;
}

/* Icon and text alignment */
.summary-row .icon-text {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Summary icons */
.summary-row svg {
  width: 20px;
  height: 20px;
}

/* Total amount row */
.summary-total {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

/* Checkout button styling */
.checkout-button {
  width: 100%;
  padding: 1rem;
  background-color: var(--color-primary-button);
  border: none;
  border-radius: 4px;
  color: var(--color-card-background);
  font-weight: 600;
  font-size: 1rem;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.3s ease;
}

.checkout-button:hover {
  background-color: var(--color-primary-button-hover);
}

/* Continue shopping button */
.continue-shopping {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 1rem;
  margin-top: 1rem;
  text-align: center;
  background-color: var(--color-background);
  border: 2px solid var(--color-primary-text);
  border-radius: 4px;
  color: var(--color-primary-text);
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;
}

.continue-shopping:hover {
  background-color: var(--color-primary-text);
  color: var(--color-background);
}

/* Shipping info section */
.shipping-info {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Info card layout */
.info-card {
  display: grid;
  align-items: start;
  justify-content: start;
  padding: 0.5rem 0;
}

/* Border between info cards */
.info-card:not(:last-child) {
  border-bottom: 1px solid #eee;
}

/* Info icon styling */
.info-icon {
  font-size: 1.5rem;
  color: #333;
  flex-shrink: 0;
}

/* Info card layout adjustments */
.info-card {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

/* Info card text content */
.info-card .text-content {
  flex: 1;
}

.info-card h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  color: #333;
}

.info-card p {
  margin: 0.25rem 0;
  color: #666;
  font-size: 0.9rem;
}

/* Product link styling */
.product-link {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

/* Hover effects */
.product-link:hover h3 {
  color: var(--color-primary-button);
  transition: color var(--transition-normal);
}

.product-link img:hover {
  opacity: 0.9;
}

/* Success animation overlay */
.success-animation-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease-in-out;
}

/* Show animation when success class is added */
body.show-success-animation .success-animation-overlay {
  opacity: 1;
  visibility: visible;
}

/* Success checkmark animation */
.success-checkmark {
  width: 80px;
  height: 80px;
  position: relative;
  transform: scale(0);
}

body.show-success-animation .success-checkmark {
  animation: scale-in 0.3s ease-out forwards;
}

/* Checkmark icon styling */
.check-icon {
  width: 80px;
  height: 80px;
  position: relative;
  border-radius: 50%;
  box-sizing: content-box;
  border: 4px solid var(--color-deep-emerald);
}

/* Checkmark before and after elements */
.check-icon::before {
  top: 3px;
  left: -2px;
  width: 30px;
  transform-origin: 100% 50%;
  border-radius: 100px 0 0 100px;
}

.check-icon::after {
  top: 0;
  left: 30px;
  width: 60px;
  transform-origin: 0 50%;
  border-radius: 0 100px 100px 0;
  animation: rotate-circle 4.25s ease-in;
}

/* Checkmark lines */
.icon-line {
  height: 5px;
  background-color: var(--color-deep-emerald);
  display: block;
  border-radius: 2px;
  position: absolute;
  z-index: 10;
}

/* Checkmark tip line */
.icon-line.line-tip {
  top: 46px;
  left: 14px;
  width: 25px;
  transform: rotate(45deg);
  animation: icon-line-tip 0.75s;
}

/* Checkmark long line */
.icon-line.line-long {
  top: 38px;
  right: 8px;
  width: 47px;
  transform: rotate(-45deg);
  animation: icon-line-long 0.75s;
}

/* Checkmark circle */
.icon-circle {
  top: -4px;
  left: -4px;
  z-index: 10;
  width: 80px;
  height: 80px;
}
```

### CartDrawer.js

```js
/**
 * CartDrawer Component
 * A sliding drawer component that displays the shopping cart contents and checkout options
 *
 * Key Features:
 * - Shows/hides cart drawer overlay
 * - Displays list of cart items with images, details and quantity controls
 * - Allows navigation to product pages
 * - Shows cart total and checkout buttons
 * - Handles checkout flow with success animation
 */

import React, { useState } from "react";
import { useCart } from "../../Context/CartContext"; // Import cart context hook
import { FaTimes, FaPlus, FaMinus } from "react-icons/fa"; // Import icons
import { Link, useNavigate } from "react-router-dom"; // Import routing components
import "../../styles/components/cartdrawer.css";
import CheckoutModal from "../Checkout/CheckoutModal";

const CartDrawer = () => {
  // Extract cart state and methods from context
  const {
    isCartOpen, // Boolean to control drawer visibility
    setIsCartOpen, // Function to toggle drawer
    cartItems, // Array of items in cart
    addToCart, // Function to increment item quantity
    removeFromCart, // Function to decrement item quantity
    calculateTotal, // Function to sum cart total
    clearCart, // Function to empty cart
  } = useCart();

  // Local state for checkout modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  /**
   * Opens the checkout modal when checkout button is clicked
   */
  const handleCheckoutClick = () => {
    setIsModalOpen(true);
  };

  /**
   * Handles successful order completion
   * 1. Closes modal and cart drawer
   * 2. Clears cart items
   * 3. Shows success animation
   * 4. Redirects to thank you page
   */
  const handleOrderSuccess = () => {
    setIsModalOpen(false);
    setIsCartOpen(false);
    clearCart();

    document.body.classList.add("show-success-animation");

    setTimeout(() => {
      document.body.classList.remove("show-success-animation");
      navigate("/thank-you");
    }, 2000);
  };

  return (
    <>
      {/* Semi-transparent overlay behind drawer */}
      <div
        className={`cart-overlay ${isCartOpen ? "active" : ""}`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Main cart drawer panel */}
      <div className={`cart-drawer ${isCartOpen ? "active" : ""}`}>
        {/* Drawer header with title and close button */}
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-button" onClick={() => setIsCartOpen(false)}>
            <FaTimes />
          </button>
        </div>

        {/* Cart items list section */}
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p className="empty-cart">Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                {/* Product image with link */}
                <Link
                  to={`/product/${item.id}`}
                  className="product-link"
                  onClick={() => setIsCartOpen(false)}
                >
                  <img src={item.image} alt={item.name} />
                </Link>

                {/* Product details section */}
                <div className="item-details">
                  <Link
                    to={`/product/${item.id}`}
                    className="product-link"
                    onClick={() => setIsCartOpen(false)}
                  >
                    <h3>{item.name}</h3>
                    <p className="price">${item.salePrice || item.price}</p>
                  </Link>

                  {/* Quantity adjustment controls */}
                  <div className="quantity-controls">
                    <button onClick={() => removeFromCart(item.id)}>
                      <FaMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => addToCart(item)}>
                      <FaPlus />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart footer with total and action buttons */}
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="total">
              <span>Total:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
            <Link
              to="/cart"
              className="view-cart-button"
              onClick={() => setIsCartOpen(false)}
            >
              View Cart
            </Link>
            <button className="checkout-button" onClick={handleCheckoutClick}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>

      {/* Checkout modal component */}
      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        cartItems={cartItems}
        total={calculateTotal()}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Success animation overlay */}
      <div className="success-animation-overlay">
        <div className="success-animation-container">
          <div className="success-checkmark">
            <div className="check-icon">
              <span className="icon-line line-tip"></span>
              <span className="icon-line line-long"></span>
              <div className="icon-circle"></div>
              <div className="icon-fix"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
```

### CartDrawer.css

```css
/* Cart overlay that darkens the background when cart is open */
.cart-overlay {
  position: fixed; /* Fixed position covers entire viewport */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black background */
  opacity: 0; /* Hidden by default */
  visibility: hidden;
  transition: all 0.3s ease; /* Smooth transition for showing/hiding */
  z-index: 998; /* High z-index but below cart drawer */
}

/* When cart overlay is active */
.cart-overlay.active {
  opacity: 1;
  visibility: visible;
}

/* Main cart drawer container */
.cart-drawer {
  position: fixed;
  top: 0;
  right: -400px; /* Hidden off screen by default */
  width: 400px;
  height: 100%;
  background-color: var(--color-card-background);
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1); /* Shadow on left side */
  transition: right 0.3s ease; /* Smooth sliding animation */
  z-index: 999; /* Above overlay */
  display: flex;
  flex-direction: column;
}

/* When cart drawer is active */
.cart-drawer.active {
  right: 0; /* Slides into view */
}

/* Header section of cart drawer */
.cart-header {
  padding: 1rem;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Close button in header */
.close-button {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: var(--color-primary-text);
}

/* Scrollable container for cart items */
.cart-items {
  flex: 1; /* Takes up remaining space */
  overflow-y: auto; /* Scrollable when content overflows */
  padding: 1rem;
}

/* Individual cart item styling */
.cart-item {
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-border);
}

/* Product image in cart item */
.cart-item img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}

/* Container for item details */
.item-details {
  flex: 1; /* Takes up remaining space */
}

/* Product name styling */
.item-details h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  color: var(--color-primary-text);
}

/* Quantity adjustment controls */
.quantity-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
}

/* Quantity adjustment buttons */
.quantity-controls button {
  background: none;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
}

/* Hover state for quantity buttons */
.quantity-controls button:hover {
  background-color: var(--color-secondary-button);
}

/* Footer section containing total and checkout */
.cart-footer {
  padding: 1rem;
  border-top: 1px solid var(--color-border);
}

/* Total price display */
.total {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-weight: bold;
}

/* Checkout button styling */
.checkout-button {
  width: 100%;
  padding: 1rem;
  background-color: var(--color-primary-button);
  border: none;
  border-radius: 4px;
  color: var(--color-card-background);
  font-weight: 600;
  font-size: 1rem;
  font-family: inherit;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

/* Hover state for checkout button */
.checkout-button:hover {
  background-color: var(--color-primary-button-hover);
  color: var(--color-card-background);
}

/* Empty cart message */
.empty-cart {
  text-align: center;
  color: var(--color-primary-text);
  margin-top: 2rem;
}

/* Mobile responsiveness */
@media (max-width: 480px) {
  .cart-drawer {
    width: 100%; /* Full width on mobile */
    right: -100%;
  }
}

/* View cart button styling */
.view-cart-button {
  display: block;
  width: 100%;
  padding: 1rem;
  background-color: var(--color-card-background);
  border: 2px solid var(--color-primary-button);
  border-radius: 4px;
  color: var(--color-primary-text);
  font-weight: 600;
  font-size: 1rem;
  font-family: inherit;
  text-align: center;
  text-decoration: none;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

/* Hover state for view cart button */
.view-cart-button:hover {
  background-color: var(--color-primary-button);
  color: var(--color-card-background);
}

/* Success animation overlay */
.success-animation-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease-in-out;
}

/* Show success animation when body has class */
body.show-success-animation .success-animation-overlay {
  opacity: 1;
  visibility: visible;
}

/* Success checkmark container */
.success-checkmark {
  width: 80px;
  height: 80px;
  position: relative;
  transform: scale(0);
}

/* Animation for checkmark appearance */
body.show-success-animation .success-checkmark {
  animation: scale-in 0.3s ease-out forwards;
}

/* Checkmark icon styling */
.check-icon {
  width: 80px;
  height: 80px;
  position: relative;
  border-radius: 50%;
  box-sizing: content-box;
  border: 4px solid var(--color-primary-button);
}

/* Before pseudo-element for checkmark */
.check-icon::before {
  top: 3px;
  left: -2px;
  width: 30px;
  transform-origin: 100% 50%;
  border-radius: 100px 0 0 100px;
}

/* After pseudo-element for checkmark */
.check-icon::after {
  top: 0;
  left: 30px;
  width: 60px;
  transform-origin: 0 50%;
  border-radius: 0 100px 100px 0;
  animation: rotate-circle 4.25s ease-in;
}

/* Checkmark line base styling */
.icon-line {
  height: 5px;
  background-color: var(--color-primary-button);
  display: block;
  border-radius: 2px;
  position: absolute;
  z-index: 10;
}

/* Tip of checkmark */
.icon-line.line-tip {
  top: 46px;
  left: 14px;
  width: 25px;
  transform: rotate(45deg);
  animation: icon-line-tip 0.75s;
}

/* Long part of checkmark */
.icon-line.line-long {
  top: 38px;
  right: 8px;
  width: 47px;
  transform: rotate(-45deg);
  animation: icon-line-long 0.75s;
}

/* Circle around checkmark */
.icon-circle {
  top: -4px;
  left: -4px;
  z-index: 10;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: absolute;
  box-sizing: content-box;
  border: 4px solid var(--color-secondary-button);
}

/* Fix for checkmark animation */
.icon-fix {
  top: 8px;
  width: 5px;
  left: 26px;
  z-index: 1;
  height: 85px;
  position: absolute;
  transform: rotate(-45deg);
  background-color: white;
}

/* Scale in animation keyframes */
@keyframes scale-in {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

/* Animation for checkmark tip */
@keyframes icon-line-tip {
  0% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  54% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  70% {
    width: 50px;
    left: -8px;
    top: 37px;
  }
  84% {
    width: 17px;
    left: 21px;
    top: 48px;
  }
  100% {
    width: 25px;
    left: 14px;
    top: 46px;
  }
}

/* Animation for checkmark long line */
@keyframes icon-line-long {
  0% {
    width: 0;
    right: 46px;
    top: 54px;
  }
  65% {
    width: 0;
    right: 46px;
    top: 54px;
  }
  84% {
    width: 55px;
    right: 0px;
    top: 35px;
  }
  100% {
    width: 47px;
    right: 8px;
    top: 38px;
  }
}
```
