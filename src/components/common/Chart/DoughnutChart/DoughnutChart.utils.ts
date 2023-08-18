// import { IGetAdminEarningsTopArtistResponse, IGetAdminEarningsTopTrackResponse } from "./";
import { IGetAdminEarningsTopArtistResponse, IGetAdminEarningsTopTrackResponse } from "@/services/api/types/admin";

interface ChartDataItem {
  id: string;
  label: string;
  value: number | null;
}

type DoughnutData = IGetAdminEarningsTopArtistResponse | IGetAdminEarningsTopTrackResponse;

export const createChartDataFromContents = (doughnutData: DoughnutData): ChartDataItem[] => {
  const chartData: ChartDataItem[] = doughnutData.contents.map((chartItem) => {
    if ("artist" in chartItem) {
      return {
        id: chartItem.artist.memberId.toString(),
        label: chartItem.artist.koArtistName,
        value: chartItem.proportion,
      };
    }
    return {
      id: chartItem.track.trackId.toString(),
      label: chartItem.track.koTrackName,
      value: chartItem.proportion,
    };
  });

  return chartData;
};
