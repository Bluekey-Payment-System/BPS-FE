/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@tanstack/react-query";

import { MOCK_ACCOUNTS } from "@/constants/mock";
import { IGetAccountsResponse } from "@/services/api/types/member";
import { MEMBER_TYPE } from "@/types/enums/user.enum";

export const getAccounts = (
  artistPage: number,
  adminPage: number,
): Promise<IGetAccountsResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => { return resolve(MOCK_ACCOUNTS); }, 2000);
  });
};

const useAccounts = (artistPage: number, adminPage: number) => {
  const { data: accounts, isLoading: isAccountsLoading, isError: isAccountsError } = useQuery(
    // TODO: 두 개의 독립적인 페이지 파람 어떻게 쿼리키에 대입?
    // -> BE에 account api 분리 요청 중..
    [MEMBER_TYPE.ADMIN, "manage-accounts"],
    () => { return getAccounts(artistPage, adminPage); },
  );

  return {
    accounts, isAccountsLoading, isAccountsError,
  };
};

export default useAccounts;
