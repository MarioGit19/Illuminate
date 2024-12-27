import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import NavbarSearch from "./NavbarSearch";
import "../../styles/components/navbar.css";
import { useCart } from "../../Context/CartContext";
import CartDrawer from "../CartDrawer/CartDrawer";
// import Collections from "../Collections/Collections";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItemsCount, setIsCartOpen } = useCart();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className="navbar">
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

export default Navbar;
