import getLastSegmentFromUrl from "./getLastSegmentFromUrl";
/**
 * getYearFromUrl 유틸 함수
 * @author [SeyoungCho](https://github.com/seyoungcho)
 * @param url {string} "xxx/xxx/xxx/..." 형태의 url 스트링
 * @returns {string} url을 "/"으로 구분지어 마지막 YYYYMM 형태의 세그먼트에서 YY를 반환합니다.
 * @example
 * ```ts
 * const pathname = useRouter.asPath; // "/admin/dashborad/202307"
 * const yearStr = getYearFromUrl(pathname);
 * console.log(yearStr); // "2023"
 * ```
 *  */
const getYearFromUrl = (url: string) => {
  return getLastSegmentFromUrl(url).slice(0, 4);
};

export default getYearFromUrl;
