import { convertToYearMonthFormat } from "@/components/common/MonthPicker/MonthPicker.util";

import {
  IGetAdminAccountsResponse,
  IGetAdminDashboardResponse,
  IGetAdminEarningsTopArtistResponse,
  IGetAdminMonthlyEarningsTrendsResponse,
  IGetAdminTrackTransactionResponse,
  IGetArtistAccountsResponse,
} from "../../types/admin";
import { getRequest } from "../requests.api";

export const getAdminAccounts = async (page: number, size: number) => {
  const response = await getRequest<IGetAdminAccountsResponse>(`/admin?page=${page}&size=${size}`);
  return response;
};

export const getArtistAccounts = async (page: number, size: number) => {
  const response = await getRequest<IGetArtistAccountsResponse>(`/admin/artist?page=${page}&size=${size}`);
  return response;
};

export const getAdminDashboardCards = async (month: string) => {
  const response = await getRequest<IGetAdminDashboardResponse>(`/admin/dashboard?monthly=${convertToYearMonthFormat(month)}`);
  return response;
};

export const getAdminDashboardDoughnut = async (month: string, rank: number) => {
  const response = await getRequest<IGetAdminEarningsTopArtistResponse>(`/admin/dashboard/artist?monthly=${convertToYearMonthFormat(month)}&rank=${rank}`);
  return response;
};

export const getAdminDashboardTable = async (
  month: string,
  page: number,
  size: number,
  sortBy: string | null,
  searchBy: string,
  keyword: string | null,
) => {
  const response = await getRequest<IGetAdminTrackTransactionResponse>(
    `/admin/dashboard/track?monthly=${convertToYearMonthFormat(month)}&page=${page}&size=${size}&sortBy=${sortBy}&searchBy=${searchBy}&keyword=${keyword ?? ""}`,
  );
  return response;
};

export const getAdminDashboardBar = async (startDate: string, endDate: string) => {
  const response = await getRequest<IGetAdminMonthlyEarningsTrendsResponse>(`/admin/dashboard/trend?startDate=${convertToYearMonthFormat(startDate)}&endDate=${convertToYearMonthFormat(endDate)}`);
  return response;
};
