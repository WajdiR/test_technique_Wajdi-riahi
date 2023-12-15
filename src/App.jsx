import React, { useState, useEffect } from "react";
import PokemonList from "./components/PokemonList/PokemonList";
import SearchBar from "./components/SearchBar/SearchBar";
import FilterBar from "./components/FilterBar/FilterBar";
import { fetchPokemons, fetchPokemonDetails } from "./utils";
import styles from "./App.module.scss";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [page, setPage] = useState(0);
  const [pokemonData, setPokemonData] = useState({ results: [], count: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  const [searchedPokemon, setSearchedPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search term
  const limit = 20;

  useEffect(() => {
    loadPokemons();
  }, [page, limit]);

  useEffect(() => {
    setFilteredPokemons();
  }, [filter, pokemonData.results]);

  const handleTitleClick = () => {
    setPage(0);
    setFilter("");
    setSearchTerm("");
    loadPokemons();
  };
  const loadPokemons = async () => {
    setLoading(true);
    try {
      const data = await fetchPokemons(limit, limit * page);
      setPokemonData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const setFilteredPokemons = () => {
    const filtered = filter
      ? pokemonData.results.filter(
          (pokemon) =>
            pokemon.types.some((type) => type.type.name.includes(filter)) ||
            pokemon.abilities.some((ability) =>
              ability.ability.name.includes(filter)
            )
        )
      : pokemonData.results;
    setSearchedPokemon(filtered);
  };

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);

    const trimmedQuery = query.trim(); // Trim the query to remove whitespace

    // Check if the query is empty after trimming
    if (!trimmedQuery) {
      setError("No results found!");
      setSearchedPokemon([]);
      setLoading(false);
      return;
    }

    try {
      const data = await fetchPokemonDetails(trimmedQuery.toLowerCase());
      if (data) {
        setSearchedPokemon([data]);
      } else {
        setError("No results found!"); // Handle no results
        setSearchedPokemon([]);
      }
    } catch (error) {
      setError(`Error occurred: ${error.message}`);
      setSearchedPokemon([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setSearchTerm(""); // Clear the search term when filter changes
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setSearchTerm(""); // Clear the search term when page changes
  };

  const removeFilter = () => {
    setFilter("");
    setSearchTerm(""); // Clear the search term when filter is removed
  };

  const totalPages = Math.ceil(pokemonData.count / limit);
  const showNoResultsMessage = searchedPokemon.length === 0;

  return (
    <div className={styles.app}>
      <h1 className={styles.title} onClick={handleTitleClick}>
        Pokedex
      </h1>
      <div className={styles.container}>
        <div className={styles.navigation}>
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 0}
          >
            PREVIOUS
          </button>
          <span>
            Page: {page + 1} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages - 1}
          >
            NEXT
          </button>
        </div>
        <SearchBar
          onSearch={handleSearch}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <FilterBar onFilterChange={handleFilterChange} />
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
        {showNoResultsMessage && (
          <p className={styles.noResultsMessage}>No results found!</p>
        )}
        {!showNoResultsMessage && (
          <>
            <PokemonList
              pokemons={searchedPokemon}
              isSingle={searchedPokemon.length === 1}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
