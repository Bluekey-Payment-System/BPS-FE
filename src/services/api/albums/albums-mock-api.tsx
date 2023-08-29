/* eslint-disable @typescript-eslint/no-unused-vars */
import { MOCK_ALBUMS } from "@/constants/mock";
import { MEMBER_TYPE, MemberType } from "@/types/enums/user.enum";

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
  keyword: string | null,
  memberId: number,
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

const getAlbums = async (
  type: MemberType,
  page: number,
  size: number,
  keyword: string | null,
  memberId?: number,
) => {
  let response;

  if (type === MEMBER_TYPE.ADMIN) {
    response = await getAdminAlbums(page, size, keyword);
  } else {
    response = await getArtistAlbums(page, size, keyword, memberId as number);
  }

  return response;
};

export { getAlbums };
