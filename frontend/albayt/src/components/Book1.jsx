import React from "react";

// Imports useNavigate to move the user to another page after clicking buttons
import { useNavigate } from "react-router-dom";

// Book1 is the first step of the booking form, bookingData stores the form values and setBookingData updates the form values
function Book1({ bookingData, setBookingData }) {
  // Creates a navigate function used to move between pages
  const navigate = useNavigate();

  // Handles changes in the input fields
  const handleChange = (e) => {
    // Gets the input name and value from the field the user typed in
    const { name, value } = e.target;

    // updates the correct/matching field inside bookingData
    setBookingData({
      ...bookingData,
      [name]: value,
    });
  };

  //when the user submits the form
  const handleSubmit = (e) => {
    // Prevents the form from refreshing the page
    e.preventDefault();

    // Checks that the required fields are not empty
    if (
      !bookingData.fullName ||
      !bookingData.phoneNumber ||
      !bookingData.email
    ) {
      //if not alert
      alert("Please fill in all fields.");
      return;
    }

    // moves the user to the second booking step
    navigate("/book2");
  };

  return (
    <main className="book-page">
      {/* Page hero section */}
      <section className="projects-hero">
        <p className="projects-label">BOOK</p>

        <h1 className="projects-title">Book a Consultation</h1>

        <p className="projects-description">
          Tell us about your space. A designer will be in touch within 24 hours.
        </p>
      </section>

      {/* Booking progress section */}
      <section className="book-progress-section">
        <div className="book-progress-text">
          <span className="book-progress-step">STEP 1 OF 5</span>
          <span className="book-progress-title">YOUR DETAILS</span>
        </div>

        {/* Progress bar showing the user is on step 1 */}
        <div className="book-progress-bar">
          <div className="book-progress-fill book1-progress-fill"></div>
        </div>
      </section>

      <section className="book-card book1-card">
        <h2 className="book-card-title">Your Details</h2>

        {/* Form submits using handleSubmit */}
        <form className="book1-form" onSubmit={handleSubmit}>
          {/* Full name input */}
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

          {/* Phone number input */}
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

          {/* Email input */}
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

          {/* Form buttons */}
          <div className="book-buttons">
            {/* Goes back to the home page */}
            <button
              type="button"
              className="book-back-btn"
              onClick={() => navigate("/")}
            >
              BACK
            </button>

            {/* Submits the form and moves to Book2 if fields are filled */}
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