import { Link } from "react-router-dom";

function ProviderCard({ provider }) {
  return (
    <article className="provider-card">
      <div className="provider-image">
        {provider.image}
      </div>

      <div className="provider-info">
        <div className={provider.open ? "open-status" : "closed-status"}>
          {provider.open ? "● Open now" : "● Closed"}
        </div>

        <h3>{provider.name}</h3>

        <p className="provider-type">
          {provider.type}
        </p>

        <div className="provider-meta">
          <span>★ {provider.rating}</span>
          <span>({provider.reviews})</span>
          <span>• {provider.distance}</span>
        </div>

        <p className="provider-location">
          📍 {provider.location}
        </p>

        <Link
          to={`/provider/${provider.id}`}
          className="provider-button"
        >
          View provider →
        </Link>
      </div>
    </article>
  );
}

export default ProviderCard;