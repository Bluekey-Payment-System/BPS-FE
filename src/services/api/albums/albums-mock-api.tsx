/* eslint-disable @typescript-eslint/no-unused-vars */
import { MOCK_ALBUMS } from "@/constants/mock";

import { IGetAlbumsResponse } from "../types/albums";

const getAdminAlbums = (
  page: number,
  size: number,
  keyword: string | null,
): Promise<IGetAlbumsResponse> => {
  // TODO: (GET) 전체 앨범 리스트 가져오기
  return new Promise((resolve) => {
    setTimeout(() => {
      setTimeout(() => {
        resolve(MOCK_ALBUMS);
      }, 3000);
    });
  });
};

const getArtistAlbums = (
  page: number,
  size: number,
  memberId: number,
  keyword: string | null,
): Promise<IGetAlbumsResponse> => {
  // TODO: (GET) 아티스트 본인이 참여한 앨범 리스트 가져오기
  return new Promise((resolve) => {
    setTimeout(() => {
      setTimeout(() => {
        resolve(MOCK_ALBUMS);
      }, 3000);
    });
  });
};

export { getAdminAlbums, getArtistAlbums };
