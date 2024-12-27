import React, { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { lampProducts } from "../../data/data";
import { useNavigate } from "react-router-dom";

const NavbarSearch = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsExpanded(false);
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleExpand = () => {
    setIsExpanded(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowResults(false);
      setIsClosing(false);
    }, 200); // Match this with animation duration
  };

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
    setSearchResults(results);
    setShowResults(true);
  };

  const handleProductClick = (productId) => {
    handleClose();
    navigate(`/product/${productId}`);
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
          {searchResults.map((product) => (
            <div
              key={product.id}
              className="search-result-item"
              onClick={() => handleProductClick(product.id)}
              role="button"
              tabIndex={0}
            >
              <div className="image-container">
                <img src={product.image} alt={product.name} />
                {product.onSale && <div className="sale-ribbon">SALE</div>}
              </div>
              <div className="product-info">
                <h4>{product.name}</h4>
                <div className="price-container">
                  {product.onSale ? (
                    <>
                      <span className="sale-price">${product.salePrice}</span>
                      <span className="original-price">${product.price}</span>
                    </>
                  ) : (
                    <span className="regular-price">${product.price}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavbarSearch;
