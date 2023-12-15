import React from "react";
import PokemonCard from "../PokemonCard/PokemonCard";
import styles from "./pokemonList.module.scss";
import { useLocation } from "react-router-dom";

const PokemonList = ({ pokemons, isSingle }) => {
  const listStyles = isSingle ? styles.singleList : styles.list;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filter = queryParams.get("filter")?.toLowerCase();
  const searchQuery = queryParams.get("q")?.toLowerCase();

  // Filter and search logic
  const filteredPokemons = pokemons.filter((pokemon) => {
    const matchesFilter = filter
      ? pokemon.types.some((type) =>
          type.type.name.toLowerCase().includes(filter)
        )
      : true;
    const matchesSearch = searchQuery
      ? pokemon.name.toLowerCase().includes(searchQuery)
      : true;
    return matchesFilter && matchesSearch;
  });

  return (
    <div className={listStyles}>
      {filteredPokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} isSingle={isSingle} />
      ))}
    </div>
  );
};

export default PokemonList;
