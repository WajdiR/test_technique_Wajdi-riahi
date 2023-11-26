import { gql } from "@apollo/client";

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
