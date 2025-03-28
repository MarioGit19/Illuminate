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

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, calculateTotal, clearCart } =
    useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    setIsModalOpen(true);
  };

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
            <div className="cart-items-section" id="cart-items-section">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="cart-page-item"
                  id="cart-page-item"
                >
                  <Link to={`/product/${item.id}`} className="product-link">
                    <img src={item.image} alt={item.name} />
                  </Link>
                  <div className="item-details" id="item-details">
                    <Link to={`/product/${item.id}`} className="product-link">
                      <h3>{item.name}</h3>
                      <p className="price">
                        ${(item.salePrice || item.price).toFixed(2)}
                      </p>
                    </Link>
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
                  <div className="item-total" id="item-total">
                    $
                    {((item.salePrice || item.price) * item.quantity).toFixed(
                      2
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-sidebar">
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
    </div>
  );
};

export default Cart;
