import React, { useState, useEffect } from "react";
import PokemonList from "./components/PokemonList/PokemonList";
import SearchBar from "./components/SearchBar/SearchBar";
import Pagination from "./components/Pagination/Pagination";
import { fetchPokemons, fetchPokemonDetails } from "./utils"; // Make sure fetchPokemonDetails is also exported from utils
import styles from "./App.module.scss";

const App = () => {
  const [page, setPage] = useState(0);
  const [pokemonData, setPokemonData] = useState({ results: [], count: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPokemons = async () => {
      setLoading(true);
      try {
        const data = await fetchPokemons(20, 20 * page);
        setPokemonData(data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };

    loadPokemons();
  }, [page]);

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

  return (
    <div className={styles.app}>
      <h1>Pokedex</h1>
      <SearchBar onSearch={handleSearch} />
      <PokemonList pokemons={searchedPokemon || pokemonData.results} />
      {!searchedPokemon && (
        <Pagination
          onPageChange={handlePageChange}
          page={page}
          totalCount={pokemonData.count}
          limit={20}
        />
      )}
    </div>
  );
};

export default App;
