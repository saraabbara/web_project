import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Book6({ bookingData, resetBookingData }) {
  const navigate = useNavigate();

  const finalBookingData = useRef({ ...bookingData });
  const hasSaved = useRef(false);

  const [saveMessage, setSaveMessage] = useState("Saving your appointment...");

  useEffect(() => {
    const saveAppointment = async () => {
      if (hasSaved.current) return;
      hasSaved.current = true;

      const savedUser = localStorage.getItem("user");
      const user = savedUser ? JSON.parse(savedUser) : null;

      if (!user) {
        setSaveMessage("Please log in before booking an appointment.");
        return;
      }

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

      const savedAppointments =
        JSON.parse(localStorage.getItem("appointments")) || [];

      const updatedAppointments = [newAppointment, ...savedAppointments];

      localStorage.setItem("appointments", JSON.stringify(updatedAppointments));

      try {
        const response = await axios.post(
          "http://localhost:8000/appointments.php",
          newAppointment,
        );

        console.log("PHP booking response:", response.data);
      } catch (error) {
        console.log("PHP booking error:", error);
      }

      setSaveMessage("Booking received — we’ll confirm shortly.");

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
