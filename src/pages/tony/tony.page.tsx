import AlbumTrackListTable from "@/components/album/AlbumTrackListTable/AlbumTrackListTable";
import { MOCK_ALBUM_TRACKS } from "@/constants/mock";

const TonyPage = () => {
  return (
    <AlbumTrackListTable data={MOCK_ALBUM_TRACKS} />
  );
};

export default TonyPage;
