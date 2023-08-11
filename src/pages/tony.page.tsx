import dynamic from "next/dynamic";

const data = {
  contents: [
    {
      month: 7,
      settlement: 34,
      revenue: 50,
    },
    {
      month: 8,
      settlement: 24,
      revenue: 65,
    },
    {
      month: 9,
      settlement: 38,
      revenue: 12,
    }, {
      month: 10,
      settlement: 89,
      revenue: 67,
    }, {
      month: 11,
      settlement: 54,
      revenue: 27,
    },
    {
      month: 12,
      settlement: 1,
      revenue: 2,
    },
  ],
};

const barChartData = data.contents;

const DynamicBarChart = dynamic(() => { return import("@/components/common/Chart/BarChart/BarChart"); }, { ssr: false });

const TonyPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [value, setValue] = useState("");
  return (
    <div style={{ width: "550px", height: "380px" }}>
      <DynamicBarChart barChartData={barChartData} />
    </div>
  );
};

export default TonyPage;
