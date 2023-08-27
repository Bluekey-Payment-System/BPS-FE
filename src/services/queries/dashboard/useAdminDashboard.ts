/* eslint-disable no-void */
/* eslint-disable max-len */

import { useEffect } from "react";

import { useQueries, useQueryClient } from "@tanstack/react-query";

import { ITEMS_PER_DASHBOARD_TABLE } from "@/constants/pagination";
import { DASHBOARD_TYPE } from "@/types/enums/dashboard.enum";

import { getDashboardCards } from "./queryFns/cards";
import { getDashboardTable } from "./queryFns/table";
import { getDashboardTopFiveRevenueChart } from "./queryFns/topFiveRevenueChart";
import { getDashboardTrendsChart } from "./queryFns/trendsChart";

const useAdminDashboard = (
  month: string,
  page: number,
  sortBy: string,
  searchBy: string,
  keyword: string,
) => {
  const queries = useQueries({
    queries: [
      {
        queryKey: [DASHBOARD_TYPE.ADMIN, "dashboard", "card", null, null, { month }],
        queryFn: () => {
          return getDashboardCards(DASHBOARD_TYPE.ADMIN, month);
        },
      },
      {
        queryKey: [DASHBOARD_TYPE.ADMIN, "dashboard", "trendsChart", null, null, { month }],
        queryFn: () => {
          return getDashboardTrendsChart(DASHBOARD_TYPE.ADMIN, month);
        },
      },
      {
        queryKey: [DASHBOARD_TYPE.ADMIN, "dashboard", "TopFiveRevenue", null, null, { month }],
        queryFn: () => {
          return getDashboardTopFiveRevenueChart(DASHBOARD_TYPE.ADMIN, month);
        },
      },
      {
        queryKey: [DASHBOARD_TYPE.ADMIN, "dashboard", "table", null, {
          month, page, sortBy, searchBy, keyword,
        }],
        queryFn: () => {
          return getDashboardTable(DASHBOARD_TYPE.ADMIN, month, page, sortBy, searchBy, keyword);
        },
      },
    ],
  });

  const queryClient = useQueryClient();
  useEffect(() => {
    const totalItems = queries[3].data?.totalItems;
    const endPage = totalItems ? Math.ceil(totalItems / ITEMS_PER_DASHBOARD_TABLE) : 0;
    // 1. 끝 페이지
    if (endPage) {
      void queryClient.prefetchQuery(
        [DASHBOARD_TYPE.ADMIN, "dashboard", "table", null, {
          month, page: endPage, sortBy, searchBy, keyword,
        }],
        () => { return getDashboardTable(DASHBOARD_TYPE.ADMIN, month, endPage, sortBy, searchBy, keyword); },
      );
    }

    // 2. 1페이지
    void queryClient.prefetchQuery(
      [DASHBOARD_TYPE.ADMIN, "dashboard", "table", null, {
        month, page: 1, sortBy, searchBy, keyword,
      }],
      () => { return getDashboardTable(DASHBOARD_TYPE.ADMIN, month, 1, sortBy, searchBy, keyword); },
    );

    const curPaginationStartPage = Math.floor((page - 1) / ITEMS_PER_DASHBOARD_TABLE) * ITEMS_PER_DASHBOARD_TABLE + 1;
    const nextPaginationStartPage = curPaginationStartPage + ITEMS_PER_DASHBOARD_TABLE;
    const prevPaginationstartPage = curPaginationStartPage - ITEMS_PER_DASHBOARD_TABLE;

    // 3. 현재 페이지네이션의 시작 페이지 ~ 다음 페이지네이션의 시작 페이지
    for (let i = curPaginationStartPage; i <= Math.min(endPage, nextPaginationStartPage); i += 1) {
      void queryClient.prefetchQuery(
        [DASHBOARD_TYPE.ADMIN, "dashboard", "table", null, {
          month, page: i, sortBy, searchBy, keyword,
        }],
        () => { return getDashboardTable(DASHBOARD_TYPE.ADMIN, month, i, sortBy, searchBy, keyword); },
      );
    }

    // 4. 이전 페이지네이션의 시작 페이지
    if (prevPaginationstartPage >= 1) {
      void queryClient.prefetchQuery(
        [DASHBOARD_TYPE.ADMIN, "dashboard", "table", null, {
          month, page: prevPaginationstartPage, sortBy, searchBy, keyword,
        }],
        () => { return getDashboardTable(DASHBOARD_TYPE.ADMIN, month, prevPaginationstartPage, sortBy, searchBy, keyword); },
      );
    }
  }, [keyword, month, page, queries, queryClient, searchBy, sortBy]);

  return queries;
};

export default useAdminDashboard;
