import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { providers } from "../data/mockData";
import "./ProviderDetails.css";

export default function ProviderDetails() {
  const { id } = useParams();

  const provider = providers.find(
    (item) => item.id === Number(id)
  );

  // Invalid provider ID
  if (!provider) {
    return (
      <div className="pawcare-app">
        <Navbar />

        <main className="provider-details-page">
          <div className="provider-not-found">
            <div className="provider-paw">🐾</div>
            <h1>Provider not found</h1>
            <p>
              We couldn't find the animal care provider you're looking for.
            </p>

            <Link to="/search" className="back-button">
              ← Back to providers
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="pawcare-app">
      <Navbar />

      <main className="provider-details-page">
        <div className="provider-details-container">

          {/* Back */}
          <Link to="/search" className="provider-back">
            ← Back to providers
          </Link>

          {/* Hero */}
          <section className="provider-details-hero">
            <div className="provider-details-icon">
              🐾
            </div>

            <div className="provider-details-heading">
              <div className="provider-type-row">
                <span className="provider-type">
                  {provider.type}
                </span>

                {provider.verified && (
                  <span className="verified-badge">
                    ✓ Verified
                  </span>
                )}
              </div>

              <h1>{provider.name}</h1>

              <p className="provider-location">
                📍 {provider.location}
              </p>

              <div className="provider-rating">
                <span>★</span> {provider.rating}
              </div>
            </div>
          </section>

          {/* Main content */}
          <div className="provider-details-grid">

            {/* Left */}
            <section className="provider-main-info">

              <div className="provider-info-card">
                <h2>About</h2>
                <p>{provider.description}</p>
              </div>

              <div className="provider-info-card">
                <h2>Services</h2>

                <div className="services-list">
                  {provider.services.map((service, index) => (
                    <div
                      className="service-item"
                      key={index}
                    >
                      <span>✓</span>
                      {service}
                    </div>
                  ))}
                </div>
              </div>

            </section>

            {/* Right */}
            <aside className="provider-sidebar">

              <div className="provider-info-card">
                <h2>Contact & Hours</h2>

                <div className="contact-item">
                  <span>📍</span>
                  <div>
                    <strong>Address</strong>
                    <p>{provider.address}</p>
                  </div>
                </div>

                <div className="contact-item">
                  <span>📞</span>
                  <div>
                    <strong>Phone</strong>
                    <p>{provider.phone}</p>
                  </div>
                </div>

                <div className="contact-item">
                  <span>🕐</span>
                  <div>
                    <strong>Hours</strong>
                    <p>{provider.hours}</p>
                  </div>
                </div>

                <div
                  className={`availability ${
                    provider.available
                      ? "available"
                      : "unavailable"
                  }`}
                >
                  <span>●</span>
                  {provider.available
                    ? "Currently available"
                    : "Currently unavailable"}
                </div>

                <a
                  href={`tel:${provider.phone}`}
                  className="call-provider-button"
                >
                  📞 Call provider
                </a>
              </div>

            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}