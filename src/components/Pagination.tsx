import React from 'react';
import './styles/pagination.scss';
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

interface Props {
  totalPostsAmount: number,
  postsPerPage: number,
  setCurrentPage: any,
  currentPage: number,
  slicePosts: (page: number) => void
}

const Pagination: React.FC<Props> = ({
  totalPostsAmount, postsPerPage, setCurrentPage, currentPage, slicePosts
}) => {
  const pageNumbers = Array.from({length: Math.ceil(totalPostsAmount / postsPerPage)}, (_, i) => i + 1);

  const handlePagination = (page: number) => {
    setCurrentPage(page);
    slicePosts(page);
  };

  return (
    <div className="pagination">
      {totalPostsAmount > 0
        ?
        <div className="button-container">
          <button onClick={() => handlePagination(currentPage - 1)} className="icon" disabled={currentPage <= 1}>
            <MdNavigateBefore />
          </button>

          {
            pageNumbers.map(pageNumber => (
              <button key={pageNumber - 1}
                onClick={() => handlePagination(pageNumber)}
                className={pageNumber === currentPage ? "active-button" : ""}>
                {pageNumber}
              </button>
            ))
          }

          <button onClick={() => handlePagination(currentPage + 1)} className="icon" disabled={currentPage >= pageNumbers.length}>
            <MdNavigateNext />
          </button>
        </div>
        :
        <div />
      }
    </div>
  );
};

export default Pagination;