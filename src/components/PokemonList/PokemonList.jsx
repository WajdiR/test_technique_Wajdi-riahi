import React from "react";
import PokemonCard from "../PokemonCard/PokemonCard";
import styles from "./pokemonList.module.scss";

const PokemonList = ({ pokemons }) => {
  // Check if pokemons is an array before attempting to map over it
  if (!Array.isArray(pokemons)) {
    // Handle the case where pokemons is not an array, perhaps show a message or return null
    return <p>No Pokémon found or there was an error.</p>;
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
