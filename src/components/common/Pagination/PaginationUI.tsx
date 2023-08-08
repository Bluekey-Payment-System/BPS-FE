import classnames from "classnames/bind";
import Image from "next/image";

import PaginationArrowUI from "./PaginationArrowUI";
import styles from "./PaginationUI.module.scss";

const cx = classnames.bind(styles);

interface PaginationUIProps {
  page: number
  shownPages: number[]
  endPage: number
  hasNext: boolean
  hasPrev: boolean
}

const PaginationUI = ({
  page,
  shownPages,
  endPage,
  hasNext,
  hasPrev,
}: PaginationUIProps) => {
  return (
    <div className={cx("wrapper")}>
      <PaginationArrowUI able={hasPrev} />
      {hasPrev && (
        <>
          <span className={cx("number")}>
            1
          </span>
          <Image
            src="/images/page-ellipsis.svg"
            alt="Page Ellipsis 이미지"
            width={32}
            height={4}
          />
        </>
      )}
      {shownPages.map((num) => {
        return (
          <span className={cx("number", { isActive: page === num })} key={num}>
            {num}
          </span>
        );
      })}
      {hasNext && (
        <>
          <Image
            src="/images/page-ellipsis.svg"
            alt="Page Ellipsis 이미지"
            width={32}
            height={4}
          />
          <span className={cx("number")}>
            {endPage}
          </span>
        </>
      )}
      <PaginationArrowUI direction="next" able={hasNext} />
    </div>
  );
};

export default PaginationUI;
