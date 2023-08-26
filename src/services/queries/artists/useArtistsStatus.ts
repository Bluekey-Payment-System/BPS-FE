import { useQuery } from "@tanstack/react-query";

import { ITEMS_PER_ARTISTS_TABLE } from "@/constants/pagination";
import { getArtistsStatus } from "@/services/api/artists/artists-mock-api";
import { MEMBER_TYPE } from "@/types/enums/user.enum";

const useArtistsStatus = (month: string, page: number, keyword: string | null) => {
  const {
    data: artistsStatus, isLoading, isError, isFetching,
  } = useQuery(
    [MEMBER_TYPE.ADMIN, "artists-status", month, `page=${page}`, `keyword=${keyword}`],
    () => { return getArtistsStatus(page, ITEMS_PER_ARTISTS_TABLE, month, keyword); },
    {
      staleTime: Infinity,
    },
  );

  return {
    artistsStatus, isLoading, isError, isFetching,
  };
};

export { useArtistsStatus };
