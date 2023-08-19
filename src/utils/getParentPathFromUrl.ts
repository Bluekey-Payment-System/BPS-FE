/**
 * getParentPathFromUrl 유틸 함수
 * @author [SeyoungCho](https://github.com/seyoungcho)
 * @param url {string} "xxx/xxx/xxx/..." 형태의 url 스트링
 * @returns {string} url을 "/"으로 구분지어 마지막 세그먼트를 제외한 pathname을 리턴합니다
 * @example
 * ```ts
 * const pathname = useRouter.asPath; // "/admin/dashborad/202307"
 * const parentPath = getParentPathFromUrl(pathname);
 * console.log(parentPath); // "/admin/dashboard"
 * ```
 *  */
const getParentPathFromUrl = (url: string) => {
  const lastSlashIndex = url.lastIndexOf("/");
  if (lastSlashIndex === -1) {
    return null;
  }
  return url.substring(0, lastSlashIndex);
};

export default getParentPathFromUrl;
