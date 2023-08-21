import { IArtist } from "@/types/dto";

export const formatArtistCell = (artists: IArtist[]) => {
  if (artists.length > 1) return `${artists[0].koArtistName} 외 ${artists.length - 1}명`;
  return artists[0].koArtistName;
};
