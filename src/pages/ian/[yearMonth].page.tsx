import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GetServerSideProps } from "next";

import MainLayoutWithDropdown from "@/components/common/Layouts/MainLayoutWithDropdown";
import { convertToYearMonthFormat } from "@/components/common/MonthPicker/MonthPicker.util";
import MonthPickerDropdown from "@/components/common/MonthPicker/MonthPickerDropdown";
import Pagination from "@/components/common/Pagination/Pagination";
import DashboardCardList from "@/components/dashboard/DashboardCardList/DashboardCardList";
import AdminTrackStatusTable from "@/components/dashboard/TrackStatusTable/AdminTrackStatusTable";
import { ITEMS_PER_DASHBOARD_TABLE } from "@/constants/pagination";
import { IGetAdminTrackTransactionResponse } from "@/services/api/types/admin";
import useDashboardCards, { getDashboardCards } from "@/services/queries/useDashboardCards";
import useDashboardTable, { getDashboardTable } from "@/services/queries/useDashboardTable";
import { DASHBOARD_TYPE } from "@/types/enums/dashboard.enum";
import convertPageParamToNum from "@/utils/convertPageParamToNum";

interface IanProps {
  yearMonth: string
  page: number
  sortBy: string
  searchBy: string
  keyword: string
}

const Ian = ({
  yearMonth, page, sortBy, searchBy, keyword,
}: IanProps) => {
  const {
    cardsData,
    isCardsError,
    isCardsLoading,
  } = useDashboardCards(DASHBOARD_TYPE.ADMIN, yearMonth);
  const {
    tableData,
    isTableError,
    isTableLoading,
  } = useDashboardTable(DASHBOARD_TYPE.ADMIN, yearMonth, page, sortBy, searchBy, keyword);

  const yearMonthStr = convertToYearMonthFormat(yearMonth);

  if (isCardsLoading || isTableLoading) return <div>로딩 중...</div>;
  if (isCardsError || isTableError) return <div>에러 발생!</div>;
  if (!cardsData || !tableData) return <div>데이터가 없다</div>;
  // TODO: tableData가 Artist Table response 타입으로 추론되는 문제 해결
  const { totalItems, contents: tableContents } = tableData as IGetAdminTrackTransactionResponse;
  return (
    <MainLayoutWithDropdown title="대쉬보드" dropdownElement={<MonthPickerDropdown />}>
      <DashboardCardList data={cardsData} />
      <AdminTrackStatusTable
        title={`${yearMonthStr}의 트랙별 현황`}
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

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const queryClient = new QueryClient();

  // TODO: monthYear에 유효하지 않은 값이 들어왔을 때 or 값이 없을 때 처리
  const yearMonth = query?.yearMonth as string;

  const pageParam = (query?.sortBy ?? null) as (string | null);
  const page = convertPageParamToNum(pageParam);
  const sortBy = (query?.sortBy ?? "createdAt") as string;
  const searchBy = (query?.searchBy ?? "track") as string;
  const keyword = (query?.keyword ?? "") as string;

  try {
    await Promise.all([
      queryClient.prefetchQuery(
        [DASHBOARD_TYPE.ADMIN, "dashboard", "card"],
        () => {
          return getDashboardCards(DASHBOARD_TYPE.ADMIN, yearMonth);
        },
      ),
      queryClient.prefetchQuery(
        [DASHBOARD_TYPE.ADMIN, "dashboard", "table"],
        () => {
          return getDashboardTable(
            DASHBOARD_TYPE.ADMIN,
            yearMonth,
            page,
            sortBy,
            searchBy,
            keyword,
          );
        },
      )]);

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        yearMonth,
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

export default Ian;
