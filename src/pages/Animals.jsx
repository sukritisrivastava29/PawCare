import { useEffect, useState } from "react";
import "./Animals.css";
import Navbar from "../components/Navbar";
const API_URL = "https://pawcare-backend-vswt.onrender.com/api";

const initialForm = {
  name: "",
  species: "dog",
  breed: "",
  gender: "unknown",
  age: "",
  weight: "",
  healthStatus: "healthy",
  vaccinationStatus: "up-to-date",
  medicalNotes: "",
};

function Animals() {
  const [animals, setAnimals] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const fetchAnimals = async () => {
    try {
      setError("");

      const response = await fetch(`${API_URL}/animals`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load animals");
      }

      setAnimals(data.animals || []);
    } catch (error) {
      console.error("Fetch animals error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setError("Please login to manage your animals.");
      setLoading(false);
      return;
    }

    fetchAnimals();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Please login first.");
      return;
    }

    setSaving(true);

    try {
      const payload = {
        ...form,
        age: form.age ? Number(form.age) : undefined,
        weight: form.weight ? Number(form.weight) : undefined,
      };

      const url = editingId
        ? `${API_URL}/animals/${editingId}`
        : `${API_URL}/animals`;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: authHeaders,
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            `Failed to ${editingId ? "update" : "create"} animal`
        );
      }

      if (editingId) {
        setAnimals((prev) =>
          prev.map((animal) =>
            animal._id === editingId ? data.animal : animal
          )
        );
      } else {
        setAnimals((prev) => [data.animal, ...prev]);
      }

      setForm(initialForm);
      setEditingId(null);
    } catch (error) {
      console.error("Save animal error:", error);
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (animal) => {
    setEditingId(animal._id);

    setForm({
      name: animal.name || "",
      species: animal.species || "dog",
      breed: animal.breed || "",
      gender: animal.gender || "unknown",
      age: animal.age ?? "",
      weight: animal.weight ?? "",
      healthStatus: animal.healthStatus || "healthy",
      vaccinationStatus:
        animal.vaccinationStatus || "up-to-date",
      medicalNotes: animal.medicalNotes || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this animal profile?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`${API_URL}/animals/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete animal");
      }

      setAnimals((prev) =>
        prev.filter((animal) => animal._id !== id)
      );

      if (editingId === id) {
        setEditingId(null);
        setForm(initialForm);
      }
    } catch (error) {
      console.error("Delete animal error:", error);
      alert(error.message);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(initialForm);
  };
  const getAnimalIcon = (species) => {
    const icons = {
      dog: "🐶",
      cat: "🐱",
      rabbit: "🐰",
      bird: "🐦",
      other: "🐾",
    };

    return icons[species] || "🐾";
  };

  const formatStatus = (status) => {
    if (!status) return "";

    return status
      .split("-")
      .map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(" ");
  };

  if (loading) {
    return (
      <div className="animals-page">
        <div className="animals-loading">
          <div className="loading-paw">🐾</div>
          <p>Loading your animals...</p>
        </div>
      </div>
    );
  }

 return (
  <div className="pawcare-app">
    <Navbar />

    <main className="animals-page">

      <section className="animals-header">
        <div>
          <span className="section-label">PET CARE · PROFILES</span>

          <h1>
            Your animals,
            <span> cared for.</span>
          </h1>

          <p>
            Keep all your pets' information, health details and
            medical notes in one place.
          </p>
        </div>

        <div className="animal-count">
          <strong>{animals.length}</strong>
          <span>
            {animals.length === 1 ? "Animal" : "Animals"}
            <br />
            registered
          </span>
        </div>
      </section>

      {error && (
        <div className="animals-error">
          <span>!</span>
          <p>{error}</p>
        </div>
      )}

      <section className="animal-form-card">

        <div className="form-heading">
          <div className="form-icon">
            {editingId ? "✎" : "+"}
          </div>

          <div>
            <h2>
              {editingId ? "Edit animal" : "Add an animal"}
            </h2>

            <p>
              {editingId
                ? "Update your pet's information."
                : "Create a profile for your pet."}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-grid">

            <div className="input-group">
              <label>Animal name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Bruno"
                required
              />
            </div>

            <div className="input-group">
              <label>Species</label>
              <select
                name="species"
                value={form.species}
                onChange={handleChange}
              >
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="rabbit">Rabbit</option>
                <option value="bird">Bird</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="input-group">
              <label>Breed</label>
              <input
                name="breed"
                value={form.breed}
                onChange={handleChange}
                placeholder="e.g. Golden Retriever"
              />
            </div>

            <div className="input-group">
              <label>Gender</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
              >
                <option value="unknown">Not specified</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="input-group">
              <label>Age</label>
              <input
                name="age"
                type="number"
                min="0"
                value={form.age}
                onChange={handleChange}
                placeholder="Years"
              />
            </div>

            <div className="input-group">
              <label>Weight</label>
              <input
                name="weight"
                type="number"
                min="0"
                step="0.1"
                value={form.weight}
                onChange={handleChange}
                placeholder="Weight in kg"
              />
            </div>

            <div className="input-group">
              <label>Health status</label>
              <select
                name="healthStatus"
                value={form.healthStatus}
                onChange={handleChange}
              >
                <option value="healthy">Healthy</option>
                <option value="needs-attention">
                  Needs attention
                </option>
                <option value="under-treatment">
                  Under treatment
                </option>
              </select>
            </div>

            <div className="input-group">
              <label>Vaccination</label>
              <select
                name="vaccinationStatus"
                value={form.vaccinationStatus}
                onChange={handleChange}
              >
                <option value="up-to-date">
                  Up to date
                </option>
                <option value="due">
                  Vaccination due
                </option>
                <option value="unknown">
                  Unknown
                </option>
              </select>
            </div>

            <div className="input-group full-width">
              <label>Medical notes</label>

              <textarea
                name="medicalNotes"
                value={form.medicalNotes}
                onChange={handleChange}
                placeholder="Add allergies, medication, medical history..."
                rows="4"
              />
            </div>

          </div>

          <div className="form-actions">

            {editingId && (
              <button
                type="button"
                className="cancel-button"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            )}

            <button
              type="submit"
              className="save-button"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : editingId
                ? "Save changes"
                : "Add animal"}
            </button>

          </div>

        </form>
      </section>

      {/* ANIMALS */}
      <section className="animals-list-section">

        <div className="list-heading">
          <div>
            <span className="section-label">MY PETS</span>

            <h2>
              {animals.length > 0
                ? "Your animals"
                : "No animals yet"}
            </h2>
          </div>

          {animals.length > 0 && (
            <span className="list-total">
              {animals.length} profiles
            </span>
          )}
        </div>

        {animals.length === 0 ? (
          <div className="empty-animals">
            <div className="empty-icon">🐾</div>

            <h3>Your pet profiles will appear here</h3>

            <p>
              Add your first animal above to start keeping
              their care information organized.
            </p>
          </div>
        ) : (
          <div className="animal-grid">

            {animals.map((animal) => (
              <article
                className="animal-card"
                key={animal._id}
              >

                {/* CARD TOP */}
                <div className="animal-card-top">

                  <div className="animal-avatar">
                    {getAnimalIcon(animal.species)}
                  </div>

                  <div className="animal-actions">

                    <button
                      className="icon-button edit"
                      onClick={() => handleEdit(animal)}
                      title="Edit"
                    >
                      ✎
                    </button>

                    <button
                      className="icon-button delete"
                      onClick={() =>
                        handleDelete(animal._id)
                      }
                      title="Delete"
                    >
                      ×
                    </button>

                  </div>

                </div>

                {/* NAME */}
                <div className="animal-info">

                  <h3>{animal.name}</h3>

                  <p className="animal-breed">
                    {formatStatus(animal.species)}
                    {animal.breed && ` · ${animal.breed}`}
                  </p>

                </div>

                {/* STATUS */}
                <div className="status-row">

                  <span
                    className={`status-badge health ${animal.healthStatus}`}
                  >
                    <span className="status-dot"></span>
                    {formatStatus(animal.healthStatus)}
                  </span>

                  <span
                    className={`status-badge vaccination ${animal.vaccinationStatus}`}
                  >
                    {animal.vaccinationStatus ===
                    "up-to-date"
                      ? "✓"
                      : "!"}{" "}
                    {formatStatus(
                      animal.vaccinationStatus
                    )}
                  </span>

                </div>

                {/* DETAILS */}
                <div className="animal-details">

                  <div className="detail-item">
                    <span>AGE</span>
                    <strong>
                      {animal.age ?? "—"}
                      {animal.age != null && " yrs"}
                    </strong>
                  </div>

                  <div className="detail-item">
                    <span>WEIGHT</span>
                    <strong>
                      {animal.weight ?? "—"}
                      {animal.weight != null && " kg"}
                    </strong>
                  </div>

                  <div className="detail-item">
                    <span>GENDER</span>
                    <strong>
                      {formatStatus(animal.gender)}
                    </strong>
                  </div>

                </div>

                {/* NOTES */}
                {animal.medicalNotes && (
                  <div className="medical-notes">
                    <span>MEDICAL NOTES</span>
                    <p>{animal.medicalNotes}</p>
                  </div>
                )}

                {/* FOOTER */}
                <div className="animal-card-footer">
                  <button
                    onClick={() => handleEdit(animal)}
                  >
                    View & edit profile
                    <span>→</span>
                  </button>
                </div>

              </article>
            ))}

          </div>
        )}

      </section>
</main>
    </div>
  );
}

export default Animals;