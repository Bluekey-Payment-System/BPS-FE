/* eslint-disable max-len */
/* eslint-disable no-void */
import { useEffect } from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { ITEMS_PER_ALBUM_LIST } from "@/constants/pagination";
import { getAlbums } from "@/services/api/requests/albums/albums.get.api";
import { MemberType } from "@/types/enums/user.enum";

const useAlbums = (type: MemberType, page: number, keyword: string | null, memberId?: number) => {
  const query = useQuery(
    [type, "albums", `memberId=${memberId}`, { page, keyword }],
    () => { return getAlbums(page, ITEMS_PER_ALBUM_LIST, keyword); },
  );

  const queryClient = useQueryClient();
  useEffect(() => {
    const totalItems = query.data?.totalItems;
    const endPage = totalItems ? Math.ceil(totalItems / ITEMS_PER_ALBUM_LIST) : 0;
    // 1. 끝 페이지
    if (endPage) {
      void queryClient.prefetchQuery(
        [type, "albums", `memberId=${memberId}`, { page: endPage, keyword }],
        () => { return getAlbums(endPage, ITEMS_PER_ALBUM_LIST, keyword); },
      );
    }
    // 2. 1페이지
    void queryClient.prefetchQuery(
      [type, "albums", `memberId=${memberId}`, { page: 1, keyword }],
      () => { return getAlbums(1, ITEMS_PER_ALBUM_LIST, keyword); },
    );

    const curPaginationStartPage = Math.floor((page - 1) / ITEMS_PER_ALBUM_LIST) * ITEMS_PER_ALBUM_LIST + 1;
    const nextPaginationStartPage = curPaginationStartPage + ITEMS_PER_ALBUM_LIST;
    const prevPaginationstartPage = curPaginationStartPage - ITEMS_PER_ALBUM_LIST;
    // 3. 현재 페이지네이션의 시작 페이지 ~ 다음 페이지네이션의 시작 페이지
    for (let i = curPaginationStartPage; i <= Math.min(endPage, nextPaginationStartPage); i += 1) {
      void queryClient.prefetchQuery(
        [type, "albums", `memberId=${memberId}`, { page: i, keyword }],
        () => { return getAlbums(i, ITEMS_PER_ALBUM_LIST, keyword); },
      );
    }
    // 4. 이전 페이지네이션의 시작 페이지
    if (prevPaginationstartPage >= 1) {
      void queryClient.prefetchQuery(
        [type, "albums", `memberId=${memberId}`, { page: prevPaginationstartPage, keyword }],
        () => { return getAlbums(prevPaginationstartPage, ITEMS_PER_ALBUM_LIST, keyword); },
      );
    }
  }, [keyword, memberId, page, query.data?.totalItems, queryClient, type]);

  return query;
};

export default useAlbums;
