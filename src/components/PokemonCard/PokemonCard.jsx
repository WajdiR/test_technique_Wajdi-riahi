import React, { useState } from "react";
import styles from "./pokemonCard.module.scss";

const PokemonCard = ({ pokemon, isSingle }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleClick = () => {
    setShowDetails(!showDetails);
  };

  // Use the official artwork for the image if available
  const imageUrl =
    pokemon?.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon?.sprites?.front_default;

  return (
    <div className={styles.card} onClick={handleClick}>
      {!showDetails && imageUrl && (
        <img src={imageUrl} alt={pokemon.name} loading="lazy" />
      )}
      <h3>{pokemon.name}</h3>
      <p>ID: {isSingle ? "pokemon" : pokemon.id}</p>
      {showDetails && (
        <div className={styles.stats}>
          {pokemon.stats.map((stat) => (
            <p key={stat.stat.name}>
              {stat.stat.name}: {stat.base_stat}
            </p>
          ))}
        </div>
      )}
      <div className={styles.types}>
        {pokemon.types.map((typeInfo) => (
          <span key={typeInfo.type.name}>
            {typeInfo.type.name.toUpperCase()}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
