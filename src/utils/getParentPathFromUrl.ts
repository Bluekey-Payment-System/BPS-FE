const getParentPathFromUrl = (url: string) => {
  const lastSlashIndex = url.lastIndexOf("/");
  if (lastSlashIndex === -1) {
    return null;
  }
  return url.substring(0, lastSlashIndex);
};

export default getParentPathFromUrl;
