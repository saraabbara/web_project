import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// Imports Axios to send the signup request from React to PHP
import axios from "axios";

//same images and logic as login page
import loginImg from "../assets/images/login-image.png";
import eyeImg from "../assets/images/eye.png";
import eyeOffImg from "../assets/images/eye-off.png";

//same logic as login.jsx
function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();

  // If there is no saved page, send them to login after signup
  const from = location.state?.from || "/login";

  let [showPassword, setShowPassword] = useState(false);
  let [showConfirmPassword, setShowConfirmPassword] = useState(false);

  let [fullName, setFullName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");

  let [message, setMessage] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    // Checks that all fields are filled
    if (!fullName || !email || !password || !confirmPassword) {
      setMessage("Please fill in all fields.");
      return;
    }

    // Checks that password and confirm password match
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      // Sends the signup data to users.php using POST
      const response = await axios.post("http://localhost:8000/users.php", {
        fullName: fullName,
        email: email,
        password: password,
      });

      //for testing
      console.log("Signup response:", response.data);

      // If PHP successfully created the account
      if (response.data.success) {
        // Shows the success message returned from PHP and clear the form fields
        setMessage(response.data.message);

        setFullName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        //now login after signup
        navigate("/login", { state: { from } });
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      //for testing
      console.log("Signup error:", error);
      // Shows a message if React could not connect to PHP
      setMessage("Could not connect to PHP.");
    }
  };

  return (
    //the css is similar to login.jsx
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

          {/* Signup form */}
          <form className="login-form" onSubmit={handleSignUp}>
            <div className="login-group">
              <label>Full Name *</label>
              <input
                type="text"
                placeholder="e.g. Ahmad Abdullah"
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

            {/* Shows signup success or error message */}
            {message && <p className="signup-message">{message}</p>}

            {/* Submit button */}
            <button type="submit" className="login-submit">
              SIGN UP
            </button>

            {/* Link to login page if they have an account*/}
            <p className="signup-text">
              Already have an account?{" "}
              <Link to="/login" state={{ from }} className="signup-link">
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
