import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios.get("http://hn.algolia.com/api/v1/search_by_date?query=reacthooks&tags=story")
      .then(response => {
        console.log(response.data);
        setResults(response.data.hits);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div className="App">
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
