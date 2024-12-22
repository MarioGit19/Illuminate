import React, { useState } from "react";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { lampProducts } from "../../data/data";
import "../../styles/components/navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const results = lampProducts.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
    setSearchResults(results);
    setShowResults(true);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="search-container">
          <div className="search-input-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearch}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
              onFocus={() => searchQuery && setShowResults(true)}
            />
          </div>
          {showResults && searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map((product) => (
                <div key={product.id} className="search-result-item">
                  <img src={product.image} alt={product.name} />
                  <div className="product-info">
                    <h4>{product.name}</h4>
                    <p>${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="logo">
          <div className="logo-full"></div>
          <div className="logo-initials"></div>
        </div>

        <ul className={`nav-menu ${isOpen ? "active" : ""}`}>
          <li className="nav-item">
            <a href="/" className="nav-link">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="/about" className="nav-link">
              About
            </a>
          </li>
          <li className="nav-item">
            <a href="/products" className="nav-link">
              Products
            </a>
          </li>
        </ul>

        <div className="nav-right">
          <div className="cart-icon-container">
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
  );
};

export default Navbar;
