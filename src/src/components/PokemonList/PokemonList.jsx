import React from "react";
import PokemonCard from "../PokemonCard/PokemonCard";
import styles from "./pokemonList.module.scss";

const PokemonList = ({ pokemons }) => {
  if (!Array.isArray(pokemons)) {
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
