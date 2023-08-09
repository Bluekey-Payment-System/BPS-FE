import classNames from "classnames/bind";
import Image from "next/image";

import styles from "./EmptyData.module.scss";

interface EmptyDataProps {
  type: "no-data" | "no-search-result"
  text?: string
}

const cx = classNames.bind(styles);

const EmptyData = ({ type, text }: EmptyDataProps) => {
  return (
    <div className={cx("container")}>
      <div className={cx("imageBox")}>
        {type === "no-data"
        && <Image src="/images/empty-data.svg" width={225} height={159} alt="데이터 없음" />}
        {type === "no-search-result"
        && <Image src="/images/empty-search-result.svg" width={225} height={159} alt="검색 결과 없음" />}
      </div>
      <p className={cx("description")}>
        {text || "검색 결과가 없습니다."}
      </p>
    </div>
  );
};

export default EmptyData;
