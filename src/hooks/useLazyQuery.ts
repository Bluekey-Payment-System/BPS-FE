import { QueryFunction, useQuery } from "@tanstack/react-query";

const useLazyQuery = (key: string[], fn: QueryFunction, options = {}) => {
  const query = useQuery(key, fn, { ...options, enabled: false });

  return { refetch: query.refetch, query };
};

export default useLazyQuery;
