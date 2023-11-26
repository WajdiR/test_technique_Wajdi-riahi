import React from 'react';
import styles from './pagination.module.scss';

const Pagination = ({ onPageChange, page, totalCount, limit }) => {
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className={styles.pagination}>
      <button onClick={() => onPageChange(page - 1)} disabled={page === 0}>
        PREVIOUS
      </button>
      <button onClick={() => onPageChange(page + 1)} disabled={page === totalPages - 1}>
        NEXT
      </button>
    </div>
  );
};

export default Pagination;
