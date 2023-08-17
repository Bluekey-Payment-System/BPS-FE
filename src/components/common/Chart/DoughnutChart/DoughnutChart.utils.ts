import { IDoughnutArtistRevenue } from "@/types/dto";

export const createChartDataFromContents = (contents: IDoughnutArtistRevenue[]) => {
  const chartData = contents.map((item) => {
    return {
      id: item.artist.id.toString(),
      label: item.artist.koName,
      value: item.proportion,
    };
  });

  return chartData;
};
