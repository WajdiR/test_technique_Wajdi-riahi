import React, { useState, useEffect } from "react";
import PokemonList from "./components/PokemonList/PokemonList";
import SearchBar from "./components/SearchBar/SearchBar";
import { fetchPokemons, fetchPokemonDetails } from "./utils"; // Make sure fetchPokemonDetails is also exported from utils
import styles from "./App.module.scss";
import { useNavigate } from "react-router-dom";
import FilterBar from "./components/FilterBar/FilterBar";

const App = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [pokemonData, setPokemonData] = useState({ results: [], count: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState(""); // Add this line to define filter state
  const limit = 20; // Define the number of items per page
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  const updateUrl = (page, search = "", filter = "") => {
    let newPath = `/page/${page}`;
    if (search) {
      newPath += `?search=${search}`;
    }
    if (filter) {
      if (search) {
        newPath += `&`;
      } else {
        newPath += `?`;
      }
      newPath += `filter=${filter}`;
    }
    navigate(newPath);
  };

  const loadPokemons = async () => {
    setLoading(true);
    try {
      const data = await fetchPokemons(limit, limit * page);
      setPokemonData(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    loadPokemons();
  }, [page, limit]);

  useEffect(() => {
    if (filter) {
      const filtered = pokemonData.results.filter(
        (pokemon) =>
          pokemon.types.some((type) => type.type.name.includes(filter)) ||
          pokemon.abilities.some((ability) =>
            ability.ability.name.includes(filter)
          )
      );
      setFilteredPokemons(filtered);
    } else {
      setFilteredPokemons(pokemonData.results);
    }
  }, [filter, pokemonData.results]);

  const totalPages = Math.ceil(pokemonData.count / limit); // Calculate total pages

  const [searchedPokemon, setSearchedPokemon] = useState(null);

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPokemonDetails(query.toLowerCase());
      setSearchedPokemon([data]); // Wrap the result in an array to match the PokemonList component's expectation
      setPage(0); // Optionally reset the pagination
    } catch (error) {
      setError(`Pokemon not found: "${query}"`); // Provide feedback if no Pokemon is found
      setSearchedPokemon(null); // Clear previous search results
    }
    setLoading(false);
    updateUrl(0, query); // reset to page 0 on new search
  };
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    updateUrl(page, searchedPokemon, newFilter);
  };

  const handlePageChange = (newPage) => {
    setSearchedPokemon(null); // Clear search when changing pages
    setError(null); // Also clear errors
    setPage(newPage);
    updateUrl(newPage, searchedPokemon, filter);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const isSinglePokemonSearch = searchedPokemon && searchedPokemon.length === 1;

  // Check if the filter is applied and there are no results
  const showNoResultsMessage = filter && filteredPokemons.length === 0;

  const removeFilter = () => {
    setFilter("");
  };

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Pokedex</h1>
      <div className={styles.container}>
        <div className={styles.navigation}>
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 0}
          >
            PREVIOUS
          </button>
          <span>Page: {page}</span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages - 1}
          >
            NEXT
          </button>
        </div>

        <SearchBar onSearch={handleSearch} />

        <div className={styles.filterContainer}>
          <FilterBar onFilterChange={setFilter} />
          {filter && (
            <div className={styles.currentFilter}>
              <span> {filter}</span>
              <button
                onClick={removeFilter}
                className={styles.removeFilterButton}
              >
                X
              </button>
            </div>
          )}
        </div>
        {showNoResultsMessage && (
          <p className={styles.noResultsMessage}>No results found !</p>
        )}
        <PokemonList
          pokemons={searchedPokemon || filteredPokemons}
          isSingle={isSinglePokemonSearch} // Pass a prop to indicate a single search result
        />
        {/* {searchedPokemon && ( */}

        {/* )} */}
      </div>
    </div>
  );
};

export default App;
