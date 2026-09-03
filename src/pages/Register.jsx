import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

const API_URL = "http://localhost:5000/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to create account.");
        return;
      }

      /*
        If your backend returns a token after registration,
        we can automatically log the user in.
      */
      if (data.token) {
        localStorage.setItem("token", data.token);

        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }

        navigate("/animals");
      } else {
        // Otherwise send them to login
        navigate("/login", {
          state: {
            message: "Account created successfully. Please sign in.",
          },
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("Unable to connect to PawCare. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">

      {/* LEFT SIDE */}
      <section className="register-visual">

        <Link to="/" className="register-brand">
          <span className="brand-star">✦</span>
          Paw<span>Care</span>
        </Link>

        <div className="register-visual-content">

          <p className="register-eyebrow">
            WELCOME TO PAWCARE
          </p>

          <h1>
            Care starts
            <br />
            with knowing
            <br />
            <span>them.</span>
          </h1>

          <p>
            Create a PawCare account and keep your animals,
            health information and care details together.
          </p>

        </div>

        <div className="register-pet">
          🐕
        </div>

        <p className="register-visual-footer">
          One place for every animal you care for.
        </p>

      </section>

      {/* RIGHT SIDE */}
      <section className="register-form-section">

        <div className="register-form-wrapper">

          {/* Mobile logo */}
          <Link to="/" className="register-mobile-brand">
            <span>✦</span> Paw<span>Care</span>
          </Link>

          <div className="register-heading">

            <p>GET STARTED</p>

            <h2>
              Create your account
            </h2>

            <span>
              Join PawCare and start organising better care.
            </span>

          </div>

          {error && (
            <div className="register-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="register-input-group">
              <label>Full name</label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>

            <div className="register-input-group">
              <label>Email address</label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="register-input-group">
              <label>Password</label>

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="At least 8 characters"
                minLength="8"
                required
              />
            </div>

            <button
              type="submit"
              className="register-button"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create account"}

              {!loading && <span>→</span>}
            </button>

          </form>

          <div className="register-login">

            <span>
              Already have an account?
            </span>

            <Link to="/login">
              Sign in
            </Link>

          </div>

          <p className="register-footer">
            PawCare · Animal care made simpler
          </p>

        </div>

      </section>

    </div>
  );
}

export default Register;