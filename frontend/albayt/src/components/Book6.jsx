import React from "react";
import { useNavigate } from "react-router-dom";

function Book6({ bookingData }) {
  const navigate = useNavigate();

  return (
    <main className="book-page">
      <section className="book-hero">
        <p className="book-label">Book</p>

        <h1 className="book-title">Book a Consultation</h1>

        <p className="book-description">
          Tell us about your space. A designer will be in touch within 24 hours.
        </p>
      </section>

      <section className="book-card book6-card">
        <div className="book6-check-icon">✓</div>

        <h2 className="book6-title">Thank you!</h2>

        <p className="book6-message">
          Booking received — we’ll confirm shortly.{" "}
          {bookingData.bookingDate && bookingData.bookingTime
            ? `${bookingData.bookingDate} ${bookingData.bookingTime}`
            : ""}
        </p>

        <div className="book6-summary">
          <div className="book6-summary-card">
            <p>Plan</p>
            <h3>{bookingData.plan || "Not selected"}</h3>
          </div>

          <div className="book6-summary-card">
            <p>Style</p>
            <h3>{bookingData.style || "Not selected"}</h3>
          </div>
        </div>

        <div className="book6-summary">
          <div className="book6-summary-card">
            <p>Name</p>
            <h3>{bookingData.fullName || "Not provided"}</h3>
          </div>

          <div className="book6-summary-card">
            <p>Phone</p>
            <h3>{bookingData.phoneNumber || "Not provided"}</h3>
          </div>
        </div>

        <button
          type="button"
          className="main-btn book6-home-btn"
          onClick={() => navigate("/")}
        >
          RETURN HOME
        </button>
      </section>
    </main>
  );
}

export default Book6;
