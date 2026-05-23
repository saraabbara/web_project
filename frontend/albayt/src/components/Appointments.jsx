import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

import Cal2 from "../assets/images/cal2.png";
import Location from "../assets/images/location.png";
import Apt from "../assets/images/apt.png";

function getSavedUser() {
  try {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  } catch (error) {
    localStorage.removeItem("user");
    return null;
  }
}

function getSavedAppointments() {
  try {
    const savedAppointments = localStorage.getItem("appointments");
    const parsedAppointments = savedAppointments
      ? JSON.parse(savedAppointments)
      : [];

    return Array.isArray(parsedAppointments) ? parsedAppointments : [];
  } catch (error) {
    localStorage.setItem("appointments", JSON.stringify([]));
    return [];
  }
}

function Appointments() {
  const [filter, setFilter] = useState("all");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);

  const user = getSavedUser();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const allAppointments = getSavedAppointments();

    const userAppointments = allAppointments
      .filter(
        (appointment) => String(appointment.user_id) === String(user.user_id),
      )
      .sort((a, b) => Number(b.id) - Number(a.id));

    setAppointments(userAppointments);
    setLoading(false);
  }, [user?.user_id]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  const getDateParts = (dateValue) => {
    if (!dateValue) {
      return {
        month: "",
        day: "",
        year: "",
        bookedDate: "No date selected",
      };
    }

    let date;

    if (/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
      const [year, month, day] = dateValue.split("-");
      date = new Date(Number(year), Number(month) - 1, Number(day));
    } else {
      date = new Date(dateValue);
    }

    if (Number.isNaN(date.getTime())) {
      return {
        month: "",
        day: "",
        year: "",
        bookedDate: "No date selected",
      };
    }

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

  const getStatus = (status) => {
    if (status === "cancelled") return "canceled";
    return status || "confirmed";
  };

  const openCancelModal = (appointment) => {
    setAppointmentToCancel(appointment);
  };

  const closeCancelModal = () => {
    setAppointmentToCancel(null);
  };

  const confirmCancelAppointment = () => {
    if (!appointmentToCancel) return;

    const updatedAppointments = appointments.map((appointment) => {
      if (String(appointment.id) === String(appointmentToCancel.id)) {
        return {
          ...appointment,
          status: "canceled",
        };
      }

      return appointment;
    });

    setAppointments(updatedAppointments);

    const allAppointments = getSavedAppointments();

    const updatedAllAppointments = allAppointments.map((appointment) => {
      if (String(appointment.id) === String(appointmentToCancel.id)) {
        return {
          ...appointment,
          status: "canceled",
        };
      }

      return appointment;
    });

    localStorage.setItem(
      "appointments",
      JSON.stringify(updatedAllAppointments),
    );

    setAppointmentToCancel(null);
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const status = getStatus(appointment.status);

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
                const status = getStatus(appointment.status);

                return (
                  <article className="appointment-card" key={appointment.id}>
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
                            {appointment.decor_plan || "Consultation"}
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
                {appointmentToCancel.decor_plan || "consultation"}
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
