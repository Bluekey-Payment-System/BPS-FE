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

const useArtistDashboard = (
  month: string,
  page: number,
  sortBy: string,
  searchBy: string,
  keyword: string,
  artistId: number,
  filterOptions: IFilterOptions,
) => {
  const queries = useQueries({
    queries: [
      {
        queryKey: [DASHBOARD_TYPE.ARTIST, "dashboard", "card", artistId, { month }],
        queryFn: () => {
          return getDashboardCards(DASHBOARD_TYPE.ARTIST, month, artistId);
        },
      },
      {
        queryKey: [DASHBOARD_TYPE.ARTIST, "dashboard", "trendsChart", artistId, { month }],
        queryFn: () => {
          return getDashboardTrendsChart(DASHBOARD_TYPE.ARTIST, month, artistId);
        },
      },
      {
        queryKey: [DASHBOARD_TYPE.ARTIST, "dashboard", "TopFiveRevenue", artistId, { month }],
        queryFn: () => {
          return getDashboardTopFiveRevenueChart(DASHBOARD_TYPE.ARTIST, month, artistId);
        },
      },
      {
        queryKey: [DASHBOARD_TYPE.ARTIST, "dashboard", "table", artistId, {
          month, page, sortBy, searchBy, keyword, filterOptions,
        }],
        queryFn: () => {
          return getDashboardTable(DASHBOARD_TYPE.ARTIST, month, page, sortBy, searchBy, keyword, filterOptions, artistId);
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
        [DASHBOARD_TYPE.ARTIST, "dashboard", "table", artistId, {
          month, page: endPage, sortBy, searchBy, keyword, filterOptions,
        }],
        () => { return getDashboardTable(DASHBOARD_TYPE.ARTIST, month, endPage, sortBy, searchBy, keyword, filterOptions, artistId); },
      );
    }

    // 2. 1페이지
    void queryClient.prefetchQuery(
      [DASHBOARD_TYPE.ARTIST, "dashboard", "table", artistId, {
        month, page: 1, sortBy, searchBy, keyword, filterOptions,
      }],
      () => { return getDashboardTable(DASHBOARD_TYPE.ARTIST, month, 1, sortBy, searchBy, keyword, filterOptions, artistId); },
    );

    const curPaginationStartPage = Math.floor((page - 1) / PAGES_PER_PAGINATION) * PAGES_PER_PAGINATION + 1;
    const nextPaginationStartPage = curPaginationStartPage + PAGES_PER_PAGINATION;
    const prevPaginationstartPage = curPaginationStartPage - PAGES_PER_PAGINATION;

    // 3. 현재 페이지네이션의 시작 페이지 ~ 다음 페이지네이션의 시작 페이지
    for (let i = curPaginationStartPage; i <= Math.min(endPage, nextPaginationStartPage); i += 1) {
      void queryClient.prefetchQuery(
        [DASHBOARD_TYPE.ARTIST, "dashboard", "table", artistId, {
          month, page: i, sortBy, searchBy, keyword, filterOptions,
        }],
        () => { return getDashboardTable(DASHBOARD_TYPE.ARTIST, month, i, sortBy, searchBy, keyword, filterOptions, artistId); },
      );
    }

    // 4. 이전 페이지네이션의 시작 페이지
    if (prevPaginationstartPage >= 1) {
      void queryClient.prefetchQuery(
        [DASHBOARD_TYPE.ARTIST, "dashboard", "table", artistId, {
          month, page: prevPaginationstartPage, sortBy, searchBy, keyword, filterOptions,
        }],
        () => { return getDashboardTable(DASHBOARD_TYPE.ARTIST, month, prevPaginationstartPage, sortBy, searchBy, keyword, filterOptions, artistId); },
      );
    }
  }, [artistId, keyword, month, page, queries, queryClient, searchBy, sortBy, filterOptions]);

  return queries;
};

export default useArtistDashboard;
