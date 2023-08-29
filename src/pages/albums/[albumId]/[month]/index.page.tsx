/* eslint-disable max-len */
import { ParsedUrlQuery } from "querystring";

import { useState } from "react";
import { useSelector } from "react-redux";

import classNames from "classnames/bind";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import AlbumDetailsInformationTooltip from "@/components/album/AlbumDetailsInformationTooltip/AlbumDetailsInformationTooltip";
import MonthPickerDropdown from "@/components/common/MonthPicker/MonthPickerDropdown";
import AlbumInfoModal from "@/components/dashboard/AlbumInfoModal/AlbumInfoModal";
import AlbumTrendsChart from "@/components/dashboard/AlbumTrendsChart/AlbumTrendsChart";
import DashboardCardList from "@/components/dashboard/DashboardCardList/DashboardCardList";
import MonthlyTrendChart from "@/components/dashboard/MonthlyTrendsChart/MonthlyTrendsChart";
import TopFiveRevenueChart from "@/components/dashboard/TopFiveRevenueChart/TopFiveRevenueChart";
import { IState } from "@/redux/store";
import useAlbumDashboard from "@/services/queries/dashboard/useAlbumDashboard";
import { MEMBER_ROLE, MemberRole } from "@/types/enums/user.enum";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

interface AlbumDashboardPageProps {
  month: string
  albumId: string
}

const AlbumDashboardPage = ({ month, albumId }: InferGetServerSidePropsType<GetServerSideProps<AlbumDashboardPageProps>>) => {
  // TODO: 타입 추론 unknown으로 되는 문제 해결
  const memberRole = useSelector<IState>((state) => {
    return state.user.member.role;
  }) as MemberRole;
  const [isOpenAlbumInfoModal, setIsOpenAlbumInfoModal] = useState(false);

  const queries = useAlbumDashboard(month, albumId);
  const [cardQuery, trendsChartQuery, topFiveChartQuery, albumTrendsChartQuery, albumInfoQuery] = queries;

  const isLoading = queries.some((query) => { return query.isLoading; });
  const isError = queries.some((query) => { return query.isError; });

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생!</div>;

  return (
    <section className={cx("container")}>
      <div className={cx("sectionHeader")}>
        <h1 className={cx("title")}>{albumInfoQuery.data!.name}</h1>
        {memberRole === MEMBER_ROLE.ARTIST && <AlbumDetailsInformationTooltip />}
        <div className={cx("monthPickerDropdownContainer", { artist: memberRole === MEMBER_ROLE.ARTIST })}>
          <MonthPickerDropdown />
        </div>
        <button className={cx("albumInfo")} onClick={() => { setIsOpenAlbumInfoModal(true); }}>앨범 정보 보기</button>
      </div>
      <DashboardCardList data={cardQuery.data!} />
      <div className={cx("chartContainer")}>
        <MonthlyTrendChart barChartData={trendsChartQuery.data!} type={MEMBER_ROLE.ARTIST} />
        <TopFiveRevenueChart topFiveChartData={topFiveChartQuery.data!} />
      </div>
      <AlbumTrendsChart
        albumTrendsChartData={albumTrendsChartQuery.data!}
        memberRole={MEMBER_ROLE.ARTIST}
      />
      <AlbumInfoModal
        data={albumInfoQuery.data!}
        open={isOpenAlbumInfoModal}
        onClose={() => { setIsOpenAlbumInfoModal(false); }}
      />
    </section>
  );
};

interface AlbumDashboardPageQuery extends ParsedUrlQuery {
  month: string,
  albumId: string
}

// eslint-disable-next-line @typescript-eslint/require-await
const getServerSideProps: GetServerSideProps<AlbumDashboardPageProps> = async ({ query }) => {
  const { month, albumId } = query as AlbumDashboardPageQuery;

  return {
    props: {
      month,
      albumId,
    },
  };
};

export { getServerSideProps };
export default AlbumDashboardPage;
