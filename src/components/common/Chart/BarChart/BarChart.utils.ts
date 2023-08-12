export interface ChartDataProps {
  month: number,
  settlement: number,
  revenue: number,
}

const monthNames: { [key: number]: string } = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};

export const getMonthName = (num: number): string => {
  if (monthNames[num]) {
    return monthNames[num];
  }
  throw new Error("Invalid month number");
};

export const mapChartDataToMonthlySummary = (chartData: ChartDataProps[]) => {
  const convertedBarChartData = chartData.map((data) => {
    return { month: getMonthName(data.month), settlement: data.settlement, revenue: data.revenue };
  });

  return convertedBarChartData;
};

export const getMaxValue = (chartData: ChartDataProps[]): number => {
  let maxValue = 0;
  for (let i = 0; i < chartData.length; i += 1) {
    if (chartData[i].settlement > maxValue || chartData[i].revenue > maxValue) {
      maxValue = Math.max(chartData[i].settlement, chartData[i].revenue);
    }
  }
  return maxValue;
};
