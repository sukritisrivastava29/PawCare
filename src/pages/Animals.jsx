import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api";

function Animals() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    species: "dog",
    breed: "",
    gender: "unknown",
    age: "",
    weight: "",
    healthStatus: "healthy",
    vaccinationStatus: "up-to-date",
    medicalNotes: "",
  });

  const token = localStorage.getItem("token");

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/animals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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

      setForm({
        name: "",
        species: "dog",
        breed: "",
        gender: "unknown",
        age: "",
        weight: "",
        healthStatus: "healthy",
        vaccinationStatus: "up-to-date",
        medicalNotes: "",
      });
    } catch (error) {
      console.error("Create animal error:", error);
    }
  };

  if (loading) {
    return <p>Loading animals...</p>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">
        My Animals
      </h1>

      <p className="text-gray-500 mb-8">
        Manage your pets and their health information.
      </p>

      {/* Add Animal */}
      <div className="bg-white rounded-2xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6">
          Add Animal
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Animal name"
            required
            className="border rounded-lg p-3"
          />

          <select
            name="species"
            value={form.species}
            onChange={handleChange}
            className="border rounded-lg p-3"
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
            className="border rounded-lg p-3"
          />

          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="border rounded-lg p-3"
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
            className="border rounded-lg p-3"
          />

          <input
            name="weight"
            type="number"
            value={form.weight}
            onChange={handleChange}
            placeholder="Weight (kg)"
            className="border rounded-lg p-3"
          />

          <select
            name="healthStatus"
            value={form.healthStatus}
            onChange={handleChange}
            className="border rounded-lg p-3"
          >
            <option value="healthy">Healthy</option>
            <option value="needs-attention">Needs attention</option>
            <option value="under-treatment">Under treatment</option>
          </select>

          <select
            name="vaccinationStatus"
            value={form.vaccinationStatus}
            onChange={handleChange}
            className="border rounded-lg p-3"
          >
            <option value="up-to-date">Vaccinations up to date</option>
            <option value="due">Vaccination due</option>
            <option value="unknown">Unknown</option>
          </select>

          <textarea
            name="medicalNotes"
            value={form.medicalNotes}
            onChange={handleChange}
            placeholder="Medical notes"
            className="border rounded-lg p-3 md:col-span-2"
            rows="3"
          />

          <button
            type="submit"
            className="bg-orange-500 text-white rounded-lg p-3 font-semibold hover:bg-orange-600 md:col-span-2"
          >
            + Add Animal
          </button>
        </form>
      </div>

      {/* Animal List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Your Animals
        </h2>

        {animals.length === 0 ? (
          <p className="text-gray-500">
            No animals added yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {animals.map((animal) => (
              <div
                key={animal._id}
                className="bg-white rounded-2xl shadow p-5"
              >
                <div className="text-4xl mb-3">
                  {animal.species === "dog"
                    ? "🐶"
                    : animal.species === "cat"
                    ? "🐱"
                    : animal.species === "rabbit"
                    ? "🐰"
                    : animal.species === "bird"
                    ? "🐦"
                    : "🐾"}
                </div>

                <h3 className="text-xl font-bold">
                  {animal.name}
                </h3>

                <p className="text-gray-500 capitalize">
                  {animal.species}
                  {animal.breed ? ` • ${animal.breed}` : ""}
                </p>

                <div className="mt-4 space-y-1 text-sm">
                  <p>Age: {animal.age ?? "—"}</p>
                  <p>Weight: {animal.weight ?? "—"} kg</p>
                  <p>Gender: {animal.gender}</p>
                  <p>Health: {animal.healthStatus}</p>
                  <p>Vaccination: {animal.vaccinationStatus}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Animals;