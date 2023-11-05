/* eslint-disable max-len */
/* eslint-disable no-void */
import { useEffect } from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { ITEMS_PER_ARTISTS_TABLE, PAGES_PER_PAGINATION } from "@/constants/pagination";
import { getArtistsStatus } from "@/services/api/requests/artist/artist.get.api";
import { MEMBER_TYPE } from "@/types/enums/user.enum";

const useArtistsStatus = (month: string, page: number, keyword: string) => {
  const query = useQuery(
    [MEMBER_TYPE.ADMIN, "artists-status", month, { page, keyword }],
    () => { return getArtistsStatus(month, page, ITEMS_PER_ARTISTS_TABLE, keyword); },
  );

  const queryClient = useQueryClient();
  useEffect(() => {
    const totalItems = query.data?.totalItems;
    const endPage = totalItems ? Math.ceil(totalItems / ITEMS_PER_ARTISTS_TABLE) : 0;
    // 1. 끝 페이지
    if (endPage) {
      void queryClient.prefetchQuery(
        [MEMBER_TYPE.ADMIN, "artists-status", month, { page: endPage, keyword }],
        () => { return getArtistsStatus(month, endPage, ITEMS_PER_ARTISTS_TABLE, keyword); },
      );
    }
    // 2. 1페이지
    void queryClient.prefetchQuery(
      [MEMBER_TYPE.ADMIN, "artists-status", month, { page: 1, keyword }],
      () => { return getArtistsStatus(month, 1, ITEMS_PER_ARTISTS_TABLE, keyword); },
    );

    const curPaginationStartPage = Math.floor((page - 1) / PAGES_PER_PAGINATION) * PAGES_PER_PAGINATION + 1;
    const nextPaginationStartPage = curPaginationStartPage + PAGES_PER_PAGINATION;
    const prevPaginationstartPage = curPaginationStartPage - PAGES_PER_PAGINATION;
    // 3. 현재 페이지네이션의 시작 페이지 ~ 다음 페이지네이션의 시작 페이지
    for (let i = curPaginationStartPage; i <= Math.min(endPage, nextPaginationStartPage); i += 1) {
      void queryClient.prefetchQuery(
        [MEMBER_TYPE.ADMIN, "artists-status", month, { page: i, keyword }],
        () => { return getArtistsStatus(month, i, ITEMS_PER_ARTISTS_TABLE, keyword); },
      );
    }
    // 4. 이전 페이지네이션의 시작 페이지
    if (prevPaginationstartPage >= 1) {
      void queryClient.prefetchQuery(
        [MEMBER_TYPE.ADMIN, "artists-status", month, { page: prevPaginationstartPage, keyword }],
        () => { return getArtistsStatus(month, prevPaginationstartPage, ITEMS_PER_ARTISTS_TABLE, keyword); },
      );
    }
  }, [keyword, month, page, query.data?.totalItems, queryClient]);

  return query;
};

export { useArtistsStatus };
