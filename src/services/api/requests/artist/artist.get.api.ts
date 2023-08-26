import { convertToYearMonthFormat } from "@/components/common/MonthPicker/MonthPicker.util";

import { IGetArtistMonthlyEarningsTrendsResponse } from "../../types/admin";
import {
  IGetArtistAlbumsResponse,
  IGetArtistDashboardResponse,
  IGetArtistEarningsTopTrackResponse,
  IGetArtistTrackTransactionResponse,
  IGetArtistsResponse,
  IGetArtistsSimpleResponse,
} from "../../types/artist";
import { getRequest } from "../requests.api";

export const getArtistsStatus = async (
  month: string,
  page: number,
  size: number,
  keyword: string | null,
) => {
  const response = await getRequest<IGetArtistsResponse>(
    `/artists?page=${page}&size=${size}&monthly=${convertToYearMonthFormat(month)}&keyword=${keyword ?? ""}`,
  );
  return response;
};

export const getArtistAlbums = async (
  page: number,
  size: number,
  memberId: number,
) => {
  const response = await getRequest<IGetArtistAlbumsResponse>(
    `/artists/${memberId}/albums?page=${page}&size=${size}`,
  );
  return response;
};

export const getArtistDashboardBar = async (
  startDate: string,
  endDate: string,
  memberId: number,
) => {
  const response = await getRequest<IGetArtistMonthlyEarningsTrendsResponse>(`/artists/${memberId}/dashboard?startDate=${convertToYearMonthFormat(startDate)}&endDate=${convertToYearMonthFormat(endDate)}`);
  return response;
};

export const getArtistDashboardCards = async (month: string, memberId: number) => {
  const response = await getRequest<IGetArtistDashboardResponse>(`/artists/${memberId}/dashboard/summary?monthly=${convertToYearMonthFormat(month)}`);
  return response;
};

export const getArtistDashboardDoughnut = async (month: string, rank: number, memberId: number) => {
  const response = await getRequest<IGetArtistEarningsTopTrackResponse>(`/artists/${memberId}/dashboard/topTrack?monthly=${convertToYearMonthFormat(month)}&rank=${rank}`);
  return response;
};

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
    `/artists/${memberId}/dashboard/track?monthly=${convertToYearMonthFormat(month)}&page=${page}&size=${size}&sortBy=${sortBy ?? ""}&searchBy=${searchBy}&keyword=${keyword ?? ""}`,
  );
  return response;
};

export const getDropdownArtists = async () => {
  const response = await getRequest<IGetArtistsSimpleResponse>("/artists/simple");
  return response;
};
