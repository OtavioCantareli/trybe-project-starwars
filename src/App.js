import React, { useEffect, useState } from 'react';
import './App.css';
import PlanetsContext from './context';
import Table from './Table';

const url = 'https://swapi-trybe.herokuapp.com/api/planets/';

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const results = await fetch(url).then((response) => response
        .json()
        .then((resp) => resp.results)
        .catch((error) => error));
      setData(results);
    }
    fetchData();
  }, []);

  return (
    <PlanetsContext.Provider value={ data }>
      <Table />
    </PlanetsContext.Provider>
  );
}

export default App;
