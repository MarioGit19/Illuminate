import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { lampProducts } from "../../data/data";

const NavbarSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

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

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearch}
          onBlur={() => setTimeout(handleClose, 200)}
          onFocus={() => searchQuery && setShowResults(true)}
        />
      </div>
      {showResults && searchResults.length > 0 && (
        <div className={`search-results ${isClosing ? "closing" : ""}`}>
          {searchResults.map((product) => (
            <div key={product.id} className="search-result-item">
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
