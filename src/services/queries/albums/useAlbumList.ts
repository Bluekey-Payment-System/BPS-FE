import { useQuery } from "@tanstack/react-query";

import { ITEMS_PER_ALBUM_LIST } from "@/constants/pagination";
import { getAlbums } from "@/services/api/requests/albums/albums.get.api";
import { MemberType } from "@/types/enums/user.enum";

const useAlbums = (type: MemberType, page: number, keyword: string | null, memberId?: number) => {
  const query = useQuery(
    [type, "albums", `memberId=${memberId}`, { page, keyword }],
    () => { return getAlbums(page, ITEMS_PER_ALBUM_LIST, keyword); },
  );

  return query;
};

export default useAlbums;
