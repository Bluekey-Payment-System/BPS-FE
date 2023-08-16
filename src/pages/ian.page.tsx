import Pagination from "@/components/common/Pagination/Pagination";
import AdminAccountsTable from "@/components/common/Table/Assemble/AdminAccountsTable";
import TrackStatusTable from "@/components/common/Table/Assemble/TrackStatusTable";
import UnRegisteredDataTable from "@/components/common/Table/Assemble/UnRegisteredDataTable";
import { MOCK_ADMIN_TABLE } from "@/constants/mock";
import { MOCK_ADMIN_ACCOUNT_DATA, MOCK_UNREGISTERED_DATA } from "@/constants/table";

const Ian = () => {
  return (
    <>
      <div style={{
        maxWidth: "1200px", display: "flex", flexDirection: "column", gap: "50px", marginBottom: "30px",
      }}
      >
        <TrackStatusTable
          data={MOCK_ADMIN_TABLE}
          paginationElement={<Pagination activePage={15} totalItems={120} itemsPerPage={6} />}
        />
        <AdminAccountsTable
          data={MOCK_ADMIN_ACCOUNT_DATA}
          paginationElement={<Pagination activePage={10} totalItems={80} itemsPerPage={4} queryParamName="admin-account-page" />}
        />
      </div>
      <div style={{
        maxWidth: "455px", maxHeight: "278px", display: "flex", flexDirection: "column",
      }}
      >
        <UnRegisteredDataTable data={MOCK_UNREGISTERED_DATA} />
      </div>
    </>
  );
};

export default Ian;
