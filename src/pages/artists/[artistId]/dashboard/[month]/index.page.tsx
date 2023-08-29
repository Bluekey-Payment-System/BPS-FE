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
import ArtistTrackStatusTable from "@/components/dashboard/TrackStatusTable/ArtistTrackStatusTable";
import { ITEMS_PER_DASHBOARD_TABLE } from "@/constants/pagination";
import { getDashboardCards } from "@/services/queries/dashboard/queryFns/cards";
import { getDashboardTable } from "@/services/queries/dashboard/queryFns/table";
import { getDashboardTopFiveRevenueChart } from "@/services/queries/dashboard/queryFns/topFiveRevenueChart";
import { getDashboardTrendsChart } from "@/services/queries/dashboard/queryFns/trendsChart";
import useArtistDashboard from "@/services/queries/dashboard/useArtistDashboard";
import { DASHBOARD_TYPE } from "@/types/enums/dashboard.enum";
import { MEMBER_ROLE } from "@/types/enums/user.enum";
import convertPageParamToNum from "@/utils/convertPageParamToNum";

interface ArtistDashboardPageProps {
  month: string,
  page: number,
  sortBy: string,
  searchBy: string,
  keyword: string,
  artistId: string,
}

const ArtistDashboardPage = ({
  month, page, sortBy, searchBy, keyword, artistId,
}: InferGetServerSidePropsType<GetServerSideProps<ArtistDashboardPageProps>>) => {
  const queries = useArtistDashboard(month, page, sortBy, searchBy, keyword, artistId);
  const [cardQuery, trendsChartQuery, topFiveChartQuery, tableQuery] = queries;

  const isLoading = queries.some((query) => { return query.isLoading; });
  const isError = queries.some((query) => { return query.isError; });

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생!</div>;

  const { totalItems, contents: tableContents } = tableQuery.data!;

  const formattedMonth = convertToYearMonthFormat(month);

  return (
    <MainLayoutWithDropdown title="대시보드" dropdownElement={<MonthPickerDropdown />}>
      <DashboardCardList data={cardQuery.data!} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <MonthlyTrendChart barChartData={trendsChartQuery.data!} type={MEMBER_ROLE.ARTIST} />
        <TopFiveRevenueChart topFiveChartData={topFiveChartQuery.data!} />
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

interface ArtistDashboardPageQuery extends ParsedUrlQuery {
  month: string,
  page?: string,
  sortBy?: string,
  searchBy?: string,
  keyword?: string
  artistId: string,
}

export const getServerSideProps: GetServerSideProps<ArtistDashboardPageProps> = async ({ query, req }) => {
  const {
    month, page, sortBy, searchBy, keyword, artistId,
  } = query as ArtistDashboardPageQuery;

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
        artistId,
      },
    };
  }

  const queryClient = new QueryClient();
  try {
    await Promise.all([
      queryClient.prefetchQuery(
        [DASHBOARD_TYPE.ARTIST, "dashboard", "card", artistId, { month }],
        () => {
          return getDashboardCards(DASHBOARD_TYPE.ARTIST, month, artistId);
        },
      ),
      queryClient.prefetchQuery(
        [DASHBOARD_TYPE.ARTIST, "dashboard", "trendsChart", artistId, { month }],
        () => { return getDashboardTrendsChart(DASHBOARD_TYPE.ARTIST, month, artistId); },
      ),
      queryClient.prefetchQuery(
        [DASHBOARD_TYPE.ARTIST, "dashboard", "TopFiveRevenue", artistId, { month }],
        () => { return getDashboardTopFiveRevenueChart(DASHBOARD_TYPE.ARTIST, month, artistId); },
      ),
      queryClient.prefetchQuery(
        [DASHBOARD_TYPE.ARTIST, "dashboard", "table", artistId, {
          month, page: pageNum, sortBy: sortByString, searchBy: searchByString, keyword: keywordString,
        }],
        () => {
          return getDashboardTable(
            DASHBOARD_TYPE.ARTIST,
            month,
            pageNum,
            sortByString,
            searchByString,
            keywordString,
            artistId,
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
        artistId,
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

export default ArtistDashboardPage;
