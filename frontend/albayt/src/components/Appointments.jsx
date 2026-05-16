import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Cal2 from "../assets/images/cal2.png";
import Location from "../assets/images/location.png";
import Apt from "../assets/images/apt.png";

function Appointments() {
  const [filter, setFilter] = useState("all");

  // Later, replace this array with data from the database.
  const appointments = [
    {
      id: 1,
      month: "MAY",
      day: "19",
      year: "2026",
      time: "10:30",
      plan: "Full House",
      style: "Modern",
      designer: "Sara Abbara",
      bookedDate: "May 19, 2026",
      location: "Riyadh",
      status: "canceled",
    },
    {
      id: 2,
      month: "MAY",
      day: "31",
      year: "2026",
      time: "10:30",
      plan: "By Room - 2",
      style: "Modern",
      designer: "Maha Shaheen",
      bookedDate: "May 31, 2026",
      location: "Jeddah",
      status: "confirmed",
    },
  ];

  const filteredAppointments = appointments.filter((appointment) => {
    if (filter === "all") return true;
    if (filter === "active") return appointment.status === "confirmed";
    if (filter === "cancelled") return appointment.status === "canceled";
    return true;
  });

  const hasAppointments = filteredAppointments.length > 0;

  return (
    <>
      <Header />

      <main className="appointments-page book-page">
        <section className="book-hero">
          <p className="book-label">MY APPOINTMENTS</p>
          <h1 className="book-title">Your Consultations</h1>
          <p className="book-description">
            Review status, dates and personal notes from your dedicated
            designer.
          </p>
        </section>

        <section className="appointments-section">
          <div className="appointments-container">
            <div className="appointments-filters">
              <button
                className={`appointments-filter ${
                  filter === "all" ? "appointments-filter-active" : ""
                }`}
                onClick={() => setFilter("all")}
              >
                ALL
              </button>

              <button
                className={`appointments-filter ${
                  filter === "active" ? "appointments-filter-active" : ""
                }`}
                onClick={() => setFilter("active")}
              >
                ACTIVE
              </button>

              <button
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
                {filteredAppointments.map((appointment) => (
                  <article className="appointment-card" key={appointment.id}>
                    <div className="appointment-date-panel">
                      <p className="appointment-month">{appointment.month}</p>
                      <h2 className="appointment-day">{appointment.day}</h2>
                      <p className="appointment-year">{appointment.year}</p>
                      <p className="appointment-time">{appointment.time}</p>
                    </div>

                    <div className="appointment-info">
                      <div className="appointment-top-row">
                        <div>
                          <h2 className="appointment-title">
                            {appointment.plan}
                          </h2>
                          <p className="appointment-subtitle">
                            {appointment.style} · {appointment.designer}
                          </p>
                        </div>

                        <span
                          className={`appointment-status appointment-status-${appointment.status}`}
                        >
                          {appointment.status === "confirmed"
                            ? "CONFIRMED"
                            : "CANCELED"}
                        </span>
                      </div>

                      <div className="appointment-meta">
                        <p>
                          <img
                            className="appointment-cal-icon"
                            src={Cal2}
                            alt="Calendar"
                          />
                          Booked {appointment.bookedDate}
                        </p>

                        <p>
                          <img
                            className="appointment-location-icon"
                            src={Location}
                            alt="Location"
                          />
                          {appointment.location}
                        </p>
                      </div>

                      <div className="appointment-divider"></div>

                      <div className="appointment-actions">
                        <button className="appointment-cancel-btn">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
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
      </main>
    </>
  );
}

export default Appointments;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Cal2 from "../assets/images/cal2.png";
import Location from "../assets/images/location.png";
import Apt from "../assets/images/apt.png";

function Appointments() {
  const [filter, setFilter] = useState("all");

  // Later, replace this array with data from the database.
  const appointments = [
    {
      id: 1,
      month: "MAY",
      day: "19",
      year: "2026",
      time: "10:30",
      plan: "Full House",
      style: "Modern",
      designer: "Sara Abbara",
      bookedDate: "May 19, 2026",
      location: "Riyadh",
      status: "canceled",
    },
    {
      id: 2,
      month: "MAY",
      day: "31",
      year: "2026",
      time: "10:30",
      plan: "By Room - 2",
      style: "Modern",
      designer: "Maha Shaheen",
      bookedDate: "May 31, 2026",
      location: "Jeddah",
      status: "confirmed",
    },
  ];

  const filteredAppointments = appointments.filter((appointment) => {
    if (filter === "all") return true;
    if (filter === "active") return appointment.status === "confirmed";
    if (filter === "cancelled") return appointment.status === "canceled";
    return true;
  });

  const hasAppointments = filteredAppointments.length > 0;

  return (
    <>
      <Header />

      <main className="appointments-page book-page">
        <section className="projects-hero">
          <p className="projects-label">MY APPOINTMENTS</p>
          <h1 className="projects-title">Your Consultations</h1>
          <p className="projects-description">
            Review status, dates and personal notes from your dedicated
            designer.
          </p>
        </section>

        <section className="appointments-section">
          <div className="appointments-container">
            <div className="appointments-filters">
              <button
                className={`appointments-filter ${
                  filter === "all" ? "appointments-filter-active" : ""
                }`}
                onClick={() => setFilter("all")}
              >
                ALL
              </button>

              <button
                className={`appointments-filter ${
                  filter === "active" ? "appointments-filter-active" : ""
                }`}
                onClick={() => setFilter("active")}
              >
                ACTIVE
              </button>

              <button
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
                {filteredAppointments.map((appointment) => (
                  <article className="appointment-card" key={appointment.id}>
                    <div className="appointment-date-panel">
                      <p className="appointment-month">{appointment.month}</p>
                      <h2 className="appointment-day">{appointment.day}</h2>
                      <p className="appointment-year">{appointment.year}</p>
                      <p className="appointment-time">{appointment.time}</p>
                    </div>

                    <div className="appointment-info">
                      <div className="appointment-top-row">
                        <div>
                          <h2 className="appointment-title">
                            {appointment.plan}
                          </h2>
                          <p className="appointment-subtitle">
                            {appointment.style} · {appointment.designer}
                          </p>
                        </div>

                        <span
                          className={`appointment-status appointment-status-${appointment.status}`}
                        >
                          {appointment.status === "confirmed"
                            ? "CONFIRMED"
                            : "CANCELED"}
                        </span>
                      </div>

                      <div className="appointment-meta">
                        <p>
                          <img
                            className="appointment-cal-icon"
                            src={Cal2}
                            alt="Calendar"
                          />
                          Booked {appointment.bookedDate}
                        </p>

                        <p>
                          <img
                            className="appointment-location-icon"
                            src={Location}
                            alt="Location"
                          />
                          {appointment.location}
                        </p>
                      </div>

                      <div className="appointment-divider"></div>

                      <div className="appointment-actions">
                        <button className="appointment-cancel-btn">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
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
      </main>
    </>
  );
}

export default Appointments;
