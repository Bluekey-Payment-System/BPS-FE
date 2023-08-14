import { getMonthName } from "../chart.utils";

import { IMappedChartData, ILineChart } from "./LineChart.types";

export const getMaxValueInLineChart = (chartList: IMappedChartData[]) => {
  let maxValue = 0;
  for (let i = 0; i < chartList[0].data.length; i += 1) {
    if (chartList[0].data[i].y > maxValue) {
      maxValue = chartList[0].data[i].y;
    }
  }

  return maxValue;
};

export const mapLineDataToMonthlySummary = (
  chartData: ILineChart,
  type: "settlement" | "revenue",
  id: number,
) => {
  const findChartData = chartData.tracks.find((data) => { return data.id === id; });
  if (!findChartData) return [];
  const data = {
    id: findChartData.id,
    data: findChartData.monthlyTrend.map((chartItem) => {
      return {
        x: getMonthName(chartItem?.month),
        y: chartItem[type],
      };
    }),
  };
  return [data];
};
