/* eslint-disable consistent-return */
/* eslint-disable no-console */
import { useQuery } from "@tanstack/react-query";

import { DASHBOARD_TYPE } from "@/types/enums/dashboard.enum";

import { getAdminDashboardCards } from "../api/requests/admin/admin.get.api";

// test용 fetch 함수
const fetchAdminDashboardCard = async () => {
  await getAdminDashboardCards("2023-06");
};

export function useTest() {
  const { data: adminDashboardCard, isError, isLoading } = useQuery(
    [DASHBOARD_TYPE.ADMIN, "dashboard", "card"],
    fetchAdminDashboardCard,
  );

  return ({
    adminDashboardCard, isLoading, isError,
  });
}
