import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./HealthRecord.css";
import { createWorker } from "tesseract.js";

const API_URL = "https://pawcare-backend-vswt.onrender.com/api";
const emptyForm = {
  type: "Check-up",
  title: "",
  date: "",
  doctor: "",
  notes: "",
};
function HealthRecord() {
  const token = localStorage.getItem("token");
  const [animals, setAnimals] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  const [records, setRecords] = useState([]);

  const [loadingAnimals, setLoadingAnimals] = useState(true);
  const [loadingRecords, setLoadingRecords] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState(emptyForm);

const [error, setError] = useState("");
const [ocrLoading, setOcrLoading] = useState(false);
const [ocrText, setOcrText] = useState("");
  // --------------------------------
  // GET USER'S ANIMALS
  // --------------------------------

  const fetchAnimals = async () => {
    try {
      setLoadingAnimals(true);

      const response = await fetch(`${API_URL}/animals`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to load animals");
        return;
      }

      const userAnimals = data.animals || [];

      setAnimals(userAnimals);

      if (userAnimals.length > 0) {
        setSelectedAnimal(userAnimals[0]);
      }
    } catch (error) {
      console.error("Fetch animals error:", error);
      setError("Unable to load your animals.");
    } finally {
      setLoadingAnimals(false);
    }
  };

  const fetchRecords = async (animalId) => {
    try {
      setLoadingRecords(true);

      const response = await fetch(
        `${API_URL}/health-records/${animalId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to load health records");
        return;
      }

      setRecords(data.records || []);
    } catch (error) {
      console.error("Fetch records error:", error);
      setError("Unable to load health records.");
    } finally {
      setLoadingRecords(false);
    }
  };


  useEffect(() => {
    fetchAnimals();
  }, []);

 
  useEffect(() => {
    if (selectedAnimal?._id) {
      fetchRecords(selectedAnimal._id);
    } else {
      setRecords([]);
    }
  }, [selectedAnimal]);

  // --------------------------------
  // FORM CHANGE
  // --------------------------------

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
const handleOCR = async (e) => {
  const file = e.target.files?.[0];

  if (!file) return;

  if (!file.type.startsWith("image/")) {
    setError("Please upload a JPG or PNG image.");
    e.target.value = "";
    return;
  }

  try {
    setOcrLoading(true);
    setOcrText("");
    setError("");

    const worker = await createWorker("eng");

    const {
      data: { text },
    } = await worker.recognize(file);

    await worker.terminate();

    const extractedText = text.trim();

    if (!extractedText) {
      setError(
        "I couldn't read any text from this image. Try a clearer photo."
      );
      return;
    }

    setOcrText(extractedText);

    setForm((prev) => ({
      ...prev,
      type: "Other",
      title: "Veterinary report",
      notes: extractedText,
    }));
  } catch (error) {
    console.error("OCR error:", error);

    setError(
      "Unable to read this report. Please try a clearer image."
    );
  } finally {
    setOcrLoading(false);
    e.target.value = "";
  }
};
  // --------------------------------
  // CREATE RECORD
  // --------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedAnimal) return;

    try {
      const response = await fetch(
        `${API_URL}/health-records/${selectedAnimal._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to create record");
        return;
      }

      setRecords((prev) => [data.record, ...prev]);

      setForm(emptyForm);
      setShowForm(false);
    } catch (error) {
      console.error("Create record error:", error);
      alert("Unable to create health record.");
    }
  };

  // --------------------------------
  // DELETE RECORD
  // --------------------------------

  const deleteRecord = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this health record?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${API_URL}/health-records/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to delete record");
        return;
      }

      setRecords((prev) =>
        prev.filter((record) => record._id !== id)
      );
    } catch (error) {
      console.error("Delete record error:", error);
      alert("Unable to delete record.");
    }
  };

  // --------------------------------
  // LOADING
  // --------------------------------

  if (loadingAnimals) {
    return (
      <div className="health-page">
        <Navbar />

        <div className="health-loading">
          Loading your animals...
        </div>
      </div>
    );
  }

  // --------------------------------
  // NO ANIMALS
  // --------------------------------

  if (animals.length === 0) {
    return (
      <div className="health-page">
        <Navbar />

        <main className="health-container">
          <section className="health-empty-page">

            <div className="empty-paw">
              🐾
            </div>

            <p className="health-eyebrow">
              HEALTH RECORDS
            </p>

            <h1>
              Add an animal <span>first.</span>
            </h1>

            <p>
              Your health records are connected to your animals.
              Add an animal to PawCare first, then you can keep
              track of their vaccinations, check-ups and medical
              history here.
            </p>

            <Link
              to="/animals"
              className="add-animal-link"
            >
              Add an animal
              <span>→</span>
            </Link>

          </section>
        </main>
      </div>
    );
  }

  // --------------------------------
  // MAIN PAGE
  // --------------------------------

  return (
    <div className="health-page">

      <Navbar />

      <main className="health-container">

        {/* HEADER */}

        <section className="health-header">

          <div>
            <p className="health-eyebrow">
              HEALTH & WELLNESS
            </p>

            <h1>
              Health <span>record.</span>
            </h1>

            <p className="health-subtitle">
              Keep track of your animal's medical history,
              vaccinations and ongoing care.
            </p>
          </div>

        <button 
  type="button"
  className="add-record-button"
  onClick={() => {
    console.log("ADD RECORD CLICKED");
    setShowForm(true);
  }}
>
  <span>+</span>
  Add health record
</button>
        </section>

        {/* ANIMAL SELECTOR */}

        <section className="animal-selector">

          <div className="animal-selector-label">
            <span>
              VIEWING RECORDS FOR
            </span>

            <select
              value={selectedAnimal?._id || ""}
              onChange={(e) => {
                const animal = animals.find(
                  (item) =>
                    item._id === e.target.value
                );

                setSelectedAnimal(animal);
              }}
            >
              {animals.map((animal) => (
                <option
                  key={animal._id}
                  value={animal._id}
                >
                  {animal.name}
                </option>
              ))}
            </select>
          </div>

          <div className="animal-mini-profile">

            <div className="animal-avatar">
              {selectedAnimal.species === "dog"
                ? "🐶"
                : selectedAnimal.species === "cat"
                ? "🐱"
                : selectedAnimal.species === "rabbit"
                ? "🐰"
                : selectedAnimal.species === "bird"
                ? "🐦"
                : "🐾"}
            </div>

            <div>
              <h3>
                {selectedAnimal.name}
              </h3>

              <p>
                {selectedAnimal.species}
                {selectedAnimal.breed
                  ? ` · ${selectedAnimal.breed}`
                  : ""}
              </p>
            </div>

            <div className="animal-stat">
              <span>WEIGHT</span>

              <strong>
                {selectedAnimal.weight
                  ? `${selectedAnimal.weight} kg`
                  : "—"}
              </strong>
            </div>

            <div className="animal-health-status">
              <span className="status-dot"></span>

              {selectedAnimal.healthStatus ||
                "Healthy"}
            </div>

          </div>

        </section>

        {/* SUMMARY */}

        <section className="health-summary">

          <div className="summary-card">
            <div className="summary-icon">
              💉
            </div>

            <div>
              <span>
                VACCINATION
              </span>

              <strong>
                {selectedAnimal.vaccinationStatus ||
                  "Unknown"}
              </strong>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon">
              🩺
            </div>

            <div>
              <span>
                HEALTH RECORDS
              </span>

              <strong>
                {records.length} records
              </strong>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon">
              📅
            </div>

            <div>
              <span>
                LAST UPDATE
              </span>

              <strong>
                {records.length > 0
                  ? new Date(
                      records[0].date
                    ).toLocaleDateString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )
                  : "No records"}
              </strong>
            </div>
          </div>

        </section>

        {/* ADD RECORD FORM */}

        {showForm && (
          <section className="record-form-card">

            <div className="record-form-header">

              <div>
                <p>NEW RECORD</p>

                <h2>
                  Add health information
                </h2>
              </div>

              <button
                className="close-form"
                onClick={() => setShowForm(false)}
              >
                ×
              </button>

            </div>

            <form
              className="record-form"
              onSubmit={handleSubmit}
            >
<div className="ocr-upload">
  <div className="ocr-upload-header">
    <div>
      <p className="ocr-label">QUICK ADD</p>
      <h3>Upload veterinary report</h3>
      <p>
        Upload a clear JPG or PNG photo and PawCare will
        extract the text for your health record.
      </p>
    </div>
  </div>

  <label
    htmlFor="health-report"
    className="ocr-upload-button"
  >
    {ocrLoading ? "Reading report..." : "Choose report image"}
  </label>

  <input
    id="health-report"
    type="file"
    accept="image/png,image/jpeg,image/jpg"
    onChange={handleOCR}
    disabled={ocrLoading}
    hidden
  />

  {ocrLoading && (
    <div className="ocr-status">
      <span className="ocr-spinner"></span>
      Reading your veterinary report...
    </div>
  )}

  {ocrText && !ocrLoading && (
    <div className="ocr-result">
      <strong>Text extracted successfully</strong>
      <p>
        The extracted information has been added to the
        notes field below. Review it before saving.
      </p>
    </div>
  )}
</div>
              <div className="form-field">
                <label>
                  Record type
                </label>

                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                >
                  <option value="Check-up">
                    Check-up
                  </option>

                  <option value="Vaccination">
                    Vaccination
                  </option>

                  <option value="Medication">
                    Medication
                  </option>

                  <option value="Surgery">
                    Surgery
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>
              </div>

              <div className="form-field">
                <label>
                  Title
                </label>

                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Annual health check"
                  required
                />
              </div>

              <div className="form-field">
                <label>
                  Date
                </label>

                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label>
                  Veterinarian
                </label>

                <input
                  name="doctor"
                  value={form.doctor}
                  onChange={handleChange}
                  placeholder="Dr. name"
                />
              </div>

              <div className="form-field full-width">
                <label>
                  Notes
                </label>

                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Medical notes, observations or instructions..."
                  rows="4"
                />
              </div>

              <div className="form-actions">

                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => {
                    setShowForm(false);
                    setForm(emptyForm);
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-button"
                >
                  Save record
                </button>

              </div>

            </form>

          </section>
        )}

        {/* RECORDS */}

        <section className="records-section">

          <div className="records-heading">

            <div>
              <p className="health-eyebrow">
                MEDICAL HISTORY
              </p>

              <h2>
                {selectedAnimal.name}'s records
              </h2>
            </div>

            <span>
              {records.length} entries
            </span>

          </div>

          {loadingRecords ? (

            <div className="records-loading">
              Loading health records...
            </div>

          ) : records.length === 0 ? (

            <div className="empty-records">

              <div>
                🩺
              </div>

              <h3>
                No health records yet
              </h3>

              <p>
                Add {selectedAnimal.name}'s first health
                record to start building their medical history.
              </p>

              <button
                onClick={() => setShowForm(true)}
              >
                Add first record
              </button>

            </div>

          ) : (

            <div className="records-list">

              {records.map((record) => {

                const icons = {
                  Vaccination: "💉",
                  "Check-up": "🩺",
                  Medication: "💊",
                  Surgery: "🏥",
                  Other: "📋",
                };

                return (
                  <article
                    className="record-card"
                    key={record._id}
                  >

                    <div className="record-icon">
                      {icons[record.type] || "📋"}
                    </div>

                    <div className="record-content">

                      <div className="record-top">

                        <span className="record-type">
                          {record.type}
                        </span>

                        <span className="record-date">
                          {new Date(
                            record.date
                          ).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </span>

                      </div>

                      <h3>
                        {record.title}
                      </h3>

                      {record.doctor && (
                        <p className="record-doctor">
                          🩺 {record.doctor}
                        </p>
                      )}

                      {record.notes && (
                        <p className="record-notes">
                          {record.notes}
                        </p>
                      )}

                    </div>

                    <button
                      className="delete-record"
                      onClick={() =>
                        deleteRecord(record._id)
                      }
                      title="Delete record"
                    >
                      ×
                    </button>

                  </article>
                );
              })}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default HealthRecord;