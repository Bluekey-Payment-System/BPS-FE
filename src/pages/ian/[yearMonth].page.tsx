import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GetServerSideProps } from "next";

import MainLayoutWithDropdown from "@/components/common/Layouts/MainLayoutWithDropdown";
import { convertToYearMonthFormat } from "@/components/common/MonthPicker/MonthPicker.util";
import MonthPickerDropdown from "@/components/common/MonthPicker/MonthPickerDropdown";
import Pagination from "@/components/common/Pagination/Pagination";
import DashboardCardList from "@/components/dashboard/DashboardCardList/DashboardCardList";
import AdminTrackStatusTable from "@/components/dashboard/TrackStatusTable/AdminTrackStatusTable";
import { IGetAdminTrackTransactionResponse } from "@/services/api/types/admin";
import useDashboardCards, { getDashboardCards } from "@/services/queries/useDashboardCards";
import useDashboardTable, { getDashboardTable } from "@/services/queries/useDashboardTable";
import { DASHBOARD_TYPE } from "@/types/enums/dashboard.enum";

const Ian = ({ yearMonth }: { yearMonth: string }) => {
  const {
    cardsData,
    isCardsError,
    isCardsLoading,
  } = useDashboardCards(DASHBOARD_TYPE.ADMIN, yearMonth);
  const {
    tableData,
    isTableError,
    isTableLoading,
  } = useDashboardTable(DASHBOARD_TYPE.ADMIN, yearMonth);

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
        paginationElement={<Pagination activePage={1} totalItems={totalItems} itemsPerPage={6} />}
      />
    </MainLayoutWithDropdown>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // TODO: monthYear에 유효하지 않은 값이 들어왔을 때 or 값이 없을 때 처리
  const yearMonth = params?.yearMonth as string;
  const queryClient = new QueryClient();

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
          return getDashboardTable(DASHBOARD_TYPE.ADMIN, yearMonth);
        },
      )]);

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        yearMonth,
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
