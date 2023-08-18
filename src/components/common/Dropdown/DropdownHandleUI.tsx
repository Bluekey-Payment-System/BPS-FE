import classNames from "classnames/bind";

import styles from "./DropdownHandleUI.module.scss";

const cx = classNames.bind(styles);

interface DropdownHandleUIProps {
  direction?: "up" | "down";
  white?: boolean;
}

const DropdownHandleUI = ({ direction = "down", white }: DropdownHandleUIProps) => {
  return (
    <svg className={cx("chevron", { up: direction === "up" })} width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1L6.26316 7L11.5 1" stroke={white ? "#F3F5F8" : "#a3aab6"} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default DropdownHandleUI;
