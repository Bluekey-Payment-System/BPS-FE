import { IDoughnutChartList } from "./DoughnutChart.types";

export const createChartDataFromContents = (contents: IDoughnutChartList[]) => {
  const chartData = contents.map((item: IDoughnutChartList) => {
    return {
      id: item.track.id.toString(),
      label: item.track.name,
      value: item.proportion,
    };
  });

  return chartData;
};
