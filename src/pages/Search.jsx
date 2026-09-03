import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import ProviderCard from "../components/ProviderCard";
import ServiceCard from "../components/ServiceCard";

import { providers, services } from "../data/mockData";

export default function Search() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All");

  const [searchParams, setSearchParams] = useSearchParams();

  const serviceId = searchParams.get("service");

  const categories = [
    "All",
    "Veterinarian",
    "Emergency",
    "Rescue",
    "NGO",
  ];

  const locations = ["All", "Gurgaon", "Delhi", "Noida"];

  // Handle service card clicks
  useEffect(() => {
    if (!serviceId) return;

    const serviceCategoryMap = {
      "1": "Veterinarian",
      "2": "Emergency",
      "3": "Rescue",
      "4": "NGO",
    };

    const selectedCategory = serviceCategoryMap[serviceId];

    if (selectedCategory) {
      setCategory(selectedCategory);
    }
  }, [serviceId]);

 const filteredProviders = useMemo(() => {
  return providers.filter((provider) => {
    const matchesQuery =
      provider.name.toLowerCase().includes(query.toLowerCase()) ||
      provider.type.toLowerCase().includes(query.toLowerCase()) ||
      provider.location.toLowerCase().includes(query.toLowerCase());

    const matchesCategory =
      category === "All" || provider.type === category;

    const matchesLocation =
      location === "All" || provider.location === location;

    let matchesService = true;

    if (serviceId) {
      const serviceMap = {
        "1": ["Veterinarian"],
        "2": ["Veterinarian", "Emergency"],
        "3": ["Rescue"],
        "4": ["NGO"],
      };

      matchesService =
        serviceMap[serviceId]?.includes(provider.type) ?? true;
    }

    return (
      matchesQuery &&
      matchesCategory &&
      matchesLocation &&
      matchesService
    );
  });
}, [query, category, location, serviceId]);

  const clearFilters = () => {
    setQuery("");
    setCategory("All");
    setLocation("All");
    setSearchParams({});
  };

  return (
    <div className="pawcare-app">
      <Navbar />

      <main className="search-page">

        {/* HERO */}
        <section className="search-hero">
          <div>
            <p className="eyebrow">FIND ANIMAL CARE</p>

            <h1>
              Find the right
              <br />
              <span>care nearby.</span>
            </h1>

            <p>
              Search veterinarians, emergency services, rescuers and animal
              welfare organizations in one place.
            </p>
          </div>
        </section>

        {/* SEARCH */}
        <section className="search-container">

          <div className="search-box">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search vets, rescuers, NGOs..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            {query && (
              <button onClick={() => setQuery("")}>
                ×
              </button>
            )}
          </div>

          {/* FILTERS */}
          <div className="filter-row">

            <div className="filter-group">
              <span>Type</span>

              <div className="filter-buttons">
                {categories.map((item) => (
                  <button
                    key={item}
                    className={
                      category === item ? "selected" : ""
                    }
                    onClick={() => {
                      setCategory(item);
                      setSearchParams({});
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <span>Location</span>

              <select
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
              >
                {locations.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

          </div>

          {/* RESULTS HEADER */}
          <div className="results-header">
            <div>
              <p className="eyebrow">CARE PROVIDERS</p>

              <h2>
                {filteredProviders.length} places to get help
              </h2>
            </div>

            <span className="result-count">
              {filteredProviders.length} results
            </span>
          </div>

          {/* PROVIDERS */}
          {filteredProviders.length > 0 ? (
            <div className="provider-grid">
              {filteredProviders.map((provider) => (
                <ProviderCard
                  key={provider.id}
                  provider={provider}
                />
              ))}
            </div>
          ) : (
            <div className="empty-results">
              <div>🐾</div>

              <h3>No care providers found</h3>

              <p>
                Try another search term or change your filters.
              </p>

              <button onClick={clearFilters}>
                Clear filters
              </button>
            </div>
          )}

        </section>

        {/* SERVICES */}
        <section className="services-section">

          <div>
            <p className="eyebrow">
              WHAT DO YOU NEED?
            </p>

            <h2>Explore care services</h2>
          </div>

          <div className="service-grid">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
              />
            ))}
          </div>

        </section>

      </main>
    </div>
  );
}