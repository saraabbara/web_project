import aboutBuilding from "../assets/images/aboutbuilding.png";
const stats = [
  { num: "10", label: "PROJECTS" },
  { num: "70+", label: "CLIENTS" },
  { num: "46", label: "YEARS OF BUSINESS" },
];

function About() {
  return (
    <section className="about-section">
      {/* Top row */}
      <div className="about-container">
        <div>
          <div className="about-label">About</div>

          <h2 className="about-title">
            Who We Are &<br />
            What Sets Us Apart
          </h2>
        </div>

        <div className="about-text-box">
          <p className="about-text">
            Engineering consultancy across all areas of activity, along with
            general contracting for palaces, villas, and commercial buildings.
            We specialize in the design and execution of interior décor works of
            all types, supported by exhibitions in Jeddah and Riyadh.
          </p>

          <p className="about-text">
            The group also operates a specialized factory dedicated to
            manufacturing high-end furnishings tailored to client requests,
            including curtains, accessories, and embroidery.
          </p>
        </div>
      </div>

      {/* Bottom image + stats */}
      <div className="about-image-area">
        <img
          src={aboutBuilding}
          alt="Our building"
          className="about-building"
        />

        <div className="about-gold-band"></div>

        <div className="stats-wrapper">
          {stats.map((s, i) => (
            <div className="stat-card" key={i}>
              <div className="stat-number">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
