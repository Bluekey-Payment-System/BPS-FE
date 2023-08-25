import { GetServerSideProps } from "next";

import EmptyData from "@/components/common/EmptyData/EmptyData";
import ArtboardLayout from "@/components/common/Layouts/ArtboardLayout";
import MainLayout from "@/components/common/Layouts/MainLayout";
import SectionHr from "@/components/common/Layouts/SectionHr";
import SectionLayout from "@/components/common/Layouts/SectionLayout";
import Pagination from "@/components/common/Pagination/Pagination";
import AdminAccountsTable from "@/components/manage-accounts/AdminAccountsTable/AdminAccountsTable";
import ArtistAccountsTable from "@/components/manage-accounts/ArtistAccountsTable/ArtistAccountsTable";
import { ITEMS_PER_ACCOUNTS_TABLE } from "@/constants/pagination";
import useAccounts from "@/services/queries/manage-accounts/useAccounts";
import convertPageParamToNum from "@/utils/convertPageParamToNum";

interface ManageAccountsPageProps {
  artistPage: number
  adminPage: number
}

const ManageAccountsPage = ({ artistPage, adminPage }: ManageAccountsPageProps) => {
  const { accounts, isAccountsLoading, isAccountsError } = useAccounts(artistPage, adminPage);

  if (isAccountsLoading) return <div>로딩 중</div>;
  if (isAccountsError) return <div>에러 발생</div>;

  const { adminList, artistList } = accounts!;
  return (
    <MainLayout title="타 계정 관리">
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
                      activePage={artistPage}
                      totalItems={artistList.totalItems}
                      itemsPerPage={ITEMS_PER_ACCOUNTS_TABLE}
                      queryParamName="artistPage"
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
                            activePage={adminPage}
                            totalItems={adminList.totalItems}
                            itemsPerPage={ITEMS_PER_ACCOUNTS_TABLE}
                            queryParamName="adminPage"
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

// eslint-disable-next-line @typescript-eslint/require-await
const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { artistPage, adminPage } = query;

  return {
    props: {
      artistPage: convertPageParamToNum(artistPage as string || null),
      adminPage: convertPageParamToNum(adminPage as string || null),
    },
  };
};

export { getServerSideProps };
export default ManageAccountsPage;
