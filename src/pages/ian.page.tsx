import DashboardCard from "@/components/common/DashboardCard/DashboardCard";
import utilFormatMoney from "@/utils/utilFormatMoney";

const Ian = () => {
  return (
    <>
      <div style={{
        display: "flex", flexDirection: "row", gap: "19px", minWidth: "1200px", marginBottom: "20px",
      }}
      >
        <DashboardCard title="당월 총 매출액" content={utilFormatMoney(1178932, "card")} growthRate={17} />
        <DashboardCard title="당월 회사 이익" content={utilFormatMoney(123000000, "card")} growthRate={-2.7} />
        <DashboardCard title="당월 총 정산액" content={utilFormatMoney(0, "card")} growthRate={0} />
        <DashboardCard title="당월 회사 이익" content={utilFormatMoney(null, "card")} growthRate={null} />
      </div>
      <div style={{
        display: "flex", flexDirection: "row", gap: "19px", minWidth: "1200px",
      }}
      >
        <DashboardCard title="2023년 8월의 아티스트" content="이름이 매우매우 긴 아티스트" growthRate={6.4} />
        <DashboardCard title="2023년 8월의 앨범" content="앨범2" growthRate={-500} />
        <DashboardCard title="2023년 8월의 트랙" content={null} growthRate={null} />
      </div>
    </>
  );
};

export default Ian;
