import { Link } from "react-router-dom";
import "./ProviderCard.css";

export default function ProviderCard({ provider }) {
  {provider.phone && (
  <a
    href={`tel:${provider.phone}`}
    className="search-provider-call"
  >
    Call
  </a>
)}

  return (
    <article className="search-provider-card">

      <div className="search-provider-paw">
        🐾
      </div>

      <span className="search-provider-type">
        {provider.type}
      </span>

      <h3 className="search-provider-name">
        {provider.name}
      </h3>

      <p className="search-provider-location">
        📍 {provider.location}
      </p>

      <div className="search-provider-rating">
        ★ {provider.rating}
      </div>

      <div className="search-provider-actions">

        <Link
         to={`/provider/${provider._id}`}
          className="search-provider-view"
        >
          View details
        </Link>

        <a
          href={`tel:${phone}`}
          className="search-provider-call"
        >
          Call
        </a>

      </div>

    </article>
  );
}