import React, { useState } from "react";
import styles from "./FilterBar.module.scss";

const FilterBar = ({ onFilterChange, onRemoveFilter }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.filterForm}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Filter by type or ability"
        className={styles.filterInput}
      />
      <button type="submit" className={styles.filterButton}>
        Filter
      </button>
    </form>
  );
};

export default FilterBar;
