import { IGetAlbumTracksResponse, IGetAlbumsResponse } from "../../types/albums";
import { getRequest } from "../requests.api";

/* 앨범 리스트 조회 */
const getAlbums = async (page: number, size: number, keyword: string | null) => {
  const response = getRequest<IGetAlbumsResponse>(`/albums?page=${page}&size=${size}&keyword=${keyword}`);
  return response;
};

/* 앨범의 트랙 리스트 조회 */
const getAlbumTracks = async (albumId: number) => {
  const response = getRequest<IGetAlbumTracksResponse>(`/albums/${albumId}`);
  return response;
};

export { getAlbums, getAlbumTracks };
