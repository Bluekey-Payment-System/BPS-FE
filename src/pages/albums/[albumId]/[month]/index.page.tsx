/* eslint-disable max-len */
import { ParsedUrlQuery } from "querystring";

import { useState } from "react";

import classNames from "classnames/bind";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import AlbumDetailsInformationTooltip from "@/components/album/AlbumDetailsInformationTooltip/AlbumDetailsInformationTooltip";
import Orbit from "@/components/common/Loading/Orbit";
import MonthPickerDropdown from "@/components/common/MonthPicker/MonthPickerDropdown";
import AlbumInfoModal from "@/components/dashboard/AlbumInfoModal/AlbumInfoModal";
import AlbumTrendsChart from "@/components/dashboard/AlbumTrendsChart/AlbumTrendsChart";
import DashboardCardList from "@/components/dashboard/DashboardCardList/DashboardCardList";
import MonthlyTrendChart from "@/components/dashboard/MonthlyTrendsChart/MonthlyTrendsChart";
import TopFiveRevenueChart from "@/components/dashboard/TopFiveRevenueChart/TopFiveRevenueChart";
import { useAppSelector } from "@/redux/hooks";
import useAlbumDashboard from "@/services/queries/dashboard/useAlbumDashboard";
import { MEMBER_ROLE } from "@/types/enums/user.enum";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

interface AlbumDashboardPageProps {
  month: string
  albumId: number
}

const AlbumDashboardPage = ({ month, albumId }: InferGetServerSidePropsType<GetServerSideProps<AlbumDashboardPageProps>>) => {
  const memberRole = useAppSelector((state) => { return state.user.member.role; });

  const [isOpenAlbumInfoModal, setIsOpenAlbumInfoModal] = useState(false);

  const queries = useAlbumDashboard(month, albumId);
  const [cardQuery, trendsChartQuery, topFiveChartQuery, albumTrendsChartQuery, albumInfoQuery] = queries;

  const isLoading = queries.some((query) => { return query.isLoading; });

  if (isLoading) {
    return (
      <div className={cx("loading")}>
        <Orbit dark />
      </div>
    );
  }

  return (
    <section className={cx("container")}>
      <div className={cx("sectionHeader")}>
        <h1 className={cx("title")}>{cardQuery.data!.albumName}</h1>
        {memberRole === MEMBER_ROLE.ARTIST && <AlbumDetailsInformationTooltip />}
        <div className={cx("monthPickerDropdownContainer", { artist: memberRole === MEMBER_ROLE.ARTIST })}>
          <MonthPickerDropdown />
        </div>
        <button className={cx("albumInfo")} onClick={() => { setIsOpenAlbumInfoModal(true); }}>앨범 정보 보기</button>
      </div>
      <DashboardCardList data={cardQuery.data!.cards} />
      <div className={cx("chartContainer")}>
        <MonthlyTrendChart barChartData={trendsChartQuery.data!} type={memberRole} />
        <TopFiveRevenueChart topFiveChartData={topFiveChartQuery.data!} />
      </div>
      <AlbumTrendsChart
        albumTrendsChartData={albumTrendsChartQuery.data!}
        memberRole={memberRole}
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
  const albumIdNum = Number(albumId);

  return {
    props: {
      month,
      albumId: albumIdNum,
    },
  };
};

export { getServerSideProps };
export default AlbumDashboardPage;
