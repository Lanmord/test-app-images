import { useEffect, useState } from 'react';
import useAppStore from '../store/useAppStore';
import styles from './pagination.module.scss';

function Pagination() {
  const { images, currentPage, itemsPerPage, setCurrentPage, filteredImages } = useAppStore(
    (state) => state,
  );

  const [minPageNumbers, setMinPageNumbers] = useState(1);
  const [maxPageNumbers, setMaxPageNumbers] = useState(6);

  const [pageNumbers, setPageNumbers] = useState<number[]>([]);

  useEffect(() => {
    const totalPages = Math.ceil(
      filteredImages.length !== 0
        ? filteredImages.length / itemsPerPage
        : images.length / itemsPerPage,
    );

    setPageNumbers(Array.from({ length: totalPages }, (_, i) => i + 1));

    if (
      totalPages !== pageNumbers.length &&
      currentPage === pageNumbers.length &&
      currentPage !== 1
    )
      setCurrentPage(currentPage - 1);
  }, [images, filteredImages]);

  useEffect(() => {
    if (currentPage === 1) {
      setMinPageNumbers(1);
      setMaxPageNumbers(6);
    }
  }, [currentPage]);

  const increasePageNumbers = () => {
    setMaxPageNumbers(maxPageNumbers + 1);
    setMinPageNumbers(minPageNumbers + 1);
  };
  const decreasePageNumbers = () => {
    setMaxPageNumbers(maxPageNumbers - 1);
    setMinPageNumbers(minPageNumbers - 1);
  };

  const nextPage = () => {
    if (currentPage + 1 <= pageNumbers.length) {
      setCurrentPage(currentPage + 1);

      if (currentPage === maxPageNumbers && currentPage !== pageNumbers.length)
        increasePageNumbers();
    }
  };

  const previousPage = () => {
    if (currentPage - 1 >= 1) {
      setCurrentPage(currentPage - 1);

      if (currentPage === minPageNumbers && currentPage !== 1) decreasePageNumbers();
    }
  };

  const selectPage = (selectedPage: number) => {
    setCurrentPage(selectedPage);
    if (selectedPage === maxPageNumbers && selectedPage !== pageNumbers.length) {
      increasePageNumbers();
    } else if (selectedPage === minPageNumbers && selectedPage !== 1) {
      decreasePageNumbers();
    }
  };

  const selectLastPage = () => {
    setMaxPageNumbers(pageNumbers.length);
    setMinPageNumbers(pageNumbers.length - 5);
    setCurrentPage(pageNumbers.length);
  };

  const selectFirstPage = () => {
    setMaxPageNumbers(6);
    setMinPageNumbers(1);
    setCurrentPage(1);
  };

  const renderPageNumbers = pageNumbers.map((page) => {
    if (page >= minPageNumbers && page <= maxPageNumbers) {
      return (
        <li
          key={page}
          className={
            page === currentPage ? styles.page_btn + ' ' + styles.page_btn_active : styles.page_btn
          }
          onClick={() => selectPage(page)}>
          {page}
        </li>
      );
    } else {
      return null;
    }
  });

  return (
    <div className={styles.wrapper}>
      <ul>
        <li onClick={selectFirstPage}>Первая</li>
        <li onClick={previousPage}>
          <span>{'<='}</span>
        </li>
        {renderPageNumbers}
        <li onClick={nextPage}>
          <span>{'=>'}</span>
        </li>
        <li onClick={selectLastPage}>Последняя</li>
      </ul>
    </div>
  );
}

export default Pagination;
