import React from "react";
import { useNavigate } from "react-router-dom";
import Star from "../assets/images/star.png";
import Vintage from "../assets/images/vintage.png";
import Industrial from "../assets/images/industrial.png";
import Arab from "../assets/images/arab.png";

function Book3({ bookingData, setBookingData }) {
  const navigate = useNavigate();

  const selectStyle = (style) => {
    setBookingData({
      ...bookingData,
      style: style,
    });
  };

  return (
    <main className="book-page">
      <section className="book-hero">
        <p className="book-label">Book</p>

        <h1 className="book-title">Book a Consultation</h1>

        <p className="book-description">
          Tell us about your space. A designer will be in touch within 24 hours.
        </p>
      </section>

      <section className="book-progress-section">
        <div className="book-progress-text">
          <span className="book-progress-step">STEP 3 OF 5</span>
          <span className="book-progress-title">STYLE</span>
        </div>

        <div className="book-progress-bar">
          <div className="book-progress-fill book3-progress-fill"></div>
        </div>
      </section>

      <section className="book-card book3-card">
        <h2 className="book-card-title">Which style are you looking for?</h2>

        <div className="book3-style-grid">
          {[
            "Modern",
            "Classic",
            "Vintage",
            "Minimal",
            "Arabesque",
            "Industrial",
          ].map((style) => (
            <button
              key={style}
              type="button"
              className={`book3-style-card ${
                bookingData.style === style ? "book3-style-card-selected" : ""
              }`}
              onClick={() => selectStyle(style)}
            >
              {style === "Modern" && (
                <div className="book3-icon book3-square-icon"></div>
              )}

              {style === "Classic" && (
                <div className="book3-icon book3-star-icon">
                  {" "}
                  <img src={Star} alt="By Room" className="book2-icon-img" />
                </div>
              )}

              {style === "Vintage" && (
                <div className="book3-icon book3-vintage-icon">
                  {" "}
                  <img src={Vintage} alt="Vintage" className="book2-icon-img" />
                </div>
              )}

              {style === "Minimal" && (
                <div className="book3-icon book3-line-icon"></div>
              )}

              {style === "Arabesque" && (
                <div className="book3-icon book3-lotus-icon">
                  {" "}
                  <img src={Arab} alt="Arabesque" className="book2-icon-img" />
                </div>
              )}

              {style === "Industrial" && (
                <div className="book3-icon book3-tile-icon">
                  {" "}
                  <img
                    src={Industrial}
                    alt="Industrial"
                    className="book2-icon-img"
                  />
                </div>
              )}

              <h3>{style}</h3>
            </button>
          ))}
        </div>

        <div className="book-buttons book3-buttons">
          <button
            type="button"
            className="book-back-btn"
            onClick={() => navigate("/book2")}
          >
            BACK
          </button>

          <button
            type="button"
            className="main-btn book-continue-btn"
            onClick={() => navigate("/book4")}
          >
            CONTINUE
          </button>
        </div>
      </section>
    </main>
  );
}

export default Book3;
