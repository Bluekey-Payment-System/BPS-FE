import { useQuery } from "@tanstack/react-query";

import { getArtistsStatus } from "@/services/api/artists/artists-mock-api";
import { MEMBER_TYPE } from "@/types/enums/user.enum";

const useArtistsStatusGet = (page: number, size: number, month: string, keyword: string | null) => {
  const {
    data: artistsStatus, isLoading, isError, isFetching,
  } = useQuery(
    [MEMBER_TYPE.ADMIN, "artists-status", month, `page=${page}`],
    () => { return getArtistsStatus(page, size, month, keyword); },
    {
      staleTime: Infinity,
    },
  );

  return {
    artistsStatus, isLoading, isError, isFetching,
  };
};

export { useArtistsStatusGet };
