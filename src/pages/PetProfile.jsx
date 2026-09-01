import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";
import { pet } from "../data/mockData";

function PetProfile() {
  return (
    <div className="page">
      <Navbar />

      <main className="pet-page">
        <div className="container">
          <div className="page-header">
            <p className="eyebrow">MY PET</p>
            <h1>Pet profile</h1>
            <p>Keep your pet's essential information accessible.</p>
          </div>

          <div className="pet-profile-card">
            <div className="pet-profile-image">{pet.image}</div>

            <div className="pet-profile-main">
              <h2>{pet.name}</h2>
              <p>{pet.breed}</p>

              <div className="pet-details">
                <div>
                  <span>Type</span>
                  <strong>{pet.type}</strong>
                </div>

                <div>
                  <span>Age</span>
                  <strong>{pet.age}</strong>
                </div>

                <div>
                  <span>Gender</span>
                  <strong>{pet.gender}</strong>
                </div>

                <div>
                  <span>Weight</span>
                  <strong>{pet.weight}</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="pet-actions">
            <Link to="/health-record" className="action-card">
              <span>📋</span>
              <div>
                <h3>Health Records</h3>
                <p>View vaccinations and health history.</p>
              </div>
              <strong>→</strong>
            </Link>

            <Link to="/search" className="action-card">
              <span>🩺</span>
              <div>
                <h3>Find Care</h3>
                <p>Find a provider for {pet.name}.</p>
              </div>
              <strong>→</strong>
            </Link>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

export default PetProfile;