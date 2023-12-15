
import React from "react";
import styles from "./searchBar.module.scss";

const SearchBar = ({ onSearch, searchTerm, setSearchTerm }) => {
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSearch}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Enter pokemon name or index"
      />
      <button type="submit">SEARCH</button>
    </form>
  );
};

export default SearchBar;
