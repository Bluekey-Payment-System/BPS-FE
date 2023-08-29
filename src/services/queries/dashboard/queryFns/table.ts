/* eslint-disable @typescript-eslint/no-unused-vars */
import { MOCK_ADMIN_TABLE, MOCK_ARTIST_TABLE } from "@/constants/mock";
import { ITEMS_PER_DASHBOARD_TABLE } from "@/constants/pagination";
import { IGetAdminTrackTransactionResponse } from "@/services/api/types/admin";
import { IGetArtistTrackTransactionResponse } from "@/services/api/types/artist";
import { AdminDashboardType, ArtistDashboardType, DASHBOARD_TYPE } from "@/types/enums/dashboard.enum";

const getAdminDashboardTable = (
  month: string,
  page: number,
  size: number,
  sortBy: string,
  searchBy: string,
  keyword: string,
): Promise<IGetAdminTrackTransactionResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_ADMIN_TABLE);
    }, 2000);
  });
};

const getArtistDashboardTable = (
  month: string,
  page: number,
  size: number,
  sortBy: string,
  searchBy: string,
  keyword: string,
  artistId?: string,
): Promise<IGetArtistTrackTransactionResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_ARTIST_TABLE);
    }, 2000);
  });
};

export const getDashboardTable = (
  type: AdminDashboardType | ArtistDashboardType,
  month: string,
  page: number,
  sortBy: string,
  searchBy: string,
  keyword: string,
  artistId?: string,
) => {
  const data = (type === DASHBOARD_TYPE.ADMIN)
    ? getAdminDashboardTable(
      month,
      page,
      ITEMS_PER_DASHBOARD_TABLE,
      sortBy,
      searchBy,
      keyword,
    )
    : getArtistDashboardTable(
      month,
      page,
      ITEMS_PER_DASHBOARD_TABLE,
      sortBy,
      searchBy,
      keyword,
      artistId,
    );
  return data;
};
