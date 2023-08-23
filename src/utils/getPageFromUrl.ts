/**
 * @author [hayoung-99](https://github.com/hayoung-99)
 * @param url "xxx/xxx/xxx?page=xx..." 형태의 url 스트링
 * @returns page 쿼리 스트링의 값
 * @example
 * ```ts
 * const pathname = useRouter.asPath; // "/admin/artist/202308?page=42&keyword=%EC%82%AC%EB%9E%91"
 * const pages = getPageFromUrl(pathname);
 * console.log(pages); // "42"
 * ```
 */
const getPageFromUrl = (url: string): string | null => {
  const pageIndex = url.indexOf("page=");

  if (pageIndex === -1) {
    return null;
  }

  const nextQueryIdx = url.indexOf("&", pageIndex);
  if (nextQueryIdx === -1) {
    return url.slice(pageIndex + 5);
  }
  return url.slice(pageIndex + 5, nextQueryIdx);
};

export default getPageFromUrl;
