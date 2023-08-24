/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useQuery } from "@tanstack/react-query";

import { MOCK_ADMIN_BAR, MOCK_ALBUM_BAR, MOCK_ARTIST_BAR } from "@/constants/mock";
import { DASHBOARD_TYPE, DashboardType } from "@/types/enums/dashboard.enum";

import { IGetAdminMonthlyEarningsTrendsResponse, IGetArtistMonthlyEarningsTrendsResponse } from "../api/types/admin";
import { IGetAlbumMonthlySettlementResponse } from "../api/types/albums";

type DashBoardTrendsChart = IGetAdminMonthlyEarningsTrendsResponse | IGetArtistMonthlyEarningsTrendsResponse | IGetAlbumMonthlySettlementResponse;

const getAdminDashboardTrendsChart = (month: string): Promise<IGetAdminMonthlyEarningsTrendsResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_ADMIN_BAR);
    }, 2000);
  });
};

const getArtistDashboardTrendsChart = (month: string, artistId?: string): Promise<IGetArtistMonthlyEarningsTrendsResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_ARTIST_BAR);
    }, 2000);
  });
};

const getAlbumDashboardTrendsChart = (month: string, albumId?: string): Promise<IGetAlbumMonthlySettlementResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_ALBUM_BAR);
    }, 2000);
  });
};
export const getDashboardTrendsChart = async (
  type: DashboardType,
  month: string,
  artistId?: string,
  albumId?: string,
) => {
  let response: DashBoardTrendsChart;
  switch (type) {
    case DASHBOARD_TYPE.ADMIN:
      response = await getAdminDashboardTrendsChart(month);
      break;
    case DASHBOARD_TYPE.ARTIST:
      response = await getArtistDashboardTrendsChart(month, artistId);
      break;
    case DASHBOARD_TYPE.ALBUM:
      response = await getAlbumDashboardTrendsChart(month, albumId);
      break;
    default:
      response = {} as DashBoardTrendsChart;
      break;
  }

  return response;
};

const useDashboardTrendsChart = (
  type: DashboardType,
  month: string,
  artistId?: string,
  albumId?: string,
) => {
  const { data: trendsChartData, isError: istrendsChartError, isLoading: istrendsChartLoading } = useQuery(
    [type, "dashboard", "trendsChart"],
    () => { return getDashboardTrendsChart(type, month, artistId, albumId); },

    { staleTime: 5000 },
  );
  return {
    trendsChartData, istrendsChartError, istrendsChartLoading,
  };
};

export default useDashboardTrendsChart;
