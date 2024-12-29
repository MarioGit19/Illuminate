import React, { useEffect } from "react";
import "../../styles/about.css";

const About = () => {
  useEffect(() => {
    const countElement = document.querySelector(".count");
    const target = parseInt(countElement.dataset.target);
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16);
    let current = 0;

    const updateCount = () => {
      current += step;
      if (current < target) {
        countElement.textContent = Math.floor(current).toLocaleString();
        requestAnimationFrame(updateCount);
      } else {
        countElement.textContent = target.toLocaleString();
      }
    };

    updateCount(); // Start the count animation on load
  }, []);

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
            <img
              src="https://img.freepik.com/premium-vector/money-back-guarantee-free-shipping-trust-badges-trust-badges-secure-ordering-easy-returns_526569-803.jpg?w=2000"
              alt="Trust badges and guarantees"
            />
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
            <div className="customers">
              <h3>Satisfied Customers</h3>
              <div className="counter">
                <span className="count" data-target="100000">
                  0
                </span>
                +
              </div>
              <style jsx>{`
                .counter {
                  font-size: 2rem;
                  font-weight: bold;
                  color: var(--color-primary-text);
                }

                .count {
                  animation: countUp 2s ease-out forwards;
                }

                @keyframes countUp {
                  from {
                    content: "0";
                  }
                  to {
                    content: "100000";
                  }
                }
              `}</style>
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                  const countElement = document.querySelector('.count');
                  const target = parseInt(countElement.dataset.target);
                  const duration = 2000;
                  const step = target / (duration / 16);
                  let current = 0;
                  
                  const updateCount = () => {
                    current += step;
                    if(current < target) {
                      countElement.textContent = Math.floor(current).toLocaleString();
                      requestAnimationFrame(updateCount);
                    } else {
                      countElement.textContent = target.toLocaleString();
                    }
                  };
                  
                  const observer = new IntersectionObserver((entries) => {
                    if(entries[0].isIntersecting) {
                      updateCount();
                      observer.disconnect();
                    }
                  });
                  
                  observer.observe(countElement);
                `,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
