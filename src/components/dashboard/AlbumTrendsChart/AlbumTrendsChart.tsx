import { useState } from "react";

import classNames from "classnames/bind";

import { IGetAlbumTracksTrendsResponse } from "@/services/api/types/albums";
import { MEMBER_ROLE, MemberRole } from "@/types/enums/user.enum";

import LineChart from "../../common/Chart/LineChart/LineChart";
import Dropdown from "../../common/Dropdown/Dropdown";

import styles from "./AlbumTrendsChart.module.scss";

const cx = classNames.bind(styles);

interface AlbumTrendsChartProps {
  albumTrendsChartData: IGetAlbumTracksTrendsResponse,
  memberRole: MemberRole,
}
/**
 * @author 임병욱
 * @param barChartData - 차트 데이터 {contents: [{month: 1, revenue: 1000000, settlement: 10000},]} 형식
 * @param memberRole - SUPER_ADMIN | ADMIN | ARTIST
*/
const AlbumTrendsChart = ({ albumTrendsChartData, memberRole }: AlbumTrendsChartProps) => {
  const trackList = albumTrendsChartData.tracks.map((track) => { return track.koTrackName; });
  const [selectedTrack, setSelectedTrack] = useState(trackList[0]);

  const handleSelectedTrack = (value: string) => {
    setSelectedTrack(value);
  };

  const selectedTrackTrandsList = albumTrendsChartData.tracks.find(
    (track) => { return track.koTrackName === selectedTrack; },
  );

  if (!selectedTrackTrandsList) {
    return (
      <section className={cx("container")}>
        <p className={cx("error-message")}>선택한 트랙의 데이터가 없습니다.</p>
      </section>
    );
  }

  return (
    <section className={cx("container")}>
      <div className={cx("selectingTrackContainer")}>
        <p className={cx("description")}>{`이 앨범의 트랙별 ${memberRole === MEMBER_ROLE.ARTIST ? "정산액" : "매출액"} 추이`}</p>
        <Dropdown dropdownListData={trackList} theme="dark" onClick={handleSelectedTrack} />
      </div>
      <div style={{ width: "100%", height: "300px" }}>
        <LineChart albumTrendsChartData={selectedTrackTrandsList} memberRole={memberRole} />
      </div>
    </section>
  );
};

export default AlbumTrendsChart;
