const getLastSegmentFromUrl = (url: string) => {
  const segments = url.split("/");
  return segments[segments.length - 1];
};

export default getLastSegmentFromUrl;
