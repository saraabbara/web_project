import React from "react";
import { useNavigate } from "react-router-dom";

// Book4 is the fourth step of the booking form, the logic and design is similar to book1
// in this we made the floor plan to be optional as the client requested
function Book4({ bookingData, setBookingData }) {
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // If the user selected a file, save it in bookingData
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
        {/* Progress bar showing the user is on step 4 */}
        <div className="book-progress-bar">
          <div className="book-progress-fill book4-progress-fill"></div>
        </div>
      </section>

      <section className="book-card book4-card">
        <div className="book4-header">
          <h2 className="book-card-title">Have a floor plan? (optional)</h2>
          <p>PDF, JPG or PNG - up to 10MB</p>
        </div>

        {/* When the user clicks this box, it opens the hidden file input */}
        <label htmlFor="floorPlanUpload" className="book4-upload-box">
          <input
            type="file"
            id="floorPlanUpload"
            name="floorPlanUpload"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
          />

          <div className="book4-upload-icon">↑</div>

          {/* Shows the file name if a file was selected; Otherwise, shows the default upload message */}
          <p>
            {bookingData.floorPlanFileName
              ? bookingData.floorPlanFileName
              : "Drop file or click to upload"}
          </p>
        </label>

        <div className="book-buttons book4-buttons">
          {/* Goes back to the third booking step */}
          <button
            type="button"
            className="book-back-btn"
            onClick={() => navigate("/book3")}
          >
            BACK
          </button>

          {/* No validation is needed because floor plan upload is optional */}
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
