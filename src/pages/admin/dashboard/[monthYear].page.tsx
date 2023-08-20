import classNames from "classnames/bind";

import { DashboardCardProps } from "@/components/common/DashboardCard/DashboardCard.type";
import MainLayoutWithDropdown from "@/components/common/Layouts/MainLayoutWithDropdown";
import MonthPickerDropdown from "@/components/common/MonthPicker/MonthPickerDropdown";
import Pagination from "@/components/common/Pagination/Pagination";
import DashboardCardList from "@/components/dashboard/DashboardCardList/DashboardCardList";
import MonthlyTrendChart from "@/components/dashboard/MonthlyTrendsChart/MonthlyTrendsChart";
import TopFiveChart from "@/components/dashboard/TopFiveChart/TopFiveChart";
import TrackStatusTable from "@/components/dashboard/TrackStatusTable/TrackStatusTable";
import { MOCK_ADMIN_BAR, MOCK_ADMIN_DOUGHNUT, MOCK_ADMIN_TABLE } from "@/constants/mock";
import { MEMBER_TYPE } from "@/types/enums/user.enum";
import formatMoney from "@/utils/formatMoney";

import styles from "./monthYear.module.scss";

const cx = classNames.bind(styles);

const cardsData: DashboardCardProps[] = [
  { title: "당월 총 매출액", content: formatMoney(1000000, "card"), growthRate: 2.1 },
  { title: "당월 총 회사 이익", content: formatMoney(1000000, "card"), growthRate: 2.1 },
  { title: "당월 총 정산액", content: formatMoney(1000000, "card"), growthRate: 2.1 },
  { title: "이 달의 아티스트", content: formatMoney(1000000, "card"), growthRate: 2.1 },
];
const AdminDashboardPage = () => {
  return (
    <MainLayoutWithDropdown title="대시보드" dropdownElement={<MonthPickerDropdown />}>
      <DashboardCardList data={cardsData} />
      <div className={cx("cardContainer")}>
        <MonthlyTrendChart barChartData={MOCK_ADMIN_BAR} type={MEMBER_TYPE.ADMIN} />
        <TopFiveChart topFiveChartData={MOCK_ADMIN_DOUGHNUT} />
      </div>
      <TrackStatusTable
        title="2023년 8월의 트랙별 현황"
        data={MOCK_ADMIN_TABLE.contents}
        paginationElement={<Pagination activePage={1} totalItems={MOCK_ADMIN_TABLE.totalItems} itemsPerPage={6} />}
      />
    </MainLayoutWithDropdown>
  );
};

export default AdminDashboardPage;
