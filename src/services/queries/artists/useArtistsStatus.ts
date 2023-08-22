import { useQuery } from "@tanstack/react-query";

import { getArtistsStatus } from "@/services/api/artists/artists-mock-api";
import { MEMBER_TYPE } from "@/types/enums/user.enum";

const useArtistsStatusGet = (page: number, size: number, month: string) => {
  const {
    data: artistsStatus, isLoading, isError, isFetching,
  } = useQuery(
    [MEMBER_TYPE.ADMIN, "artists-status"],
    () => { return getArtistsStatus(page, size, month); },
    {
      staleTime: Infinity,
    },
  );

  return {
    artistsStatus, isLoading, isError, isFetching,
  };
};

export { useArtistsStatusGet };
