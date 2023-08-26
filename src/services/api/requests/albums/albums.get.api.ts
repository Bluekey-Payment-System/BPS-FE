import convertYearMonthToQuery from "@/utils/convertYearMonthToQuery";

import {
  IGetAlbumDashboardResponse,
  IGetAlbumMonthlySettlementResponse,
  IGetAlbumRevenueTopTrackResponse,
  IGetAlbumTracksResponse,
  IGetAlbumsResponse,
} from "../../types/albums";
import { getRequest } from "../requests.api";

/* 앨범 리스트 조회 */
export const getAlbums = async (page: number, size: number, keyword: string | null) => {
  const response = getRequest<IGetAlbumsResponse>(`/albums?page=${page}&size=${size}&keyword=${keyword ?? ""}`);
  return response;
};

/* 앨범의 트랙 리스트 조회 */
export const getAlbumTracks = async (albumId: number) => {
  const response = getRequest<IGetAlbumTracksResponse>(`/albums/${albumId}`);
  return response;
};

/* 앨범의 월별 정산액 */
export const getAlbumDashboardBar = async (albumId: number, startDate: string, endDate: string) => {
  const response = getRequest<IGetAlbumMonthlySettlementResponse>(`/albums/${albumId}/dashboard?startDate=${convertYearMonthToQuery(startDate)}&endDate=${convertYearMonthToQuery(endDate)}`);
  return response;
};

/* 앨범 대시보드에 들어갈 기본 정보 */
export const getAlbumDashboardCards = async (albumId: number, month: string) => {
  const response = getRequest<IGetAlbumDashboardResponse>(`/albums/${albumId}/dashboard/summary?monthly=${convertYearMonthToQuery(month)}`);
  return response;
};

/* 앨범의 당월 매출 Top N 트랙 리스트 정보 */
export const getAlbumDashboardDoughnut = async (albumId: number, month: string, rank: number) => {
  const response = getRequest<IGetAlbumRevenueTopTrackResponse>(`/albums/${albumId}/dashboard/topTrack?monthly=${convertYearMonthToQuery(month)}&rank=${rank}`);
  return response;
};

/* 앨범의 트랙별 정산 리스트 */
export const getAlbumDashboardLine = (albumId: number, startDate: string, endDate: string) => {
  const response = getRequest(`/albums/${albumId}/dashboard/track?startDate=${convertYearMonthToQuery(startDate)}&endDate=${convertYearMonthToQuery(endDate)}`);
  return response;
};
