import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Results } from './components/Results';
import { SearchForm } from './components/SearchForm';

function App() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("react hooks");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => loadData(), []);

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://hn.algolia.com/api/v1/search_by_date?query=${query}&tags=story`
      );
      setResults(response.data.hits);
    } catch (error) {
      setError(error.message);
    }
    
    setLoading(false);
  }

  const handleSearch = event => {
    event.preventDefault();
    loadData();
  }

  return (
    <div
      className="container max-w-full md:max-w-xl mx-auto p-6 md:my-8 bg-green-50 shadow-lg rounded"
    >
      <h1 className="text-yellow-600 text-3xl mb-2">Hacker News</h1>
      <SearchForm
        value={query}
        onChange={event => setQuery(event.target.value)}
        onSearch={handleSearch}
        onClear={() => setQuery("")}
      />
      <hr className="mt-1" />
      <Results loading={loading} error={error} results={results} />
    </div>
  );
}

export default App;
