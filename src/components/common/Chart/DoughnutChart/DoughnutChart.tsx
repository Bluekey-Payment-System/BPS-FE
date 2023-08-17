import { ResponsivePie } from "@nivo/pie";

import { chartColor } from "../chart.utils";

import { DoughnutChartProps } from "./DoughnutChart.types";
import { createChartDataFromContents } from "./DoughnutChart.utils";

const CustomTooltip = () => { return null; };

const formattedValue = (value: number) => { return `${value}%`; };

/**
 * @author 임병욱
 * @param doughnutData - 차트 데이터
*/
const DoughnutChart = ({ doughnutData }: { doughnutData: DoughnutChartProps }) => {
  const { contents } = doughnutData;
  const chartData = createChartDataFromContents(contents);

  return (
    <ResponsivePie
      arcLabelsTextColor="#ffffff"
      colors={chartColor}
      tooltip={CustomTooltip}
      data={chartData}
      margin={{
        top: 30, right: 30, bottom: 30, left: 30,
      }}
      valueFormat={formattedValue}
      startAngle={360}
      endAngle={-360}
      sortByValue
      innerRadius={0.75}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [
          [
            "darker",
            0.2,
          ],
        ],
      }}
      enableArcLinkLabels={false}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      legends={[]}
    />
  );
};

export default DoughnutChart;
