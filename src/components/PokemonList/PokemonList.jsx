import React from "react";
import PokemonCard from "../PokemonCard/PokemonCard";
import styles from "./pokemonList.module.scss";

const PokemonList = ({ pokemons, isSingle }) => {
  const listStyles = isSingle ? styles.singleList : styles.list;

  if (!pokemons || pokemons.length === 0) {
    return <p>No Pokémon found.</p>;
  }

  return (
    <div className={listStyles}>
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} isSingle={isSingle} />
      ))}
    </div>
  );
};

export default PokemonList;
