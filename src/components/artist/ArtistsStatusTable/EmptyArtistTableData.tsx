import classNames from "classnames/bind";

import EmptyData from "@/components/common/EmptyData/EmptyData";
import Spacing from "@/components/common/Layouts/Spacing";

import styles from "./EmptyArtistTableData.module.scss";

const cx = classNames.bind(styles);

interface EmptyArtistTableDataProps {
  isEmptySearch: boolean
}

const EmptyArtistTableData = ({ isEmptySearch }: EmptyArtistTableDataProps) => {
  const columns = ["아티스트명", "매출액", "회사 이익", "정산액", "당월 대표곡", "전월 대비 상승/하락율"];
  return (
    <div className={cx("container")}>
      <div className={cx("header")}>
        {columns.map((column) => {
          return (<p key={column}>{column}</p>);
        })}
      </div>
      <Spacing size={146} />
      <EmptyData type={isEmptySearch ? "no-search-result" : "no-data"} text={isEmptySearch ? undefined : "해당 월에 데이터가 없습니다."} />
    </div>
  );
};

export default EmptyArtistTableData;
