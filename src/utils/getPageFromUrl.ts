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
