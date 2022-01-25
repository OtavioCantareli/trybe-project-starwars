import React, { useEffect, useState } from 'react';
import './App.css';
import PlanetsContext from './context';
import Table from './Table';

const url = 'https://swapi-trybe.herokuapp.com/api/planets/';

function App() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({ filterByName: { name: '' } });
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

  const handleChange = ({ target }) => {
    setFilter({ filterByName: { name: target.value } });
  };

  return (
    <PlanetsContext.Provider value={ data }>
      <input
        data-testid="name-filter"
        placeholder="Filtro por nome"
        type="text"
        name="filterName"
        onChange={ handleChange }
        value={ filter.filterByName.name }
      />
      <Table />
    </PlanetsContext.Provider>
  );
}

export default App;
