/* eslint-disable max-len */
import { ILineTrackSettlementTrends } from "@/types/dto";
import { MEMBER_TYPE, MemberType } from "@/types/enums/user.enum";

import { getMonthName } from "../chart.utils";

export const getMaxValueInLineChart = (chartList: ILineTrackSettlementTrends, memberType: MemberType) => {
  const values = chartList.monthlyTrend.map((chartItem) => {
    const value = memberType === MEMBER_TYPE.ARTIST ? chartItem.settlement : chartItem.revenue;
    return value !== null ? value : 0;
  });

  return Math.max(...values);
};

export const mapLineDataToMonthlySummary = (
  chartData: ILineTrackSettlementTrends,
  memberType: MemberType,
) => {
  const data = {
    id: chartData.koTrackName,
    data: chartData.monthlyTrend.map((chartItem) => {
      return {
        x: getMonthName(chartItem.month),
        y: memberType === MEMBER_TYPE.ARTIST ? chartItem.settlement : chartItem.revenue,
      };
    }),
  };
  return [data];
};
