const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    ...(token && {
      Authorization: `Bearer ${token}`,
    }),
  };
};

export const getProviders = async (params = {}) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value && value !== "All") {
      query.append(key, value);
    }
  });

  const response = await fetch(
    `${API_URL}/providers?${query.toString()}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch providers");
  }

  return response.json();
};

export const getProviderById = async (id) => {
  const response = await fetch(
    `${API_URL}/providers/${id}`
  );

  if (!response.ok) {
    throw new Error("Provider not found");
  }

  return response.json();
};

/* =========================
   ANIMAL API
========================= */

export const getMyAnimals = async () => {
  const response = await fetch(
    `${API_URL}/animals`,
    {
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch animals");
  }

  return response.json();
};

export const createAnimal = async (animalData) => {
  const response = await fetch(
    `${API_URL}/animals`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(animalData),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create animal");
  }

  return response.json();
};

export const updateAnimal = async (id, animalData) => {
  const response = await fetch(
    `${API_URL}/animals/${id}`,
    {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(animalData),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update animal");
  }

  return response.json();
};

export const deleteAnimal = async (id) => {
  const response = await fetch(
    `${API_URL}/animals/${id}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete animal");
  }

  return response.json();
};