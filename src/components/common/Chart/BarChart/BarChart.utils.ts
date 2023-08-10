export interface ChartDataProps {
  month: number,
  settlement: number,
  revenue: number,
}

export const getMonthName = (num: number): string => {
  switch (num) {
    case 1:
      return "Jan";
    case 2:
      return "Feb";
    case 3:
      return "Mar";
    case 4:
      return "Apr";
    case 5:
      return "May";
    case 6:
      return "Jun";
    case 7:
      return "Jul";
    case 8:
      return "Aug";
    case 9:
      return "Sep";
    case 10:
      return "Oct";
    case 11:
      return "Nov";
    case 12:
      return "Dec";
    default:
      throw new Error("Invalid month number");
  }
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
