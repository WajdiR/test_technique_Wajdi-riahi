import React, { useState } from 'react';
import styles from './searchBar.module.scss';

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSearch}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter pokemon name or index"
      />
      <button type="submit">SEARCH</button>
    </form>
  );
};

export default SearchBar;
