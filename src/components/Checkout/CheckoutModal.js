import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import "./CheckoutModal.css";
import { useNavigate } from "react-router-dom";

const CheckoutModal = ({ isOpen, onClose, cartItems, total }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
  });

  // Add this state for estimated delivery
  const [estimatedDelivery] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 10);
    return date;
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate a random order ID
    const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();

    // Create order details object with all required fields
    const orderDetails = {
      orderId,
      formData: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        zipCode: formData.zipCode,
      },
      cartItems,
      total,
      estimatedDelivery,
    };

    // Store order details
    localStorage.setItem("lastOrder", JSON.stringify(orderDetails));

    // Close modal and navigate
    onClose();
    navigate("/thank-you");
  };

  const handleOverlayClick = (e) => {
    // Close only if clicking the overlay itself, not its children
    if (e.target.className === "modal-overlay") {
      onClose();
    }
  };

  // Helper function to format prices
  const formatPrice = (price) => {
    return Number(price).toFixed(2);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="modal-header">
          <h2>Checkout</h2>
        </div>

        <div className="modal-body">
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="order-items">
              {cartItems.map((item) => (
                <div key={item.id} className="order-item">
                  <img src={item.image} alt={item.name} />
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p>Quantity: {item.quantity}</p>
                    <p>${item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-totals">
              <div className="total-row">
                <span>Subtotal:</span>
                <span>${formatPrice(total)}</span>
              </div>
              <div className="total-row">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="total-row total">
                <span>Total:</span>
                <span>${formatPrice(total)}</span>
              </div>
              <div className="delivery-estimate">
                Estimated Delivery: {estimatedDelivery.toLocaleDateString()}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="checkout-form">
            <h3>Shipping Details</h3>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
                <label htmlFor="firstName">First Name</label>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
                <label htmlFor="lastName">Last Name</label>
              </div>
            </div>

            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder=" "
                required
              />
              <label htmlFor="email">Email</label>
            </div>

            <div className="form-group">
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder=" "
                required
              />
              <label htmlFor="phone">Phone Number</label>
            </div>

            <div className="form-group">
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder=" "
                required
              />
              <label htmlFor="address">Address</label>
            </div>

            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
                <label htmlFor="city">City</label>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
                <label htmlFor="zipCode">ZIP Code</label>
              </div>
            </div>

            <button type="submit" className="submit-button">
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
