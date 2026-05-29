import decor1 from "../assets/images/decor1.jpg";
import decor2 from "../assets/images/decor2.jpg";
import decor3 from "../assets/images/decor3.jpg";
import decor4 from "../assets/images/decor4.jpg";
import decor5 from "../assets/images/decor5.jpg";
import decor6 from "../assets/images/decor6.jpg";
import decor7 from "../assets/images/decor7.jpg";
import decor8 from "../assets/images/decor8.jpg";
import decor9 from "../assets/images/decor9.jpg";
import decor10 from "../assets/images/decor10.jpg";
import decor11 from "../assets/images/decor11.jpg";
import decor12 from "../assets/images/decor12.jpg";
import decor13 from "../assets/images/decor13.jpg";
import decor14 from "../assets/images/decor14.jpg";
import decor15 from "../assets/images/decor15.jpg";

//same logic as the bedroom.jsx
const decorItems = [
  { image: decor1 },
  { image: decor2 },
  { image: decor3 },
  { image: decor4 },
  { image: decor5 },
  { image: decor6 },
  { image: decor7 },
  { image: decor8 },
  { image: decor9 },
  { image: decor10 },
  { image: decor11 },
  { image: decor12 },
  { image: decor13 },
  { image: decor14 },
  { image: decor15 },
];

function HomeDecor() {
  return (
    <div className="furniture-category-page">

      <section className="furniture-category-hero">
        <p className="furniture-category-label">FURNITURE COLLECTION</p>

        <h1 className="furniture-category-title">Decor</h1>

        <p className="furniture-category-description">
          Explore custom-made, elegant home decor for interior spaces.
        </p>
      </section>

      <section className="furniture-category-section">
        <div className="furniture-category-container">
          <div className="furniture-category-heading">
            <p className="furniture-category-small-label">HOME DECOR</p>

            <h2 className="furniture-category-section-title">
              Decor Collection
            </h2>
          </div>

          <div className="furniture-category-grid">
            {decorItems.map((item, index) => (
              <div className="furniture-category-card" key={index}>
                <img
                  src={item.image}
                  alt={`Living furniture ${index + 1}`}
                  className="furniture-category-image"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeDecor;
