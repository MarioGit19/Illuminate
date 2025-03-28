import React, { useState } from "react";
import { useCart } from "../../Context/CartContext";
import { FaTimes, FaPlus, FaMinus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/components/cartdrawer.css";
import CheckoutModal from "../Checkout/CheckoutModal";

const CartDrawer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addToCart,
    removeFromCart,
    calculateTotal,
    clearCart,
  } = useCart();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    setIsModalOpen(true);
  };

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
      <div
        className={`cart-overlay ${isCartOpen ? "active" : ""}`}
        onClick={() => setIsCartOpen(false)}
      />
      <div className={`cart-drawer ${isCartOpen ? "active" : ""}`}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-button" onClick={() => setIsCartOpen(false)}>
            <FaTimes />
          </button>
        </div>

        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p className="empty-cart">Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <Link
                  to={`/product/${item.id}`}
                  className="product-link"
                  onClick={() => setIsCartOpen(false)}
                >
                  <img src={item.image} alt={item.name} />
                </Link>
                <div className="item-details">
                  <Link
                    to={`/product/${item.id}`}
                    className="product-link"
                    onClick={() => setIsCartOpen(false)}
                  >
                    <h3>{item.name}</h3>
                    <p className="price">${item.salePrice || item.price}</p>
                  </Link>
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

      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        cartItems={cartItems}
        total={calculateTotal()}
        onOrderSuccess={handleOrderSuccess}
      />

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
