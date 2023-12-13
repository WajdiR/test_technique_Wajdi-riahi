import React, { useState, useEffect } from "react";
import PokemonList from "./components/PokemonList/PokemonList";
import SearchBar from "./components/SearchBar/SearchBar";
import { fetchPokemons, fetchPokemonDetails } from "./utils"; // Make sure fetchPokemonDetails is also exported from utils
import styles from "./App.module.scss";

const App = () => {
  const [page, setPage] = useState(0);
  const [pokemonData, setPokemonData] = useState({ results: [], count: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const limit = 20; // Define the number of items per page

  useEffect(() => {
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

    loadPokemons();
  }, [page, limit]);

  const totalPages = Math.ceil(pokemonData.count / limit); // Calculate total pages

  const [searchedPokemon, setSearchedPokemon] = useState(null);

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      const data = await fetchPokemonDetails(query.toLowerCase());
      setSearchedPokemon([data]); // Wrap the result in an array to match the PokemonList component's expectation
      setPage(0); // Optionally reset the pagination
    } catch (error) {
      setError(`Pokemon not found: "${query}"`); // Provide feedback if no Pokemon is found
      setSearchedPokemon(null); // Clear previous search results
    }
    setLoading(false);
  };

  const handlePageChange = (newPage) => {
    setSearchedPokemon(null); // Clear search when changing pages
    setError(null); // Also clear errors
    setPage(newPage);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const isSinglePokemonSearch = searchedPokemon && searchedPokemon.length === 1;

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
        <PokemonList
          pokemons={searchedPokemon || pokemonData.results}
          isSingle={isSinglePokemonSearch} // Pass a prop to indicate a single search result
        />
        {/* {searchedPokemon && ( */}

        {/* )} */}
      </div>
    </div>
  );
};

export default App;
