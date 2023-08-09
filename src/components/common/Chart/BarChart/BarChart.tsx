import { ResponsiveBar } from "@nivo/bar";

import { BarItem } from "./BarItem";

const BarChart = ({ data /* see data tab */ }) => {
  let maxValue = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].companyProfit > maxValue || data[i].salesRevenue > maxValue) {
      maxValue = Math.max(data[i].companyProfit, data[i].salesRevenue);
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
      barComponent={BarItem}
      borderRadius={7}
      data={data}
      keys={[
        "companyProfit",
        "salesRevenue",
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
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendPosition: "middle",
        legendOffset: 0,
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
      barAriaLabel={(e) => { return `${e.id}: ${e.formattedValue} in country: ${e.indexValue}`; }}
    />
  );
};

export default BarChart;
