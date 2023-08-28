/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { MOCK_ADMIN_BAR, MOCK_ALBUM_BAR, MOCK_ARTIST_BAR } from "@/constants/mock";
import { IGetAdminMonthlyTrendsResponse } from "@/services/api/types/admin";
import { IGetAlbumMonthlyTrendsResponse } from "@/services/api/types/albums";
import { IGetArtistMonthlyTrendsResponse } from "@/services/api/types/artist";
import { DASHBOARD_TYPE, DashboardType } from "@/types/enums/dashboard.enum";

type DashBoardTrendsChart = IGetAdminMonthlyTrendsResponse | IGetArtistMonthlyTrendsResponse | IGetAlbumMonthlyTrendsResponse;

const getAdminDashboardTrendsChart = (month: string): Promise<IGetAdminMonthlyTrendsResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_ADMIN_BAR);
    }, 2000);
  });
};

const getArtistDashboardTrendsChart = (month: string, artistId?: string): Promise<IGetArtistMonthlyTrendsResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_ARTIST_BAR);
    }, 2000);
  });
};

const getAlbumDashboardTrendsChart = (month: string, albumId?: string): Promise<IGetAlbumMonthlyTrendsResponse> => {
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
