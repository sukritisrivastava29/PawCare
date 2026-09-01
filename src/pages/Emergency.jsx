import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";
import { providers } from "../data/mockData";

function Emergency() {
  const emergencyProviders = providers.filter((provider) =>
    provider.services.includes("Emergency Care")
  );

  return (
    <div className="page">
      <Navbar />

      <main className="emergency-page">
        <div className="container">
          <div className="emergency-header">
            <div className="emergency-symbol">!</div>

            <p className="eyebrow">URGENT PET CARE</p>

            <h1>Pet emergency?</h1>

            <p>
              Stay calm. Find available veterinary care and contact
              information quickly.
            </p>
          </div>

          <div className="emergency-warning">
            <strong>Important</strong>
            <p>
              If your pet is experiencing a life-threatening emergency,
              contact a veterinary professional immediately.
            </p>
          </div>

          <h2 className="emergency-title">Available emergency care</h2>

          <div className="emergency-providers">
            {emergencyProviders.map((provider) => (
              <div className="emergency-provider" key={provider.id}>
                <div>
                  <span className="emergency-open">
                    ● {provider.open ? "Open now" : "Closed"}
                  </span>

                  <h3>{provider.name}</h3>

                  <p>📍 {provider.location}</p>

                  <p>📞 {provider.phone}</p>
                </div>

                <a
                  href={`tel:${provider.phone}`}
                  className="button coral"
                >
                  Call now
                </a>
              </div>
            ))}
          </div>

          <Link to="/search" className="back-link emergency-back">
            ← Find other providers
          </Link>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

export default Emergency;