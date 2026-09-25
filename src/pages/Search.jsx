import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import ProviderCard from "../components/ProviderCard";
import ServiceCard from "../components/ServiceCard";

import { services } from "../data/mockData";
import { getProviders } from "../services/api";

export default function Search() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All");

  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProviders({
          search: query,
          type: category,
          location: location,
          service: serviceId || "",
        });

        setProviders(data.providers || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load care providers.");
        setProviders([]);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchProviders, 300);

    return () => clearTimeout(timer);
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

        <section className="search-container">

          {/* SEARCH */}

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
                    className={category === item ? "selected" : ""}
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
                onChange={(e) => setLocation(e.target.value)}
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
                {loading
                  ? "Finding care providers..."
                  : `${providers.length} places to get help`}
              </h2>
            </div>

            {!loading && (
              <span className="result-count">
                {providers.length} results
              </span>
            )}
          </div>

          {/* ERROR */}

          {error && (
            <div className="empty-results">
              <div>⚠️</div>

              <h3>Something went wrong</h3>

              <p>{error}</p>

              <button onClick={clearFilters}>
                Clear filters
              </button>
            </div>
          )}

          {/* LOADING */}

          {loading && !error && (
            <div className="empty-results">
              <div>🐾</div>

              <h3>Finding care providers...</h3>

              <p>
                Searching our provider database.
              </p>
            </div>
          )}

          {/* PROVIDERS */}

          {!loading && !error && providers.length > 0 && (
            <div className="provider-grid">
              {providers.map((provider) => (
                <ProviderCard
                  key={provider._id}
                  provider={provider}
                />
              ))}
            </div>
          )}

          {/* EMPTY */}

          {!loading && !error && providers.length === 0 && (
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