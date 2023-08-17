import { useQuery } from "@tanstack/react-query";

import { MOCK_ADMIN_DASHBOARD_CARD } from "@/constants/mock";
import QUERY_KEYS from "@/constants/queryKeys";

import { IGetAdminDashboardResponse } from "../api/types/admin";

// test용 fetch 함수
const fetchAdminDashboardCard = (): Promise<IGetAdminDashboardResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_ADMIN_DASHBOARD_CARD);
    }, 2000); // 2초 후에 resolve
  });
};

export function useAdminDashboardCard() {
  const { data: adminDashboardCard, isError, isLoading } = useQuery<IGetAdminDashboardResponse>({
    queryKey: [QUERY_KEYS.admin, QUERY_KEYS.dashboard, QUERY_KEYS.card],
    queryFn: fetchAdminDashboardCard,
  });

  return ({
    adminDashboardCard, isLoading, isError,
  });
}
