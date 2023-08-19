import TopFiveChart from "@/components/dashboard/TopFiveChart/TopFiveChart";

const data = {
  contents: [
    {
      artist: {
        memberId: 1,
        koArtistName: "아이유",
        enArtistName: "IU",
      },
      revenue: 1000000,
      growthRate: 2.1,
      proportion: 45,
    },
    {
      artist: {
        memberId: 2,
        koArtistName: "아이유",
        enArtistName: "IU",
      },
      revenue: 1000000,
      growthRate: 2.1,
      proportion: 45,
    },
    {
      artist: {
        memberId: 3,
        koArtistName: "아이유",
        enArtistName: "IU",
      },
      revenue: 1000000,
      growthRate: 2.1,
      proportion: 45,
    },
    {
      artist: {
        memberId: 4,
        koArtistName: "아이유",
        enArtistName: "IU",
      },
      revenue: 1000000,
      growthRate: 2.1,
      proportion: 45,
    },
    {
      artist: {
        memberId: 5,
        koArtistName: "아이유",
        enArtistName: "IU",
      },
      revenue: 1000000,
      growthRate: 2.1,
      proportion: 45,
    },
    {
      artist: {
        memberId: 6,
        koArtistName: "이름이 긴 아...",
        enArtistName: "IU",
      },
      revenue: 1000000,
      growthRate: 2.1,
      proportion: 45,
    },
  ],
};
const TonyPage = () => {
  return (
    <TopFiveChart topFiveChartData={data} />
  );
};

export default TonyPage;
