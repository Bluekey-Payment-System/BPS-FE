/* eslint-disable max-len */

import { useQueries } from "@tanstack/react-query";

import { DASHBOARD_TYPE } from "@/types/enums/dashboard.enum";

import { getDashboardAlbumInfo } from "./queryFns/albumInfo";
import { getMemberAlbumTrendsChart } from "./queryFns/albumTrendsChart";
import { getDashboardCards } from "./queryFns/cards";
import { getDashboardTopFiveRevenueChart } from "./queryFns/topFiveRevenueChart";
import { getDashboardTrendsChart } from "./queryFns/trendsChart";

const useAlbumDashboard = (
  month: string,
  albumId: string,
) => {
  const queries = useQueries({
    queries: [
      {
        queryKey: [DASHBOARD_TYPE.ALBUM, "dashboard", "card", albumId, { month }],
        queryFn: () => {
          return getDashboardCards(DASHBOARD_TYPE.ALBUM, month, undefined, albumId);
        },
      },
      {
        queryKey: [DASHBOARD_TYPE.ALBUM, "dashboard", "trendsChart", albumId, { month }],
        queryFn: () => {
          return getDashboardTrendsChart(DASHBOARD_TYPE.ALBUM, month, undefined, albumId);
        },
      },
      {
        queryKey: [DASHBOARD_TYPE.ALBUM, "dashboard", "TopFiveRevenue", albumId, { month }],
        queryFn: () => {
          return getDashboardTopFiveRevenueChart(DASHBOARD_TYPE.ALBUM, month, undefined, albumId);
        },
      },
      {
        queryKey: [DASHBOARD_TYPE.ALBUM, "dashboard", "albumTrendsChart", albumId, { month }],
        queryFn: () => {
          return getMemberAlbumTrendsChart(month, albumId);
        },
      },
      {
        queryKey: [DASHBOARD_TYPE.ALBUM, "dashboard", "albumInfo", albumId, { month }],
        queryFn: () => {
          return getDashboardAlbumInfo(month, albumId);
        },
      },
    ],
  });

  return queries;
};

export default useAlbumDashboard;
