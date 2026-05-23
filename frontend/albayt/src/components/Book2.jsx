import React from "react";
import { useNavigate } from "react-router-dom";
import House from "../assets/images/house.png";
import Room from "../assets/images/room.png";

function Book2({ bookingData, setBookingData }) {
  const navigate = useNavigate();

  const selectPlan = (plan) => {
    setBookingData({
      ...bookingData,
      plan: plan,
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
          <span className="book-progress-step">STEP 2 OF 5</span>
          <span className="book-progress-title">SCOPE</span>
        </div>

        <div className="book-progress-bar">
          <div className="book-progress-fill book2-progress-fill"></div>
        </div>
      </section>

      <section className="book-card book2-card">
        <h2 className="book-card-title">Choose your plan</h2>

        <div className="book2-plan-wrapper">
          <button
            type="button"
            className={`book2-plan-card ${
              bookingData.plan === "Full House"
                ? "book2-plan-card-selected"
                : ""
            }`}
            onClick={() => selectPlan("Full House")}
          >
            <div className="book2-icon">
              <img src={House} alt="Full House" className="book2-icon-img" />
            </div>

            <h3>Full House</h3>

            <p>End-to-end design for the entire residence.</p>
          </button>

          <button
            type="button"
            className={`book2-plan-card ${
              bookingData.plan === "By Room" ? "book2-plan-card-selected" : ""
            }`}
            onClick={() => selectPlan("By Room")}
          >
            <div className="book2-icon">
              <img src={Room} alt="By Room" className="book2-icon-img" />
            </div>

            <h3>By Room</h3>

            <p>Design the selected rooms.</p>
          </button>
        </div>

        <div className="book-buttons book2-buttons">
          <button
            type="button"
            className="book-back-btn"
            onClick={() => navigate("/book1")}
          >
            BACK
          </button>

          <button
            type="button"
            className="main-btn book-continue-btn"
            onClick={() => {
              if (!bookingData.plan) {
                alert("Please choose a plan.");
                return;
              }

              navigate("/book3");
            }}
          >
            CONTINUE
          </button>
        </div>
      </section>
    </main>
  );
}

export default Book2;
