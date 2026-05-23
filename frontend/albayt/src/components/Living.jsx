import Header from "./Header";
import Footer from "./Footer";

import living1 from "../assets/images/living1.jpg";
import living2 from "../assets/images/Living2.jpg";
import living3 from "../assets/images/Living3.jpg";
import living4 from "../assets/images/Living4.jpg";
import living5 from "../assets/images/Living5.jpg";
import living6 from "../assets/images/Living6.jpg";
import living7 from "../assets/images/Living7.jpg";
import living8 from "../assets/images/Living8.jpg";
import living9 from "../assets/images/Living9.jpg";
import living10 from "../assets/images/Living10.jpg";
import living11 from "../assets/images/Living11.jpg";
import living12 from "../assets/images/Living12.jpg";
import living13 from "../assets/images/Living13.jpg";
import living14 from "../assets/images/Living14.jpg";
import living15 from "../assets/images/Living15.jpg";

const livingItems = [
  { image: living1 },
  { image: living2 },
  { image: living3 },
  { image: living4 },
  { image: living5 },
  { image: living6 },
  { image: living7 },
  { image: living8 },
  { image: living9 },
  { image: living10 },
  { image: living11 },
  { image: living12 },
  { image: living13 },
  { image: living14 },
  { image: living15 },
];

function Living() {
  return (
    <div className="furniture-category-page">
      <Header />

      <section className="furniture-category-hero">
        <p className="furniture-category-label">FURNITURE COLLECTION</p>

        <h1 className="furniture-category-title">Living</h1>

        <p className="furniture-category-description">
          Explore elegant living room furniture for modern interior spaces.
        </p>
      </section>

      <section className="furniture-category-section">
        <div className="furniture-category-container">
          <div className="furniture-category-heading">
            <p className="furniture-category-small-label">LIVING ROOM</p>

            <h2 className="furniture-category-section-title">
              Living Collection
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
