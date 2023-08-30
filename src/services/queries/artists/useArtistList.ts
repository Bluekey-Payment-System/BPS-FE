import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { getDropdownArtists } from "@/services/api/requests/artist/artist.get.api";
import { IGetArtistsSimpleResponse } from "@/services/api/types/artist";
import { MEMBER_ROLE } from "@/types/enums/user.enum";

const useArtistList = () => {
  const [
    artistList,
    setArtistList,
  ] = useState<{ id: number, name: string, commissionRate: number }[]>([]);
  const query = useQuery<IGetArtistsSimpleResponse>([MEMBER_ROLE.ARTIST, "names"], getDropdownArtists, {
    onError: (err) => {
      console.error(err);
    },
    // refetchOnMount: "always",
  });
  useEffect(() => {
    if (query.isFetched && query.data) {
      setArtistList(query.data.artists.map((artist) => {
        return {
          id: artist.memberId,
          name: artist.name,
          commissionRate: artist.commissionRate || 0,
        };
      }));
    }
  }, [query.data, query.isFetched]);
  return artistList;
};

export default useArtistList;
