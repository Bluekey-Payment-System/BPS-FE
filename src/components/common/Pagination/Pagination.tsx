import PaginationUI from "./PaginationUI";

const PAGES_PER_PAGINATION = 6;

interface PaginationProps {
  page: number
  totalItems: number
  itemsPerPage: number
}

const Pagination = ({
  page,
  totalItems,
  itemsPerPage,
}: PaginationProps) => {
  const paginationNum = Math.floor((page - 1) / PAGES_PER_PAGINATION) + 1;
  const endPage = Math.floor((totalItems - 1) / itemsPerPage) + 1;
  const endPaginationNum = Math.ceil(endPage / PAGES_PER_PAGINATION);

  const shownStart = Math.floor((page - 1) / PAGES_PER_PAGINATION) * PAGES_PER_PAGINATION + 1;
  const shownEnd = Math.min(endPage, paginationNum * PAGES_PER_PAGINATION);
  const shownPages = Array.from(
    { length: shownEnd - shownStart + 1 },
    (_, i) => { return i + shownStart; },
  );

  return (
    <PaginationUI
      page={page}
      shownPages={shownPages}
      endPage={endPage}
      hasNext={paginationNum < endPaginationNum}
      hasPrev={paginationNum > 1}
    />
  );
};

export default Pagination;
