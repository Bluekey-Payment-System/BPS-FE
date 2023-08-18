import getLastSegmentFromUrl from "./getLastSegmentFromUrl";
/**
 * getLastSegmentFromUrl 유틸 함수
 * @author [SeyoungCho](https://github.com/seyoungcho)
 * @param url {string} "xxx/xxx/xxx/..." 형태의 url 스트링
 * @returns {string} url을 "/"으로 구분지어 마지막 YYYYMM 형태의 세그먼트에서 MM을 반환합니다.
 * @example
 * ```ts
 * const pathname = useRouter.asPath; // "/admin/dashborad/202307"
 * const monthStr = getMonthFromUrl(pathname);
 * console.log(monthStr); // "07"
 * ```
 *  */
const getMonthFromUrl = (url: string) => {
  return getLastSegmentFromUrl(url).slice(4, 6);
};

export default getMonthFromUrl;
