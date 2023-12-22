import { IGetAdminMonthlyTrendsResponse } from "@/services/api/types/admin";
import { MEMBER_ROLE, MemberRole } from "@/types/enums/user.enum";

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
  chartData: IGetAdminMonthlyTrendsResponse,
  type: MemberRole,
) => {
  const convertedBarChartData = chartData.contents.map((data) => {
    if (type === MEMBER_ROLE.ARTIST) {
      return {
        month: getMonthName(data.month),
        settlement: data.settlement,
      };
    }
    return {
      month: getMonthName(data.month),
      revenue: data.revenue,
      netIncome: data.netIncome,
    };
  });

  return convertedBarChartData; // 함수에서 변환된 데이터를 반환
};

export const getMaxValue = (
  chartData: IGetAdminMonthlyTrendsResponse,
  type: MemberRole,
): number => {
  let maxValue = 0;

  for (let i = 0; i < chartData.contents.length; i += 1) {
    const content = chartData.contents[i];

    if (type === MEMBER_ROLE.ARTIST) {
      maxValue = Math.max(maxValue, content.settlement || 0);
    } else {
      maxValue = Math.max(maxValue, content.netIncome || 0, content.revenue || 0);
    }
  }

  return maxValue;
};
