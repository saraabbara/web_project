import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "Book", path: "/book" },
  { name: "Appointments", path: "/appointments" },
  { name: "Contact us", path: "/contact" },
];

function Header() {
  let [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let fn = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", fn);

    return () => {
      window.removeEventListener("scroll", fn);
    };
  }, []);

  return (
    <nav className={scrolled ? "header header-scrolled" : "header"}>
      {/* Logo */}
      <div className="header-logo">
        <img src="/albayt.png" alt="Albayt Logo" className="albayt-logo" />
        <img src="/almadayn.png" alt="Madayen Logo" className="almadayn-logo" />
      </div>

      {/* Nav Links */}
      <div className="header-links">
        {navItems.map((item, i) => (
          <Link key={i} to={item.path} className="nav-link">
            {item.name}
          </Link>
        ))}
      </div>

      {/* Right Actions */}
      <div className="header-actions">
        <button className="language-btn">العربية</button>
        <button className="gold-btn">LOG IN</button>
      </div>
    </nav>
  );
}

export default Header;
