import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import loginImg from "../assets/images/login-image.png";
import eyeImg from "../assets/images/eye.png";
import eyeOffImg from "../assets/images/eye-off.png";

function SignUp() {
  const navigate = useNavigate();

  let [showPassword, setShowPassword] = useState(false);
  let [showConfirmPassword, setShowConfirmPassword] = useState(false);

  let [fullName, setFullName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");

  let [message, setMessage] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !password || !confirmPassword) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/users.php", {
        fullName: fullName,
        email: email,
        password: password,
      });

      console.log("Signup response:", response.data);

      if (response.data.success) {
        setMessage(response.data.message);

        setFullName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        navigate("/login");
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.log("Signup error:", error);
      setMessage("Could not connect to PHP.");
    }
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-left signup-left">
          <Link to="/" className="login-close">
            ×
          </Link>

          <h1 className="login-title">Create Your Account</h1>

          <p className="login-subtitle">
            Join us and unlock a curated world of bespoke design.
          </p>

          <form className="login-form" onSubmit={handleSignUp}>
            <div className="login-group">
              <label>Full Name *</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

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

            <div className="login-group">
              <label>Confirm Password *</label>

              <div className="password-box">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="****************"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <img
                    src={showConfirmPassword ? eyeOffImg : eyeImg}
                    alt={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  />
                </button>
              </div>
            </div>

            {message && <p className="signup-message">{message}</p>}

            <button type="submit" className="login-submit">
              SIGN UP
            </button>

            <p className="signup-text">
              Already have an account?{" "}
              <Link to="/login" className="signup-link">
                Log in
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

export default SignUp;