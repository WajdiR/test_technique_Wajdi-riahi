import { gql } from "@apollo/client";

export const GET_POKEMONS = gql`
  query getPokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      results {
        id
        name
        image
        types {
          type {
            name
          }
        }
      }
    }
  }
`;

export const SEARCH_POKEMON = gql`
  query searchPokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      image
      types {
        type {
          name
        }
      }
    }
  }
`;