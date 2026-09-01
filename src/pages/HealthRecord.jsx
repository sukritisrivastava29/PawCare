import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";
import { healthRecords, pet } from "../data/mockData";

function HealthRecord() {
  return (
    <div className="page">
      <Navbar />

      <main className="records-page">
        <div className="container">
          <div className="page-header">
            <p className="eyebrow">HEALTH</p>
            <h1>{pet.name}'s health records</h1>
            <p>Keep important healthcare information organized.</p>
          </div>

          <div className="health-summary">
            <div>
              <span>Pet</span>
              <strong>{pet.name}</strong>
            </div>

            <div>
              <span>Last checkup</span>
              <strong>02 July 2026</strong>
            </div>

            <div>
              <span>Records</span>
              <strong>{healthRecords.length}</strong>
            </div>
          </div>

          <div className="records-list">
            {healthRecords.map((record) => (
              <div className="record-card" key={record.id}>
                <div className="record-icon">
                  {record.type === "Vaccination" ? "💉" : "🩺"}
                </div>

                <div className="record-content">
                  <span>{record.type}</span>
                  <h3>{record.title}</h3>
                  <p>{record.date}</p>
                </div>

                <div className="record-status">
                  {record.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

export default HealthRecord;