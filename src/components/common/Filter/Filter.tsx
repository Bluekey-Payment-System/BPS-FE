import classNames from "classnames/bind";
import Image from "next/image";

import styles from "./Filter.module.scss";

const cx = classNames.bind(styles);

const Filter = () => {
  return (
    <button className={cx("container")} onClick={() => { }}>
      <Image src="/images/filter.svg" width={11} height={11} alt="필터" />
      <span className={cx("text")}>필터</span>
    </button>
  );
};

export default Filter;
