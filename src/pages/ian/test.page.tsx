import TrackListTable from "@/components/dashboard/TrackListTable/TrackListTable";
import { MOCK_ALBUM_TRACKS } from "@/constants/mock";

const test = () => {
  return (
    <div style={{ width: "730px" }}>
      <TrackListTable tracks={MOCK_ALBUM_TRACKS.tracks} />
    </div>
  );
};

export default test;
