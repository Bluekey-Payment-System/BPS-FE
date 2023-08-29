/* eslint-disable consistent-return */
/* eslint-disable no-console */
import { useQuery } from "@tanstack/react-query";

import { MOCK_ADMIN_DASHBOARD_CARD } from "@/constants/mock";
import { DASHBOARD_TYPE } from "@/types/enums/dashboard.enum";

import { getAdminDashboardCards } from "../api/requests/admin/admin.get.api";

// test용 fetch 함수
const fetchAdminDashboardCard = async () => {
  console.log("쿼리 Fn 실행");
  try {
    await getAdminDashboardCards("2023-06");
  } catch (e) {
    return MOCK_ADMIN_DASHBOARD_CARD;
  }
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
