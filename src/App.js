import React, { useEffect } from 'react';
import axios from 'axios';

function App() {
  useEffect(() => {
    axios.get("http://hn.algolia.com/api/v1/search_by_date?=reacthooks")
      .then(response => console.log(response.data))
      .catch((error) => {
        console.error('Error:', error);
      });
  });

  return (
    <div className="App">App</div>
  );
}

export default App;
