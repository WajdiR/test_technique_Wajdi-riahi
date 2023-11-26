export const fetchPokemons = async (limit = 20, offset = 0) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch pokemons");
  }
  return response.json();
};

export const fetchPokemonDetails = async (pokemonNameOrId) => {
  const pokemonIdentifier =
    typeof pokemonNameOrId === "string"
      ? pokemonNameOrId.toLowerCase()
      : pokemonNameOrId;
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonIdentifier}`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch details for pokemon: ${pokemonNameOrId}`);
  }
  return response.json();
};
