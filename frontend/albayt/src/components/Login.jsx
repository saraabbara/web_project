import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// Imports Axios to send the login request from React to PHP
import axios from "axios";

import loginImg from "../assets/images/login-image.png";
import eyeImg from "../assets/images/eye.png";
import eyeOffImg from "../assets/images/eye-off.png";

function Login() {
  // Creates a navigate function used to redirect the user
  const navigate = useNavigate();
   // Gets information about the current route
  const location = useLocation();

  // for usability purpose: we store the page the user was trying to visit before login, if there is no saved page, send them to the home page after login
  const from = location.state?.from || "/";

  // controls whether the password is visible or hidden (the eye is clicked or not)
  const [showPassword, setShowPassword] = useState(false);

  //we store the input value for the email, password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //store the normal message text and the message inside the popup
  const [message, setMessage] = useState("");
  const [loginAlert, setLoginAlert] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

     // Checks that email and password are not empty
    if (!email || !password) {
      const errorMessage = "Please enter your email and password.";
      setMessage(errorMessage);
      // Shows the alert
      setLoginAlert(errorMessage);
      return;
    }

    try {
      // Sends the email and password to login.php using POST
      const response = await axios.post("http://localhost:8000/login.php", {
        email: email,
        password: password,
      });
      //for testing
      console.log("Login response:", response.data);

      //if success
      if (response.data.success) {
        //the same concept of localstorage so react doesnt forget the user when the page is refreshed
        localStorage.setItem("user", JSON.stringify(response.data.user));

        setMessage("Login successful!");
        // for usability purpose: redirects the user to the page they came from or home page
        navigate(from);
      } else {
        const errorMessage =
          response.data.message || "Login failed. Please try again.";

        setMessage(errorMessage);
        setLoginAlert(errorMessage);
      }
    } catch (error) {
      //for testing
      console.log("Login error:", error);

      // Message shown when React cannot connect to PHP
      const errorMessage =
        "Could not connect to the login service. Please make sure PHP and MySQL are running.";

      setMessage(errorMessage);
      setLoginAlert(errorMessage);
    }
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-left">
          <Link to="/" className="login-close">
            ×
          </Link>

          <h1 className="login-title">Log In To Your Account</h1>

          <p className="login-subtitle">
            Check your order status and book new consultations.
          </p>

          {/* Login form */}
          <form className="login-form" onSubmit={handleLogin}>
            <div className="login-group">
              <label>Email *</label>

              {/* type email */}
              <input
                type="email"
                placeholder="youremail@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="login-group">
              <label>Password *</label>

              <div className="password-box">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="****************"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                 {/* Button to show or hide password */}
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <img
                    src={showPassword ? eyeOffImg : eyeImg}
                    alt={showPassword ? "Hide password" : "Show password"}
                  />
                </button>
              </div>
            </div>

            {/* Submit button */}
            <button type="submit" className="login-submit">
              LOG IN
            </button>

            <p className="signup-text">
              Don&apos;t have an account?{" "}
              <Link to="/signup" state={{ from }} className="signup-link">
                Sign Up
              </Link>
            </p>
          </form>
        </div>

        <div className="login-right">
          <img src={loginImg} alt="Luxury interior" className="login-image" />

          <div className="login-image-text">
            <p>MADAYEN &amp; ALBAYT DECOR</p>
            <h2>
              Curated for those who choose the
              <br />
              timeless.
            </h2>
          </div>
        </div>
      </section>

    {/* we did a custom login alert popup for design purposes*/}
      {loginAlert && (
        <div className="cancel-modal-overlay">
          <div className="cancel-modal">
            <div className="cancel-modal-icon">!</div>

            <h2>Login Notice</h2>

            <p>{loginAlert}</p>

            <div className="cancel-modal-actions">
              <button
                type="button"
                className="cancel-modal-confirm"
                onClick={() => setLoginAlert("")}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Login;