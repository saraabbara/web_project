import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Cal from "../assets/images/cal.png";

// Book5 is the final step of the booking form before confirmation, the logic and design is similar to book1
function Book5({ bookingData, setBookingData }) {
  const navigate = useNavigate();
  // Creates a reference to the date input
  // This lets us open the date picker when the custom date box is clicked
  const dateInputRef = useRef(null);

  // Gets today's date in YYYY-MM-DD format, we used this to stop users from selecting a past date
  const today = new Date().toISOString().split("T")[0];

  const handleDateChange = (e) => {
    // Saves the selected date in bookingData
    setBookingData({
      ...bookingData,
      bookingDate: e.target.value,
    });
  };

  // Opens the browser date picker
  const openDatePicker = () => {
    if (dateInputRef.current) {
      if (dateInputRef.current.showPicker) {
        dateInputRef.current.showPicker();
      } else {
        dateInputRef.current.click();
      }
    }
  };

  // Saves the selected appointment time in bookingData, we only used custom timing based on the client requests
  const selectTime = (time) => {
    setBookingData({
      ...bookingData,
      bookingTime: time,
    });
  };

  const handleConfirmBooking = () => {
    // Makes sure the user selected a date
    if (!bookingData.bookingDate) {
      alert("Please pick a date.");
      return;
    }

    // Makes sure the selected date is not in the past
    if (bookingData.bookingDate < today) {
      alert("Please choose today or a future date.");
      return;
    }

    // Makes sure the user selected a time
    if (!bookingData.bookingTime) {
      alert("Please pick a time.");
      return;
    }

    //for testing
    console.log("Final booking data:", bookingData);
    //if all okay, then navigate to book6
    navigate("/book6");
  };

  //the times the client requested adding
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

        <div
          className="book5-date-input"
          onClick={openDatePicker}
          role="button"
          tabIndex="0"
        >
          {/* Shows the selected date or placeholder text */}
          <span>
            {bookingData.bookingDate ? bookingData.bookingDate : "Pick a date"}
          </span>

          <input
            ref={dateInputRef}
            type="date"
            id="bookingDate"
            name="bookingDate"
            min={today}
            value={bookingData.bookingDate || ""}
            onChange={handleDateChange}
          />

          <span className="book5-calendar-icon">
            <img src={Cal} alt="Calendar" className="book5-calendar-img" />
          </span>
        </div>

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
          {/* Goes back to the floor plan step */}
          <button
            type="button"
            className="book-back-btn"
            onClick={() => navigate("/book4")}
          >
            BACK
          </button>
          {/* Validates date and time before going to Book6 */}
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