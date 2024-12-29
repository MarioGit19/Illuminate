import React from "react";
import "./ThankYouPage.css";
import { useNavigate } from "react-router-dom";

const ThankYouPage = () => {
  const navigate = useNavigate();
  const rawOrderDetails = localStorage.getItem("lastOrder");
  const orderDetails = rawOrderDetails
    ? JSON.parse(rawOrderDetails, (key, value) => {
        if (key === "estimatedDelivery") return new Date(value);
        return value;
      })
    : null;

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

  const { formData, cartItems, total, estimatedDelivery, orderId } =
    orderDetails;

  return (
    <div className="thank-you-container">
      <div className="thank-you-content">
        <div className="success-header">
          <div className="success-icon">✓</div>
          <h1>Thank You for Your Order!</h1>
          <p className="order-confirmation">Order #{orderId}</p>
        </div>

        <div className="confirmation-details">
          <div className="info-section shipping-info">
            <h2>Shipping Information</h2>
            <div className="shipping-info-card">
              <div className="shipping-details">
                <p className="shipping-name">
                  {formData.firstName} {formData.lastName}
                </p>
                <p className="shipping-address">{formData.address}</p>
                <p className="shipping-city-zip">
                  {formData.city}, {formData.zipCode}
                </p>
              </div>
              <div className="contact-details">
                <p>
                  <span>Email:</span> {formData.email}
                </p>
                <p>
                  <span>Phone:</span> {formData.phone}
                </p>
              </div>
              <div className="delivery-date">
                <p>
                  <span>Estimated Delivery:</span>
                </p>
                <p className="date">{estimatedDelivery.toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="info-section order-details">
            <h2>Order Details</h2>
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
