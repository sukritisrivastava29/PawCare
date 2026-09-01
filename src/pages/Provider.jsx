import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { providers } from "../data/mockData";

function Provider() {
  const { id } = useParams();

  const provider = providers.find(
    (item) => item.id === Number(id)
  );

  if (!provider) {
    return <div>Provider not found.</div>;
  }

  return (
    <div>
      <Navbar />

      <main className="provider-page">
        <div className="container">
          <Link to="/search" className="back-link">
            ← Back to search
          </Link>

          <div className="provider-hero">
            <div className="large-provider-icon">
              {provider.icon}
            </div>

            <div>
              <span className="open">● Open now</span>

              <h1>{provider.name}</h1>

              <p>{provider.type}</p>

              <div className="large-rating">
                ★ {provider.rating}
                <span>({provider.reviews} reviews)</span>
              </div>

              <p>📍 {provider.location}</p>

              <p>📞 {provider.phone}</p>
            </div>
          </div>

          <div className="provider-detail-grid">
            <section className="detail-box">
              <p className="eyebrow">SERVICES</p>

              <h2>Available care</h2>

              <div className="tags">
                {provider.services.map((service) => (
                  <span key={service}>{service}</span>
                ))}
              </div>
            </section>

            <section className="detail-box">
              <p className="eyebrow">CONTACT</p>

              <h2>Need help?</h2>

              <p>
                Contact this provider for appointments,
                availability and animal-care support.
              </p>

              <a
                href={`tel:${provider.phone}`}
                className="primary-button"
              >
                Call provider
              </a>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Provider;