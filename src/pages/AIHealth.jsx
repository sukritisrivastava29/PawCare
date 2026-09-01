import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function AIHealth() {
  const [uploaded, setUploaded] = useState(false);

  return (
    <div>
      <Navbar />

      <main className="ai-page">
        <div className="container">
          <Link to="/" className="back-link">
            ← Back home
          </Link>

          <div className="page-heading">
            <p className="eyebrow">AI HEALTH ASSISTANT</p>

            <h1>
              Make pet health
              <span>easier to understand.</span>
            </h1>

            <p>
              Upload a veterinary report and get an organised,
              easy-to-read summary.
            </p>
          </div>

          <div className="ai-grid">
            <div className="upload-card">
              <div className="upload-icon">↑</div>

              <h2>Upload a report</h2>

              <p>
                PDF, image or veterinary document
              </p>

              <input
                type="file"
                id="report"
                onChange={() => setUploaded(true)}
              />

              <label htmlFor="report" className="primary-button">
                {uploaded ? "Report uploaded ✓" : "Choose report"}
              </label>
            </div>

            <div className="ai-result">
              <div className="ai-result-header">
                <span>✨ AI SUMMARY</span>
                <small>Example</small>
              </div>

              <h2>Milo's health report</h2>

              <div className="summary-item">
                <span>Diagnosis</span>
                <strong>Routine health check</strong>
              </div>

              <div className="summary-item">
                <span>Vaccination</span>
                <strong>Rabies — up to date</strong>
              </div>

              <div className="summary-item">
                <span>Medication</span>
                <strong>No medication prescribed</strong>
              </div>

              <div className="summary-item">
                <span>Follow-up</span>
                <strong>Annual check-up recommended</strong>
              </div>

              <p className="ai-disclaimer">
                AI-generated summaries are for organisation and
                understanding only and should not replace veterinary advice.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AIHealth;