import getLastSegmentFromUrl from "./getLastSegmentFromUrl";

const getMonthFromUrl = (url: string) => {
  return getLastSegmentFromUrl(url).slice(4, 6);
};

export default getMonthFromUrl;
