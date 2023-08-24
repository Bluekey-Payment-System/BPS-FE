import AlbumTrackListTable from "@/components/album/AlbumTrackListTable/AlbumTrackListTable";
import { MOCK_ALBUM_TRACKS } from "@/constants/mock";

const TonyPage = () => {
  return (
    <AlbumTrackListTable albumId={MOCK_ALBUM_TRACKS.albumId} tracks={MOCK_ALBUM_TRACKS.tracks} />
  );
};

export default TonyPage;
