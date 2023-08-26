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
import { IState } from "@/redux/store";
import useDashboardAlbumInfo from "@/services/queries/dashboard/useDashboardAlbumInfo";
import useDashboardAlbumTrendsChart from "@/services/queries/dashboard/useDashboardAlbumTrendsChart";
import useDashboardCards from "@/services/queries/dashboard/useDashboardCards";
import { useDashboardTopFiveRevenueChart } from "@/services/queries/dashboard/useDashboardTopFiveRevenueChart";
import useDashboardTrendsChart from "@/services/queries/dashboard/useDashboardTrendsChart";
import { DASHBOARD_TYPE } from "@/types/enums/dashboard.enum";
import { MEMBER_ROLE, MemberRole } from "@/types/enums/user.enum";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

interface AlbumDashboardPageProps {
  month: string
  albumId: string
}

const AlbumDashboardPage = ({ month, albumId }: AlbumDashboardPageProps) => {
  // TODO: 타입 추론 unknown으로 되는 문제 해결
  const memberRole = useSelector<IState>((state) => {
    return state.user.member.role;
  }) as MemberRole;
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
  } = useDashboardTrendsChart(DASHBOARD_TYPE.ALBUM, month, undefined, albumId);
  const {
    topFiveRevenueData,
    istopFiveRevenueDataLoading,
    istopFiveRevenueDataError,
  } = useDashboardTopFiveRevenueChart(DASHBOARD_TYPE.ALBUM, month, undefined, albumId);
  const {
    albumTrendsChart,
    isAlbumTrendsChartLoading,
    isalbumTrendsChartError,
  } = useDashboardAlbumTrendsChart(month, albumId);
  const {
    albumInfo,
    isAlbumInfoLoading,
    isalbumInfoError,
  } = useDashboardAlbumInfo(month, albumId);

  if (isCardsLoading
    || istrendsChartLoading
    || istopFiveRevenueDataLoading
    || isAlbumTrendsChartLoading || isAlbumInfoLoading) return <div>로딩 중</div>;

  if (isCardsError
    || istrendsChartError
    || istopFiveRevenueDataError
    || isalbumTrendsChartError || isalbumInfoError) return <div>에러 발생</div>;

  return (
    <section className={cx("container")}>
      <div className={cx("sectionHeader")}>
        <h1 className={cx("title")}>앨범명</h1>
        {memberRole === MEMBER_ROLE.ARTIST && <AlbumDetailsInformationTooltip />}
        <div className={cx("monthPickerDropdownContainer", { artist: memberRole === MEMBER_ROLE.ARTIST })}>
          <MonthPickerDropdown />
        </div>
        <button className={cx("albumInfo")} onClick={() => { setIsOpenAlbumInfoModal(true); }}>앨범 정보 보기</button>
      </div>
      <DashboardCardList data={cardsData!} />
      <div className={cx("chartContainer")}>
        <MonthlyTrendChart barChartData={trendsChartData!} type={MEMBER_ROLE.ARTIST} />
        <TopFiveRevenueChart topFiveChartData={topFiveRevenueData!} />
      </div>
      <AlbumTrendsChart albumTrendsChartData={albumTrendsChart!} memberRole={MEMBER_ROLE.ARTIST} />
      <AlbumInfoModal
        data={albumInfo!}
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
