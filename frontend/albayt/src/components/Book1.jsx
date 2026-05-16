import React from "react";
import { useNavigate } from "react-router-dom";

function Book1({ bookingData, setBookingData }) {
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setBookingData({
      ...bookingData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/book2");
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
          <span className="book-progress-step">STEP 1 OF 5</span>
          <span className="book-progress-title">YOUR DETAILS</span>
        </div>

        <div className="book-progress-bar">
          <div className="book-progress-fill book1-progress-fill"></div>
        </div>
      </section>

      <section className="book-card book1-card">
        <h2 className="book-card-title">Your Details</h2>

        <form className="book1-form" onSubmit={handleSubmit}>
          <div className="book1-form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={bookingData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="book1-form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={bookingData.phoneNumber}
              onChange={handleChange}
            />
          </div>

          <div className="book1-form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={bookingData.email}
              onChange={handleChange}
            />
          </div>

          <div className="book-buttons">
            <button
              type="button"
              className="book-back-btn"
              onClick={() => navigate("/")}
            >
              BACK
            </button>

            <button type="submit" className="main-btn book-continue-btn">
              CONTINUE
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Book1;
