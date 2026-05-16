import stepOneImg from "../assets/images/step-one.png";
import stepTwoImg from "../assets/images/step-two.png";
import stepThreeImg from "../assets/images/step-three.png";

const steps = [
  {
    num: "1.",
    title: "Book your appointment",
    image: stepOneImg,
  },
  {
    num: "2.",
    title: "Crafted in our atelier",
    image: stepTwoImg,
  },
  {
    num: "3.",
    title: "Style Your Room",
    image: stepThreeImg,
  },
];

function HowItWorks() {
  return (
    <section className="how-section">
      <div className="how-container">
        <div className="how-heading">
          <h2 className="how-title">How It Works</h2>
          <p className="how-subtitle">Turn your idea in three simple steps</p>
        </div>

        <div className="how-grid">
          {steps.map((step, i) => (
            <div className="how-step" key={i}>
              <div className="how-image-box">
                <img src={step.image} alt={step.title} className="how-image" />

                <div className="step-circle-outer">
                  <div className="step-circle-inner">{step.num}</div>
                </div>
              </div>

              <h3 className="how-step-title">{step.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
