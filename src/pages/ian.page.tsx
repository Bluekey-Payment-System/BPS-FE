import MainLayout from "@/components/common/Layouts/MainLayout";
import Pagination from "@/components/common/Pagination/Pagination";
import AdminAccountsTable from "@/components/common/Table/Assemble/AdminAccountsTable";
import TrackStatusTable from "@/components/common/Table/Assemble/TrackStatusTable";
import { MOCK_ADMIN_TABLE } from "@/constants/mock";
import { MOCK_ADMIN_ACCOUNT_DATA } from "@/constants/table";

const Ian = () => {
  return (
    <MainLayout title="페이지 레이아웃">
      <div style={{ width: "100%" }}>
        <TrackStatusTable
          data={MOCK_ADMIN_TABLE}
          paginationElement={<Pagination activePage={15} totalItems={120} itemsPerPage={6} />}
        />
        <AdminAccountsTable
          data={MOCK_ADMIN_ACCOUNT_DATA}
          paginationElement={<Pagination activePage={10} totalItems={80} itemsPerPage={4} queryParamName="admin-account-page" />}
        />
      </div>
    </MainLayout>
  );
};

export default Ian;
