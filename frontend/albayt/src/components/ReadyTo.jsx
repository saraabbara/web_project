import { Link } from "react-router-dom";

function ReadyTo() {
  return (
    <section className="ready-section">
      <div className="ready-line"></div>

      <h2 className="ready-title">
        Ready to design
        <br />
        something timeless?
      </h2>
      {/* Button that takes the user to the booking page */}
      <Link to="/book" className="main-btn ready-btn">
        BOOK A CONSULTATION
      </Link>
    </section>
  );
}

export default ReadyTo;
