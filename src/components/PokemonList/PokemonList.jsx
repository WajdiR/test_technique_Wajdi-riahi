// PokemonList.jsx
import React from "react";
import PokemonCard from "../PokemonCard/PokemonCard";
import styles from "./pokemonList.module.scss";

const PokemonList = ({ pokemons, isSingle }) => {
  const listStyles = isSingle ? styles.singleList : styles.list;

  // Ensure pokemons is an array before trying to map over it
  return (
    <div className={(styles.list, listStyles)}>
      {pokemons?.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} isSingle={isSingle} />
      ))}
    </div>
  );
};

export default PokemonList;
