import { useState } from "react";
import Navbar from "../components/Navbar";
import ProviderCard from "../components/ProviderCard";
import { providers } from "../data/mockData";

function Search() {
  const [query, setQuery] = useState("");

  const filtered = providers.filter((provider) =>
    `${provider.name} ${provider.type} ${provider.location}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <div>
      <Navbar />

      <main className="search-page">
        <div className="container">
          <div className="page-heading">
            <p className="eyebrow">CARE DIRECTORY</p>

            <h1>Find animal care near you.</h1>

            <p>
              Search by provider, service or location.
            </p>
          </div>

          <div className="search-box">
            <span>⌕</span>

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search vets, NGOs, rescuers..."
            />

            <span>📍 Gurgaon</span>
          </div>

          <div className="search-results">
            <div className="results-heading">
              <h2>Recommended providers</h2>
              <span>{filtered.length} results</span>
            </div>

            {filtered.map((provider) => (
              <ProviderCard
                key={provider.id}
                provider={provider}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Search;