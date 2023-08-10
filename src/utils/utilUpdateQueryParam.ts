import { ParsedUrlQuery } from "querystring";

/**
 * 주어진 URL 쿼리 객체에서 원하는 쿼리 파라미터를 업데이트하고 업데이트된 쿼리 문자열을 반환합니다.
 * 반환된 문자열은 Link 태그의 href 속성으로 이용할 수 있습니다.
 *
 * @author 연우킴(drizzle96) [Github](https://github.com/drizzle96)
 * @param {ParsedUrlQuery} queryObject - 현재 쿼리 파라미터가 포함된 URL 쿼리 객체입니다.
 * useRouter로 router를 불러온 후 router.query로 지정할 수 있습니다.
 * @param {string} param - 업데이트할 파라미터의 이름입니다.
 * @param {string | number} newValue - 지정된 파라미터에 설정할 새 값입니다.
 * @returns {string} 수정된 파라미터가 포함된 업데이트된 쿼리 문자열입니다.
 * @example
 * ```
 * // case1) URL: /artists?page=1&sort=2
 * // URL에 존재하는 파람의 값을 변경하고 싶을 때
 * const router = useRouter();
 * const {query} = router;
 * utilUpdateQueryParam(query, "page", 5) // 리턴값: ?page=5&sort=2
 * ```
 * @example
 * ```
 * // case2) URL: /artists?sort=2
 * // 아직 URL에 들어있지 않은 파람의 값을 변경하고 싶을 때
 * const router = useRouter();
 * const {query} = router;
 * utilUpdateQueryParam(query, "page", 5) // 리턴값: ?sort=2&page=5
 * ```
 *
 */
const utilUpdateQueryParam = (
  queryObject: ParsedUrlQuery,
  param: string,
  newValue: string | number,
) => {
  const searchParams = new URLSearchParams(queryObject as Record<string, string>);
  searchParams.set(param, newValue.toString());
  return `?${searchParams.toString()}`;
};

export default utilUpdateQueryParam;
