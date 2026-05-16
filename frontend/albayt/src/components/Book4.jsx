import React from "react";
import { useNavigate } from "react-router-dom";

function Book4({ bookingData, setBookingData }) {
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setBookingData({
        ...bookingData,
        floorPlanFile: file,
        floorPlanFileName: file.name,
      });
    }
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
          <span className="book-progress-step">STEP 4 OF 5</span>
          <span className="book-progress-title">FLOOR PLAN</span>
        </div>

        <div className="book-progress-bar">
          <div className="book-progress-fill book4-progress-fill"></div>
        </div>
      </section>

      <section className="book-card book4-card">
        <div className="book4-header">
          <h2 className="book-card-title">Have a floor plan? (optional)</h2>
          <p>PDF, JPG or PNG - up to 10MB</p>
        </div>

        <label htmlFor="floorPlanUpload" className="book4-upload-box">
          <input
            type="file"
            id="floorPlanUpload"
            name="floorPlanUpload"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
          />

          <div className="book4-upload-icon">↑</div>

          <p>
            {bookingData.floorPlanFileName
              ? bookingData.floorPlanFileName
              : "Drop file or click to upload"}
          </p>
        </label>

        <div className="book-buttons book4-buttons">
          <button
            type="button"
            className="book-back-btn"
            onClick={() => navigate("/book3")}
          >
            BACK
          </button>

          <button
            type="button"
            className="main-btn book-continue-btn"
            onClick={() => navigate("/book5")}
          >
            CONTINUE
          </button>
        </div>
      </section>
    </main>
  );
}

export default Book4;
