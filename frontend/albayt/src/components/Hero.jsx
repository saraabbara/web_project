import { Link } from "react-router-dom";
import heroBackground from "../assets/images/heroBackground.png";
import scrollArrow from "../assets/images/scroll-arrow.svg";

function Hero() {
  return (
    <section className="hero" id="about">
      <img
        src={heroBackground}
        alt="Luxury interior"
        className="hero-background"
      />

      <div className="hero-content">
        <h1 className="hero-title">
          The Art of
          <br />
          Luxurious Living
        </h1>

        <p className="hero-text">
          Architecture, interiors and bespoke furniture — crafted from the first
          concept to the final finish.
        </p>

        <div className="hero-buttons">
          {/* Scrolls to the About section on the same page */}
          <a href="#about-section" className="main-btn">
            EXPLORE MORE
          </a>
          {/* Moves the user to the booking page */}
          <Link to="/book" className="main-btn light-btn">
            BOOK A CONSULTATION
          </Link>
        </div>

        {/* just scroll down arrow for design purposes */}
        <div className="scroll-indicator">
          <div className="scroll-text">SCROLL</div>

          <div className="scroll-arrow">
            <img
              src={scrollArrow}
              alt="Scroll down"
              className="scroll-arrow-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
