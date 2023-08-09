import { ResponsiveBar } from "@nivo/bar";

import utilFormatMoney from "@/utils/utilFormatMoney";

import { BarItem } from "./BarItem";

const BarChart = ({ barChartData /* see data tab */ }) => {
  let maxValue = 0;
  for (let i = 0; i < barChartData.length; i++) {
    if (barChartData[i].settlement > maxValue || barChartData[i].revenue > maxValue) {
      maxValue = Math.max(barChartData[i].settlement, barChartData[i].revenue);
    }
  }
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
      data={barChartData}
      keys={[
        "settlement",
        "revenue",
      ]}
      indexBy="month"
      margin={{
        top: 50, right: 130, bottom: 50, left: 60,
      }}
      padding={0.7}
      innerPadding={3}
      groupMode="grouped"
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={["#bfd4f9", "#387ffd"]}
      colorBy="id"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
      }}
      axisLeft={{
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        format: (item) => { return utilFormatMoney(item, "doughnut"); },
      }}
      enableGridY
      enableLabel={false}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [
          [
            "darker",
            1.6,
          ],
        ],
      }}
      legends={[]}
      role="application"
      ariaLabel="Nivo bar chart demo"
    // barAriaLabel={(e) => { return `${e.id}: ${e.formattedValue} in country: ${e.indexValue}`; }}
    />
  );
};

export default BarChart;
