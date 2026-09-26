const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

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