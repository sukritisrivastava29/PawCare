import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const API_URL = "http://localhost:5000/api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  // Password validation
  if (form.password.length < 8) {
    setError("Password must be at least 8 characters long.");
    return;
  }

  setLoading(true);

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: form.email.trim(),
        password: form.password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || "Invalid email or password.");
      return;
    }

    if (!data.token) {
      setError(
        "Login succeeded, but no authentication token was received."
      );
      return;
    }

    localStorage.setItem("token", data.token);

    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    navigate("/animals", { replace: true });
  } catch (error) {
    console.error("Login error:", error);

    setError(
      "Unable to connect to PawCare. Make sure the backend is running."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="login-page">

      {/* LEFT VISUAL */}
      <section className="login-visual">

        <Link to="/" className="login-brand">
          <span className="brand-star">✦</span>
          <span>
            Paw<span>Care</span>
          </span>
        </Link>

        <div className="visual-content">
          <p className="visual-eyebrow">
            ANIMAL CARE, CONNECTED
          </p>

          <h1>
            Better care
            <br />
            for every
            <br />
            <span>animal.</span>
          </h1>

          <p className="visual-description">
            Keep your animals, health records and care information
            organised in one simple place.
          </p>
        </div>

        <div className="pet-decoration">
          <div className="pet-circle">
            🐶
          </div>

          <div className="floating-card">
            <strong>♥ 4.8</strong>
            <span>Trusted local care</span>
          </div>
        </div>

        <p className="visual-footer">
          For pet parents & rescuers
        </p>

      </section>

      {/* RIGHT FORM */}
      <section className="login-form-section">

        <div className="login-form-wrapper">

          {/* Mobile logo */}
          <Link to="/" className="mobile-brand">
            <span>✦</span> Paw<span>Care</span>
          </Link>

          <div className="form-heading">
            <p>WELCOME BACK</p>

            <h2>
              Sign in to PawCare
            </h2>

            <span>
              Continue caring for the animals you love.
            </span>
          </div>

          {/* ERROR */}
          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* EMAIL */}
            <div className="input-group">
              <label htmlFor="email">
                Email address
              </label>

              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="input-group">

              <div className="password-label">
                <label htmlFor="password">
                  Password
                </label>

                <button
                  type="button"
                  className="forgot-password"
                  onClick={() =>
                    alert("Password reset coming soon.")
                  }
                >
                  Forgot password?
                </button>
              </div>

              <input
  type="password"
  name="password"
  value={form.password}
  onChange={handleChange}
  placeholder="Enter your password"
  minLength={8}
  required
/>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              <span>
                {loading ? "Signing in..." : "Sign in"}
              </span>

              {!loading && <span>→</span>}
            </button>

          </form>

          {/* REGISTER FLOW */}
          <div className="login-divider">
            <span>New to PawCare?</span>
          </div>

          <Link
            to="/register"
            className="create-account"
          >
            Create an account
            <span>→</span>
          </Link>

          {/* FOOTER */}
          <p className="login-footer">
            PawCare · Animal care made simpler
          </p>

        </div>

      </section>

    </div>
  );
}

export default Login;