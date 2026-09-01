import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ServiceCard from "../components/ServiceCard";
import ProviderCard from "../components/ProviderCard";
import { services, providers } from "../data/mockData";

function Home() {
  return (
    <div>
      <Navbar />

      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div>
              <p className="eyebrow">ANIMAL CARE, CONNECTED</p>

              <h1>
                The right care,
                <span>when they need it.</span>
              </h1>

              <p className="hero-text">
                Discover vets, emergency care, rescuers, NGOs and other
                animal-care services from one simple platform.
              </p>

              <div className="hero-actions">
                <Link to="/search" className="primary-button">
                  Find care near me
                </Link>

                <Link to="/ai-health" className="text-button">
                  ✨ Explore AI Health
                </Link>
              </div>
            </div>

            <div className="hero-visual">
              <div className="animal-art">🐕</div>

              <div className="floating-card">
                <strong>4.8 ★</strong>
                <span>Trusted local care</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-title">
              <div>
                <p className="eyebrow">CARE DIRECTORY</p>
                <h2>What does your animal need?</h2>
              </div>
            </div>

            <div className="services-grid">
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="section providers-section">
          <div className="container">
            <div className="section-title">
              <div>
                <p className="eyebrow">NEAR YOU</p>
                <h2>Trusted care providers</h2>
              </div>

              <Link to="/search" className="text-button">
                View all →
              </Link>
            </div>

            <div className="providers-grid">
              {providers.slice(0, 2).map((provider) => (
                <ProviderCard
                  key={provider.id}
                  provider={provider}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="ai-banner">
          <div className="container ai-banner-inner">
            <div>
              <p className="eyebrow">AI-POWERED CARE</p>

              <h2>
                Turn confusing vet reports into
                <span>something you can understand.</span>
              </h2>

              <p>
                Upload a veterinary report and let AI organise key
                information into a simple pet-parent summary.
              </p>
            </div>

            <Link to="/ai-health" className="primary-button">
              Try AI Health →
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;