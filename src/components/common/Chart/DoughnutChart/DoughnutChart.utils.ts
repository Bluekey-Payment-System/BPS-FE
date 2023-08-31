// import { IGetAdminEarningsTopArtistResponse, IGetAdminEarningsTopTrackResponse } from "./";
import { IGetAdminEarningsTopArtistResponse } from "@/services/api/types/admin";
import { IGetAlbumRevenueTopTrackResponse } from "@/services/api/types/albums";

import generateID from "../../Inputs/Input.util";

interface ChartDataItem {
  id: string;
  label: string;
  value: number | null;
}

type DoughnutData = IGetAdminEarningsTopArtistResponse | IGetAlbumRevenueTopTrackResponse;

export const createChartDataFromContents = (doughnutData: DoughnutData): ChartDataItem[] => {
  const chartData: ChartDataItem[] = doughnutData.contents.map((chartItem) => {
    if ("artist" in chartItem) {
      if (chartItem.artist === null) {
        return {
          id: generateID("doughnut"),
          label: "기타",
          value: chartItem.proportion,
        };
      }
      return {
        id: chartItem.artist.memberId.toString(),
        label: chartItem.artist.name,
        value: chartItem.proportion,
      };
    }
    if (chartItem.track === null) {
      return {
        id: generateID("doughnut"),
        label: "기타",
        value: chartItem.proportion,
      };
    }
    return {
      id: chartItem.track.trackId.toString(),
      label: chartItem.track.name,
      value: chartItem.proportion,
    };
  });

  return chartData;
};
