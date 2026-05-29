//we imported the image that is added in the assets folder
import aboutBuilding from "../assets/images/aboutbuilding.png";

//this is to display some statistical data as the client required, we used array to make it easier to display using map()
const stats = [
  { num: "60+", label: "PROJECTS" },
  { num: "1000+", label: "CLIENTS" },
  { num: "46", label: "YEARS OF BUSINESS" },
];

function About() {
  return (
    // The id allows other parts of the website to scroll/link to this section
    <section className="about-section" id="about-section">
      {/* Top row */}
      <div className="about-container">
        <div>
          {/* Small label above the main title */}
          <div className="about-label">About</div>

          <h2 className="about-title">
            Who We Are &<br />
            What Sets Us Apart
          </h2>
        </div>

        {/* Text box that contains the company description */}
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

      <div className="about-image-area">
        <img
          src={aboutBuilding}
          alt="Our building"
          className="about-building"
        />

        <div className="about-gold-band"></div>

        <div className="stats-wrapper">
          {/* Loops through the stats array and creates one card for each statistic*/}
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
