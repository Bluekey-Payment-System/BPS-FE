import {
  IGetAlbumDashboardResponse,
  IGetAlbumMonthlyTrendsResponse,
  IGetAlbumRevenueTopTrackResponse,
  IGetAlbumTracksTrendsResponse,
  IGetAlbumTracksResponse,
  IGetAlbumsResponse,
} from "../../types/albums";
import { getRequest } from "../requests.api";

/* 앨범 리스트 조회 */
export const getAlbums = async (page: number, size: number, keyword: string | null) => {
  const response = getRequest<IGetAlbumsResponse>(`/albums?page=${page - 1}&size=${size}&keyword=${keyword ?? ""}`);
  return response;
};

/* 앨범의 트랙 리스트 조회 */
export const getAlbumTracks = async (albumId: number) => {
  const response = getRequest<IGetAlbumTracksResponse>(`/albums/${albumId}`);
  return response;
};

/* 앨범의 월별 정산액 */
export const getAlbumDashboardBar = async (albumId: number, startDate: string, endDate: string) => {
  const response = getRequest<IGetAlbumMonthlyTrendsResponse>(`/albums/${albumId}/dashboard?startDate=${startDate}&endDate=${endDate}`);
  return response;
};

/* 앨범 대시보드에 들어갈 기본 정보 */
export const getAlbumDashboardCards = async (albumId: number, month: string) => {
  const response = getRequest<IGetAlbumDashboardResponse>(`/albums/${albumId}/dashboard/summary?monthly=${month}`);
  return response;
};

/* 앨범의 당월 매출 Top N 트랙 리스트 정보 */
export const getAlbumDashboardDoughnut = async (albumId: number, month: string, rank: number) => {
  const response = getRequest<IGetAlbumRevenueTopTrackResponse>(`/albums/${albumId}/dashboard/top-track?monthly=${month}&rank=${rank}`);
  return response;
};

/* 앨범의 트랙별 정산 리스트 */
export const getAlbumDashboardLine = (albumId: number, startDate: string, endDate: string) => {
  const response = getRequest<IGetAlbumTracksTrendsResponse>(`/albums/${albumId}/dashboard/track?startDate=${startDate}&endDate=${endDate}`);
  return response;
};
