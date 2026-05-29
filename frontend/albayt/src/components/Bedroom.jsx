import Header from "./Header";
import Footer from "./Footer";

import bedroom1 from "../assets/images/bedroom1.jpg";
import bedroom2 from "../assets/images/bedroom2.jpg";
import bedroom3 from "../assets/images/bedroom3.jpg";
import bedroom4 from "../assets/images/bedroom4.jpg";
import bedroom5 from "../assets/images/bedroom5.jpg";
import bedroom6 from "../assets/images/bedroom6.jpg";
import bedroom7 from "../assets/images/bedroom7.jpg";
import bedroom8 from "../assets/images/bedroom8.jpg";
import bedroom9 from "../assets/images/bedroom9.jpg";
import bedroom10 from "../assets/images/bedroom10.jpg";
import bedroom11 from "../assets/images/bedroom11.jpg";
import bedroom12 from "../assets/images/bedroom12.jpg";
import bedroom13 from "../assets/images/bedroom13.jpg";
import bedroom14 from "../assets/images/bedroom14.jpg";
import bedroom15 from "../assets/images/bedroom15.jpg";

const livingItems = [
  { image: bedroom1 },
  { image: bedroom2 },
  { image: bedroom3 },
  { image: bedroom4 },
  { image: bedroom5 },
  { image: bedroom6 },
  { image: bedroom7 },
  { image: bedroom8 },
  { image: bedroom9 },
  { image: bedroom10 },
  { image: bedroom11 },
  { image: bedroom12 },
  { image: bedroom13 },
  { image: bedroom14 },
  { image: bedroom15 },
];

function Living() {
  return (
    <div className="furniture-category-page">
      <Header />

      <section className="furniture-category-hero">
        <p className="furniture-category-label">FURNITURE COLLECTION</p>

        <h1 className="furniture-category-title">Bedroom</h1>

        <p className="furniture-category-description">
          Explore custom-made, elegant bedroom furniture for interior spaces.
        </p>
      </section>

      <section className="furniture-category-section">
        <div className="furniture-category-container">
          <div className="furniture-category-heading">
            <p className="furniture-category-small-label"> BEDROOM</p>

            <h2 className="furniture-category-section-title">
              Bedroom Collection
            </h2>
          </div>

          <div className="furniture-category-grid">
            {livingItems.map((item, index) => (
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

export default Living;
