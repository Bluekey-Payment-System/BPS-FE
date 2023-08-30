/* eslint-disable max-len */
import { ParsedUrlQuery } from "querystring";

import { useState } from "react";

import classNames from "classnames/bind";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import AlbumDetailsInformationTooltip from "@/components/album/AlbumDetailsInformationTooltip/AlbumDetailsInformationTooltip";
import MonthPickerDropdown from "@/components/common/MonthPicker/MonthPickerDropdown";
import AlbumInfoModal from "@/components/dashboard/AlbumInfoModal/AlbumInfoModal";
import AlbumTrendsChart from "@/components/dashboard/AlbumTrendsChart/AlbumTrendsChart";
import DashboardCardList from "@/components/dashboard/DashboardCardList/DashboardCardList";
import MonthlyTrendChart from "@/components/dashboard/MonthlyTrendsChart/MonthlyTrendsChart";
import TopFiveRevenueChart from "@/components/dashboard/TopFiveRevenueChart/TopFiveRevenueChart";
import { useAppSelector } from "@/redux/hooks";
import useAlbumDashboard from "@/services/queries/dashboard/useAlbumDashboard";
import { MEMBER_ROLE, MEMBER_TYPE } from "@/types/enums/user.enum";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

interface AlbumDashboardPageProps {
  month: string
  albumId: string
}

const AlbumDashboardPage = ({ month, albumId }: InferGetServerSidePropsType<GetServerSideProps<AlbumDashboardPageProps>>) => {
  const { type: memberType } = useAppSelector((state) => {
    return state.user.member;
  });

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
        {memberType === MEMBER_TYPE.USER && <AlbumDetailsInformationTooltip />}
        <div className={cx("monthPickerDropdownContainer", { user: memberType === MEMBER_TYPE.USER })}>
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
