import { PAGES_PER_PAGINATION } from "@/constants/pagination";

import PaginationUI from "./PaginationUI";

interface PaginationProps {
  activePage: number
  totalItems: number
  itemsPerPage: number
  queryParamName?: string
}

/**
 * @author 연우킴(drizzle96) [Github](https://github.com/drizzle96)
 * @param {number} activePage - 현재 활성화된 페이지 번호입니다.
 * @param {number} totalItems - 페이지네이션에 사용될 전체 아이템 수입니다.
 * @param {number} itemsPerPage - 페이지 당 표시되는 아이템 수입니다.
 * @param {string} queryParamName - URL에서 페이지 번호를 나타내는 쿼리 파라미터 이름입니다.
 * 기본값은 "page"입니다. 한 페이지에 페이지네이션이 두 번 이상 쓰이는 경우에만 값을 따로 전달하면 됩니다.
 *
 * @example
 * ```
 * // case1) 일반
 * <Pagination activePage={17} totalItems={120} itemsPerPage={6} />
 * // case2) 어드민의 아티스트 계정 관리 페이지 -> 아티스트 계정 테이블과 어드민 계정 테이블이 각각 있음
 * <Pagination activePage={17} totalItems={120} itemsPerPage={6} queryParamName="artistPage"/>
 * <Pagination activePage={1} totalItems={120} itemsPerPage={6} queryParamName="adminPage"/>
 *```
 */
const Pagination = ({
  activePage,
  totalItems,
  itemsPerPage,
  queryParamName = "page",
}: PaginationProps) => {
  const paginationNum = Math.floor((activePage - 1) / PAGES_PER_PAGINATION) + 1;
  const endPage = Math.floor((totalItems - 1) / itemsPerPage) + 1;
  const endPaginationNum = Math.ceil(endPage / PAGES_PER_PAGINATION);

  const shownStart = Math.floor((activePage - 1) / PAGES_PER_PAGINATION) * PAGES_PER_PAGINATION + 1;
  const shownEnd = Math.min(endPage, paginationNum * PAGES_PER_PAGINATION);
  const shownPages = Array.from(
    { length: shownEnd - shownStart + 1 },
    (_, i) => { return i + shownStart; },
  );

  return (
    <PaginationUI
      activePage={activePage}
      shownPages={shownPages}
      endPage={endPage}
      hasNext={paginationNum < endPaginationNum}
      hasPrev={paginationNum > 1}
      queryParamName={queryParamName}
    />
  );
};

export default Pagination;
