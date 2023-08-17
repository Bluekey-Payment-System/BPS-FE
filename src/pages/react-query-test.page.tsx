// 페이지에서 어드민 대시보드 카드 데이터를 가져오는 예시
import DashboardCard from "@/components/common/DashboardCard/DashboardCard";
import { useAdminDashboardCard } from "@/services/queries/useTest";
import formatMoney from "@/utils/formatMoney";

const AdminDashBoardPage = () => {
  const { adminDashboardCard, isLoading, isError } = useAdminDashboardCard();

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생</div>;
  if (!adminDashboardCard) return <div>데이터가 존재하지 않습니다</div>;

  return (
    <div>
      <DashboardCard
        title="당월 총 매출액"
        content={formatMoney(adminDashboardCard.revenue.totalAmount, "card")}
        growthRate={adminDashboardCard.revenue.growthRate}
      />
      <DashboardCard
        title="당월 회사 이익"
        content={formatMoney(adminDashboardCard.netIncome.totalAmount, "card")}
        growthRate={adminDashboardCard.netIncome.growthRate}
      />
      <DashboardCard
        title="당월 총 정산액"
        content={formatMoney(adminDashboardCard.settlementAmount.totalAmount, "card")}
        growthRate={adminDashboardCard.settlementAmount.growthRate}
      />
    </div>
  );
};

export default AdminDashBoardPage;
