import getLastSegmentFromUrl from "./getLastSegmentFromUrl";

const getYearFromUrl = (url: string) => {
  return getLastSegmentFromUrl(url).slice(0, 4);
};

export default getYearFromUrl;
