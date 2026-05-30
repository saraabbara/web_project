import architectureImg from "../assets/images/architecture.png";
import interiorImg from "../assets/images/interior.png";
import tilesImg from "../assets/images/tiles.png";
import constructionImg from "../assets/images/construction.png";
import maintenanceImg from "../assets/images/maintenance.png";
import furnitureImg from "../assets/images/furniture.png";
import workshopImg from "../assets/images/workshop.png";

//we used one array to store the services with the image, title and description so its easier to loop through them using map
const services = [
  {
    image: architectureImg,
    title: "Architecture & Engineering",
    desc: "Full architectural, structural, and electromechanical design solutions, supported by expert consultancy and professional project management.",
  },
  {
    image: interiorImg,
    title: "Interior Design",
    desc: "Tailored interior concepts that blend functionality with timeless aesthetics, designed to reflect each client’s vision.",
  },
  {
    image: tilesImg,
    title: "Tiles & Surface Design",
    desc: "Production and installation of premium surfaces, including Moroccan zellige, mosaic, and marble finishes.",
  },
  {
    image: constructionImg,
    title: "Construction & Finishing",
    desc: "Execution of structural works, high-quality finishing, and interior & exterior cladding with precision and attention to detail.",
  },
  {
    image: maintenanceImg,
    title: "Maintenance & Renovation",
    desc: "Comprehensive maintenance, operation, and renovation services to preserve and enhance every space.",
  },
  {
    image: furnitureImg,
    title: "Custom Furniture",
    desc: "Bespoke furniture manufacturing, including upholstery, curtains, doors, and refined detailing crafted to client specifications.",
  },
];

// Reusable card component for one service, it receives image, title, and desc as props
function ServiceCard({ image, title, desc }) {
  return (
    <div className="service-card">
      <div className="service-icon-circle">
        <img src={image} alt={title} className="service-icon-image" />
      </div>

      <h3 className="service-card-title">{title}</h3>

      <p className="service-card-text">{desc}</p>
    </div>
  );
}

function Services() {
  return (
    <section className="services-section">
      <div className="services-container">
        <div className="services-heading">
          <div className="services-label">WHAT WE DO</div>

          <h2 className="services-title">Our services</h2>

          <p className="services-subtitle">
            Crafting complete, integrated solutions — from the first concept to
            the final finish.
          </p>

          <div className="services-line"></div>
        </div>

        <div className="services-grid">
          {/* Loops through services and creates one ServiceCard for each service */}
          {services.map((service, i) => (
            <ServiceCard
              key={i}
              image={service.image}
              title={service.title}
              desc={service.desc}
            />
          ))}
        </div>

        {/* Last service card placed separately in the center for design purposes */}
        <div className="services-last-wrapper">
          <div className="service-card service-card-center">
            <div className="service-icon-circle">
              <img
                src={workshopImg}
                alt="Specialized Workshops"
                className="service-icon-image"
              />
            </div>

            <h3 className="service-card-title">Specialized Workshops</h3>

            <p className="service-card-text">
              A fully integrated production line including: Metalwork, Gypsum
              works, Decorative painting for walls and ceilings
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
