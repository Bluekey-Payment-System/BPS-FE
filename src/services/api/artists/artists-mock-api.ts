/* eslint-disable @typescript-eslint/no-unused-vars */
import { MOCK_ARTISTS } from "@/constants/mock";

import { IGetArtistsResponse } from "../types/artist";

const getArtistsStatus = (
  page: number,
  size: number,
  month: string,
  keyword: string | null,
): Promise<IGetArtistsResponse> => {
  // TODO: (GET) 아티스트 현황 데이터 가져오기
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_ARTISTS);
    }, 3000);
  });
};

export { getArtistsStatus };
