import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function AIHealth() {
  const [uploaded, setUploaded] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      setFileName(file.name);
      setUploaded(true);
    }
  };

  return (
    <div className="pawcare-app">
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
              <span> easier to understand.</span>
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
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleUpload}
              />

              <label
                htmlFor="report"
                className="primary-button"
              >
                {uploaded
                  ? "Report uploaded ✓"
                  : "Choose report"}
              </label>

              {uploaded && fileName && (
                <p className="uploaded-file">
                  {fileName}
                </p>
              )}

            </div>

            {uploaded ? (
              <div className="ai-result">

                <div className="ai-result-header">
                  <span>✦ AI SUMMARY</span>
                  <small>Generated</small>
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

                <Link
                  to="/search"
                  className="ai-care-button"
                >
                  Find nearby care
                </Link>

                <p className="ai-disclaimer">
                  AI-generated summaries are for organisation
                  and understanding only and should not replace
                  veterinary advice.
                </p>

              </div>
            ) : (
              <div className="ai-result ai-result-empty">

                <div className="ai-result-header">
                  <span>✦ AI SUMMARY</span>
                </div>

                <h2>Your report summary will appear here.</h2>

                <p>
                  Upload a veterinary document and PawCare AI
                  will organise the important information into
                  an easier-to-read format.
                </p>

              </div>
            )}

          </div>

        </div>
      </main>
    </div>
  );
}

export default AIHealth;