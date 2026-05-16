import homeDecorImg from "../assets/images/homedecor.png";
import livingImg from "../assets/images/living.png";
import bedroomImg from "../assets/images/bedroom.png";

const furniture = [
  {
    label: "Home décor",
    image: homeDecorImg,
  },
  {
    label: "Living",
    image: livingImg,
  },
  {
    label: "Bedroom",
    image: bedroomImg,
  },
];

function Collection() {
  return (
    <section className="collection-section">
      <div className="collection-container">
        {/* Heading */}
        <div className="collection-heading">
          <div className="collection-label">THE COLLECTION</div>

          <h2 className="collection-title">Browse the Furniture</h2>
        </div>

        {/* Cards */}
        <div className="furniture-grid">
          {furniture.map((f, i) => (
            <div key={i} className="furniture-item">
              <div className="furniture-card">
                <img src={f.image} alt={f.label} className="furniture-image" />
              </div>

              <div className="furniture-label">{f.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Collection;