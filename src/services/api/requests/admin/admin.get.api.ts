import { IFilterOptions } from "@/components/common/Filter/Filter.type";

import {
  IGetAdminAccountsResponse,
  IGetAdminDashboardResponse,
  IGetAdminEarningsTopArtistResponse,
  IGetAdminMonthlyTrendsResponse,
  IGetAdminProfileResponse,
  IGetAdminTrackTransactionResponse,
  IGetArtistAccountsResponse,
} from "../../types/admin";
import { getRequest } from "../requests.api";

/* 어드민 계정 목록 조회 */
export const getAdminAccounts = async (page: number, size: number) => {
  const response = await getRequest<IGetAdminAccountsResponse>(`/admin?page=${page - 1}&size=${size}`);
  return response;
};

/* 아티스트 계정 목록 조회 */
export const getArtistAccounts = async (page: number, size: number) => {
  const response = await getRequest<IGetArtistAccountsResponse>(`/admin/artist?page=${page - 1}&size=${size}`);
  return response;
};

/* 어드민 대시보드 카드 내용 */
export const getAdminDashboardCards = async (month: string) => {
  const response = await getRequest<IGetAdminDashboardResponse>(`/admin/dashboard/summary?monthly=${month}`);
  return response;
};

/* 어드민 대시보드 도넛 차트 내용 */
export const getAdminDashboardDoughnut = async (month: string, rank: number) => {
  const response = await getRequest<IGetAdminEarningsTopArtistResponse>(`/admin/dashboard/artist/top-track?monthly=${month}&rank=${rank}`);
  return response;
};

/* 어드민 대시보드 테이블 내용 */
export const getAdminDashboardTable = async (
  month: string,
  page: number,
  size: number,
  sortBy: string,
  searchBy: string,
  keyword: string,
  filterOptions: IFilterOptions,
) => {
  let response;
  if (Object.keys(filterOptions).length) {
    const {
      mId, revFr, revTo, netFr, netTo, setFr, setTo, comFr, comTo,
    } = filterOptions;
    response = await getRequest<IGetAdminTrackTransactionResponse>(
      `/admin/dashboard/track?monthly=${month}&page=${page - 1}&size=${size}&sortBy=${sortBy}&searchType=${searchBy}&keyword=${encodeURIComponent(keyword)}`
      + `&memberId=${mId}&revenueFrom=${revFr}&revenueTo=${revTo}&netIncomeFrom=${netFr}0&netIncomeTo=${netTo}&settlementFrom=${setFr}&settlementTo=${setTo}&commissionRateFrom=${comFr}&commissionRateTo=${comTo}`,
    );
  } else {
    response = await getRequest<IGetAdminTrackTransactionResponse>(
      `/admin/dashboard/track?monthly=${month}&page=${page - 1}&size=${size}&sortBy=${sortBy}&searchType=${searchBy}&keyword=${encodeURIComponent(keyword)}`,
    );
  }
  return response;
};

/* 어드민 대시보드 막대 차트 내용 */
export const getAdminDashboardBar = async (startDate: string, endDate: string) => {
  const response = await getRequest<IGetAdminMonthlyTrendsResponse>(`/admin/dashboard/trend?startDate=${startDate}&endDate=${endDate}`);
  return response;
};

/* 어드민 본인의 프로필 조회 */
export const getAdminProfile = async () => {
  const response = await getRequest<IGetAdminProfileResponse>("/admin/profile");
  return response;
};

/* 어드민 접근 페이지 허용 여부 조회 */
export const checkAdminAuthority = async () => {
  const response = await getRequest("/admin/authority-check");
  return response;
};
