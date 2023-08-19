/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@tanstack/react-query";

import { MOCK_ADMIN_TABLE, MOCK_ARTIST_TABLE } from "@/constants/mock";
import { ITEMS_PER_DASHBOARD_TABLE } from "@/constants/pagination";
import { IGetAdminTrackTransactionResponse } from "@/services/api/types/admin";
import { IGetArtistTrackTransactionResponse } from "@/services/api/types/artist";
import { AdminDashboardType, ArtistDashboardType, DASHBOARD_TYPE } from "@/types/enums/dashboard.enum";

const getAdminDashboardTable = (
  yearMonth: string,
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
  yearMonth: string,
  page: number,
  size: number,
  sortBy: string,
  searchBy: string,
  keyword: string,
): Promise<IGetArtistTrackTransactionResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_ARTIST_TABLE);
    }, 2000);
  });
};

export const getDashboardTable = (
  type: AdminDashboardType | ArtistDashboardType,
  yearMonth: string,
  page: number,
  sortBy: string,
  searchBy: string,
  keyword: string,
) => {
  const data = (type === DASHBOARD_TYPE.ADMIN)
    ? getAdminDashboardTable(
      yearMonth,
      page,
      ITEMS_PER_DASHBOARD_TABLE,
      sortBy,
      searchBy,
      keyword,
    )
    : getArtistDashboardTable(
      yearMonth,
      page,
      ITEMS_PER_DASHBOARD_TABLE,
      sortBy,
      searchBy,
      keyword,
    );
  return data;
};

const useDashboardTable = (
  type: AdminDashboardType | ArtistDashboardType,
  yearMonth: string,
  page: number,
  sortBy: string,
  searchBy: string,
  keyword: string,
) => {
  const { data: tableData, isError: isTableError, isLoading: isTableLoading } = useQuery(
    [type, "dashboard", "table"],
    () => {
      return getDashboardTable(type, yearMonth, page, sortBy, searchBy, keyword);
    },
    {
      staleTime: 5000,
    },
  );

  return ({
    tableData, isTableError, isTableLoading,
  });
};

export default useDashboardTable;
