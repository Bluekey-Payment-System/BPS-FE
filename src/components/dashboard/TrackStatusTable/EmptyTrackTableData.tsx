import classNames from "classnames/bind";

import Spacing from "@/components/common/Layouts/Spacing";
import { AdminDashboardType, ArtistDashboardType, DASHBOARD_TYPE } from "@/types/enums/dashboard.enum";

import styles from "./EmptyTrackTableData.module.scss";

const cx = classNames.bind(styles);

interface EmptyTrackTableDataProps {
  type: AdminDashboardType | ArtistDashboardType
  isEmptySearch: boolean
}

const EmptyTrackTableData = ({ type, isEmptySearch }: EmptyTrackTableDataProps) => {
  const columns = type === DASHBOARD_TYPE.ADMIN
    ? ["곡명", "앨범명", "아티스트명", "매출액", "회사 이익", "정산액", "요율"]
    : ["곡명", "앨범명", "아티스트명", "매출액", "정산액", "원천세", "요율"];
  return (
    <div className={cx("container")}>
      <div className={cx("header")}>
        {columns.map((column) => {
          return (<p key={column}>{column}</p>);
        })}
      </div>
      <Spacing size={50} />
      <p className={cx("description")}>{isEmptySearch ? "해당 조건의 데이터가 없습니다." : "해당 월에 데이터가 없습니다."}</p>
    </div>
  );
};

export default EmptyTrackTableData;
