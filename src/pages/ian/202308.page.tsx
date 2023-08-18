import MainLayoutWithDropdown from "@/components/common/Layouts/MainLayoutWithDropdown";
import MonthPickerDropdown from "@/components/common/MonthPicker/MonthPickerDropdown";
import Pagination from "@/components/common/Pagination/Pagination";
import DashboardCardList from "@/components/dashboard/DashboardCardList/DashboardCardList";
import TrackStatusTable from "@/components/dashboard/TrackStatusTable/TrackStatusTable";
import { MOCK_ADMIN_TABLE } from "@/constants/mock";
import { useDashboardCards } from "@/services/queries/useDashboardCards";
import { DASHBOARD_TYPE } from "@/types/enums/dashboard.enum";

const Ian = () => {
  const { cardsData, isError, isLoading } = useDashboardCards(DASHBOARD_TYPE.ADMIN);

  const { totalItems, contents: tableData } = MOCK_ADMIN_TABLE;

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생!</div>;
  if (!cardsData) return <div>데이터가 없다</div>;
  return (
    <MainLayoutWithDropdown title="대쉬보드" dropdownElement={<MonthPickerDropdown />}>
      <DashboardCardList data={cardsData} />
      <TrackStatusTable
        title="2023년 8월의 트랙별 현황"
        data={tableData}
        paginationElement={<Pagination activePage={1} totalItems={totalItems} itemsPerPage={6} />}
      />
    </MainLayoutWithDropdown>
  );
};

export default Ian;
