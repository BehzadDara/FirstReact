import React from 'react';
import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalCount: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalCount, setCurrentPage }) => {
  const totalPages = Math.ceil(totalCount / 5);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>Page {currentPage} of {totalPages}</span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
