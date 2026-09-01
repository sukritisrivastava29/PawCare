import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const services = [
  {
    icon: "🩺",
    title: "Veterinary Care",
    text: "Find veterinary services and care for your pet's health needs."
  },
  {
    icon: "✂️",
    title: "Grooming",
    text: "Discover grooming and everyday pet-care services."
  },
  {
    icon: "💉",
    title: "Vaccination",
    text: "Keep track of essential vaccinations and health needs."
  },
  {
    icon: "📋",
    title: "Health Records",
    text: "Keep your pet's important health information organized."
  }
];

function Home() {
  return (
    <div className="page">
      <Navbar />

      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div>
              <p className="section-label">Pet care, simplified</p>

              <h1>
                Better care for
                <span> every paw.</span>
              </h1>

              <p className="hero-text">
                Discover pet-care services, connect with providers and keep
                your pet's important health information in one place.
              </p>

              <div className="hero-actions">
                <Link to="/search" className="btn btn-primary">
                  Find Pet Care
                </Link>

                <Link to="/pet" className="text-link">
                  View my pet →
                </Link>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-circle">
                🐕
              </div>

              <div className="floating-card">
                <span>✓</span>
                Care made easier
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <p className="section-label">Services</p>

            <h2 className="section-title">
              Everything you need for your pet
            </h2>

            <div className="services-grid">
              {services.map((service) => (
                <div className="service-card" key={service.title}>
                  <div className="service-icon">{service.icon}</div>

                  <h3>{service.title}</h3>

                  <p>{service.text}</p>

                  <Link to="/search">Explore →</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section why-section">
          <div className="container why-grid">
            <div>
              <p className="section-label">Why PawCare</p>

              <h2 className="section-title">
                One simple place to manage pet care.
              </h2>
            </div>

            <div className="benefits">
              <div className="benefit">
                <span>01</span>
                <div>
                  <h3>Discover providers</h3>
                  <p>
                    Search for relevant pet-care services and providers.
                  </p>
                </div>
              </div>

              <div className="benefit">
                <span>02</span>
                <div>
                  <h3>Manage information</h3>
                  <p>
                    Keep your pet profile and health information accessible.
                  </p>
                </div>
              </div>

              <div className="benefit">
                <span>03</span>
                <div>
                  <h3>Act quickly in emergencies</h3>
                  <p>
                    Get direct access to the emergency-care experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="emergency-section">
          <div className="container emergency-content">
            <div>
              <p className="section-label">Need urgent help?</p>

              <h2>Pet emergency?</h2>

              <p>
                Quickly access the emergency-care section and find the help
                you need.
              </p>
            </div>

            <Link to="/emergency" className="btn btn-accent">
              Emergency Care →
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;