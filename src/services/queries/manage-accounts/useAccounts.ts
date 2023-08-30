/* eslint-disable max-len */
/* eslint-disable no-void */
import { useEffect } from "react";

import { useQueries, useQueryClient } from "@tanstack/react-query";

import { ITEMS_PER_ACCOUNTS_TABLE, PAGES_PER_PAGINATION } from "@/constants/pagination";
import { getAdminAccounts, getArtistAccounts } from "@/services/api/requests/admin/admin.get.api";
import { MEMBER_ROLE, MEMBER_TYPE, MemberRole } from "@/types/enums/user.enum";

const useAccounts = (artistPage: number, adminPage: number, memberRole: MemberRole) => {
  const queries = useQueries({
    queries: [
      {
        queryKey: [MEMBER_TYPE.ADMIN, "manage-accounts", { artistPage }],
        queryFn: () => {
          return getArtistAccounts(artistPage, ITEMS_PER_ACCOUNTS_TABLE);
        },
      },
      {
        queryKey: [MEMBER_TYPE.ADMIN, "manage-accounts", { adminPage }],
        queryFn: () => {
          return getAdminAccounts(adminPage, ITEMS_PER_ACCOUNTS_TABLE);
        },
        enabled: (memberRole === MEMBER_ROLE.SUPER_ADMIN),
      },
    ],
  });

  const queryClient = useQueryClient();
  useEffect(() => {
    const totalItems = queries[0].data?.totalItems;
    const endPage = totalItems ? Math.ceil(totalItems / PAGES_PER_PAGINATION) : 0;
    // 1. 끝 페이지
    if (endPage) {
      void queryClient.prefetchQuery(
        [MEMBER_TYPE.ADMIN, "manage-accounts", { artistPage: endPage }],
        () => { return getArtistAccounts(endPage, ITEMS_PER_ACCOUNTS_TABLE); },
      );
    }
    // 2. 1페이지
    void queryClient.prefetchQuery(
      [MEMBER_TYPE.ADMIN, "manage-accounts", { artistPage: 1 }],
      () => { return getArtistAccounts(1, ITEMS_PER_ACCOUNTS_TABLE); },
    );
    const curPaginationStartPage = Math.floor((artistPage - 1) / PAGES_PER_PAGINATION) * PAGES_PER_PAGINATION + 1;
    const nextPaginationStartPage = curPaginationStartPage + PAGES_PER_PAGINATION;
    const prevPaginationstartPage = curPaginationStartPage - PAGES_PER_PAGINATION;
    // 3. 현재 페이지네이션의 시작 페이지 ~ 다음 페이지네이션의 시작 페이지
    for (let i = curPaginationStartPage; i <= Math.min(endPage, nextPaginationStartPage); i += 1) {
      void queryClient.prefetchQuery(
        [MEMBER_TYPE.ADMIN, "manage-accounts", { artistPage: i }],
        () => { return getArtistAccounts(i, ITEMS_PER_ACCOUNTS_TABLE); },
      );
    }
    // 4. 이전 페이지네이션의 시작 페이지
    if (prevPaginationstartPage >= 1) {
      void queryClient.prefetchQuery(
        [MEMBER_TYPE.ADMIN, "manage-accounts", { artistPage: prevPaginationstartPage }],
        () => { return getArtistAccounts(prevPaginationstartPage, ITEMS_PER_ACCOUNTS_TABLE); },
      );
    }
  }, [artistPage, queries, queryClient]);

  useEffect(() => {
    // 슈퍼 어드민 타입이 아닌 경우 prefetch X
    if (memberRole === MEMBER_ROLE.SUPER_ADMIN) {
      const totalItems = queries[1].data?.totalItems;
      const endPage = totalItems ? Math.ceil(totalItems / ITEMS_PER_ACCOUNTS_TABLE) : 0;
      // 1. 끝 페이지
      if (endPage) {
        void queryClient.prefetchQuery(
          [MEMBER_TYPE.ADMIN, "manage-accounts", { adminPage: endPage }],
          () => { return getAdminAccounts(endPage, ITEMS_PER_ACCOUNTS_TABLE); },
        );
      }
      // 2. 1페이지
      void queryClient.prefetchQuery(
        [MEMBER_TYPE.ADMIN, "manage-accounts", { adminPage: 1 }],
        () => { return getAdminAccounts(1, ITEMS_PER_ACCOUNTS_TABLE); },
      );
      const curPaginationStartPage = Math.floor((adminPage - 1) / ITEMS_PER_ACCOUNTS_TABLE) * ITEMS_PER_ACCOUNTS_TABLE + 1;
      const nextPaginationStartPage = curPaginationStartPage + ITEMS_PER_ACCOUNTS_TABLE;
      const prevPaginationstartPage = curPaginationStartPage - ITEMS_PER_ACCOUNTS_TABLE;
      // 3. 현재 페이지네이션의 시작 페이지 ~ 다음 페이지네이션의 시작 페이지
      for (let i = curPaginationStartPage; i <= Math.min(endPage, nextPaginationStartPage); i += 1) {
        void queryClient.prefetchQuery(
          [MEMBER_TYPE.ADMIN, "manage-accounts", { adminPage: i }],
          () => { return getAdminAccounts(i, ITEMS_PER_ACCOUNTS_TABLE); },
        );
      }
      // 4. 이전 페이지네이션의 시작 페이지
      if (prevPaginationstartPage >= 1) {
        void queryClient.prefetchQuery(
          [MEMBER_TYPE.ADMIN, "manage-accounts", { adminPage: prevPaginationstartPage }],
          () => { return getAdminAccounts(prevPaginationstartPage, ITEMS_PER_ACCOUNTS_TABLE); },
        );
      }
    }
  }, [adminPage, memberRole, queries, queryClient]);

  return queries;
};

export default useAccounts;
