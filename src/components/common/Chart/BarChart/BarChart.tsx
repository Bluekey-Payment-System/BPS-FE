import { ResponsiveBar } from "@nivo/bar";
import classNames from "classnames/bind";

import { IGetAdminMonthlyTrendsResponse } from "@/services/api/types/admin";
import { MEMBER_ROLE, MemberRole } from "@/types/enums/user.enum";
import formatMoney from "@/utils/formatMoney";

import styles from "./BarChart.module.scss";
import { mapChartDataToMonthlySummary, getMaxValue } from "./BarChart.utils";
import { BarItem } from "./BarItem";

const cx = classNames.bind(styles);

interface CustomTooltipProps {
  id: string,
  value: number
}

const tooltipTexts: { [key: string]: string } = {
  settlement: "정산액",
  revenue: "매출액",
  netIncome: "회사 수익",
};

const customTooltip = ({ id, value }: CustomTooltipProps) => {
  const tooltipText = tooltipTexts[id] || "Unknown";

  return (
    <div className={cx("tooltip")}>{`${tooltipText}: ${value.toLocaleString("ko-KR", { maximumFractionDigits: 0 })}원`}</div>
  );
};

const yAxisFormat = (item: number) => {
  return (
    <tspan style={{ fill: "#a3aab6" }}>
      {(formatMoney(item, "chart"))}
    </tspan>
  );
};

/**
 * @author 임병욱
 * @param barChartData - 차트 데이터이며 content를 제외완 [{month: 1, revenue: 1000000, settlement: 10000},] 형식
 * @param type - MEMBER_TYPE
*/
const BarChart = ({ barChartData, type }: {
  barChartData: IGetAdminMonthlyTrendsResponse,
  type: MemberRole
}) => {
  const maxValue: number = getMaxValue(barChartData, type);
  const formattedData = mapChartDataToMonthlySummary(barChartData, type);
  const keyType = type === MEMBER_ROLE.ARTIST ? ["settlement"] : ["revenue", "netIncome"];

  return (
    <ResponsiveBar
      theme={{
        grid: {
          line: {
            stroke: "#f3f5f8",
            strokeWidth: 1,
            strokeDasharray: "3 3",
          },
        },
      }}
      // maxValue={checkAllZeros(barChartData) ? 10000 : maxValue * 1.2}
      maxValue={maxValue === 0 ? 10000 : maxValue * 1.2}
      barComponent={BarItem}
      borderRadius={7}
      data={formattedData}
      tooltip={customTooltip}
      keys={keyType}
      indexBy="month"
      margin={{
        top: 60, right: -35, bottom: 20, left: 45,
      }}
      padding={type === MEMBER_ROLE.ARTIST ? 0.87 : 0.7}
      innerPadding={3}
      groupMode="grouped"
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={["#387ffd", "#bfd4f9"]}
      colorBy="id"
      axisBottom={{
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
      }}
      axisLeft={{
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        format: yAxisFormat,
      }}
      enableGridY
      enableLabel={false}
      legends={[]}
      role="application"
    />
  );
};

export default BarChart;
