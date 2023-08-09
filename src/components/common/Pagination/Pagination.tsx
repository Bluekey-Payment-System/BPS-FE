import { PAGES_PER_PAGINATION } from "@/constants/pagination";

import PaginationUI from "./PaginationUI";

interface PaginationProps {
  page: number
  totalItems: number
  itemsPerPage: number
  queryParamName?: string
}

const Pagination = ({
  page,
  totalItems,
  itemsPerPage,
  queryParamName = "page",
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
      queryParamName={queryParamName}
    />
  );
};

export default Pagination;
