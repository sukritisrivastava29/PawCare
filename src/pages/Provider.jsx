import { useParams, Link } from "react-router-dom";
import { providers } from "../data/mockData";

export default function Provider() {
  const { id } = useParams();

  const provider = providers.find(
    (item) => String(item.id) === String(id)
  );

  if (!provider) {
    return (
      <main className="provider-page">
        <h1>Provider not found</h1>
        <Link to="/search">← Back to Find Care</Link>
      </main>
    );
  }

  return (
    <main className="provider-page">
      <Link to="/search" className="back-link">
        ← Back to Find Care
      </Link>

      <section className="provider-detail">
        <div className="provider-detail-icon">🐾</div>

        <div>
          <p className="eyebrow">{provider.type}</p>

          <h1>{provider.name}</h1>

          <p className="provider-location">
            📍 {provider.location} · {provider.distance}
          </p>

          <div className="detail-rating">
            ★ {provider.rating} · Trusted provider
          </div>
        </div>
      </section>

      <section className="provider-info-grid">
        <div className="info-box">
          <span>Availability</span>
          <strong>
            {provider.available ? "Available today" : "Currently unavailable"}
          </strong>
        </div>

        <div className="info-box">
          <span>Location</span>
          <strong>{provider.location}</strong>
        </div>

        <div className="info-box">
          <span>Contact</span>
          <strong>{provider.phone}</strong>
        </div>
      </section>

      <section className="provider-about">
        <h2>About this provider</h2>

        <p>
          A trusted animal-care provider offering professional support
          for pets and their owners.
        </p>

        <div className="provider-buttons">
          <a href={`tel:${provider.phone}`}>Call provider</a>
          <button>Get directions</button>
        </div>
      </section>
    </main>
  );
}