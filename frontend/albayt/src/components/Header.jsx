import { useState, useEffect } from "react";
// useNavigate lets us redirect the user using code
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

// Header component shown at the top of the website
function Header() {
  // Stores whether the user has scrolled down the page
  const [scrolled, setScrolled] = useState(false);
  // Stores the logged-in user if one exists
  const [user, setUser] = useState(null);

  // gets the current page location
  const location = useLocation();
  const navigate = useNavigate();

  //when the user scrolls to change the design of the header: If user scrolls more than 60px -> Header gets class "header-scrolled"
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
    // Gets the saved user from localStorage, same logic as the previous components
    const savedUser = localStorage.getItem("user");
    // If a saved user exists, convert it from JSON text back to an object
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      // If no user is saved, show the login button instead
      setUser(null);
    }
  }, [location]);

  //if the user wants to log out
  const handleLogout = () => {
    // removes the saved user from localStorage
    localStorage.removeItem("user");
    setUser(null);
    //then be directed to the login page
    navigate("/login");
  };

  return (
    <nav className={scrolled ? "header header-scrolled" : "header"}>
      {/* Logo */}
      <div className="header-logo">
        <Link to="/">
          {/* Albayt logo links to the home page */}
          <img src={Albayt} alt="Albayt Logo" className="albayt-logo" />
        </Link>

        {/* Madayen logo links to the home page */}
        <Link to="/">
          <img src={Madayen} alt="Madayen Logo" className="almadayn-logo" />
        </Link>
      </div>

      {/* Nav Links */}
      <div className="header-links">
        {/* Loops through navItems and creates one link for each page */}
        {navItems.map((item, i) => (
          <Link key={i} to={item.path} className="nav-link">
            {item.name}
          </Link>
        ))}
      </div>

      {/* Right Actions */}
      <div className="header-actions">
        {user ? (
          // If the user is logged in, we show profile icon and logout button
          <div className="profile-area">
            {/* Profile icon uses the first letter of the user's full name */}
            <Link to="/appointments" className="profile-icon">
              {user.fullName.charAt(0).toUpperCase()}
            </Link>
            {/* Logout button clears the user and redirects to login */}
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          // If the user is not logged in, show login button
          <Link to="/login" className="main-btn header-btn">
            Log in
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Header;