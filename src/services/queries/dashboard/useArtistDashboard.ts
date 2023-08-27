/* eslint-disable max-len */

import { useQueries } from "@tanstack/react-query";

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
  artistId: string,
) => {
  const queries = useQueries({
    queries: [
      {
        queryKey: [DASHBOARD_TYPE.ARTIST, "dashboard", "card", artistId, null, { month }],
        queryFn: () => {
          return getDashboardCards(DASHBOARD_TYPE.ARTIST, month, artistId);
        },
      },
      {
        queryKey: [DASHBOARD_TYPE.ARTIST, "dashboard", "trendsChart", artistId, null, { month }],
        queryFn: () => {
          return getDashboardTrendsChart(DASHBOARD_TYPE.ARTIST, month, artistId);
        },
      },
      {
        queryKey: [DASHBOARD_TYPE.ARTIST, "dashboard", "TopFiveRevenue", artistId, null, { month }],
        queryFn: () => {
          return getDashboardTopFiveRevenueChart(DASHBOARD_TYPE.ARTIST, month, artistId);
        },
      },
      {
        queryKey: [DASHBOARD_TYPE.ARTIST, "dashboard", "table", artistId, {
          month, page, sortBy, searchBy, keyword,
        }],
        queryFn: () => {
          return getDashboardTable(DASHBOARD_TYPE.ARTIST, month, page, sortBy, searchBy, keyword, artistId);
        },
      },
    ],
  });

  return queries;
};

export default useArtistDashboard;
