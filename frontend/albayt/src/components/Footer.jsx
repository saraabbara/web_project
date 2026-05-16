import { Link } from "react-router-dom";

import locationImg from "../assets/images/location.png";
import phoneImg from "../assets/images/number.png";
import emailImg from "../assets/images/email.png";

import instagramImg from "../assets/images/instagram.png";
import twitterImg from "../assets/images/twitter.png";
import linkedinImg from "../assets/images/linkedin.png";

const exploreLinks = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "Book", path: "/book" },
  { name: "Contact", path: "/contact" },
];

const contactInfo = [
  {
    image: locationImg,
    text: "Jeddah · Riyadh, KSA",
  },
  {
    image: phoneImg,
    text: "+966 55 540 3250",
  },
  {
    image: emailImg,
    text: "info@albaytdecor.com",
  },
];

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

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Brand column */}
          <div className="footer-brand">
            <h3 className="footer-brand-title">MADAYEN & ALBAYT DECOR</h3>

            <p className="footer-brand-text">
              Engineering elegance since 1980.
              <br />
              Showrooms in Jeddah & Riyadh.
            </p>

            <div className="footer-socials">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.link}
                  className="social-circle"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={social.image}
                    alt={social.alt}
                    className="social-image"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Explore column */}
          <div className="footer-column">
            <h4 className="footer-column-title">EXPLORE</h4>

            <div className="footer-links">
              {exploreLinks.map((link, i) => (
                <Link key={i} to={link.path} className="footer-link">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact column */}
          <div className="footer-column">
            <h4 className="footer-column-title">CONTACT</h4>

            <div className="footer-contact-list">
              {contactInfo.map((item, i) => (
                <div key={i} className="footer-contact-item">
                  <img
                    src={item.image}
                    alt=""
                    className="footer-contact-image"
                  />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Mayden & Albayt Decor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
