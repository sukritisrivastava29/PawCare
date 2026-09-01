import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="pawcare-app">
      <Navbar />

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow">ANIMAL CARE, CONNECTED</p>

            <h1>
              The right care,
              <br />
              <span>when they need it.</span>
            </h1>

            <p className="hero-description">
              Discover vets, emergency care, rescuers, NGOs and other
              animal-care services from one simple platform.
            </p>

            <div className="hero-actions">
              <Link to="/search" className="primary-btn">
                Find care near me
              </Link>

              <Link to="/ai-health" className="ai-btn">
                ✨ Explore AI Health
              </Link>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-circle">
              <div className="pet-illustration">🐕</div>
            </div>

            <div className="trust-card">
              <strong>4.8 ★</strong>
              <span>Trusted local care</span>
            </div>
          </div>
        </section>

        {/* QUICK ACTIONS */}
        <section className="quick-section">
          <div className="section-heading">
            <p className="eyebrow">START HERE</p>
            <h2>Everything your pet needs.</h2>
            <p>
              Find help, manage your pet's information and keep their health
              records in one place.
            </p>
          </div>

          <div className="quick-grid">
            <Link to="/search" className="quick-card">
              <div className="card-icon">⌕</div>
              <h3>Find Care</h3>
              <p>
                Find vets, rescuers, NGOs and pet-care providers around you.
              </p>
              <span>Explore →</span>
            </Link>

            <Link to="/pet" className="quick-card">
              <div className="card-icon">🐾</div>
              <h3>My Pet</h3>
              <p>
                Keep your pet's profile, important details and care information
                organized.
              </p>
              <span>View profile →</span>
            </Link>

            <Link to="/health" className="quick-card">
              <div className="card-icon">♡</div>
              <h3>Health Record</h3>
              <p>
                Track vaccinations, medical history, medications and upcoming
                care.
              </p>
              <span>View records →</span>
            </Link>

            <Link to="/emergency" className="quick-card emergency-card">
              <div className="card-icon">+</div>
              <h3>Emergency</h3>
              <p>
                Quickly access emergency veterinary and animal rescue
                assistance.
              </p>
              <span>Get help →</span>
            </Link>
          </div>
        </section>

        {/* AI SECTION */}
        <section className="ai-section">
          <div>
            <p className="eyebrow">SMARTER PET CARE</p>

            <h2>
              Not sure what
              <br />
              your pet needs?
            </h2>

            <p>
              Use PawCare's AI-assisted health experience to understand
              symptoms, prepare questions for a vet and find the right next
              step.
            </p>

            <Link to="/ai-health" className="primary-btn">
              Try AI Health
            </Link>
          </div>

          <div className="ai-card">
            <div className="ai-card-top">
              <span>✨</span>
              <strong>PawCare AI</strong>
            </div>

            <div className="chat-bubble user-bubble">
              My dog has been scratching a lot today.
            </div>

            <div className="chat-bubble ai-bubble">
              I can help you understand possible causes and suggest what
              information to discuss with a veterinarian.
            </div>

            <div className="ai-input">
              <span>Describe your pet's symptoms...</span>
              <b>→</b>
            </div>
          </div>
        </section>

        {/* PROVIDER CTA */}
        <section className="provider-section">
          <div>
            <p className="eyebrow">LOCAL CARE NETWORK</p>
            <h2>Good care starts with finding the right people.</h2>
          </div>

          <Link to="/search" className="outline-btn">
            Explore providers →
          </Link>
        </section>
      </main>

      <footer>
        <div className="footer-logo">
          ✦ Paw<span>Care</span>
        </div>

        <p>
          A simple digital platform connecting pet owners with animal-care
          services.
        </p>

        <span>© 2026 PawCare</span>
      </footer>
    </div>
  );
}