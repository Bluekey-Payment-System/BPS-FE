/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import { MOCK_ADMIN_DOUGHNUT, MOCK_ALBUM_DOUGHNUT, MOCK_ARTIST_DOUGHNUT } from "@/constants/mock";
import { IGetAdminEarningsTopArtistResponse } from "@/services/api/types/admin";
import { IGetAlbumRevenueTopTrackResponse } from "@/services/api/types/albums";
import { IGetArtistEarningsTopTrackResponse } from "@/services/api/types/artist";
import { DASHBOARD_TYPE, DashboardType } from "@/types/enums/dashboard.enum";

const getAdminDashboardTopFiveRevenueChart = (month: string, rank: number): Promise<IGetAdminEarningsTopArtistResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(MOCK_ADMIN_DOUGHNUT);
    }, 2000);
  });
};

const getArtistDashboardTopFiveRevenueChart = (month: string, rank: number, artistId?: string): Promise<IGetArtistEarningsTopTrackResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(MOCK_ARTIST_DOUGHNUT);
    }, 2000);
  });
};

const getAlbumDashboardTopFiveRevenueChart = (month: string, rank: number, albumId?: string): Promise<IGetAlbumRevenueTopTrackResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(MOCK_ALBUM_DOUGHNUT);
    }, 2000);
  });
};

export const getDashboardTopFiveRevenueChart = async (
  type: DashboardType,
  month: string,
  artistId?: string,
  albumId?: string,
  rank: number = 5,
) => {
  let response;
  switch (type) {
    case DASHBOARD_TYPE.ADMIN:
      response = await getAdminDashboardTopFiveRevenueChart(month, rank);
      break;
    case DASHBOARD_TYPE.ARTIST:
      response = await getArtistDashboardTopFiveRevenueChart(month, rank, artistId);
      break;
    case DASHBOARD_TYPE.ALBUM:
      response = await getAlbumDashboardTopFiveRevenueChart(month, rank, albumId);
      break;
    default:
      response = {} as IGetAdminEarningsTopArtistResponse | IGetArtistEarningsTopTrackResponse | IGetAlbumRevenueTopTrackResponse;
  }
  return response;
};
