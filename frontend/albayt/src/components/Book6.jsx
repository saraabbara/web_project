// useRef stores values that should not reset when the component re-renders
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// Imports Axios to send HTTP requests from React to PHP
import axios from "axios";

// Book6 is the final booking confirmation page
// bookingData contains all selected information from Book1 to Book5 and resetBookingData clears the booking form after saving
function Book6({ bookingData, resetBookingData }) {
  const navigate = useNavigate();

  // Stores a copy of bookingData before it gets reset
  // We use useRef here so the summary can still show the booking details after resetBookingData runs
  const finalBookingData = useRef({ ...bookingData });
  const hasSaved = useRef(false);

  // just a message shown to the user while the appointment is being saved
  const [saveMessage, setSaveMessage] = useState("Saving your appointment...");

  useEffect(() => {
    const saveAppointment = async () => {
      // If the appointment was already saved, stop the function
      if (hasSaved.current) return;
      hasSaved.current = true;

      // Gets the logged-in user from localStorage; without it, React would forget the user when the page is refreshed
      const savedUser = localStorage.getItem("user");
      const user = savedUser ? JSON.parse(savedUser) : null;

      if (!user) {
        setSaveMessage("Please log in before booking an appointment.");
        return;
      }

      // Creates the appointment object that will be sent to PHP
      const newAppointment = {
        user_id: user.user_id,
        full_name: finalBookingData.current.fullName,
        phone_number: finalBookingData.current.phoneNumber,
        email: finalBookingData.current.email,
        decor_plan: finalBookingData.current.plan,
        style: finalBookingData.current.style,
        floor_plan_upload: finalBookingData.current.floorPlanFileName,
        date: finalBookingData.current.bookingDate,
        time: finalBookingData.current.bookingTime,
        status: "confirmed",
      };

      // to get the old appointments from localStorage if they exist
      const savedAppointments =
        JSON.parse(localStorage.getItem("appointments")) || [];

      const updatedAppointments = [newAppointment, ...savedAppointments];

      // This keeps a browser copy of the appointment
      localStorage.setItem("appointments", JSON.stringify(updatedAppointments));

      try {
        // Sends the new appointment to PHP so it can be saved in MySQL
        const response = await axios.post(
          "http://localhost:8000/appointments.php",
          newAppointment,
        );
        //for testing
        console.log("PHP booking response:", response.data);
      } catch (error) {
         //if React could not connect to PHP
        console.log("PHP booking error:", error);
      }

      setSaveMessage("Booking received — we’ll confirm shortly.");

      // Clears the booking form so old choices do not appear in a new booking
      resetBookingData();
    };

    saveAppointment();
  }, [resetBookingData]);

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
          {saveMessage}{" "}
          {finalBookingData.current.bookingDate &&
          finalBookingData.current.bookingTime
            ? `${finalBookingData.current.bookingDate} ${finalBookingData.current.bookingTime}`
            : ""}
        </p>

        {/* Summary row for plan and style */}
        <div className="book6-summary">
          <div className="book6-summary-card">
            <p>Plan</p>
            <h3>{finalBookingData.current.plan || "Not selected"}</h3>
          </div>

          <div className="book6-summary-card">
            <p>Style</p>
            <h3>{finalBookingData.current.style || "Not selected"}</h3>
          </div>
        </div>

        {/* Summary row for name and phone */}
        <div className="book6-summary">
          <div className="book6-summary-card">
            <p>Name</p>
            <h3>{finalBookingData.current.fullName || "Not provided"}</h3>
          </div>

          <div className="book6-summary-card">
            <p>Phone</p>
            <h3>{finalBookingData.current.phoneNumber || "Not provided"}</h3>
          </div>
        </div>
          
        {/* navigates the user to the appointments page */}
        <button
          type="button"
          className="main-btn book6-home-btn"
          onClick={() => navigate("/appointments")}
        >
          VIEW APPOINTMENTS
        </button>
      </section>
    </main>
  );
}

export default Book6;
