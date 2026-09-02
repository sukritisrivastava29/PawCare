import { useParams, Link } from "react-router-dom";
import { providers } from "../data/mockData";
import "./Provider.css";

export default function Provider() {
  const { id } = useParams();

  const provider = providers.find(
    (p) => String(p.id) === String(id)
  );

  if (!provider) {
    return (
      <div className="provider-page">
        <div className="provider-container">
          <Link to="/search" className="provider-back-link">
            ← Back to Find Care
          </Link>

          <div className="provider-not-found">
            <h1>Provider not found</h1>
            <Link to="/search">Return to Find Care</Link>
          </div>
        </div>
      </div>
    );
  }

  const phone = provider.phone || "+91 98765 43210";

  const directionsUrl =
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      provider.location
    )}`;

  return (
    <div className="provider-page">
      <div className="provider-container">

        <Link to="/search" className="provider-back-link">
          ← Back to Find Care
        </Link>

        <section className="provider-hero">

          <span className="provider-tag">
            {provider.type}
          </span>

          <h1>{provider.name}</h1>

          <div className="provider-location">
            <span>⌖</span>
            <span>{provider.location}</span>
          </div>

          <div className="provider-meta">
            <span className="provider-rating">
              ★ {provider.rating}
            </span>

            <span className="provider-divider">•</span>

            <span className="provider-trusted">
              ✓ Trusted provider
            </span>
          </div>

        </section>

        <div className="provider-details-grid">

          <main className="provider-main">

            <section className="provider-info-section">

              <p className="provider-section-label">
                ABOUT
              </p>

              <h2>About this provider</h2>

              <p className="provider-description">
                {provider.description ||
                  "A trusted animal-care provider offering professional support for pets and their owners."}
              </p>

            </section>

            <section className="provider-info-section">

              <p className="provider-section-label">
                CARE & SERVICES
              </p>

              <h2>Services</h2>

              <div className="provider-service-list">
                {(provider.services || [
                  "Veterinary consultation",
                  "Pet health checkup",
                  "Emergency care",
                ]).map((service, index) => (
                  <div
                    className="provider-service-item"
                    key={index}
                  >
                    <span className="provider-service-check">
                      ✓
                    </span>

                    <span>{service}</span>
                  </div>
                ))}
              </div>

            </section>

          </main>

          <aside className="provider-details-card">

            <div className="provider-availability">

              <span
                className={`provider-status-dot ${
                  provider.available
                    ? "is-available"
                    : "is-unavailable"
                }`}
              />

              <div>
                <small>Availability</small>

                <strong>
                  {provider.available
                    ? "Available now"
                    : "Currently unavailable"}
                </strong>
              </div>

            </div>

            <div className="provider-card-divider" />

            <div className="provider-contact-info">

              <div className="provider-contact-item">
                <span className="provider-contact-icon">
                  ⌖
                </span>

                <div>
                  <small>Location</small>
                  <strong>{provider.location}</strong>
                </div>
              </div>

              <div className="provider-contact-item">
                <span className="provider-contact-icon">
                  ☎
                </span>

                <div>
                  <small>Contact</small>
                  <strong>{phone}</strong>
                </div>
              </div>

            </div>

            <div className="provider-details-actions">

              <a
                href={`tel:${phone}`}
                className="provider-primary-btn"
              >
                Call provider
              </a>

              <button
                type="button"
                className="provider-secondary-btn"
                onClick={() =>
                  window.open(
                    directionsUrl,
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              >
                Get directions
              </button>

            </div>

          </aside>

        </div>
      </div>
    </div>
  );
}