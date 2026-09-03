import Navbar from "../components/Navbar";
import "./Emergency.css";

const emergencyProviders = [
  {
    id: 1,
    name: "24/7 Emergency Veterinary Care",
    type: "Emergency Veterinarian",
    location: "Gurgaon",
    phone: "+91 98765 43210",
    availability: "Open 24/7",
  },
  {
    id: 2,
    name: "Delhi Animal Rescue",
    type: "Animal Rescue",
    location: "Delhi",
    phone: "+91 98765 12345",
    availability: "Emergency Rescue",
  },
  {
    id: 3,
    name: "Noida Pet Emergency Centre",
    type: "Emergency Veterinarian",
    location: "Noida",
    phone: "+91 91234 56789",
    availability: "Open 24/7",
  },
];

function Emergency() {
  return (
    <div className="emergency-page">
      <Navbar />

      <main className="emergency-container">

        {/* HERO */}
        <section className="emergency-hero">

          <div className="emergency-badge">
            <span></span>
            EMERGENCY CARE
          </div>

          <h1>
            When every
            <br />
            <span>second matters.</span>
          </h1>

          <p>
            Find emergency veterinary care and animal rescue support
            when your animal needs help quickly.
          </p>

          <div className="emergency-actions">
            <a
              href="tel:112"
              className="emergency-call-button"
            >
              <span>☎</span>
              Call Emergency Services
            </a>

            <a
              href="/search"
              className="find-care-button"
            >
              Find Care Nearby →
            </a>
          </div>

        </section>

        {/* WARNING */}
        <section className="emergency-warning">
          <div className="warning-icon">!</div>

          <div>
            <h3>Is your animal in immediate danger?</h3>

            <p>
              If your animal is severely injured, unconscious, having
              difficulty breathing, bleeding heavily, or experiencing
              seizures, seek professional veterinary help immediately.
            </p>
          </div>
        </section>

        {/* PROVIDERS */}
        <section className="emergency-providers">

          <div className="section-heading">
            <div>
              <p>GET HELP NOW</p>
              <h2>Emergency care near you</h2>
            </div>

            <span>
              {emergencyProviders.length} available providers
            </span>
          </div>

          <div className="emergency-grid">

            {emergencyProviders.map((provider) => (
              <article
                className="emergency-card"
                key={provider.id}
              >

                <div className="provider-top">

                  <div className="provider-icon">
                    ✚
                  </div>

                  <span className="open-status">
                    ● Available
                  </span>

                </div>

                <div className="provider-info">

                  <p className="provider-type">
                    {provider.type}
                  </p>

                  <h3>{provider.name}</h3>

                  <p className="provider-location">
                    ◉ {provider.location}
                  </p>

                  <p className="provider-availability">
                    {provider.availability}
                  </p>

                </div>

                <div className="provider-actions">

                  <a
                    href={`tel:${provider.phone}`}
                    className="call-provider"
                  >
                    Call
                  </a>

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      provider.name + " " + provider.location
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="directions-button"
                  >
                    Directions
                  </a>

                </div>

              </article>
            ))}

          </div>
        </section>

        {/* QUICK HELP */}
        <section className="quick-help">

          <p>QUICK GUIDANCE</p>

          <h2>While you're getting help</h2>

          <div className="help-grid">

            <div className="help-card">
              <span>01</span>
              <h3>Stay calm</h3>
              <p>
                Keep your animal as calm and still as possible,
                especially after an injury.
              </p>
            </div>

            <div className="help-card">
              <span>02</span>
              <h3>Call ahead</h3>
              <p>
                Contact the emergency provider so they can prepare
                for your arrival.
              </p>
            </div>

            <div className="help-card">
              <span>03</span>
              <h3>Follow professional advice</h3>
              <p>
                Follow instructions from a veterinarian or trained
                animal-care professional.
              </p>
            </div>

          </div>

        </section>

        {/* FOOTER NOTE */}
        <div className="emergency-note">
          <strong>PawCare is a care-finding platform.</strong>
          <span>
            It does not provide veterinary diagnosis or treatment.
            In an emergency, contact a qualified professional immediately.
          </span>
        </div>

      </main>
    </div>
  );
}

export default Emergency;