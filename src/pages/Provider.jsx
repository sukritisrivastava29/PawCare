import { useParams, Link } from "react-router-dom";
import { providers } from "../data/mockData";

export default function Provider() {
  const { id } = useParams();

  const provider = providers.find(
    (p) => String(p.id) === String(id)
  );

  if (!provider) {
    return (
      <div className="provider-page">
        <div className="provider-container">
          <Link to="/search" className="back-link">
            ← Back to Find Care
          </Link>

          <div className="not-found">
            <h1>Provider not found</h1>
            <Link to="/search">Return to Find Care</Link>
          </div>
        </div>
      </div>
    );
  }

  const phone = provider.phone || "+91 98765 43210";

  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    provider.location
  )}`;

  return (
    <div className="provider-page">
      <div className="provider-container">

        <Link to="/search" className="back-link">
          ← Back to Find Care
        </Link>

        {/* HERO */}
        <div className="provider-hero">
          <span className="provider-tag">
            {provider.type}
          </span>

          <h1>{provider.name}</h1>

          <div className="provider-location">
            <span>⌖</span>
            {provider.location}
          </div>

          <div className="provider-meta">
            <span className="rating">
              ★ {provider.rating}
            </span>

            <span className="meta-divider">•</span>

            <span className="trusted">
              ✓ Trusted provider
            </span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="provider-grid">

          <main className="provider-main">

            <section className="info-section">
              <p className="section-label">
                ABOUT
              </p>

              <h2>About this provider</h2>

              <p className="provider-description">
                {provider.description ||
                  "A trusted animal-care provider offering professional support for pets and their owners."}
              </p>
            </section>

            <section className="info-section services-section">
              <p className="section-label">
                CARE & SERVICES
              </p>

              <h2>Services</h2>

              <div className="service-list">
                {(provider.services || [
                  "Veterinary consultation",
                  "Pet health checkup",
                  "Emergency care",
                ]).map((service, index) => (
                  <div className="service-item" key={index}>
                    <span className="service-check">✓</span>
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </section>

          </main>

          {/* SIDE CARD */}
          <aside className="provider-card">

            <div className="availability">
              <span
                className={`status-dot ${
                  provider.available ? "available" : "unavailable"
                }`}
              ></span>

              <div>
                <small>Availability</small>

                <strong>
                  {provider.available
                    ? "Available now"
                    : "Currently unavailable"}
                </strong>
              </div>
            </div>

            <div className="card-divider"></div>

            <div className="contact-info">

              <div className="contact-item">
                <span className="contact-icon">⌖</span>

                <div>
                  <small>Location</small>
                  <strong>{provider.location}</strong>
                </div>
              </div>

              <div className="contact-item">
                <span className="contact-icon">☎</span>

                <div>
                  <small>Contact</small>
                  <strong>{phone}</strong>
                </div>
              </div>

            </div>

            <div className="provider-actions">

              <a
                href={`tel:${phone}`}
                className="primary-btn"
              >
                Call provider
              </a>

              <button
                className="secondary-btn"
                onClick={() =>
                  window.open(directionsUrl, "_blank")
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