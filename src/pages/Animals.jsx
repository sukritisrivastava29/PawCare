import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api";

const emptyForm = {
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

const speciesIcons = {
  dog: "🐶",
  cat: "🐱",
  rabbit: "🐰",
  bird: "🐦",
  other: "🐾",
};

function Animals() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingAnimal, setEditingAnimal] = useState(null);
  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem("token");

  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const fetchAnimals = async () => {
    try {
      const response = await fetch(`${API_URL}/animals`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setAnimals(data.animals || []);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Fetch animals error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimals();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ADD ANIMAL
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`${API_URL}/animals`, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({
          ...form,
          age: form.age ? Number(form.age) : undefined,
          weight: form.weight ? Number(form.weight) : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to create animal");
        return;
      }

      setAnimals((prev) => [data.animal, ...prev]);
      setForm(emptyForm);
    } catch (error) {
      console.error("Create animal error:", error);
    } finally {
      setSaving(false);
    }
  };

  // OPEN EDIT
  const handleEdit = (animal) => {
    setEditingAnimal(animal);

    setForm({
      name: animal.name || "",
      species: animal.species || "dog",
      breed: animal.breed || "",
      gender: animal.gender || "unknown",
      age: animal.age ?? "",
      weight: animal.weight ?? "",
      healthStatus: animal.healthStatus || "healthy",
      vaccinationStatus: animal.vaccinationStatus || "up-to-date",
      medicalNotes: animal.medicalNotes || "",
    });
  };

  // UPDATE ANIMAL
  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(
        `${API_URL}/animals/${editingAnimal._id}`,
        {
          method: "PUT",
          headers: authHeaders,
          body: JSON.stringify({
            ...form,
            age: form.age ? Number(form.age) : undefined,
            weight: form.weight ? Number(form.weight) : undefined,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to update animal");
        return;
      }

      setAnimals((prev) =>
        prev.map((animal) =>
          animal._id === editingAnimal._id
            ? data.animal
            : animal
        )
      );

      setEditingAnimal(null);
      setForm(emptyForm);
    } catch (error) {
      console.error("Update animal error:", error);
    } finally {
      setSaving(false);
    }
  };

  // DELETE ANIMAL
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this animal?"
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
        alert(data.message || "Failed to delete animal");
        return;
      }

      setAnimals((prev) =>
        prev.filter((animal) => animal._id !== id)
      );
    } catch (error) {
      console.error("Delete animal error:", error);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-gray-500">
        Loading your animals...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f4] p-6 md:p-10">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-[#d97745] uppercase tracking-wide">
            PawCare
          </p>

          <h1 className="text-4xl font-bold text-[#292722] mt-1">
            My Animals
          </h1>

          <p className="text-[#817b72] mt-2">
            Keep every animal's care information organised.
          </p>
        </div>

        {/* ADD ANIMAL */}
        <div className="bg-white rounded-3xl shadow-sm border border-[#ebe6de] p-6 md:p-8 mb-10">

          <h2 className="text-xl font-bold text-[#292722] mb-6">
            Add an animal
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Animal name *"
              required
              className="input-style"
            />

            <select
              name="species"
              value={form.species}
              onChange={handleChange}
              className="input-style"
            >
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="rabbit">Rabbit</option>
              <option value="bird">Bird</option>
              <option value="other">Other</option>
            </select>

            <input
              name="breed"
              value={form.breed}
              onChange={handleChange}
              placeholder="Breed"
              className="input-style"
            />

            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="input-style"
            >
              <option value="unknown">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <input
              name="age"
              type="number"
              value={form.age}
              onChange={handleChange}
              placeholder="Age"
              className="input-style"
            />

            <input
              name="weight"
              type="number"
              value={form.weight}
              onChange={handleChange}
              placeholder="Weight (kg)"
              className="input-style"
            />

            <select
              name="healthStatus"
              value={form.healthStatus}
              onChange={handleChange}
              className="input-style"
            >
              <option value="healthy">Healthy</option>
              <option value="needs-attention">
                Needs attention
              </option>
              <option value="under-treatment">
                Under treatment
              </option>
            </select>

            <select
              name="vaccinationStatus"
              value={form.vaccinationStatus}
              onChange={handleChange}
              className="input-style"
            >
              <option value="up-to-date">
                Vaccinations up to date
              </option>
              <option value="due">Vaccination due</option>
              <option value="unknown">Unknown</option>
            </select>

            <textarea
              name="medicalNotes"
              value={form.medicalNotes}
              onChange={handleChange}
              placeholder="Medical notes"
              rows="3"
              className="input-style md:col-span-2"
            />

            <button
              type="submit"
              disabled={saving}
              className="md:col-span-2 bg-[#292722] text-white rounded-xl py-3.5 font-semibold hover:bg-[#3b3934] transition disabled:opacity-50"
            >
              {saving ? "Saving..." : "+ Add Animal"}
            </button>

          </form>
        </div>

        {/* ANIMAL LIST */}
        <div>

          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold text-[#292722]">
              Your Animals
            </h2>

            <span className="text-sm text-[#817b72]">
              {animals.length}{" "}
              {animals.length === 1 ? "animal" : "animals"}
            </span>
          </div>

          {animals.length === 0 ? (
            <div className="bg-white border border-dashed border-[#d8d1c7] rounded-3xl p-12 text-center">
              <div className="text-5xl mb-4">🐾</div>

              <h3 className="text-lg font-bold text-[#292722]">
                No animals yet
              </h3>

              <p className="text-[#817b72] mt-1">
                Add your first animal above to start building
                their care profile.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

              {animals.map((animal) => (

                <div
                  key={animal._id}
                  className="bg-white rounded-3xl border border-[#ebe6de] shadow-sm p-6 hover:shadow-md transition"
                >

                  {/* ICON */}
                  <div className="flex items-start justify-between">

                    <div className="w-16 h-16 rounded-2xl bg-[#f5eee6] flex items-center justify-center text-4xl">
                      {speciesIcons[animal.species] || "🐾"}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(animal)}
                        className="px-3 py-1.5 text-sm rounded-lg bg-[#f4f1eb] hover:bg-[#ebe6de]"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(animal._id)}
                        className="px-3 py-1.5 text-sm rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                      >
                        Delete
                      </button>
                    </div>

                  </div>

                  {/* NAME */}
                  <div className="mt-5">

                    <h3 className="text-2xl font-bold text-[#292722]">
                      {animal.name}
                    </h3>

                    <p className="text-[#817b72] capitalize mt-1">
                      {animal.species}
                      {animal.breed
                        ? ` • ${animal.breed}`
                        : ""}
                    </p>

                  </div>

                  {/* BADGES */}
                  <div className="flex flex-wrap gap-2 mt-5">

                    <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold capitalize">
                      {animal.healthStatus}
                    </span>

                    <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
                      {animal.vaccinationStatus ===
                      "up-to-date"
                        ? "Vaccinated"
                        : "Vaccination due"}
                    </span>

                  </div>

                  {/* DETAILS */}
                  <div className="mt-5 pt-5 border-t border-[#eeeae4] grid grid-cols-2 gap-4">

                    <div>
                      <p className="text-xs text-[#999187]">
                        AGE
                      </p>
                      <p className="font-semibold text-[#403d38] mt-1">
                        {animal.age ?? "—"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-[#999187]">
                        WEIGHT
                      </p>
                      <p className="font-semibold text-[#403d38] mt-1">
                        {animal.weight
                          ? `${animal.weight} kg`
                          : "—"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-[#999187]">
                        GENDER
                      </p>
                      <p className="font-semibold text-[#403d38] capitalize mt-1">
                        {animal.gender || "Unknown"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-[#999187]">
                        NOTES
                      </p>
                      <p className="font-semibold text-[#403d38] mt-1 truncate">
                        {animal.medicalNotes || "None"}
                      </p>
                    </div>

                  </div>

                </div>

              ))}

            </div>
          )}

        </div>

      </div>

      {/* EDIT MODAL */}
      {editingAnimal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-5 z-50">

          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-7">

            <div className="flex items-center justify-between mb-6">

              <div>
                <p className="text-sm font-semibold text-[#d97745]">
                  EDIT PROFILE
                </p>

                <h2 className="text-2xl font-bold text-[#292722]">
                  Update {editingAnimal.name}
                </h2>
              </div>

              <button
                onClick={() => {
                  setEditingAnimal(null);
                  setForm(emptyForm);
                }}
                className="text-2xl text-gray-400 hover:text-gray-700"
              >
                ×
              </button>

            </div>

            <form
              onSubmit={handleUpdate}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Animal name"
                required
                className="input-style"
              />

              <select
                name="species"
                value={form.species}
                onChange={handleChange}
                className="input-style"
              >
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="rabbit">Rabbit</option>
                <option value="bird">Bird</option>
                <option value="other">Other</option>
              </select>

              <input
                name="breed"
                value={form.breed}
                onChange={handleChange}
                placeholder="Breed"
                className="input-style"
              />

              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="input-style"
              >
                <option value="unknown">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              <input
                name="age"
                type="number"
                value={form.age}
                onChange={handleChange}
                placeholder="Age"
                className="input-style"
              />

              <input
                name="weight"
                type="number"
                value={form.weight}
                onChange={handleChange}
                placeholder="Weight (kg)"
                className="input-style"
              />

              <select
                name="healthStatus"
                value={form.healthStatus}
                onChange={handleChange}
                className="input-style"
              >
                <option value="healthy">Healthy</option>
                <option value="needs-attention">
                  Needs attention
                </option>
                <option value="under-treatment">
                  Under treatment
                </option>
              </select>

              <select
                name="vaccinationStatus"
                value={form.vaccinationStatus}
                onChange={handleChange}
                className="input-style"
              >
                <option value="up-to-date">
                  Vaccinations up to date
                </option>
                <option value="due">
                  Vaccination due
                </option>
                <option value="unknown">Unknown</option>
              </select>

              <textarea
                name="medicalNotes"
                value={form.medicalNotes}
                onChange={handleChange}
                placeholder="Medical notes"
                rows="3"
                className="input-style md:col-span-2"
              />

              <div className="md:col-span-2 flex gap-3 justify-end mt-2">

                <button
                  type="button"
                  onClick={() => {
                    setEditingAnimal(null);
                    setForm(emptyForm);
                  }}
                  className="px-5 py-3 rounded-xl border border-[#ded9d0] font-semibold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-3 rounded-xl bg-[#292722] text-white font-semibold disabled:opacity-50"
                >
                  {saving ? "Updating..." : "Save changes"}
                </button>

              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}

export default Animals;