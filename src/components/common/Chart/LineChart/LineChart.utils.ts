/* eslint-disable max-len */
import { ILineTrackSettlementTrends } from "@/types/dto";
import { MEMBER_ROLE, MemberRole } from "@/types/enums/user.enum";

import { getMonthName } from "../chart.utils";

export const getMaxValueInLineChart = (chartList: ILineTrackSettlementTrends, memberRole: MemberRole) => {
  const values = chartList.monthlyTrend.map((chartItem) => {
    const value = memberRole === MEMBER_ROLE.ARTIST ? chartItem.settlement : chartItem.revenue;
    return value !== null ? value : 0;
  });

  return Math.max(...values);
};

export const mapLineDataToMonthlySummary = (
  chartData: ILineTrackSettlementTrends,
  memberRole: MemberRole,
) => {
  const data = {
    id: chartData.name,
    data: chartData.monthlyTrend.map((chartItem) => {
      return {
        x: getMonthName(chartItem.month),
        y: memberRole === MEMBER_ROLE.ARTIST ? chartItem.settlement : chartItem.revenue,
      };
    }),
  };
  return [data];
};
