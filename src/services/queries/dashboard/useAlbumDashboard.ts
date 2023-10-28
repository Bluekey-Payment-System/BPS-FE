/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable max-len */

import { useQueries } from "@tanstack/react-query";

import { useAppSelector } from "@/redux/hooks";
import { getAlbumDashboardLine, getAlbumTracks } from "@/services/api/requests/albums/albums.get.api";
import { DASHBOARD_TYPE } from "@/types/enums/dashboard.enum";
import { MemberRole } from "@/types/enums/user.enum";
import subtractMonths from "@/utils/subtractMonths";

import { getDashboardCards } from "./queryFns/cards";
import { getDashboardTopFiveRevenueChart } from "./queryFns/topFiveRevenueChart";
import { getDashboardTrendsChart } from "./queryFns/trendsChart";

const useAlbumDashboard = (
  month: string,
  albumId: number,
) => {
  const memberRole = useAppSelector((state) => {
    return state.user.member.role;
  });
  const queries = useQueries({
    queries: [
      {
        queryKey: [DASHBOARD_TYPE.ALBUM, "dashboard", "card", albumId, { month }],
        queryFn: () => {
          return getDashboardCards(DASHBOARD_TYPE.ALBUM, month, undefined, albumId, memberRole as MemberRole);
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
        queryFn: async () => {
          return getAlbumDashboardLine(subtractMonths(month, 12), month, albumId);
        },
      },
      {
        queryKey: [DASHBOARD_TYPE.ALBUM, "dashboard", "albumInfo", albumId, { month }],
        queryFn: async () => {
          return getAlbumTracks(albumId);
        },
      },
    ],
  });

  return queries;
};

export default useAlbumDashboard;
