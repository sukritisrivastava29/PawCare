import { Link } from "react-router-dom";

export default function ProviderCard({ provider }) {
  return (
    <article className="provider-card">
      <div className="provider-icon">🐾</div>

      <div className="provider-content">
        <div className="provider-top">
          <span className="provider-type">{provider.type}</span>

          {provider.available && (
            <span className="available">Available</span>
          )}
        </div>

        <h3>{provider.name}</h3>

        <p className="provider-location">
          📍 {provider.location} · {provider.distance}
        </p>

        <div className="provider-rating">
          ★ {provider.rating}
        </div>

        <div className="provider-actions">
          <Link to={`/provider/${provider.id}`}>
            View details
          </Link>

          <a
            className="outline"
            href={`tel:${provider.phone}`}
          >
            Call
          </a>
        </div>
      </div>
    </article>
  );
}