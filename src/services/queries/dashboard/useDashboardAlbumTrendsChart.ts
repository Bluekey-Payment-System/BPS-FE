/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import { useQuery } from "@tanstack/react-query";

import { MOCK_ALBUM_LINE } from "@/constants/mock";
import { IGetAlbumTrackSettlementTrendsResponse } from "@/services/api/types/albums";

export const getMemberAlbumTrendsChart = (month: string, albumId: string): Promise<IGetAlbumTrackSettlementTrendsResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => { return resolve(MOCK_ALBUM_LINE); }, 2000);
  });
};

const useDashboardAlbumTrendsChart = (month: string, albumId: string) => {
  const { data: albumTrendsChart, isLoading: isalbumTrendsChartLoading, isError: isalbumTrendsChartError } = useQuery(
    ["dashboard", "albumTrendsChart"],
    () => { return getMemberAlbumTrendsChart(month, albumId); },
    { staleTime: 5000 },
  );

  return {
    albumTrendsChart, isalbumTrendsChartLoading, isalbumTrendsChartError,
  };
};

export default useDashboardAlbumTrendsChart;
