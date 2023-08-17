import { MemberType } from "@/types/enums/user.enum";

import { ChartDataProps } from "./BarChart.types";

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

export const mapChartDataToMonthlySummary = (
  chartData: ChartDataProps[],
  type: MemberType,
) => {
  const convertedBarChartData = chartData.map((data) => {
    if (type === "ARTIST") {
      return {
        month: getMonthName(data.month),
        settlement: data.settlement,
        revenue: data.revenue,
      };
    }
    return { month: getMonthName(data.month), netIncome: data.netIncome, revenue: data.revenue };
  });

  return convertedBarChartData;
};

export const getMaxValue = (chartData: ChartDataProps[], type: MemberType): number => {
  let maxValue = 0;

  for (let i = 0; i < chartData.length; i += 1) {
    let valueToCompare = 0;

    if (type === "ARTIST") {
      valueToCompare = Math.max(chartData[i].settlement || 0, chartData[i].revenue);
    } else {
      valueToCompare = Math.max(chartData[i].netIncome || 0, chartData[i].revenue);
    }

    if (valueToCompare > maxValue) {
      maxValue = valueToCompare;
    }
  }

  return maxValue;
};
