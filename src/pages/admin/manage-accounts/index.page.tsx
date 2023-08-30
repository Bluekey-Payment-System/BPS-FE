import { ParsedUrlQuery } from "querystring";

import classNames from "classnames/bind";
import { GetServerSideProps } from "next";

import EmptyData from "@/components/common/EmptyData/EmptyData";
import ArtboardLayout from "@/components/common/Layouts/ArtboardLayout";
import MainLayout from "@/components/common/Layouts/MainLayout";
import SectionHr from "@/components/common/Layouts/SectionHr";
import SectionLayout from "@/components/common/Layouts/SectionLayout";
import Orbit from "@/components/common/Loading/Orbit";
import Pagination from "@/components/common/Pagination/Pagination";
import AdminAccountsTable from "@/components/manage-accounts/AdminAccountsTable/AdminAccountsTable";
import ArtistAccountsTable from "@/components/manage-accounts/ArtistAccountsTable/ArtistAccountsTable";
import { ITEMS_PER_ACCOUNTS_TABLE } from "@/constants/pagination";
import { useAppSelector } from "@/redux/hooks";
import useAccounts from "@/services/queries/manage-accounts/useAccounts";
import { MEMBER_ROLE } from "@/types/enums/user.enum";
import convertPageParamToNum from "@/utils/convertPageParamToNum";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);
interface ManageAccountsPageProps {
  artistPage: number
  adminPage: number
}

const ManageAccountsPage = ({ artistPage, adminPage }: ManageAccountsPageProps) => {
  const memberRole = useAppSelector((state) => { return state.user.member.role; });
  const queries = useAccounts(artistPage, adminPage, memberRole);

  const isLoading = (memberRole === MEMBER_ROLE.SUPER_ADMIN)
    ? queries.some((query) => { return query.isLoading; })
    : queries[0].isLoading;
  const [artistQuery, adminQuery] = queries;

  if (isLoading) {
    return (
      <div className={cx("loading")}>
        <Orbit dark />
      </div>
    );
  }

  return (
    <MainLayout title="타 계정 관리">
      <ArtboardLayout>
        <div style={{ width: "1110px" }}>
          <SectionLayout title="아티스트 계정">
            {artistQuery.data!.totalItems === 0
              ? <EmptyData type="no-data" text="등록된 아티스트 계정이 없습니다." />
              : (
                <ArtistAccountsTable
                  accounts={artistQuery.data!.contents}
                  paginationElement={(
                    <Pagination
                      activePage={artistPage}
                      totalItems={artistQuery.data!.totalItems}
                      itemsPerPage={ITEMS_PER_ACCOUNTS_TABLE}
                      queryParamName="artistPage"
                    />
                  )}
                />
              )}
          </SectionLayout>
          {memberRole === MEMBER_ROLE.SUPER_ADMIN
            && (
              <>
                <SectionHr isThick />
                <SectionLayout title="어드민 계정">
                  {adminQuery.data!.totalItems === 0
                    ? <EmptyData type="no-data" text="등록된 어드민 계정이 없습니다." />
                    : (
                      <AdminAccountsTable
                        accounts={adminQuery.data!.contents}
                        paginationElement={(
                          <Pagination
                            activePage={adminPage}
                            totalItems={adminQuery.data!.totalItems}
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

interface ManageAccountsPageQuery extends ParsedUrlQuery {
  artistPage?: string,
  adminPage?: string,
}

// eslint-disable-next-line @typescript-eslint/require-await
const getServerSideProps: GetServerSideProps<ManageAccountsPageProps> = async ({ query }) => {
  const { artistPage, adminPage } = query as ManageAccountsPageQuery;

  return {
    props: {
      artistPage: convertPageParamToNum(artistPage || null),
      adminPage: convertPageParamToNum(adminPage || null),
    },
  };
};

export { getServerSideProps };
export default ManageAccountsPage;
