import { getMonthName } from "../chart.utils";

export interface ILineChart {
  tracks: ILineChartList[]
}

interface ILineChartList {
  id: number,
  name: string,
  enName: string,
  monthlyTrend: ILineChartItem[]
}

interface ILineChartItem {
  month: number,
  settlement: number,
  revenue: number,
}

export interface IMappedChartData {
  id: number,
  data: {
    x: string,
    y: number
  }[]
}

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
