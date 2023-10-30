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
import ArtistTrackStatusTable from "@/components/dashboard/TrackStatusTable/ArtistTrackStatusTable";
import { ITEMS_PER_DASHBOARD_TABLE } from "@/constants/pagination";
import { useAppSelector } from "@/redux/hooks";
import { getDashboardCards } from "@/services/queries/dashboard/queryFns/cards";
import { getDashboardTable } from "@/services/queries/dashboard/queryFns/table";
import { getDashboardTopFiveRevenueChart } from "@/services/queries/dashboard/queryFns/topFiveRevenueChart";
import { getDashboardTrendsChart } from "@/services/queries/dashboard/queryFns/trendsChart";
import useArtistDashboard from "@/services/queries/dashboard/useArtistDashboard";
import { DASHBOARD_TYPE } from "@/types/enums/dashboard.enum";
import convertPageParamToNum from "@/utils/convertPageParamToNum";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);
interface ArtistDashboardPageProps {
  month: string,
  page: number,
  sortBy: string,
  searchBy: string,
  keyword: string,
  artistId: number,
  filterOptions: IFilterOptions,
}

const ArtistDashboardPage = ({
  month, page, sortBy, searchBy, keyword, artistId, filterOptions,
}: InferGetServerSidePropsType<GetServerSideProps<ArtistDashboardPageProps>>) => {
  const memberRole = useAppSelector((state) => { return state.user.member.role; });
  const queries = useArtistDashboard(month, page, sortBy, searchBy, keyword, artistId, filterOptions);
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
    <MainLayoutWithDropdown title={cardQuery.data!.artistName} dropdownElement={<MonthPickerDropdown />}>
      <DashboardCardList data={cardQuery.data!.cards} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <MonthlyTrendChart barChartData={trendsChartQuery.data!} type={memberRole} />
        <TopFiveRevenueChart topFiveChartData={topFiveChartQuery.data!} />
      </div>
      {isTableLoading
        ? <div className={cx("loading", "table")}><Orbit /></div>
        : (
          <ArtistTrackStatusTable
            title={`${formattedMonth}의 트랙별 현황`}
            data={tableQuery.data!.contents}
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

interface ArtistDashboardPageQuery extends ParsedUrlQuery {
  month: string,
  artistId: string,
  [params: string]: string
}

export const getServerSideProps: GetServerSideProps<ArtistDashboardPageProps> = async ({ query, req }) => {
  const {
    month, page, sortBy = "", searchBy = "trackName", keyword = "", artistId, ...filterOptions
  } = query as ArtistDashboardPageQuery;

  const pageNum = convertPageParamToNum(page || null);
  const artistIdNum = Number(artistId);

  const isCSR = req.url?.startsWith("/_next");
  if (isCSR) {
    return {
      props: {
        month,
        page: pageNum,
        sortBy,
        searchBy,
        keyword,
        artistId: artistIdNum,
        filterOptions,
      },
    };
  }

  const queryClient = new QueryClient();
  try {
    await Promise.all([
      queryClient.prefetchQuery(
        [DASHBOARD_TYPE.ARTIST, "dashboard", "card", artistId, { month }],
        () => {
          return getDashboardCards(DASHBOARD_TYPE.ARTIST, month, artistIdNum);
        },
      ),
      queryClient.prefetchQuery(
        [DASHBOARD_TYPE.ARTIST, "dashboard", "trendsChart", artistId, { month }],
        () => { return getDashboardTrendsChart(DASHBOARD_TYPE.ARTIST, month, artistIdNum); },
      ),
      queryClient.prefetchQuery(
        [DASHBOARD_TYPE.ARTIST, "dashboard", "TopFiveRevenue", artistId, { month }],
        () => { return getDashboardTopFiveRevenueChart(DASHBOARD_TYPE.ARTIST, month, artistIdNum); },
      ),
      queryClient.prefetchQuery(
        [DASHBOARD_TYPE.ARTIST, "dashboard", "table", artistId, {
          month, page: pageNum, sortBy, searchBy, keyword, filterOptions,
        }],
        () => {
          return getDashboardTable(
            DASHBOARD_TYPE.ARTIST,
            month,
            pageNum,
            sortBy,
            searchBy,
            keyword,
            filterOptions,
            artistIdNum,
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
        artistId: artistIdNum,
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

export default ArtistDashboardPage;
