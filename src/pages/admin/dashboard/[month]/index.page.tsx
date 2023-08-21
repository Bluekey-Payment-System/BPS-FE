import { QueryClient, dehydrate } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { GetServerSideProps } from "next";

import { DashboardCardProps } from "@/components/common/DashboardCard/DashboardCard.type";
import MainLayoutWithDropdown from "@/components/common/Layouts/MainLayoutWithDropdown";
import MonthPickerDropdown from "@/components/common/MonthPicker/MonthPickerDropdown";
import Pagination from "@/components/common/Pagination/Pagination";
import DashboardCardList from "@/components/dashboard/DashboardCardList/DashboardCardList";
import MonthlyTrendChart from "@/components/dashboard/MonthlyTrendsChart/MonthlyTrendsChart";
import TopFiveRevenueChart from "@/components/dashboard/TopFiveRevenueChart/TopFiveRevenueChart";
import AdminTrackStatusTable from "@/components/dashboard/TrackStatusTable/AdminTrackStatusTable";
import { MOCK_ADMIN_TABLE } from "@/constants/mock";
import { getDashboardTopFiveRevenueChart, useDashboardTopFiveRevenueChart } from "@/services/queries/useDashboardTopFiveRevenueChart";
import useDashboardTrendsChart, { getDashboardTrendsChart } from "@/services/queries/useDashboardTrendsChart";
import { DASHBOARD_TYPE } from "@/types/enums/dashboard.enum";
import { MEMBER_TYPE } from "@/types/enums/user.enum";
import formatMoney from "@/utils/formatMoney";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

const cardsData: DashboardCardProps[] = [
  { title: "당월 총 매출액", content: formatMoney(1000000, "card"), growthRate: 2.1 },
  { title: "당월 총 회사 이익", content: formatMoney(1000000, "card"), growthRate: 2.1 },
  { title: "당월 총 정산액", content: formatMoney(1000000, "card"), growthRate: 2.1 },
  { title: "이 달의 아티스트", content: formatMoney(1000000, "card"), growthRate: 2.1 },
];
const AdminDashboardPage = ({ month }: { month: string }) => {
  // eslint-disable-next-line max-len
  const { trendsChartData, istrendsChartLoading, istrendsChartError } = useDashboardTrendsChart(DASHBOARD_TYPE.ADMIN, month);
  const {
    topFiveRevenueData: topFiveChartData,
    istopFiveRevenueDataLoading,
    istopFiveRevenueDataError,
  } = useDashboardTopFiveRevenueChart(DASHBOARD_TYPE.ADMIN, month);

  if (istrendsChartLoading || istopFiveRevenueDataLoading) return <div>로딩 중...</div>;
  if (istrendsChartError || istopFiveRevenueDataError) return <div>에러 발생!</div>;
  if (!trendsChartData || !topFiveChartData) return <div>데이터가 없다</div>;

  return (
    <MainLayoutWithDropdown title="대시보드" dropdownElement={<MonthPickerDropdown />}>
      <DashboardCardList data={cardsData} />
      <div className={cx("cardContainer")}>
        <MonthlyTrendChart barChartData={trendsChartData} type={MEMBER_TYPE.ADMIN} />
        <TopFiveRevenueChart topFiveChartData={topFiveChartData} />
      </div>
      <AdminTrackStatusTable
        title="2023년 8월의 트랙별 현황"
        data={MOCK_ADMIN_TABLE.contents}
        paginationElement={(
          <Pagination
            activePage={1}
            totalItems={MOCK_ADMIN_TABLE.totalItems}
            itemsPerPage={6}
          />
        )}
      />
    </MainLayoutWithDropdown>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const queryClient = new QueryClient();

  const month = query?.month as string;

  try {
    await Promise.all([
      queryClient.prefetchQuery(
        [DASHBOARD_TYPE.ADMIN, "dashboard", "trendsChart"],
        () => { return getDashboardTrendsChart(DASHBOARD_TYPE.ADMIN, month); },
      ), queryClient.prefetchQuery(
        [DASHBOARD_TYPE.ADMIN, "dashboard", "topFiveRevenueChart"],
        () => { return getDashboardTopFiveRevenueChart(DASHBOARD_TYPE.ADMIN, month); },
      ),
    ]);

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        month,
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

export default AdminDashboardPage;
