/**
 * url 내 특정 param의 존재 여부를 리턴하는 함수입니다.
 * @param url 페이지 url
 * @param key 검색 키워드(param)
 * @returns {boolean} 존재하면 true / 없으면 false
 */
const hasParamInUrl = (url: string, key: string): boolean => {
  const index = url.indexOf(key);

  if (index === -1) {
    return false;
  }
  return true;
};

export default hasParamInUrl;
