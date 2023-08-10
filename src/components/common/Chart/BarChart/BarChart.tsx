import { ResponsiveBar } from "@nivo/bar";
import classNames from "classnames/bind";

import utilFormatMoney from "@/utils/utilFormatMoney";

import styles from "./BarChart.module.scss";
import { ChartDataProps, mapChartDataToMonthlySummary, getMaxValue } from "./BarChart.utils";
import { BarItem } from "./BarItem";

const cx = classNames.bind(styles);

const customTooltip = ({ id, value }: { id: string, value: number }) => {
  let tooltipText = "";

  switch (id) {
    case "settlement":
      tooltipText = "정산액";
      break;
    case "revenue":
      tooltipText = "매출액";
      break;
    case "netIncome":
      tooltipText = "회사 수익";
      break;
    default:
  }
  return (
    <div className={cx("tooltip")}>{`${tooltipText}: ${value.toLocaleString("ko-KR")}원`}</div>
  );
};

const yAxisFormat = (item: number) => {
  return (
    <tspan style={{ fill: "#a3aab6" }}>
      {(utilFormatMoney(item, "doughnut"))}
    </tspan>
  );
};

const BarChart = ({ barChartData }: { barChartData: ChartDataProps[] }) => {
  const maxValue: number = getMaxValue(barChartData);
  const formattedData = mapChartDataToMonthlySummary(barChartData);

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
      maxValue={maxValue * 1.2}
      barComponent={BarItem}
      borderRadius={7}
      data={formattedData}
      tooltip={customTooltip}
      keys={
        [
          "settlement",
          "revenue",
        ]
      }
      indexBy="month"
      margin={{
        top: 50, right: 130, bottom: 50, left: 60,
      }}
      padding={0.6}
      innerPadding={3}
      groupMode="grouped"
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={["#bfd4f9", "#387ffd"]}
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
