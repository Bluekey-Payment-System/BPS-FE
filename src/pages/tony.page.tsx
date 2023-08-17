import TopFiveChart from "@/components/dashboard/TopFiveChart";

const data = {
  contents: [
    {
      artist: {
        id: 1,
        koName: "아이유",
        enName: "IU",
      },
      revenue: 1000000,
      growthRate: 2.1,
      proportion: 45,
    },
    {
      artist: {
        id: 2,
        koName: "아이유",
        enName: "IU",
      },
      revenue: 1000000,
      growthRate: 2.1,
      proportion: 45,
    },
    {
      artist: {
        id: 3,
        koName: "아이유",
        enName: "IU",
      },
      revenue: 1000000,
      growthRate: 2.1,
      proportion: 45,
    },
    {
      artist: {
        id: 4,
        koName: "아이유",
        enName: "IU",
      },
      revenue: 1000000,
      growthRate: 2.1,
      proportion: 45,
    },
    {
      artist: {
        id: 5,
        koName: "아이유",
        enName: "IU",
      },
      revenue: 1000000,
      growthRate: 2.1,
      proportion: 45,
    },
    {
      artist: {
        id: 6,
        koName: "이름이 긴 아...",
        enName: "IU",
      },
      revenue: 1000000,
      growthRate: 2.1,
      proportion: 45,
    },
  ],
};
const TonyPage = () => {
  return (
    <TopFiveChart topFiveChartData={data} type="ADMIN" />
  );
};

export default TonyPage;
