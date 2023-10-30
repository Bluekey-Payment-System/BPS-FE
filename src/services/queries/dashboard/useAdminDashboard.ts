/* eslint-disable no-void */
/* eslint-disable max-len */

import { useEffect } from "react";

import { useQueries, useQueryClient } from "@tanstack/react-query";

import { IFilterOptions } from "@/components/common/Filter/Filter.type";
import { PAGES_PER_PAGINATION } from "@/constants/pagination";
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
  filterOptions: IFilterOptions,
) => {
  const queries = useQueries({
    queries: [
      {
        queryKey: [DASHBOARD_TYPE.ADMIN, "dashboard", "card", { month }],
        queryFn: () => {
          return getDashboardCards(DASHBOARD_TYPE.ADMIN, month);
        },
      },
      {
        queryKey: [DASHBOARD_TYPE.ADMIN, "dashboard", "trendsChart", { month }],
        queryFn: () => {
          return getDashboardTrendsChart(DASHBOARD_TYPE.ADMIN, month);
        },
      },
      {
        queryKey: [DASHBOARD_TYPE.ADMIN, "dashboard", "TopFiveRevenue", { month }],
        queryFn: () => {
          return getDashboardTopFiveRevenueChart(DASHBOARD_TYPE.ADMIN, month);
        },
      },
      {
        queryKey: [DASHBOARD_TYPE.ADMIN, "dashboard", "table", {
          month, page, sortBy, searchBy, keyword, filterOptions,
        }],
        queryFn: () => {
          return getDashboardTable(DASHBOARD_TYPE.ADMIN, month, page, sortBy, searchBy, keyword, filterOptions);
        },
      },
    ],
  });

  const queryClient = useQueryClient();
  useEffect(() => {
    const totalItems = queries[3].data?.totalItems;
    const endPage = totalItems ? Math.ceil(totalItems / PAGES_PER_PAGINATION) : 0;
    // 1. 끝 페이지
    if (endPage) {
      void queryClient.prefetchQuery(
        [DASHBOARD_TYPE.ADMIN, "dashboard", "table", {
          month, page: endPage, sortBy, searchBy, keyword, filterOptions,
        }],
        () => { return getDashboardTable(DASHBOARD_TYPE.ADMIN, month, endPage, sortBy, searchBy, keyword, filterOptions); },
      );
    }

    // 2. 1페이지
    void queryClient.prefetchQuery(
      [DASHBOARD_TYPE.ADMIN, "dashboard", "table", {
        month, page: 1, sortBy, searchBy, keyword, filterOptions,
      }],
      () => { return getDashboardTable(DASHBOARD_TYPE.ADMIN, month, 1, sortBy, searchBy, keyword, filterOptions); },
    );

    const curPaginationStartPage = Math.floor((page - 1) / PAGES_PER_PAGINATION) * PAGES_PER_PAGINATION + 1;
    const nextPaginationStartPage = curPaginationStartPage + PAGES_PER_PAGINATION;
    const prevPaginationstartPage = curPaginationStartPage - PAGES_PER_PAGINATION;

    // 3. 현재 페이지네이션의 시작 페이지 ~ 다음 페이지네이션의 시작 페이지
    for (let i = curPaginationStartPage; i <= Math.min(endPage, nextPaginationStartPage); i += 1) {
      void queryClient.prefetchQuery(
        [DASHBOARD_TYPE.ADMIN, "dashboard", "table", {
          month, page: i, sortBy, searchBy, keyword, filterOptions,
        }],
        () => { return getDashboardTable(DASHBOARD_TYPE.ADMIN, month, i, sortBy, searchBy, keyword, filterOptions); },
      );
    }

    // 4. 이전 페이지네이션의 시작 페이지
    if (prevPaginationstartPage >= 1) {
      void queryClient.prefetchQuery(
        [DASHBOARD_TYPE.ADMIN, "dashboard", "table", {
          month, page: prevPaginationstartPage, sortBy, searchBy, keyword, filterOptions,
        }],
        () => { return getDashboardTable(DASHBOARD_TYPE.ADMIN, month, prevPaginationstartPage, sortBy, searchBy, keyword, filterOptions); },
      );
    }
  }, [keyword, month, page, queries, queryClient, searchBy, sortBy, filterOptions]);

  return queries;
};

export default useAdminDashboard;
