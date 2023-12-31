/* eslint-disable max-len */
import { ParsedUrlQuery } from "querystring";

import { QueryClient, dehydrate } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { IFilterOptions } from "@/components/common/Filter/Filter.type";
import MainLayoutWithDropdown from "@/components/common/Layouts/MainLayoutWithDropdown";
import Orbit from "@/components/common/Loading/Orbit";
import { convertToYearMonthFormat } from "@/components/common/MonthPicker/MonthPicker.util";
import MonthPickerDropdown from "@/components/common/MonthPicker/MonthPickerDropdown";
import Pagination from "@/components/common/Pagination/Pagination";
import DashboardCardList from "@/components/dashboard/DashboardCardList/DashboardCardList";
import MonthlyTrendChart from "@/components/dashboard/MonthlyTrendsChart/MonthlyTrendsChart";
import TopFiveRevenueChart from "@/components/dashboard/TopFiveRevenueChart/TopFiveRevenueChart";
import AdminTrackStatusTable from "@/components/dashboard/TrackStatusTable/AdminTrackStatusTable";
import { ITEMS_PER_DASHBOARD_TABLE } from "@/constants/pagination";
import { getDashboardCards } from "@/services/queries/dashboard/queryFns/cards";
import { getDashboardTable } from "@/services/queries/dashboard/queryFns/table";
import { getDashboardTopFiveRevenueChart } from "@/services/queries/dashboard/queryFns/topFiveRevenueChart";
import { getDashboardTrendsChart } from "@/services/queries/dashboard/queryFns/trendsChart";
import useAdminDashboard from "@/services/queries/dashboard/useAdminDashboard";
import { ITrackTransaction } from "@/types/dto";
import { DASHBOARD_TYPE } from "@/types/enums/dashboard.enum";
import { MEMBER_TYPE } from "@/types/enums/user.enum";
import convertPageParamToNum from "@/utils/convertPageParamToNum";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

interface AdminDashboardPageProps {
  month: string,
  page: number,
  sortBy: string,
  searchBy: string,
  keyword: string,
  filterOptions: IFilterOptions,
}

const AdminDashboardPage = ({
  month, page, sortBy, searchBy, keyword, filterOptions,
}: InferGetServerSidePropsType<GetServerSideProps<AdminDashboardPageProps>>) => {
  const queries = useAdminDashboard(month, page, sortBy, searchBy, keyword, filterOptions);
  const [cardQuery, trendsChartQuery, topFiveChartQuery, tableQuery] = queries;

  const isLoading = queries.some((query, idx) => {
    if (idx === 3) return false;
    return query.isLoading;
  });
  const isTableLoading = tableQuery.isLoading;

  if (isLoading) {
    return (
      <div className={cx("loading", "page")}>
        <Orbit dark />
      </div>
    );
  }

  const formattedMonth = convertToYearMonthFormat(month);

  return (
    <MainLayoutWithDropdown title="대시보드" dropdownElement={<MonthPickerDropdown />}>
      <DashboardCardList data={cardQuery.data!.cards} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <MonthlyTrendChart barChartData={trendsChartQuery.data!} type={MEMBER_TYPE.ADMIN} />
        <TopFiveRevenueChart topFiveChartData={topFiveChartQuery.data!} type={MEMBER_TYPE.ADMIN} />
      </div>
      {isTableLoading
        ? <div className={cx("loading", "table")}><Orbit dark /></div>
        : (
          <AdminTrackStatusTable
            title={`${formattedMonth}의 트랙별 현황`}
            data={tableQuery.data!.contents as ITrackTransaction[]}
            isEmpty={tableQuery.data!.totalItems === 0}
            paginationElement={(
              <Pagination
                activePage={page}
                totalItems={tableQuery.data!.totalItems}
                itemsPerPage={ITEMS_PER_DASHBOARD_TABLE}
              />
            )}
            searchBy={searchBy}
            sortBy={sortBy}
          />
        )}
    </MainLayoutWithDropdown>
  );
};

interface AdminDashboardPageQuery extends ParsedUrlQuery {
  month: string,
  [params: string]: string
}

export const getServerSideProps: GetServerSideProps<AdminDashboardPageProps> = async ({ query, req }) => {
  const {
    month, page, sortBy = "", searchBy = "trackName", keyword = "", ...filterOptions
  } = query as AdminDashboardPageQuery;

  const pageNum = convertPageParamToNum(page || null);

  const isCSR = req.url?.startsWith("/_next");
  if (isCSR) {
    return {
      props: {
        month,
        page: pageNum,
        sortBy,
        searchBy,
        keyword,
        filterOptions,
      },
    };
  }

  const queryClient = new QueryClient();
  try {
    await Promise.all([
      queryClient.prefetchQuery(
        [DASHBOARD_TYPE.ADMIN, "dashboard", "card", { month }],
        () => {
          return getDashboardCards(DASHBOARD_TYPE.ADMIN, month);
        },
      ),
      queryClient.prefetchQuery(
        [DASHBOARD_TYPE.ADMIN, "dashboard", "trendsChart", { month }],
        () => { return getDashboardTrendsChart(DASHBOARD_TYPE.ADMIN, month); },
      ),
      queryClient.prefetchQuery(
        [DASHBOARD_TYPE.ADMIN, "dashboard", "TopFiveRevenue", { month }],
        () => { return getDashboardTopFiveRevenueChart(DASHBOARD_TYPE.ADMIN, month); },
      ),
      queryClient.prefetchQuery(
        [DASHBOARD_TYPE.ADMIN, "dashboard", "table", {
          month, page: pageNum, sortBy, searchBy, keyword, filterOptions,
        }],
        () => {
          return getDashboardTable(
            DASHBOARD_TYPE.ADMIN,
            month,
            pageNum,
            sortBy,
            searchBy,
            keyword,
            filterOptions,
          );
        },
      ),
    ]);

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        month,
        page: pageNum,
        sortBy,
        searchBy,
        keyword,
        filterOptions,
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
