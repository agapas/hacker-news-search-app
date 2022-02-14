import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function App() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("react hooks");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchInputRef = useRef();
  
  useEffect(() => loadData(), []);

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `http://hn.algolia.com/api/v1/search_by_date?query=${query}&tags=story`
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

  const handleClearSearch = () => {
    setQuery("");
    searchInputRef.current.focus();
  }

  const resultTextColor = loading ? "text-gray-500" : error ? "text-red-500" : "";
  const resultText = loading ? "Loading..." : error ?? "Results:";

  return (
    <div
      className="container max-w-full md:max-w-xl mx-auto p-6 md:my-8 bg-yellow-50 shadow-lg rounded"
    >
      <h1 className="text-gray-500 text-3xl mb-2 font-thin">Hacker News</h1>
      <form className="w-full md:flex" onSubmit={handleSearch}>
        <input
          className="w-full md:w-3/5 border rounded px-2 py-1 mr-2 mb-2"
          type="text"
          ref={searchInputRef}
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button
          className="w-full md:w-1/5 rounded bg-yellow-400 hover:bg-yellow-500 px-2 py-1 mr-2 mb-2"
          type="submit"
        >Search</button>
        <button
          className="w-full md:w-1/5 rounded bg-blue-400 hover:bg-blue-500 px-2 py-1 mb-2"
          type="button"
          onClick={handleClearSearch}
        >Clear</button>
      </form>

      <div className={`${resultTextColor} text-lg mt-2 mb-1`}>{resultText}</div>

      {!loading && !error &&
        <ul className="list-reset leading-normal">
        {results.map(result => (
          <li key={result.objectID}>
            <a
              className={result.url ? "text-blue-600 hover:text-blue-700" : ""}
              href={result.url}
            >{result.title}</a>
          </li>))}
        </ul>
      }
    </div>
  );
}

export default App;
