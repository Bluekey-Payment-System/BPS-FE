import { useQuery } from "@tanstack/react-query";

import { getDropdownArtists } from "@/services/api/requests/artist/artist.get.api";
import { IGetArtistsSimpleResponse } from "@/services/api/types/artist";
import { MEMBER_ROLE } from "@/types/enums/user.enum";

const useArtistList = () => {
  const query = useQuery<IGetArtistsSimpleResponse>([MEMBER_ROLE.ARTIST, "names"], getDropdownArtists, {
    onError: (err) => {
      console.error(err);
    },
  });
  return query;
};

export default useArtistList;
