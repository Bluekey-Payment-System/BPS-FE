import { useState } from "react";
import { useSelector } from "react-redux";

import classNames from "classnames/bind";
import { GetServerSideProps } from "next";

import AlbumDetailsInformationTooltip from "@/components/album/AlbumDetailsInformationTooltip/AlbumDetailsInformationTooltip";
import MonthPickerDropdown from "@/components/common/MonthPicker/MonthPickerDropdown";
import AlbumInfoModal from "@/components/dashboard/AlbumInfoModal/AlbumInfoModal";
import AlbumTrendsChart from "@/components/dashboard/AlbumTrendsChart/AlbumTrendsChart";
import DashboardCardList from "@/components/dashboard/DashboardCardList/DashboardCardList";
import MonthlyTrendChart from "@/components/dashboard/MonthlyTrendsChart/MonthlyTrendsChart";
import TopFiveRevenueChart from "@/components/dashboard/TopFiveRevenueChart/TopFiveRevenueChart";
import { MOCK_ALBUM_TRACKS } from "@/constants/mock";
import { IState } from "@/redux/store";
import useDashboardAlbumTrendsChart from "@/services/queries/dashboard/useDashboardAlbumTrendsChart";
import useDashboardCards from "@/services/queries/dashboard/useDashboardCards";
import { useDashboardTopFiveRevenueChart } from "@/services/queries/dashboard/useDashboardTopFiveRevenueChart";
import useDashboardTrendsChart from "@/services/queries/dashboard/useDashboardTrendsChart";
import { DASHBOARD_TYPE } from "@/types/enums/dashboard.enum";
import { MEMBER_TYPE, MemberType } from "@/types/enums/user.enum";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

interface AlbumDashboardPageProps {
  month: string
  albumId: string
}

const AlbumDashboardPage = ({ month, albumId }: AlbumDashboardPageProps) => {
  // TODO: 타입 추론 unknown으로 되는 문제 해결
  const memberType = useSelector<IState>((state) => {
    return state.user.member!.type;
  }) as MemberType;
  const [isOpenAlbumInfoModal, setIsOpenAlbumInfoModal] = useState(false);

  const {
    cardsData,
    isCardsError,
    isCardsLoading,
  } = useDashboardCards(DASHBOARD_TYPE.ALBUM, month, undefined, albumId);
  const {
    trendsChartData,
    istrendsChartLoading,
    istrendsChartError,
  } = useDashboardTrendsChart(DASHBOARD_TYPE.ARTIST, month, undefined, albumId);
  const {
    topFiveRevenueData,
    istopFiveRevenueDataLoading,
    istopFiveRevenueDataError,
  } = useDashboardTopFiveRevenueChart(DASHBOARD_TYPE.ARTIST, month, undefined, albumId);
  const {
    albumTrendsChart,
    isAlbumTrendsChartLoading,
    isalbumTrendsChartError,
  } = useDashboardAlbumTrendsChart(month, albumId);

  if (isCardsLoading
    || istrendsChartLoading
    || istopFiveRevenueDataLoading || isAlbumTrendsChartLoading) return <div>로딩 중</div>;
  if (isCardsError
    || istrendsChartError
    || istopFiveRevenueDataError || isalbumTrendsChartError) return <div>에러 발생</div>;

  return (
    <section className={cx("container")}>
      <div className={cx("sectionHeader")}>
        <h1 className={cx("title")}>앨범명</h1>
        {memberType === MEMBER_TYPE.ARTIST && <AlbumDetailsInformationTooltip />}
        <div className={cx("monthPickerDropdownContainer", { artist: memberType === MEMBER_TYPE.ARTIST })}>
          <MonthPickerDropdown />
        </div>
        <button className={cx("albumInfo")} onClick={() => { setIsOpenAlbumInfoModal(true); }}>앨범 정보 보기</button>
      </div>
      <DashboardCardList data={cardsData!} />
      <div className={cx("chartContainer")}>
        <MonthlyTrendChart barChartData={trendsChartData!} type={memberType} />
        <TopFiveRevenueChart topFiveChartData={topFiveRevenueData!} />
      </div>
      <AlbumTrendsChart albumTrendsChartData={albumTrendsChart!} memberType={memberType} />
      <AlbumInfoModal
        data={MOCK_ALBUM_TRACKS}
        open={isOpenAlbumInfoModal}
        onClose={() => { setIsOpenAlbumInfoModal(false); }}
      />
    </section>
  );
};

// eslint-disable-next-line @typescript-eslint/require-await
const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { month, albumId } = query;

  return {
    props: {
      month: month as string,
      albumId: albumId as string,
    },
  };
};

export { getServerSideProps };
export default AlbumDashboardPage;
