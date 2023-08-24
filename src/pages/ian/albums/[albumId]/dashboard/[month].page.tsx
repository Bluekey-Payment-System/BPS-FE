import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import Link from "next/link";

import MainLayoutWithDropdown from "@/components/common/Layouts/MainLayoutWithDropdown";
import MonthPickerDropdown from "@/components/common/MonthPicker/MonthPickerDropdown";
import AlbumTrendsChart from "@/components/dashboard/AlbumTrendsChart/AlbumTrendsChart";
import DashboardCardList from "@/components/dashboard/DashboardCardList/DashboardCardList";
import useDashboardAlbumTrendsChart, { getMemberAlbumTrendsChart } from "@/services/queries/dashboard/useDashboardAlbumTrendsChart";
import useDashboardCards, { getDashboardCards } from "@/services/queries/dashboard/useDashboardCards";
import { DASHBOARD_TYPE } from "@/types/enums/dashboard.enum";
import { MEMBER_ROLE } from "@/types/enums/user.enum";

interface IanProps {
  month: string
  albumId: string
}

const Ian = ({
  month, albumId,
}: IanProps) => {
  const {
    cardsData,
    isCardsError,
    isCardsLoading,
  } = useDashboardCards(DASHBOARD_TYPE.ALBUM, month, undefined, albumId);

  const {
    albumTrendsChart,
    isalbumTrendsChartError, isAlbumTrendsChartLoading,
  } = useDashboardAlbumTrendsChart(month, albumId);

  if (isCardsLoading || isalbumTrendsChartError) return <div>로딩 중...</div>;
  if (isCardsError || isAlbumTrendsChartLoading) return <div>에러 발생!</div>;
  if (!cardsData || !albumTrendsChart) return <div>데이터가 없다</div>;

  return (
    <MainLayoutWithDropdown title="대쉬보드" dropdownElement={<MonthPickerDropdown />}>
      <DashboardCardList data={cardsData} />
      <AlbumTrendsChart albumTrendsChartData={albumTrendsChart} memberRole={MEMBER_ROLE.ARTIST} />
      <Link href="/ian/admin/dashboard/202308">어드민 대시보드 페이지 이동</Link>
    </MainLayoutWithDropdown>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const queryClient = new QueryClient();

  // TODO: yearMonth에 유효하지 않은 값이 들어왔을 때 or 값이 없을 때 처리
  const albumId = query?.albumId as string;
  const month = query?.month as string;

  try {
    await Promise.all([
      queryClient.prefetchQuery(
        [DASHBOARD_TYPE.ALBUM, "dashboard", "card"],
        () => {
          return getDashboardCards(DASHBOARD_TYPE.ARTIST, month, undefined, albumId);
        },
      ),
      queryClient.prefetchQuery(
        ["dashboard", "albumTrendsChart"],
        () => {
          return getMemberAlbumTrendsChart(month, albumId);
        },
      ),
    ]);

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        month,
        albumId,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  } finally {
    queryClient.clear();
  }
};

export default Ian;
