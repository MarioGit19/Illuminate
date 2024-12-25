import React from "react";
import "../../styles/about.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>About Us</h1>
        <div className="about-grid">
          <div className="about-text">
            <h2>20 Years of Excellence</h2>
            <p>
              For two decades, we've been committed to delivering exceptional
              quality and service to our customers worldwide. Our journey began
              in 2004, and since then, we've maintained our commitment to
              excellence.
            </p>
          </div>
          <div className="about-features">
            <div className="feature">
              <h3>Lifetime Guarantee</h3>
              <p>
                We stand behind our products with a comprehensive lifetime
                guarantee.
              </p>
            </div>
            <div className="feature">
              <h3>Global Shipping</h3>
              <p>
                We deliver our premium products to customers around the world.
              </p>
            </div>
            <div className="feature">
              <h3>Customer First</h3>
              <p>
                Your satisfaction is our top priority, with dedicated support at
                every step.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
