import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { SEARCH_POKEMON } from '../graphql/queries';

const usePokemonSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { loading, data, error } = useQuery(SEARCH_POKEMON, {
    variables: { name: searchTerm },
    skip: !searchTerm,
  });

  return {
    searchTerm,
    setSearchTerm,
    searchResults: data,
    searchLoading: loading,
    searchError: error,
  };
};

export default usePokemonSearch;
