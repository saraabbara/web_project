import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import loginImg from "../assets/images/login-image.png";
import eyeImg from "../assets/images/eye.png";
import eyeOffImg from "../assets/images/eye-off.png";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Please enter your email and password.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/login.php", {
        email: email,
        password: password,
      });

      console.log("Login response:", response.data);

      if (response.data.success) {
        localStorage.setItem("user", JSON.stringify(response.data.user));

        setMessage("Login successful!");

        navigate(from);
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.log("Login error:", error);
      setMessage("Could not connect to PHP.");
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

          <form className="login-form" onSubmit={handleLogin}>
            <div className="login-group">
              <label>Email *</label>

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

            <Link to="/forgot-password" className="forgot-link">
              Forgot Password
            </Link>

            {message && <p className="signup-message">{message}</p>}

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
    </main>
  );
}

export default Login;
