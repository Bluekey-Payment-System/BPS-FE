import { useTest } from "@/services/queries/useTest";

const AdminDashBoardPage = () => {
  const { adminDashboardCard, isLoading, isError } = useTest();

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생</div>;
  if (!adminDashboardCard) return <div>데이터가 존재하지 않습니다</div>;

  return (
    <div>테스트</div>
  );
};

export default AdminDashBoardPage;
