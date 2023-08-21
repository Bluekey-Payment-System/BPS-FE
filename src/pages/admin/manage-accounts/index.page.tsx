import EmptyData from "@/components/common/EmptyData/EmptyData";
import ArtboardLayout from "@/components/common/Layouts/ArtboardLayout";
import MainLayout from "@/components/common/Layouts/MainLayout";
import SectionHr from "@/components/common/Layouts/SectionHr";
import SectionLayout from "@/components/common/Layouts/SectionLayout";
import Pagination from "@/components/common/Pagination/Pagination";
import AdminAccountsTable from "@/components/manage-accounts/AdminAccountsTable/AdminAccountsTable";
import ArtistAccountsTable from "@/components/manage-accounts/ArtistAccountsTable/ArtistAccountsTable";
import { MOCK_ACCOUNTS } from "@/constants/mock";

const ManageAccountsPage = () => {
  const { adminList, artistList } = MOCK_ACCOUNTS;
  return (
    <MainLayout title="아티스트 계정 관리">
      <ArtboardLayout>
        <div style={{ width: "1110px" }}>
          <SectionLayout title="아티스트 계정">
            {artistList.totalItems === 0
              ? <EmptyData type="no-data" text="등록된 아티스트 계정이 없습니다." />
              : (
                <ArtistAccountsTable
                  accounts={artistList.contents}
                  paginationElement={(
                    <Pagination
                      activePage={1}
                      totalItems={artistList.totalItems}
                      itemsPerPage={6}
                      queryParamName="pageArtist"
                    />
                  )}
                />
              )}
          </SectionLayout>
          {adminList
            && (
              <>
                <SectionHr isThick />
                <SectionLayout title="어드민 계정">
                  {adminList.totalItems === 0
                    ? <EmptyData type="no-data" text="등록된 어드민 계정이 없습니다." />
                    : (
                      <AdminAccountsTable
                        accounts={adminList.contents}
                        paginationElement={(
                          <Pagination
                            activePage={1}
                            totalItems={adminList.totalItems}
                            itemsPerPage={6}
                            queryParamName="pageAdmin"
                          />
                        )}
                      />
                    )}
                </SectionLayout>
              </>
            )}
        </div>
      </ArtboardLayout>
    </MainLayout>
  );
};

export default ManageAccountsPage;
