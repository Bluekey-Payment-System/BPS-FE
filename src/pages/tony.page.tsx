import LineChart from "@/components/common/Chart/LineChart/LineChart";
import { IMappedChartData, mapLineDataToMonthlySummary } from "@/components/common/Chart/LineChart/LineChart.utils";

const data = {
  tracks: [
    {
      id: 1,
      name: "곡 제목",
      enName: "track1",
      monthlyTrend: [
        {
          month: 1,
          settlement: 3456789,
          revenue: 23456789,
        },
        {
          month: 2,
          settlement: 3456789,
          revenue: 23456789,
        },
        {
          month: 3,
          settlement: 4000089,
          revenue: 45000890,
        },
        {
          month: 4,
          settlement: 3456789,
          revenue: 47000890,
        },
        {
          month: 5,
          settlement: 3456789,
          revenue: 23456789,
        },
        {
          month: 6,
          settlement: 3456789,
          revenue: 0,
        },
        {
          month: 7,
          settlement: 3456789,
          revenue: 23456789,
        },
        {
          month: 8,
          settlement: 3456789,
          revenue: 23456789,
        },
        {
          month: 9,
          settlement: 3456789,
          revenue: 23456789,
        },
        {
          month: 10,
          settlement: 3456789,
          revenue: 23456789,
        },
        {
          month: 11,
          settlement: 3456789,
          revenue: 23456789,
        }, {
          month: 12,
          settlement: 3456789,
          revenue: 23456789,
        },
      ],
    },
  ],
};

const TonyPage = () => {

  const chartData: IMappedChartData[] = mapLineDataToMonthlySummary(data, "revenue", 1);
  return (
    <div style={{ width: "700px", height: "300px" }}>
      <LineChart lineChartData={chartData} />
    </div>
  );
};

export default TonyPage;
