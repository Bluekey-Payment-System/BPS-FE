import classNames from "classnames/bind";
import Image from "next/image";

import styles from "./EmptyData.module.scss";

interface EmptyDataProps {
  type: "no-data" | "no-search-result"
  text?: string
}

const typeMapper = {
  "no-data": {
    src: "/images/empty-data.svg",
    alt: "데이터 없음",
  },
  "no-search-result": {
    src: "/images/empty-search-result.svg",
    alt: "검색 결과 없음",
  },
};

const cx = classNames.bind(styles);

const EmptyData = ({ type, text }: EmptyDataProps) => {
  return (
    <div className={cx("container")}>
      <div className={cx("imageBox")}>
        <Image src={typeMapper[type].src} width={225} height={159} alt={typeMapper[type].alt} />
      </div>
      <p className={cx("description")}>
        {text || "검색 결과가 없습니다."}
      </p>
    </div>
  );
};

export default EmptyData;
