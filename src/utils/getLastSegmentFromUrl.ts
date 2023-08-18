/**
 * getLastSegmentFromUrl 유틸 함수
 * @author [SeyoungCho](https://github.com/seyoungcho)
 * @param url {string} "xxx/xxx/xxx/..." 형태의 url 스트링
 * @returns {string} url을 "/"으로 구분지어 마지막 세그먼트를 스트링으로 반황합니다.
 * @example
 * ```ts
 * const pathname = useRouter.asPath; // "/admin/dashborad/202307"
 * const monthYearStr = getLastSegmentFromUrl(pathname);
 * console.log(monthYearStr); // "202307"
 * ```
 *  */
const getLastSegmentFromUrl = (url: string) => {
  const segments = url.split("/");
  return segments[segments.length - 1];
};

export default getLastSegmentFromUrl;
