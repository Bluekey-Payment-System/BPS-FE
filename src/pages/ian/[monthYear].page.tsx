import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GetServerSideProps } from "next";

import MainLayoutWithDropdown from "@/components/common/Layouts/MainLayoutWithDropdown";
import { convertToYearMonthFormat } from "@/components/common/MonthPicker/MonthPicker.util";
import MonthPickerDropdown from "@/components/common/MonthPicker/MonthPickerDropdown";
import Pagination from "@/components/common/Pagination/Pagination";
import DashboardCardList from "@/components/dashboard/DashboardCardList/DashboardCardList";
import AdminTrackStatusTable from "@/components/dashboard/TrackStatusTable/AdminTrackStatusTable";
import { MOCK_ADMIN_TABLE } from "@/constants/mock";
import { getDashboardCards, useDashboardCards } from "@/services/queries/useDashboardCards";
import { DASHBOARD_TYPE } from "@/types/enums/dashboard.enum";

const Ian = ({ monthYearStr }: { monthYearStr: string }) => {
  const { cardsData, isError, isLoading } = useDashboardCards(DASHBOARD_TYPE.ADMIN);

  const { totalItems, contents: tableData } = MOCK_ADMIN_TABLE;

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생!</div>;
  if (!cardsData) return <div>데이터가 없다</div>;
  return (
    <MainLayoutWithDropdown title="대쉬보드" dropdownElement={<MonthPickerDropdown />}>
      <DashboardCardList data={cardsData} />
      <AdminTrackStatusTable
        title={`${monthYearStr}의 트랙별 현황`}
        data={tableData}
        isEmpty={!tableData}
        paginationElement={<Pagination activePage={1} totalItems={totalItems} itemsPerPage={6} />}
      />
    </MainLayoutWithDropdown>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // TODO: monthYear에 유효하지 않은 값이 들어왔을 때 or 값이 없을 때 처리
  const monthYear = params?.monthYear as string;
  const monthYearStr = convertToYearMonthFormat(monthYear);
  const queryClient = new QueryClient();

  try {
    await Promise.all([
      queryClient.prefetchQuery(
        [DASHBOARD_TYPE.ADMIN, "dashboard", "card"],
        () => {
          return getDashboardCards(DASHBOARD_TYPE.ADMIN, monthYearStr);
        },
      )]);

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        monthYearStr,
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
