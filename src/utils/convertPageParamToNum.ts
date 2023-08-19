const convertPageParamToNum = (pageParam: string | null) => {
  return (Number.isNaN(Number(pageParam)) || Number(pageParam) < 1)
    ? 1
    : Math.floor(Number(pageParam));
};

export default convertPageParamToNum;
