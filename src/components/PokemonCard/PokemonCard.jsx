import React from "react";
import styles from "./pokemonCard.module.scss";

const PokemonCard = ({ pokemon }) => {
  // Ensure types is an array before mapping over it
  const types = pokemon.types || [];

  return (
    <div className={styles.card}>
      <img src={pokemon.image} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>
      <p>ID: {pokemon.id}</p>
      <div className={styles.types}>
        {types.map((typeObj) => (
          <span key={typeObj.type.name}>{typeObj.type.name}</span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
