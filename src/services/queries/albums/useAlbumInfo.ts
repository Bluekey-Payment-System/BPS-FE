import { useQuery } from "@tanstack/react-query";

import { getAlbumTracks } from "@/services/api/requests/albums/albums.get.api";
import { IGetAlbumTracksResponse } from "@/services/api/types/albums";

const useAlbumInfo = (albumId: number) => {
  const query = useQuery<
  IGetAlbumTracksResponse,
  unknown,
  IGetAlbumTracksResponse
  >(
    ["albums", albumId],
    () => { return getAlbumTracks(albumId); },
  );

  return query;
};

export default useAlbumInfo;
