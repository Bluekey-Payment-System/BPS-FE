import classnames from "classnames/bind";

import styles from "./PaginationArrowUI.module.scss";

const cx = classnames.bind(styles);

interface PaginationArrowUIProps {
  direction?: "prev" | "next",
  able: boolean
}

const PaginationArrowUI = ({
  direction = "prev", able,
}: PaginationArrowUIProps) => {
  return (
    <svg className={cx("arrow")} width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 1L1 6.26316L7 11" stroke={able ? "#A3AAB6" : "#EDEEF0"} strokeLinecap="round" strokeLinejoin="round" transform={direction === "next" ? "rotate(180 4 6)" : undefined} />
    </svg>
  );
};

export default PaginationArrowUI;
