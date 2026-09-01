import { Link } from "react-router-dom";

function ProviderCard({ provider }) {
  return (
    <article className="provider-card">
      <div className="provider-icon">{provider.icon}</div>

      <div className="provider-content">
        <small className={provider.open ? "open" : "closed"}>
          ● {provider.open ? "Open now" : "Closed"}
        </small>

        <h3>{provider.name}</h3>

        <p>{provider.type}</p>

        <div className="provider-meta">
          ★ {provider.rating}
          <span>({provider.reviews})</span>
          • {provider.distance}
        </div>

        <div className="provider-location">
          📍 {provider.location}
        </div>

        <Link to={`/provider/${provider.id}`} className="provider-link">
          View details →
        </Link>
      </div>
    </article>
  );
}

export default ProviderCard;