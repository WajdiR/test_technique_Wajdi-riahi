// PokemonCard.jsx
import React from "react";
import styles from "./pokemonCard.module.scss";

const PokemonCard = ({ pokemon }) => {
  // Optional chaining with a default empty array ensures `.map` is not called on `undefined`.
  const types = pokemon?.types ?? [];

  return (
    <div className={styles.card}>
      {pokemon?.sprites?.other?.["official-artwork"]?.front_default && (
        <img
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
          loading="lazy"
        />
      )}
      <h3>{pokemon?.name}</h3>
      <p>ID: {pokemon?.id}</p>
      <div className={styles.types}>
        {types.map((typeEntry) => (
          <span key={typeEntry.type.name}>
            {typeEntry.type.name.toUpperCase()}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
