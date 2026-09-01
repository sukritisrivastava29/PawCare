import { Link } from "react-router-dom";

export default function ProviderCard({ provider }) {
  return (
    <article className="provider-card">
      <div className="provider-image">
        <span>{provider.icon}</span>

        {provider.verified && (
          <div className="verified-badge">
            ✓ Verified
          </div>
        )}
      </div>

      <div className="provider-content">
        <div className="provider-type">
          {provider.type}
        </div>

        <h3>{provider.name}</h3>

        <div className="provider-rating">
          <strong>★ {provider.rating}</strong>
          <span>({provider.reviews} reviews)</span>
        </div>

        <div className="provider-location">
          📍 {provider.location}
        </div>

        <p>{provider.description}</p>

        <div className="provider-footer">
          <span className="open-status">
            ● {provider.open ? "Open now" : "Closed"}
          </span>

          <Link to={`/provider/${provider.id}`}>
            View details →
          </Link>
        </div>
      </div>
    </article>
  );
}