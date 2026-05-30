import heroBackground from "../assets/images/heroBackground.png";

import locationImg from "../assets/images/location.png";
import phoneImg from "../assets/images/number.png";
import emailImg from "../assets/images/email.png";

import instagramImg from "../assets/images/instagramBlue.png";
import twitterImg from "../assets/images/twitterBlue.png";
import linkedinImg from "../assets/images/linkedinBlue.png";

import arrowImg from "../assets/images/arrow.png";

import { useState } from "react";
// Imports Axios to send the contact form data from React to PHP
import axios from "axios";

//we store the information in array to make it easier to loop through them using Map
const showrooms = [
  {
    title: "Jeddah Showroom",
    location: "Jeddah – Mushrifah District",
    phone: "+966 12 345 6789",
    email: "name@organization.sa",
  },
  {
    title: "Riyadh Showroom",
    location: "Riyadh – Al Sulaymaniyah District",
    phone: "+966 12 345 6789",
    email: "name@organization.sa",
  },
];

//the links are the social media accounts for the company
const socialLinks = [
  {
    image: instagramImg,
    link: "https://www.instagram.com/albayt_decor?igsh=c2RoYXFoaWk4aGs=",
    alt: "Instagram",
  },
  {
    image: twitterImg,
    link: "https://x.com/albaytdecor?s=21",
    alt: "Twitter",
  },
  {
    image: linkedinImg,
    link: "https://www.linkedin.com/in/albayt-decor-95336365?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    alt: "LinkedIn",
  },
];

function Contact() {
  // Stores the form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Stores the success or error message shown under the form
  const [formMessage, setFormMessage] = useState("");

  const handleChange = (e) => {
    // Gets the name and value from the field that changed
    const { name, value } = e.target;

    // Keeps the old form values and updates only the changed field
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //to check that all fields arent empty before sending to php
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      setFormMessage("Please fill in all fields.");
      return;
    }

    try {
      // Sends the form data to contact.php using POST
      const response = await axios.post(
        "http://localhost:8000/contact.php",
        formData,
      );

      // If PHP saved the message successfully, show success and clear the form
      if (response.data.success) {
        setFormMessage("Message sent successfully.");

        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        // Shows the error message returned from PHP or hardcoded message showing the error
        setFormMessage(response.data.message || "Message could not be sent.");
      }
    } catch (error) {
      console.log("Contact form error:", error);
      setFormMessage("Could not connect to PHP.");
    }
  };

  return (
    <main className="contact-page">
      <section
        className="contact-hero"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="contact-hero-content">
          <p className="contact-label">GET IN TOUCH</p>

          <h1 className="contact-title">
            Let&apos;s design something timeless.
          </h1>

          <p className="contact-subtitle">
            Visit our showrooms in Jeddah and Riyadh, or send us a note.
          </p>
        </div>
      </section>

      <section className="contact-section">
        <div className="contact-container">
          <form className="contact-form-card" onSubmit={handleSubmit}>
            <h2 className="contact-form-title">Send a message</h2>

            <div className="form-row">
              <div className="form-group">
                <label>NAME</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>EMAIL</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>SUBJECT</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>MESSAGE</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Shows success or error message after submitting */}
            {formMessage && <p className="signup-message">{formMessage}</p>}

            {/* Submit button */}
            <button type="submit" className="main-btn contact-send-btn">
              SEND MESSAGE
            </button>
          </form>

          <div className="contact-info-column">
            {showrooms.map((showroom, i) => (
              <div className="showroom-card" key={i}>
                <h3 className="showroom-title">{showroom.title}</h3>

                <div className="showroom-item">
                  <img src={locationImg} alt="" />
                  <span>{showroom.location}</span>
                </div>

                <div className="showroom-item">
                  <img src={phoneImg} alt="" />
                  <span>+966 55 540 3250</span>
                </div>

                <div className="showroom-item">
                  <img src={emailImg} alt="" />
                  <span>info@albaytdecor.com</span>
                </div>
              </div>
            ))}

            <div className="showroom-card follow-card">
              <h3 className="showroom-title">FOLLOW</h3>

              <div className="contact-socials">
                {socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.link}
                    target="_blank"
                    rel="noreferrer"
                    className="contact-social-circle"
                  >
                    <img src={social.image} alt={social.alt} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;
