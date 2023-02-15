import React from 'react';
import './styles/pagination.scss';
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

interface Props {
  postsPerPage: number,
  totalPostsAmount: number,
  setCurrentPage: any
  currentPage: number
}

const Pagination: React.FC<Props> = ({
  postsPerPage, totalPostsAmount, setCurrentPage, currentPage
}) => {
  let pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(totalPostsAmount / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      {totalPostsAmount > 0
        ?
        <div className="button-container">
          <button onClick={() => setCurrentPage(currentPage - 1)} className="icon" disabled={currentPage <= 1}>
            <MdNavigateBefore />
          </button>

          {
            pageNumbers.map(pageNumber => (
              <button key={pageNumber - 1}
                onClick={() => setCurrentPage(pageNumber)}
                className={pageNumber === currentPage ? "active-button" : ""}>
                {pageNumber}
              </button>
            ))
          }

          <button onClick={() => setCurrentPage(currentPage + 1)} className="icon" disabled={currentPage >= pageNumbers.length}>
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