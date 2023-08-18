import { DashboardCardProps } from "@/components/common/DashboardCard/DashboardCard.type";
import MainLayoutWithDropdown from "@/components/common/Layouts/MainLayoutWithDropdown";
import MonthPickerDropdown from "@/components/common/MonthPicker/MonthPickerDropdown";
import Pagination from "@/components/common/Pagination/Pagination";
import DashboardCardList from "@/components/dashboard/DashboardCardList/DashboardCardList";
import TrackStatusTable from "@/components/dashboard/TrackStatusTable/TrackStatusTable";
import { MOCK_ADMIN_TABLE } from "@/constants/mock";
import formatMoney from "@/utils/formatMoney";

const Ian = () => {
  const cardsData: DashboardCardProps[] = [
    { title: "당월 총 매출액", content: formatMoney(1000000, "card"), growthRate: 2.1 },
    { title: "당월 총 매출액", content: formatMoney(1000000, "card"), growthRate: 2.1 },
    { title: "당월 총 매출액", content: formatMoney(1000000, "card"), growthRate: 2.1 },
    { title: "당월 총 매출액", content: formatMoney(1000000, "card"), growthRate: 2.1 },
  ];

  const { totalItems, contents: tableData } = MOCK_ADMIN_TABLE;
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
