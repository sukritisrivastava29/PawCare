import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getProviderById } from "../services/api";
import "./ProviderDetails.css";

export default function ProviderDetails() {
  const { id } = useParams();

  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProviderById(id);
        setProvider(data);
      } catch (err) {
        console.error(err);
        setError(
          "We couldn't find the animal care provider you're looking for."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProvider();
  }, [id]);

  if (loading) {
    return (
      <div className="pawcare-app">
        <Navbar />

        <main className="provider-details-page">
          <div className="provider-not-found">
            <div className="provider-paw">🐾</div>
            <h1>Loading provider...</h1>
            <p>Fetching provider information.</p>
          </div>
        </main>
      </div>
    );
  }

  if (error || !provider) {
    return (
      <div className="pawcare-app">
        <Navbar />

        <main className="provider-details-page">
          <div className="provider-not-found">
            <div className="provider-paw">🐾</div>

            <h1>Provider not found</h1>

            <p>
              {error ||
                "We couldn't find the animal care provider you're looking for."}
            </p>

            <Link to="/search" className="back-button">
              ← Back to providers
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const mapsUrl = provider.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        provider.address
      )}`
    : null;

  return (
    <div className="pawcare-app">
      <Navbar />

      <main className="provider-details-page">
        <div className="provider-details-container">

          <Link to="/search" className="provider-back">
            ← Back to providers
          </Link>

          <section className="provider-details-hero">
            <div className="provider-details-icon">🐾</div>

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

              {provider.rating && (
                <div className="provider-rating">
                  <span>★</span> {provider.rating}
                </div>
              )}
            </div>
          </section>

          <div className="provider-details-grid">

            <section className="provider-main-info">

              <div className="provider-info-card">
                <h2>About</h2>

                <p>
                  {provider.description ||
                    "Contact this provider for more information about their animal care services."}
                </p>
              </div>

              <div className="provider-info-card">
                <h2>Services</h2>

                {provider.services?.length > 0 ? (
                  <div className="services-list">
                    {provider.services.map((service, index) => (
                      <div className="service-item" key={index}>
                        <span>✓</span>
                        {service}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>
                    Contact the provider for available services.
                  </p>
                )}
              </div>

            </section>

            <aside className="provider-sidebar">

              <div className="provider-info-card">

                <h2>Contact & Hours</h2>

                {provider.address && (
                  <div className="contact-item">
                    <span>📍</span>

                    <div>
                      <strong>Address</strong>
                      <p>{provider.address}</p>
                    </div>
                  </div>
                )}

                {provider.phone && (
                  <div className="contact-item">
                    <span>📞</span>

                    <div>
                      <strong>Phone</strong>
                      <p>{provider.phone}</p>
                    </div>
                  </div>
                )}

                {provider.hours && (
                  <div className="contact-item">
                    <span>🕐</span>

                    <div>
                      <strong>Hours</strong>
                      <p>{provider.hours}</p>
                    </div>
                  </div>
                )}

                <div className="availability">
                  <span>●</span>
                  Contact provider for current availability
                </div>

                <div className="provider-action-buttons">

                  {provider.phone && (
                    <a
                      href={`tel:${provider.phone}`}
                      className="call-provider-button"
                    >
                      📞 Call provider
                    </a>
                  )}

                  {mapsUrl && (
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="call-provider-button"
                    >
                      📍 Get directions
                    </a>
                  )}

                  {provider.website && (
                    <a
                      href={provider.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="call-provider-button"
                    >
                      🌐 Visit website
                    </a>
                  )}

                </div>

              </div>

            </aside>

          </div>
        </div>
      </main>
    </div>
  );
}