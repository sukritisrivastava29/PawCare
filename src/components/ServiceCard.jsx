import { Link } from "react-router-dom";

export default function ServiceCard({ service }) {
  return (
    <Link
      to={`/search?service=${service.id}`}
      className="service-card"
    >
      <div className="service-icon">
        {service.icon}
      </div>

      <div>
        <h3>{service.name}</h3>
        <p>{service.description}</p>
      </div>

      <span className="service-arrow">↗</span>
    </Link>
  );
}