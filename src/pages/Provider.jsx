import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";
import { providers } from "../data/mockData";

function Provider() {
  const { id } = useParams();

  const provider = providers.find(
    (item) => item.id === Number(id)
  );

  if (!provider) {
    return (
      <div className="page">
        <Navbar />

        <div className="container not-found">
          <h1>Provider not found</h1>
          <Link to="/search" className="button primary">
            Back to search
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <Navbar />

      <main className="provider-page">
        <div className="container">
          <Link to="/search" className="back-link">
            ← Back to providers
          </Link>

          <div className="provider-detail">
            <div className="provider-large-image">
              {provider.image}
            </div>

            <div>
              <span className={provider.open ? "status open" : "status closed"}>
                {provider.open ? "Open now" : "Closed"}
              </span>

              <h1>{provider.name}</h1>

              <p className="large-muted">{provider.type}</p>

              <div className="rating-large">
                ★ {provider.rating}
                <span>({provider.reviews} reviews)</span>
              </div>

              <p className="detail-location">
                📍 {provider.location}
              </p>

              <p className="detail-phone">
                📞 {provider.phone}
              </p>
            </div>
          </div>

          <div className="provider-sections">
            <section className="detail-card">
              <p className="eyebrow">SERVICES</p>
              <h2>Available services</h2>

              <div className="tag-list">
                {provider.services.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </section>

            <section className="detail-card">
              <p className="eyebrow">CONTACT</p>
              <h2>Get in touch</h2>

              <p>
                Contact this provider directly for appointments,
                availability and additional information.
              </p>

              <div className="detail-actions">
                <a
                  href={`tel:${provider.phone}`}
                  className="button primary"
                >
                  Call provider
                </a>

                <Link to="/emergency" className="button secondary">
                  Emergency care
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

export default Provider;