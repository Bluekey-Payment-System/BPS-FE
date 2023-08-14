import DoughnutChart from "@/components/common/Chart/DoughnutChart/DoughnutChart";

const data = {
  contents: [
    {
      track: {
        id: 1,
        name: "트랙1",
        enName: "track1",
      },
      revenue: 123456789,
      growthRate: 11,
      proportion: 45,
    },
    {
      track: {
        id: 2,
        name: "트랙2",
        enName: "track2",
      },
      revenue: 13456789,
      growthRate: 30,
      proportion: 35,
    },
    {
      track: {
        id: 3,
        name: "트랙3",
        enName: "track3",
      },
      revenue: 3456789,
      growthRate: -12,
      proportion: 28,
    }, {
      track: {
        id: 4,
        name: "트랙3",
        enName: "track3",
      },
      revenue: 3456789,
      growthRate: -12,
      proportion: 28,
    },
    {
      track: {
        id: 5,
        name: "트랙3",
        enName: "track3",
      },
      revenue: 3456789,
      growthRate: -12,
      proportion: 28,
    },
    {
      track: {
        id: 6,
        name: "트랙3",
        enName: "track3",
      },
      revenue: 3456789,
      growthRate: -12,
      proportion: 28,
    },
  ],
};

const TonyPage = () => {
  return (
    <div style={{ width: "300px", height: "300px" }}>
      <DoughnutChart doughnutData={data} />
    </div>
  );
};

export default TonyPage;
