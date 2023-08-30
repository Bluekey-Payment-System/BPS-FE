import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { getDropdownArtists } from "@/services/api/requests/artist/artist.get.api";
import { IGetArtistsSimpleResponse } from "@/services/api/types/artist";
import { MEMBER_ROLE } from "@/types/enums/user.enum";

const useArtistList = () => {
  const { data } = useQuery<IGetArtistsSimpleResponse>([MEMBER_ROLE.ARTIST, "names"], getDropdownArtists, {
    onError: (err) => {
      console.error(err);
    },
  });
  const [artistList, setArtistList] = useState<{ id: number, name: string, commissionRate: number }[]>([{ id: -1, name: "", commissionRate: 0 }]);
  useEffect(() => {
    if (data) {
      setArtistList(data.artists.map((artist) => {
        return {
          id: artist.memberId,
          name: artist.name,
          commissionRate: artist.commissionRate || 0,
        };
      }));
    }
  }, [data]);
  return artistList;
};

export default useArtistList;
