import { Link } from "react-router-dom";

function ServiceCard({ service }) {
  return (
    <article className="service-card">
      <div className="service-icon">
        {service.icon}
      </div>

      <h3>{service.name}</h3>

      <p>{service.description}</p>

      <Link to="/search" className="card-link">
        Find care →
      </Link>
    </article>
  );
}

export default ServiceCard;