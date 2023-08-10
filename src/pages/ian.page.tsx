import DashboardCard from "@/components/common/DashboardCard/DashboardCard";
import utilFormatMoney from "@/utils/utilFormatMoney";

const Ian = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <DashboardCard title="당월 회사 이익" content={utilFormatMoney(1.234, "card")} growthRate={17} />
      <DashboardCard title="당월 회사 이익" content={utilFormatMoney(0, "card")} growthRate={0} />
      <DashboardCard title="당월 회사 이익" content={utilFormatMoney(null, "card")} growthRate={null} />
      <DashboardCard title="2023년 8월의 앨범" content="앨범1" growthRate={6.4} />
      <DashboardCard title="2023년 8월의 앨범" content="앨범2" growthRate={0} />
      <DashboardCard title="2023년 8월의 앨범" content={null} growthRate={null} />
    </div>
  );
};

export default Ian;
