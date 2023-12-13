// PokemonList.jsx
import React from "react";
import PokemonCard from "../PokemonCard/PokemonCard";
import styles from "./pokemonList.module.scss";

const PokemonList = ({ pokemons }) => {
  if (!pokemons) {
    return <p>Loading...</p>; // Or some other loading indicator
  }

  if (pokemons.length === 0) {
    return <p>No Pokémon found.</p>;
  }

  return (
    <div className={styles.list}>
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokemonList;
