import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function App() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("react hooks");
  const searchInputRef = useRef();
  
  useEffect(() => loadData(), []);

  const loadData = async () => {
    const response = await axios.get(
      `http://hn.algolia.com/api/v1/search_by_date?query=${query}&tags=story`
    );
    setResults(response.data.hits);
  }

  const handleSearch = event => {
    event.preventDefault();
    loadData();
  }

  const handleClearSearch = () => {
    setQuery("");
    searchInputRef.current.focus();
  }

  return (
    <div className="App">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          ref={searchInputRef}
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
        <button type="button" onClick={handleClearSearch}>Clear</button>
      </form>
      <ul>
        {results.map(result => (
          <li key={result.objectID}>
            <a href={result.url}>{result.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
