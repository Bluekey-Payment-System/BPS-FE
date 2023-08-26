import { IGetAdminMonthlyEarningsTrendsResponse, IGetArtistMonthlyEarningsTrendsResponse } from "@/services/api/types/admin";
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
  chartData: IGetAdminMonthlyEarningsTrendsResponse | IGetArtistMonthlyEarningsTrendsResponse,
  type: MemberRole,
) => {
  const convertedBarChartData = chartData.contents.map((data) => {
    if (type === MEMBER_ROLE.ARTIST && "settlement" in data) {
      return {
        month: getMonthName(data.month),
        settlement: data.settlement,
        revenue: data.revenue,
      };
    }
    if ("netIncome" in data) {
      return { month: getMonthName(data.month), netIncome: data.netIncome, revenue: data.revenue };
    }
    return { month: getMonthName(data.month), revenue: data.revenue };
  });

  return convertedBarChartData; // 함수에서 변환된 데이터를 반환
};

export const getMaxValue = (
  chartData: IGetAdminMonthlyEarningsTrendsResponse | IGetArtistMonthlyEarningsTrendsResponse,
  type: MemberRole,
): number => {
  let maxValue = 0;

  for (let i = 0; i < chartData.contents.length; i += 1) {
    let valueToCompare = 0;
    const content = chartData.contents[i];

    if (type === MEMBER_ROLE.ARTIST && "settlement" in content) {
      valueToCompare = Math.max(content.settlement || 0, content.revenue as number);
    }
    if ("netIncome" in content) {
      valueToCompare = Math.max(content.netIncome || 0, content.revenue as number);
    }

    if (valueToCompare > maxValue) {
      maxValue = valueToCompare;
    }
  }

  return maxValue;
};
