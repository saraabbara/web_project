import { useState } from "react";
import { Link } from "react-router-dom";
import loginImg from "../assets/images/login-image.png";
import eyeImg from "../assets/images/eye.png";
import eyeOffImg from "../assets/images/eye-off.png";

function Login() {
  let [showPassword, setShowPassword] = useState(false);

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

          <form className="login-form">
            <div className="login-group">
              <label>Email *</label>
              <input type="email" placeholder="youremail@email.com" />
            </div>

            <div className="login-group">
              <label>Password *</label>

              <div className="password-box">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="****************"
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

            <button type="submit" className="login-submit">
              LOG IN
            </button>

            <p className="signup-text">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="signup-link">
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