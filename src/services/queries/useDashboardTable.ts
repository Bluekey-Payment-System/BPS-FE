/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@tanstack/react-query";

import { MOCK_ADMIN_TABLE, MOCK_ARTIST_TABLE } from "@/constants/mock";
import { IGetAdminTrackTransactionResponse } from "@/services/api/types/admin";
import { IGetArtistTrackTransactionResponse } from "@/services/api/types/artist";
import { AdminDashboardType, ArtistDashboardType, DASHBOARD_TYPE } from "@/types/enums/dashboard.enum";

const getAdminDashboardTable = (yearMonth: string): Promise<IGetAdminTrackTransactionResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_ADMIN_TABLE);
    }, 2000);
  });
};

const getArtistDashboardTable = (
  yearMonth: string,
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
) => {
  const data = (type === DASHBOARD_TYPE.ADMIN)
    ? getAdminDashboardTable(yearMonth)
    : getArtistDashboardTable(yearMonth);
  return data;
};

const useDashboardTable = (type: AdminDashboardType | ArtistDashboardType, yearMonth: string) => {
  const { data: tableData, isError: isTableError, isLoading: isTableLoading } = useQuery(
    [type, "dashboard", "table"],
    () => {
      return getDashboardTable(type, yearMonth);
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
