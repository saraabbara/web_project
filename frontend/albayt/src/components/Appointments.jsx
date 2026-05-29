import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
// we used Axios to send HTTP requests from React to PHP
import axios from "axios";

import Cal2 from "../assets/images/cal2.png";
import Location from "../assets/images/location.png";
import Apt from "../assets/images/apt.png";

// Gets the logged-in user from localStorage
// we used localStorage because without it, React would forget the user when the page is refreshed
function getSavedUser() {
  try {
    const savedUser = localStorage.getItem("user");
    
    // If a user exists, we convert it from JSON text back to an object
    return savedUser ? JSON.parse(savedUser) : null;
  } catch (error) {
    localStorage.removeItem("user");
    return null;
  }
}

function Appointments() {
  // we added filter to allow the user to see the active vs cancelled appointments, so this stores which filter is currently selected
  const [filter, setFilter] = useState("all");
  
  // stores appointments loaded from the database
  const [appointments, setAppointments] = useState([]);
  // tracks whether appointments are still loading
  const [loading, setLoading] = useState(true);
  // to know/store which the appointment is selected for cancellation
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);

  // Gets the logged-in user
  const user = getSavedUser();

  useEffect(() => {
    //if there is no logged-in user stop loading
    if (!user) {
      setLoading(false);
      return;
    }

    // axios to send a GET request to php to get this user's appointments from MySQL
    axios
      .get(`http://localhost:8000/appointments.php?user_id=${user.user_id}`)
      .then((response) => {
        //for testing
        console.log("Appointments from database:", response.data);

        //used the setAppointment to store the appointment booked
        if (response.data.success) {
          setAppointments(response.data.appointments);
        }

        setLoading(false);
      })
      .catch((error) => {
        //for testing in case of failure in connecting
        console.log("Appointments error:", error);
        setLoading(false);
      });
  }, [user?.user_id]);

  // if the user is not logged in, we redirect them to the login page so they can book the appointments
  if (!user) {
    return <Navigate to="/login" />;
  }

  //we used Date, so we need to convert the date value from the database into display parts
  const getDateParts = (dateValue) => {
    //in case something is missing
    if (!dateValue) {
      return {
        month: "",
        day: "",
        year: "",
        bookedDate: "No date selected",
      };
    }

    let date;

    // ff the date is in YYYY-MM-DD format, create the date manually
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
      const [year, month, day] = dateValue.split("-");
      date = new Date(Number(year), Number(month) - 1, Number(day));
    } else {
      //in case the manual didnt work, try doing it directly from javascript
      date = new Date(dateValue);
    }

    //in case both failed
    if (Number.isNaN(date.getTime())) {
      return {
        month: "",
        day: "",
        year: "",
        bookedDate: "No date selected",
      };
    }

    //this to extract the date in formats used by the appointment card
    return {
      month: date.toLocaleString("en-US", { month: "short" }).toUpperCase(),
      day: date.getDate(),
      year: date.getFullYear(),
      bookedDate: date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    };
  };


  const openCancelModal = (appointment) => {
    setAppointmentToCancel(appointment);
  };

  const closeCancelModal = () => {
    setAppointmentToCancel(null);
  };

  const confirmCancelAppointment = async () => {
    if (!appointmentToCancel) return;

    try {
      const response = await axios.post("http://localhost:8000/appointments.php", {
        action: "cancel",
        appointment_id: appointmentToCancel.appointment_id,
        user_id: user.user_id,
      });

      console.log("Cancel response:", response.data);

      if (response.data.success) {
        const updatedAppointments = appointments.map((appointment) => {
          if (
            String(appointment.appointment_id) ===
            String(appointmentToCancel.appointment_id)
          ) {
            return {
              ...appointment,
              status: "canceled",
            };
          }

          return appointment;
        });

        setAppointments(updatedAppointments);
        setAppointmentToCancel(null);
      } else {
        alert(response.data.message || "Could not cancel appointment.");
      }
    } catch (error) {
      console.log("Cancel error:", error);
      alert("Could not connect to PHP.");
    }
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const status = appointment.status || "confirmed";

    if (filter === "all") return true;
    if (filter === "active") return status === "confirmed";
    if (filter === "cancelled") return status === "canceled";

    return true;
  });

  const hasAppointments = filteredAppointments.length > 0;

  if (loading) {
    return <h2 style={{ padding: "160px 40px" }}>Loading appointments...</h2>;
  }

  return (
    <main className="appointments-page book-page">
      <section className="projects-hero">
        <p className="projects-label">MY APPOINTMENTS</p>

        <h1 className="projects-title">Your Consultations</h1>

        <p className="projects-description">
          Review status, dates and personal notes from your dedicated designer.
        </p>
      </section>

      <section className="appointments-section">
        <div className="appointments-container">
          <div className="appointments-filters">
            <button
              type="button"
              className={`appointments-filter ${
                filter === "all" ? "appointments-filter-active" : ""
              }`}
              onClick={() => setFilter("all")}
            >
              ALL
            </button>

            <button
              type="button"
              className={`appointments-filter ${
                filter === "active" ? "appointments-filter-active" : ""
              }`}
              onClick={() => setFilter("active")}
            >
              ACTIVE
            </button>

            <button
              type="button"
              className={`appointments-filter ${
                filter === "cancelled" ? "appointments-filter-active" : ""
              }`}
              onClick={() => setFilter("cancelled")}
            >
              CANCELLED
            </button>
          </div>

          {hasAppointments ? (
            <div className="appointments-list">
              {filteredAppointments.map((appointment) => {
                const dateParts = getDateParts(appointment.date);
                const status = appointment.status || "confirmed";

                return (
                  <article
                    className="appointment-card"
                    key={appointment.appointment_id}
                  >
                    <div className="appointment-date-panel">
                      <p className="appointment-month">{dateParts.month}</p>

                      <h2 className="appointment-day">{dateParts.day}</h2>

                      <p className="appointment-year">{dateParts.year}</p>

                      <p className="appointment-time">
                        {appointment.time || "No time"}
                      </p>
                    </div>

                    <div className="appointment-info">
                      <div className="appointment-top-row">
                        <div>
                          <h2 className="appointment-title">
                            {appointment.decor_plan ||
                              appointment.plan ||
                              "Consultation"}
                          </h2>

                          <p className="appointment-subtitle">
                            {appointment.style || "Style not selected"} ·{" "}
                            {appointment.designer || "Albayt Designer"}
                          </p>
                        </div>

                        <span
                          className={`appointment-status appointment-status-${status}`}
                        >
                          {status === "confirmed" ? "CONFIRMED" : "CANCELED"}
                        </span>
                      </div>

                      <div className="appointment-meta">
                        <p>
                          <img
                            className="appointment-cal-icon"
                            src={Cal2}
                            alt="Calendar"
                          />
                          Booked {dateParts.bookedDate}
                        </p>

                        <p>
                          <img
                            className="appointment-location-icon"
                            src={Location}
                            alt="Location"
                          />
                          {appointment.location || "Riyadh"}
                        </p>
                      </div>

                      <div className="appointment-divider"></div>

                      <div className="appointment-actions">
                        {status === "confirmed" ? (
                          <button
                            type="button"
                            className="appointment-cancel-btn"
                            onClick={() => openCancelModal(appointment)}
                          >
                            Cancel
                          </button>
                        ) : (
                          <span className="appointment-canceled-text">
                            Canceled
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="appointments-empty-card book-card">
              <div className="appointments-empty-icon">
                <img
                  className="appointments-empty-img"
                  src={Apt}
                  alt="No Appointments"
                />
              </div>

              <h2>No appointments yet</h2>

              <p>Book your first consultation with a senior designer.</p>

              <Link to="/book1" className="main-btn appointments-empty-btn">
                BOOK A CONSULTATION
              </Link>
            </div>
          )}
        </div>
      </section>

      {appointmentToCancel && (
        <div className="cancel-modal-overlay">
          <div className="cancel-modal">
            <div className="cancel-modal-icon">!</div>

            <h2>Cancel Appointment?</h2>

            <p>
              Are you sure you want to cancel your{" "}
              <strong>
                {appointmentToCancel.decor_plan ||
                  appointmentToCancel.plan ||
                  "consultation"}
              </strong>{" "}
              appointment?
            </p>

            <div className="cancel-modal-actions">
              <button
                type="button"
                className="cancel-modal-back"
                onClick={closeCancelModal}
              >
                KEEP BOOKING
              </button>

              <button
                type="button"
                className="cancel-modal-confirm"
                onClick={confirmCancelAppointment}
              >
                YES, CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Appointments;