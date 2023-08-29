/* eslint-disable max-len */
import { ParsedUrlQuery } from "querystring";

import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import MainLayoutWithDropdown from "@/components/common/Layouts/MainLayoutWithDropdown";
import { convertToYearMonthFormat } from "@/components/common/MonthPicker/MonthPicker.util";
import MonthPickerDropdown from "@/components/common/MonthPicker/MonthPickerDropdown";
import Pagination from "@/components/common/Pagination/Pagination";
import DashboardCardList from "@/components/dashboard/DashboardCardList/DashboardCardList";
import MonthlyTrendChart from "@/components/dashboard/MonthlyTrendsChart/MonthlyTrendsChart";
import TopFiveRevenueChart from "@/components/dashboard/TopFiveRevenueChart/TopFiveRevenueChart";
import AdminTrackStatusTable from "@/components/dashboard/TrackStatusTable/AdminTrackStatusTable";
import { ITEMS_PER_DASHBOARD_TABLE } from "@/constants/pagination";
import { IGetAdminTrackTransactionResponse } from "@/services/api/types/admin";
import { getDashboardCards } from "@/services/queries/dashboard/queryFns/cards";
import { getDashboardTable } from "@/services/queries/dashboard/queryFns/table";
import { getDashboardTopFiveRevenueChart } from "@/services/queries/dashboard/queryFns/topFiveRevenueChart";
import { getDashboardTrendsChart } from "@/services/queries/dashboard/queryFns/trendsChart";
import useAdminDashboard from "@/services/queries/dashboard/useAdminDashboard";
import { DASHBOARD_TYPE } from "@/types/enums/dashboard.enum";
import { MEMBER_TYPE } from "@/types/enums/user.enum";
import convertPageParamToNum from "@/utils/convertPageParamToNum";

interface AdminDashboardPageProps {
  month: string,
  page: number,
  sortBy: string,
  searchBy: string,
  keyword: string,
}

const AdminDashboardPage = ({
  month, page, sortBy, searchBy, keyword,
}: InferGetServerSidePropsType<GetServerSideProps<AdminDashboardPageProps>>) => {
  const queries = useAdminDashboard(month, page, sortBy, searchBy, keyword);
  const [cardQuery, trendsChartQuery, topFiveChartQuery, tableQuery] = queries;

  const isLoading = queries.some((query) => { return query.isLoading; });
  const isError = queries.some((query) => { return query.isError; });

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생!</div>;

  const { totalItems, contents: tableContents } = tableQuery.data! as IGetAdminTrackTransactionResponse;
  const formattedMonth = convertToYearMonthFormat(month);

  return (
    <MainLayoutWithDropdown title="대시보드" dropdownElement={<MonthPickerDropdown />}>
      <DashboardCardList data={cardQuery.data!} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <MonthlyTrendChart barChartData={trendsChartQuery.data!} type={MEMBER_TYPE.ADMIN} />
        <TopFiveRevenueChart topFiveChartData={topFiveChartQuery.data!} />
      </div>
      <AdminTrackStatusTable
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

interface AdminDashboardPageQuery extends ParsedUrlQuery {
  month: string,
  page?: string,
  sortBy?: string,
  searchBy?: string,
  keyword?: string,
}

export const getServerSideProps: GetServerSideProps<AdminDashboardPageProps> = async ({ query, req }) => {
  const {
    month, page, sortBy, searchBy, keyword,
  } = query as AdminDashboardPageQuery;

  const pageNum = convertPageParamToNum(page || null);
  const sortByString = sortBy || "";
  const searchByString = searchBy || "trackName";
  const keywordString = keyword || "";

  const isCSR = req.url?.startsWith("/_next");
  if (isCSR) {
    return {
      props: {
        month,
        page: pageNum,
        sortBy: sortByString,
        searchBy: searchByString,
        keyword: keywordString,
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
          month, page: pageNum, sortBy: sortByString, searchBy: searchByString, keyword: keywordString,
        }],
        () => {
          return getDashboardTable(
            DASHBOARD_TYPE.ADMIN,
            month,
            pageNum,
            sortByString,
            searchByString,
            keywordString,
          );
        },
      ),
    ]);

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        month,
        page: pageNum,
        sortBy: sortByString,
        searchBy: searchByString,
        keyword: keywordString,
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
