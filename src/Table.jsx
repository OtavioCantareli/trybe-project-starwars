import React, { useContext, useState, useEffect } from 'react';
import PlanetsContext from './context';

function Table() {
  const data = useContext(PlanetsContext);
  const [filter, setFilter] = useState({ filterByName: { name: '' } });
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const [planets, setPlanets] = useState([]);
  const [options, setOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [currentFilter, setCurrentFilter] = useState([]);

  useEffect(() => {
    setPlanets(data);
  }, [data]);

  const handleFilter = () => {
    const VALUE = parseInt(valueFilter, 10);

    const planetsFiltered = data.filter((planet) => {
      if (comparison === 'maior que') {
        return planet[column] > VALUE;
      }
      if (comparison === 'menor que') {
        return planet[column] < VALUE;
      }
      return planet[column] === valueFilter;
    });

    setOptions(options.filter((option) => option !== column));

    setPlanets(planetsFiltered);

    const filteredOptions = options.filter((option) => option === column);

    setCurrentFilter((oldFilters) => [...oldFilters, filteredOptions]);
  };

  const handleRemoveFilter = (item) => {
    setCurrentFilter(currentFilter.filter((filt) => filt !== item));
  };

  return (
    <>
      <input
        type="text"
        data-testid="name-filter"
        placeholder="Filtro por nome"
        value={ filter.filterByName.name }
        onChange={ ({ target }) => setFilter({ filterByName: { name: target.value } }) }
      />

      <label htmlFor="options">
        <select
          name="options"
          id="options"
          data-testid="column-filter"
          value={ column }
          onChange={ ({ target: { value } }) => setColumn(value) }
        >
          {options.map((option) => (
            <option key={ option } value={ option }>
              {option}
            </option>
          ))}
        </select>
        <select
          name="options"
          id="options"
          data-testid="comparison-filter"
          value={ comparison }
          onChange={ ({ target: { value } }) => setComparison(value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          id="options"
          name="options"
          data-testid="value-filter"
          value={ valueFilter }
          onChange={ ({ target: { value } }) => setValueFilter(value) }
        />
      </label>
      <button data-testid="button-filter" type="button" onClick={ handleFilter }>
        Filtrar
      </button>

      {currentFilter.map((filt, index) => (
        <span id={ filt } key={ index }>
          {filt}
          <button
            type="button"
            data-testid="filter"
            onClick={ () => { handleRemoveFilter(filt); } }
          >
            X
          </button>
        </span>
      ))}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {planets
            .filter((dat) => dat.name.includes(filter.filterByName.name))
            .map((item, index) => (
              <tr key={ index }>
                <td>{item.name}</td>
                <td>{item.rotation_period}</td>
                <td>{item.orbital_period}</td>
                <td>{item.diameter}</td>
                <td>{item.climate}</td>
                <td>{item.gravity}</td>
                <td>{item.terrain}</td>
                <td>{item.surface_water}</td>
                <td>{item.population}</td>
                <td>{item.films}</td>
                <td>{item.created}</td>
                <td>{item.edited}</td>
                <td>{item.url}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
