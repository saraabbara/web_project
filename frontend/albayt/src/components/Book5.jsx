import React from "react";
import { useNavigate } from "react-router-dom";
import Cal from "../assets/images/cal.png";

function Book5({ bookingData, setBookingData }) {
  const navigate = useNavigate();

  const handleDateChange = (e) => {
    setBookingData({
      ...bookingData,
      bookingDate: e.target.value,
    });
  };

  const selectTime = (time) => {
    setBookingData({
      ...bookingData,
      bookingTime: time,
    });
  };

  const handleConfirmBooking = () => {
    console.log("Final booking data:", bookingData);

    // Later, this is where you will send bookingData to PHP.
    navigate("/book6");
  };

  const times = [
    "9:00 AM",
    "10:30 AM",
    "12:00 PM",
    "1:00 PM",
    "2:30 PM",
    "7:00 PM",
  ];

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
          <span className="book-progress-step">STEP 5 OF 5</span>
          <span className="book-progress-title">DATE & TIME</span>
        </div>

        <div className="book-progress-bar">
          <div className="book-progress-fill book5-progress-fill"></div>
        </div>
      </section>

      <section className="book-card book5-card">
        <h2 className="book-card-title">Pick a date</h2>

        <label htmlFor="bookingDate" className="book5-date-input">
          <input
            type="date"
            id="bookingDate"
            name="bookingDate"
            value={bookingData.bookingDate || ""}
            onChange={handleDateChange}
          />

          <span>
            {bookingData.bookingDate ? bookingData.bookingDate : "Pick a date"}
          </span>

          <span className="book5-calendar-icon">
            <img src={Cal} alt="Calendar" className="book5-calendar-img" />
          </span>
        </label>

        <h3 className="book5-time-title">Pick a time</h3>

        <div className="book5-time-grid">
          {times.map((time) => (
            <button
              key={time}
              type="button"
              className={`book5-time-btn ${
                bookingData.bookingTime === time
                  ? "book5-time-btn-selected"
                  : ""
              }`}
              onClick={() => selectTime(time)}
            >
              {time}
            </button>
          ))}
        </div>

        <div className="book5-divider"></div>

        <div className="book-buttons book5-buttons">
          <button
            type="button"
            className="book-back-btn"
            onClick={() => navigate("/book4")}
          >
            BACK
          </button>

          <button
            type="button"
            className="main-btn book5-confirm-btn"
            onClick={handleConfirmBooking}
          >
            CONFIRM BOOKING
          </button>
        </div>
      </section>
    </main>
  );
}

export default Book5;
