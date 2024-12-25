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

  //   useEffect(() => {
  //     console.log("Hovered product:", hoveredProduct);
  //   }, [hoveredProduct]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Optional: scroll to top when changing pages
  };

  // Filter products based on selected categories
  const filteredProducts = products.filter(
    (product) =>
      selectedCategories.length === 0 ||
      product.categories?.some((cat) => selectedCategories.includes(cat))
  );

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
      </div>

      <div className="collections-grid">
        {currentProducts.map((product) => (
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
                  className="add-to-cart-button"
                  onClick={(e) => handleAddToCart(e, product)}
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
        ))}
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
