import convertYearMonthToQuery from "@/utils/convertYearMonthToQuery";

import {
  IGetArtistAlbumsResponse,
  IGetArtistDashboardResponse,
  IGetArtistEarningsTopTrackResponse,
  IGetArtistMonthlyTrendsResponse,
  IGetArtistProfileResponse,
  IGetArtistTrackTransactionResponse,
  IGetArtistsResponse,
  IGetArtistsSimpleResponse,
} from "../../types/artist";
import { getRequest } from "../requests.api";

/* 아티스트 현황 조회 */
export const getArtistsStatus = async (
  month: string,
  page: number,
  size: number,
  keyword: string | null,
) => {
  const response = await getRequest<IGetArtistsResponse>(
    `/artists?page=${page}&size=${size}&monthly=${convertYearMonthToQuery(month)}&keyword=${keyword ?? ""}`,
  );
  return response;
};

/* 특정 아티스트의 앨범 목록(카드) 조회 */
export const getArtistAlbums = async (
  page: number,
  size: number,
  keyword: string | null,
  memberId: number,
) => {
  const response = await getRequest<IGetArtistAlbumsResponse>(
    `/artists/${memberId}/albums?page=${page}&size=${size}&keyword=${keyword ?? ""}`,
  );
  return response;
};

/* 아티스트 대시보드 막대 차트 내용 */
export const getArtistDashboardBar = async (
  startDate: string,
  endDate: string,
  memberId: number,
) => {
  const response = await getRequest<IGetArtistMonthlyTrendsResponse>(`/artists/${memberId}/dashboard?startDate=${convertYearMonthToQuery(startDate)}&endDate=${convertYearMonthToQuery(endDate)}`);
  return response;
};

/* 아티스트 대시보드 카드 내용 */
export const getArtistDashboardCards = async (month: string, memberId: number) => {
  const response = await getRequest<IGetArtistDashboardResponse>(`/artists/${memberId}/dashboard/summary?monthly=${convertYearMonthToQuery(month)}`);
  return response;
};

/* 아티스트 대시보드 도넛 차트 내용 */
export const getArtistDashboardDoughnut = async (month: string, rank: number, memberId: number) => {
  const response = await getRequest<IGetArtistEarningsTopTrackResponse>(`/artists/${memberId}/dashboard/top-track?monthly=${convertYearMonthToQuery(month)}&rank=${rank}`);
  return response;
};

/* 아티스트 대시보드 테이블 내용 */
export const getArtistDashboardTable = async (
  month: string,
  page: number,
  size: number,
  sortBy: string | null,
  searchBy: string,
  keyword: string | null,
  memberId: number,
) => {
  const response = await getRequest<IGetArtistTrackTransactionResponse>(
    `/artists/${memberId}/dashboard/track?monthly=${convertYearMonthToQuery(month)}&page=${page}&size=${size}&sortBy=${sortBy ?? ""}&searchBy=${searchBy}&keyword=${keyword ?? ""}`,
  );
  return response;
};

/* 드롭다운에 나타나는 아티스트 목록 조회 */
export const getDropdownArtists = async () => {
  const response = await getRequest<IGetArtistsSimpleResponse>("/artists/simple");
  return response;
};

/* 아티스트 본인의 프로필 조회 */
export const getArtistProfile = async () => {
  const response = await getRequest<IGetArtistProfileResponse>("/artists/profile");
  return response;
};
