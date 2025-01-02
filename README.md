### code snippets and notes.

### Hero component

```jsx
const Hero = ({ startAnimation }) => {
  const navigate = useNavigate();
### click handler for the catalogue button navigation.
  const handleCatalogueClick = () => {
    navigate("/products");
  };
  ### simple return of the hero background image, text and button.
  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(https://mass-light.ba/assets/photos/product/original/190830-scaled.jpg?v1735316133)`,
      }}
    >
      <div className="hero-content">
        <h1 className={startAnimation ? "animate-text" : ""}>
          Step into the light with us
        </h1>
        <button className="catalogue-btn" onClick={handleCatalogueClick}>
          Catalogue
        </button>
      </div>
    </section>
  );
};
```

### Hero css

```css
//setting the hero height to 100vh and width to 100%
.hero {
  height: 100vh;
  width: 100%;
  background-image: url("https://mass-light.ba/assets/photos/product/original/190830-scaled.jpg?v1735316133");
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
  /* background-attachment: fixed; */
  position: relative;
  overflow: hidden;
}

//setting the hero before element to absolute and setting the top, left, width and height to 100%
.hero::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60%;
  /* background-color: rgba(0, 0, 0, 0.2); */
  background-color: var(--color-background);
  backdrop-filter: blur(1px);
  z-index: -1;
}
The ::before pseudo-element in CSS is used to insert content before the content of a selected element. It allows you to add decorative elements or additional content without modifying the HTML structure. This pseudo-element is styled using CSS properties and is often used for adding icons, labels, or visual effects, enhancing the design while keeping the HTML clean. The content property is essential for displaying anything with ::before.

//setting the hero content to absolute and setting the top, left, transform and text align to center
.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 5rem;
  position: absolute;
  top: 92%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: var(--color-primary-text);
  z-index: 1;
}

//setting the animate text to font size 3rem, margin bottom 2rem, text shadow, opacity 0 and animation to fadeIn 2s ease-in forwards
.animate-text {
  font-size: 3rem;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  opacity: 0;
  animation: fadeIn 2s ease-in forwards;
}

//media query for mobile devices
@media screen and (max-width: 768px) {
  .animate-text {
    font-size: 2rem;
  }
}

//setting the catalogue button to padding 1rem 2rem, font size 1.2rem, background color primary button, color card background, border none, border radius 5px, cursor pointer and transition all 0.3s ease
.catalogue-btn {
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background-color: var(--color-primary-button);
  color: var(--color-card-background);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

//setting the catalogue button hover to background color primary button hover, transform translateY -2px, box shadow md and transition all 0.3s ease
.catalogue-btn:hover {
  background-color: var(--color-primary-button-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

//setting the fadeIn animation to opacity 0, transform translateY 20px and transition all 0.3s ease
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

//setting the hero after element to absolute and setting the bottom, left, transform and width to 80%
.hero::after {
  content: "";
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 150px;
  /* background: radial-gradient(
    ellipse at center,
    rgba(255, 255, 255, 0.8) 0%,
    rgba(255, 255, 255, 0) 70%
  ); */
  z-index: 0;
  pointer-events: none;
}

// Add media query for mobile devices
@media screen and (max-width: 768px) {
  .hero-content {
    top: 80%;
  }
  .hero {
    height: 60vh;
  }
}
```
