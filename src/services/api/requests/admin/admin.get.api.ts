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

/* 어드민 계정 목록 조회 */
export const getAdminAccounts = async (page: number, size: number) => {
  const response = await getRequest<IGetAdminAccountsResponse>(`/admin?page=${page}&size=${size}`);
  return response;
};

/* 아티스트 계정 목록 조회 */
export const getArtistAccounts = async (page: number, size: number) => {
  const response = await getRequest<IGetArtistAccountsResponse>(`/admin/artist?page=${page}&size=${size}`);
  return response;
};

/* 어드민 대시보드 카드 내용 */
export const getAdminDashboardCards = async (month: string) => {
  const response = await getRequest<IGetAdminDashboardResponse>(`/admin/dashboard?monthly=${convertToYearMonthFormat(month)}`);
  return response;
};

/* 어드민 대시보드 도넛 차트 내용 */
export const getAdminDashboardDoughnut = async (month: string, rank: number) => {
  const response = await getRequest<IGetAdminEarningsTopArtistResponse>(`/admin/dashboard/artist?monthly=${convertToYearMonthFormat(month)}&rank=${rank}`);
  return response;
};

/* 어드민 대시보드 테이블 내용 */
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

/* 어드민 대시보드 막대 차트 내용 */
export const getAdminDashboardBar = async (startDate: string, endDate: string) => {
  const response = await getRequest<IGetAdminMonthlyEarningsTrendsResponse>(`/admin/dashboard/trend?startDate=${convertToYearMonthFormat(startDate)}&endDate=${convertToYearMonthFormat(endDate)}`);
  return response;
};
