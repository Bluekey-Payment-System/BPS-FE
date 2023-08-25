import { ResponsiveLine } from "@nivo/line";

import { ILineTrackSettlementTrends } from "@/types/dto";
import { MemberRole } from "@/types/enums/user.enum";
import formatMoney from "@/utils/formatMoney";

import { mapLineDataToMonthlySummary, getMaxValueInLineChart } from "./LineChart.utils";

const yAxisFormat = (item: number) => {
  return (
    <tspan style={{ fill: "#a3aab6" }}>
      {(formatMoney(item, "chart"))}
    </tspan>
  );
};

interface LineChartProps {
  albumTrendsChartData: ILineTrackSettlementTrends,
  memberRole: MemberRole,
}

/**
 * @author 임병욱
 * @param {IGetAlbumTrackSettlementTrendsResponse} albumTrendsChartData - 차트 데이터
 * @param {MemberRole} memberRole - SUPER_ADMIN | ADMIN | ARTIST
*/
const LineChart = ({ albumTrendsChartData, memberRole }: LineChartProps) => {
  const monthlySummaryData = mapLineDataToMonthlySummary(albumTrendsChartData, memberRole);

  return (
    <ResponsiveLine
      colors="#a3aab6"
      theme={{
        grid: {
          line: {
            stroke: "#f3f5f8",
            strokeWidth: 1,
            strokeDasharray: "3 3",
          },
        },
      }}
      data={monthlySummaryData}
      margin={{
        top: 50, right: 50, bottom: 50, left: 50,
      }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: getMaxValueInLineChart(albumTrendsChartData, memberRole) * 1.2,
        stacked: true,
        reverse: false,
      }}
      axisBottom={{
        tickSize: 0,
        tickPadding: 8,
        tickRotation: 0,
      }}
      axisLeft={{
        tickSize: 0,
        tickPadding: 9,
        tickRotation: 0,
        format: yAxisFormat,

      }}
      enableGridX={false}
      pointSize={5}
      pointColor="#ffa84a"
      pointBorderWidth={2}
      pointBorderColor="#ffa84a"
      pointLabelYOffset={-12}
      legends={[]}
    />
  );
};

export default LineChart;
