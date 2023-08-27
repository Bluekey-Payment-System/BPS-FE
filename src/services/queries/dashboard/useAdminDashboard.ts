/* eslint-disable max-len */

import { useQueries } from "@tanstack/react-query";

import { DASHBOARD_TYPE } from "@/types/enums/dashboard.enum";

import { getDashboardCards } from "./queryFns/cards";
import { getDashboardTable } from "./queryFns/table";
import { getDashboardTopFiveRevenueChart } from "./queryFns/topFiveRevenueChart";
import { getDashboardTrendsChart } from "./queryFns/trendsChart";

const useAdminDashboard = (
  month: string,
  page: number,
  sortBy: string,
  searchBy: string,
  keyword: string,
) => {
  const queries = useQueries({
    queries: [
      {
        queryKey: [DASHBOARD_TYPE.ADMIN, "dashboard", "card", null, null, { month }],
        queryFn: () => {
          return getDashboardCards(DASHBOARD_TYPE.ADMIN, month);
        },
      },
      {
        queryKey: [DASHBOARD_TYPE.ADMIN, "dashboard", "trendsChart", null, null, { month }],
        queryFn: () => {
          return getDashboardTrendsChart(DASHBOARD_TYPE.ADMIN, month);
        },
      },
      {
        queryKey: [DASHBOARD_TYPE.ADMIN, "dashboard", "TopFiveRevenue", null, null, { month }],
        queryFn: () => {
          return getDashboardTopFiveRevenueChart(DASHBOARD_TYPE.ADMIN, month);
        },
      },
      {
        queryKey: [DASHBOARD_TYPE.ADMIN, "dashboard", "table", null, {
          month, page, sortBy, searchBy, keyword,
        }],
        queryFn: () => {
          return getDashboardTable(DASHBOARD_TYPE.ADMIN, month, page, sortBy, searchBy, keyword);
        },
      },
    ],
  });

  return queries;
};

export default useAdminDashboard;
