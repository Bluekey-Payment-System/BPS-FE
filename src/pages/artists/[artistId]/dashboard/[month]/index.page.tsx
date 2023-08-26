/* eslint-disable max-len */
import { QueryClient, dehydrate } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { GetServerSideProps } from "next";

import MainLayoutWithDropdown from "@/components/common/Layouts/MainLayoutWithDropdown";
import { convertToYearMonthFormat } from "@/components/common/MonthPicker/MonthPicker.util";
import MonthPickerDropdown from "@/components/common/MonthPicker/MonthPickerDropdown";
import Pagination from "@/components/common/Pagination/Pagination";
import DashboardCardList from "@/components/dashboard/DashboardCardList/DashboardCardList";
import MonthlyTrendChart from "@/components/dashboard/MonthlyTrendsChart/MonthlyTrendsChart";
import TopFiveRevenueChart from "@/components/dashboard/TopFiveRevenueChart/TopFiveRevenueChart";
import ArtistTrackStatusTable from "@/components/dashboard/TrackStatusTable/ArtistTrackStatusTable";
import { ITEMS_PER_DASHBOARD_TABLE } from "@/constants/pagination";
import styles from "@/pages/admin/dashboard/[month]/index.module.scss";
import { wrapper } from "@/redux/store";
import { IGetAdminTrackTransactionResponse } from "@/services/api/types/admin";
import useDashboardCards, { getDashboardCards } from "@/services/queries/dashboard/useDashboardCards";
import useDashboardTable, { getDashboardTable } from "@/services/queries/dashboard/useDashboardTable";
import { getDashboardTopFiveRevenueChart, useDashboardTopFiveRevenueChart } from "@/services/queries/dashboard/useDashboardTopFiveRevenueChart";
import useDashboardTrendsChart, { getDashboardTrendsChart } from "@/services/queries/dashboard/useDashboardTrendsChart";
import { DASHBOARD_TYPE } from "@/types/enums/dashboard.enum";
import { MEMBER_ROLE } from "@/types/enums/user.enum";
import convertPageParamToNum from "@/utils/convertPageParamToNum";

const cx = classNames.bind(styles);

interface ArtistDashboardPageProps {
  month: string,
  page: number,
  sortBy: string,
  searchBy: string,
  keyword: string,
}

const ArtistDashboardPage = ({
  month, page, sortBy, searchBy, keyword,
}: ArtistDashboardPageProps) => {
  const {
    cardsData,
    isCardsError,
    isCardsLoading,
  } = useDashboardCards(DASHBOARD_TYPE.ARTIST, month);

  const {
    trendsChartData, istrendsChartLoading,
    istrendsChartError,
  } = useDashboardTrendsChart(DASHBOARD_TYPE.ARTIST, month);

  const {
    topFiveRevenueData: topFiveChartData,
    istopFiveRevenueDataLoading,
    istopFiveRevenueDataError,
  } = useDashboardTopFiveRevenueChart(DASHBOARD_TYPE.ARTIST, month);

  const {
    tableData,
    isTableError,
    isTableLoading,
  } = useDashboardTable(DASHBOARD_TYPE.ARTIST, month, page, sortBy, searchBy, keyword);

  const formattedMonth = convertToYearMonthFormat(month);

  if (istrendsChartLoading || istopFiveRevenueDataLoading || isCardsLoading || isTableLoading) return <div>로딩 중...</div>;
  if (istrendsChartError || istopFiveRevenueDataError || isCardsError || isTableError) return <div>에러 발생!</div>;
  if (!trendsChartData || !topFiveChartData || !cardsData || !tableData) return <div>데이터가 없다</div>;

  const { totalItems, contents: tableContents } = tableData as IGetAdminTrackTransactionResponse;

  return (
    <MainLayoutWithDropdown title="대시보드" dropdownElement={<MonthPickerDropdown />}>
      <DashboardCardList data={cardsData} />
      <div className={cx("cardContainer")}>
        <MonthlyTrendChart barChartData={trendsChartData} type={MEMBER_ROLE.ARTIST} />
        <TopFiveRevenueChart topFiveChartData={topFiveChartData} />
      </div>
      <ArtistTrackStatusTable
        title={`${formattedMonth}의 트랙별 현황`}
        data={tableContents}
        // TODO: tableData 형태에 따라 isEmpty 체크 변경
        isEmpty={!tableContents}
        paginationElement={(
          <Pagination
            activePage={page}
            totalItems={totalItems}
            itemsPerPage={ITEMS_PER_DASHBOARD_TABLE}
          />
        )}
      />
    </MainLayoutWithDropdown>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => {
  return async ({ query }) => {
    const queryClient = new QueryClient();

    const month = query?.month as string;

    const pageParam = (query?.page ?? null) as (string | null);
    const page = convertPageParamToNum(pageParam);
    const sortBy = (query?.sortBy ?? "createdAt") as string;
    const searchBy = (query?.searchBy ?? "track") as string;
    const keyword = (query?.keyword ?? "") as string;

    try {
      await Promise.all([
        queryClient.prefetchQuery(
          [DASHBOARD_TYPE.ARTIST, "dashboard", "card"],
          () => {
            return getDashboardCards(DASHBOARD_TYPE.ARTIST, month);
          },
        ),
        queryClient.prefetchQuery(
          [DASHBOARD_TYPE.ARTIST, "dashboard", "trendsChart"],
          () => { return getDashboardTrendsChart(DASHBOARD_TYPE.ARTIST, month); },
        ),
        queryClient.prefetchQuery(
          [DASHBOARD_TYPE.ARTIST, "dashboard", "topFiveRevenueChart"],
          () => { return getDashboardTopFiveRevenueChart(DASHBOARD_TYPE.ARTIST, month); },
        ),
        queryClient.prefetchQuery(
          [DASHBOARD_TYPE.ARTIST, "dashboard", "table"],
          () => {
            return getDashboardTable(
              DASHBOARD_TYPE.ARTIST,
              month,
              page,
              sortBy,
              searchBy,
              keyword,
            );
          },
        ),
      ]);

      return {
        props: {
          dehydratedState: dehydrate(queryClient),
          month,
          page,
          sortBy,
          searchBy,
          keyword,
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
});

export default ArtistDashboardPage;
