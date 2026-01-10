import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  pageCount: number;
  onChangePage: (page: number) => void;
}

const Pagination = ({
  currentPage,
  pageCount,
  onChangePage,
}: PaginationProps) => {
  if (pageCount <= 1) return null;

  return (
    <ReactPaginate
      containerClassName={css.pagination}
      pageClassName={css.page}
      activeClassName={css.active}
      previousClassName={css.page}
      nextClassName={css.page}
      breakClassName={css.page}
      disabledClassName={css.disabled}
      previousLabel="<"
      nextLabel=">"
      breakLabel="..."
      forcePage={currentPage - 1}
      pageCount={pageCount}
      onPageChange={(selectedItem) => onChangePage(selectedItem.selected + 1)}
    />
  );
};

export default Pagination;
