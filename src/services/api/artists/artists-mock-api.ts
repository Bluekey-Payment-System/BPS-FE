import { MOCK_ARTISTS } from "@/constants/mock";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getArtistsStatus = (page: number, size: number, month: string) => {
  // TODO: (GET) 아티스트 현황 데이터 가져오기
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_ARTISTS);
    }, 3000);
  });
};

export { getArtistsStatus };
