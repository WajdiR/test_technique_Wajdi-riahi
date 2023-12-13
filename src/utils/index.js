export const fetchPokemons = async (limit = 20, offset = 0) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch pokemons");
    }
    const data = await response.json();

    // Fetch details for each Pokémon in parallel to get the images
    const detailedPokemons = await Promise.all(
      data.results.map(async (pokemon) => {
        const detailsResponse = await fetch(pokemon.url);
        return await detailsResponse.json();
      })
    );

    return {
      ...data,
      results: detailedPokemons, // This now includes images and other details
    };
  } catch (error) {
    console.error("Could not fetch the pokemons: ", error);
  }
};

export const fetchPokemonDetails = async (pokemonNameOrId) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId.toLowerCase()}`
    );
    if (!response.ok) {
      throw new Error(
        `Could not fetch details for pokemon: ${pokemonNameOrId}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Could not fetch the pokemon details: ", error);
  }
};
