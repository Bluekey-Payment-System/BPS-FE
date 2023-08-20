import AlbumTrendsChart from "@/components/dashboard/AlbumTrendsChart/AlbumTrendsChart";
import { MEMBER_TYPE } from "@/types/enums/user.enum";

const data = {
  contents: [
    {
      trackId: 2,
      koTrackName: "금요일에 만나요asdasdasd",
      enTrackName: "meet on Friday",
      monthlyTrend: [
        {
          month: 1,
          settlement: 2142344,
          revenue: 732143,
        },
        {
          month: 2,
          settlement: 2231211,
          revenue: 7323,
        },
        {
          month: 3,
          settlement: 2261211,
          revenue: 732143,
        },
        {
          month: 4,
          settlement: 2142344,
          revenue: 732143,
        },
        {
          month: 5,
          settlement: 2142344,
          revenue: 732143,
        },
        {
          month: 6,
          settlement: 2142344,
          revenue: 732143,
        },
        {
          month: 7,
          settlement: 2142344,
          revenue: 732143,
        },
        {
          month: 8,
          settlement: 2142344,
          revenue: 732143,
        },
        {
          month: 9,
          settlement: 2142344,
          revenue: 732143,
        },
        {
          month: 10,
          settlement: 2142344,
          revenue: 732143,
        },
        {
          month: 11,
          settlement: 2142344,
          revenue: 732144,
        },
        {
          month: 12,
          settlement: 2142344,
          revenue: 732143,
        },
      ],
    },
    {
      trackId: 1,
      koTrackName: "너랑나",
      enTrackName: "U and I",
      monthlyTrend: [
        {
          month: 1,
          settlement: 2142344,
          revenue: 732143,
        },
        {
          month: 2,
          settlement: 2142344,
          revenue: 732143,
        },
        {
          month: 3,
          settlement: 2142344,
          revenue: 732143,
        },
        {
          month: 4,
          settlement: 2142344,
          revenue: 732143,
        },
        {
          month: 5,
          settlement: 2142344,
          revenue: 732143,
        },
        {
          month: 6,
          settlement: 2142344,
          revenue: 732143,
        },
        {
          month: 7,
          settlement: 2142344,
          revenue: 732143,
        },
        {
          month: 8,
          settlement: 2142344,
          revenue: 732143,
        },
        {
          month: 9,
          settlement: 2142344,
          revenue: 732143,
        },
        {
          month: 10,
          settlement: 2142344,
          revenue: 732143,
        },
        {
          month: 11,
          settlement: 2142344,
          revenue: 732143,
        },
        {
          month: 12,
          settlement: 2142344,
          revenue: 732143,
        },
      ],
    },
  ],
};
        
const TonyPage = () => {
  return (
    <AlbumTrendsChart albumTrendsChartData={data} memberType={MEMBER_TYPE.ADMIN} />
  );
};

export default TonyPage;
