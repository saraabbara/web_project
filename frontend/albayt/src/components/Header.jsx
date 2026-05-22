import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Albayt from "../assets/images/albayt.png";
import Madayen from "../assets/images/almadayn.png";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "Book", path: "/book1" },
  { name: "Appointments", path: "/appointments" },
  { name: "Contact us", path: "/contact" },
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", fn);

    return () => {
      window.removeEventListener("scroll", fn);
    };
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      setUser(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className={scrolled ? "header header-scrolled" : "header"}>
      {/* Logo */}
      <div className="header-logo">
        <Link to="/">
          <img src={Albayt} alt="Albayt Logo" className="albayt-logo" />
        </Link>

        <Link to="/">
          <img src={Madayen} alt="Madayen Logo" className="almadayn-logo" />
        </Link>
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
        {user ? (
          <div className="profile-area">
            <Link to="/appointments" className="profile-icon">
              {user.email ? user.email.charAt(0).toUpperCase() : "U"}
            </Link>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="main-btn header-btn">
            Log in
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Header;