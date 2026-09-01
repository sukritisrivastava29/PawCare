import { Link } from "react-router-dom";

function ServiceCard({ service }) {
  return (
    <Link to="/search" className="service-card">
      <div className="service-icon">{service.icon}</div>

      <h3>{service.name}</h3>

      <p>{service.description}</p>

      <span>Explore →</span>
    </Link>
  );
}

export default ServiceCard;