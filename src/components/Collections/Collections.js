import React, { useState, useRef, useEffect } from "react";
import { FaShoppingCart, FaFilter, FaTimes } from "react-icons/fa";
import { useCart } from "../../Context/CartContext";
import { lampCategories } from "../../data/data";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/components/collections.css";
import { useNavigate } from "react-router-dom";

const Collections = ({ products }) => {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { addToCart } = useCart();
  const filterRef = useRef(null);
  const navigate = useNavigate();
  const [selectedPriceRange, setSelectedPriceRange] = useState({
    min: 0,
    max: Math.ceil(Math.max(...products.map((p) => p.price))),
  });

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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Optional: scroll to top when changing pages
  };

  // Filter products based on selected categories
  const filteredProducts = products.filter((product) => {
    const matchesCategories =
      selectedCategories.length === 0 ||
      selectedCategories.every((cat) => product.categories?.includes(cat));

    const price = product.onSale ? product.salePrice : product.price;
    const matchesPrice =
      price >= selectedPriceRange.min && price <= selectedPriceRange.max;

    return matchesCategories && matchesPrice;
  });

  // Pagination logic
  const productsPerPage = 6; // Changed to 9 for 3x3 grid
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1); // Reset to first page when filtering
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
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

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleFilterToggle = (e) => {
    // Check if clicking the filter tab (the ::after element)
    const isFilterTab =
      e.target === filterRef.current?.querySelector(".filter-sidebar::after");
    if (isFilterTab) {
      setIsFilterOpen(!isFilterOpen);
    }
  };

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

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    if (e.target.name === "min") {
      setSelectedPriceRange((prev) => ({
        ...prev,
        min: Math.min(value, prev.max - 1),
      }));
    } else {
      setSelectedPriceRange((prev) => ({
        ...prev,
        max: Math.max(value, prev.min + 1),
      }));
    }
  };

  // Calculate the percentage for the background
  const getBackgroundSize = (value, min, max) => {
    return ((value - min) * 100) / (max - min) + "% 100%";
  };

  return (
    <section className="collections">
      <h2>Our Collection</h2>

      {/* Mobile filter button */}
      <button className="filter-button" onClick={toggleFilter}>
        <FaFilter />
      </button>

      {/* Add overlay */}
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
          <input
            type="range"
            name="min"
            className="price-slider"
            min={0}
            max={selectedPriceRange.max}
            value={selectedPriceRange.min}
            onChange={handlePriceChange}
            style={{
              background: `linear-gradient(to right, var(--color-border) ${getBackgroundSize(
                selectedPriceRange.min,
                0,
                selectedPriceRange.max
              )}, transparent 0%)`,
            }}
          />
          <input
            type="range"
            name="max"
            className="price-slider"
            min={selectedPriceRange.min}
            max={Math.ceil(Math.max(...products.map((p) => p.price)))}
            value={selectedPriceRange.max}
            onChange={handlePriceChange}
            style={{
              background: `linear-gradient(to right, var(--color-accent-gold) ${getBackgroundSize(
                selectedPriceRange.max,
                0,
                selectedPriceRange.max
              )}, var(--color-border) 0%)`,
            }}
          />
        </div>
      </div>

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

      {/* Pagination */}
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
