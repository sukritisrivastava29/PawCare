import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to load user:", error);
      }
    }
  }, []);

  if (!user) {
    return (
      <div className="pawcare-app">
        <Navbar />

        <main className="profile-page">
          <div className="profile-container">
            <div className="profile-empty">
              <div className="profile-empty-icon">✦</div>

              <h2>Profile unavailable</h2>

              <p>
                We couldn't find your account information.
                Please log in again.
              </p>

              <Link to="/login" className="profile-primary-btn">
                Log in
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const displayName =
    user.name ||
    user.fullName ||
    user.username ||
    "PawCare User";

  const email = user.email || "No email available";

  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="pawcare-app">
      <Navbar />

      <main className="profile-page">
        <div className="profile-container">

          {/* BACK */}
          <Link to="/" className="profile-back">
            ← Back home
          </Link>

          {/* HEADER */}
          <section className="profile-heading">
            <p className="profile-eyebrow">YOUR ACCOUNT</p>

            <h1>
              Your PawCare
              <span> profile.</span>
            </h1>

            <p>
              Manage your account information and keep your
              PawCare details in one place.
            </p>
          </section>

          {/* PROFILE CARD */}
          <section className="profile-card">

            <div className="profile-card-top">

              <div className="profile-avatar">
                {initial}
              </div>

              <div className="profile-user-info">
                <h2>{displayName}</h2>
                <p>{email}</p>

                <span className="profile-member">
                  PawCare member
                </span>
              </div>

            </div>

            <div className="profile-divider" />

            {/* ACCOUNT DETAILS */}
            <div className="profile-section">

              <div className="profile-section-heading">
                <div>
                  <p className="profile-section-label">
                    ACCOUNT DETAILS
                  </p>

                  <h3>Your information</h3>
                </div>
              </div>

              <div className="profile-details">

                <div className="profile-detail">
                  <span className="detail-label">
                    Full name
                  </span>

                  <span className="detail-value">
                    {displayName}
                  </span>
                </div>

                <div className="profile-detail">
                  <span className="detail-label">
                    Email address
                  </span>

                  <span className="detail-value">
                    {email}
                  </span>
                </div>

                <div className="profile-detail">
                  <span className="detail-label">
                    Phone number
                  </span>

                  <span className="detail-value">
                    {user.phone || "Not added"}
                  </span>
                </div>

                <div className="profile-detail">
                  <span className="detail-label">
                    Location
                  </span>

                  <span className="detail-value">
                    {user.location || "Not added"}
                  </span>
                </div>

              </div>
            </div>

          </section>

          {/* QUICK ACTIONS */}
          <section className="profile-actions">

            <Link to="/animals" className="profile-action-card">
              <div className="action-icon">♡</div>

              <div>
                <h3>My Animals</h3>
                <p>
                  View and manage your animals
                </p>
              </div>

              <span className="action-arrow">→</span>
            </Link>

            <Link to="/health" className="profile-action-card">
              <div className="action-icon">▤</div>

              <div>
                <h3>Health Records</h3>
                <p>
                  View your animals' health information
                </p>
              </div>

              <span className="action-arrow">→</span>
            </Link>

          </section>

          {/* FOOTER */}
          <p className="profile-footer">
            PawCare · Animal care made simpler
          </p>

        </div>
      </main>
    </div>
  );
}

export default Profile;