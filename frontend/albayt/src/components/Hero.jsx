import { Link } from "react-router-dom";
import heroBackground from "../assets/images/heroBackground.png";

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
          <a href="#about-section" className="main-btn">
            EXPLORE MORE
          </a>

          <Link to="/book" className="main-btn light-btn">
            BOOK A CONSULTATION
          </Link>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-text">SCROLL</div>

          <div className="scroll-arrow">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFFEFE"
              strokeWidth="2"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;