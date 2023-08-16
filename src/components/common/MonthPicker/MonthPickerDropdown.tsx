import { useState } from "react";

import classNames from "classnames/bind";

import DropdownHandleUI from "@/components/common/Dropdown/DropdownHandleUI";
import Popover from "@/components/common/Popover/Popover";

// import MonthPicker from "./MonthPicker";
import styles from "./MonthPickerDropdown.module.scss";

const cx = classNames.bind(styles);

const MonthPickerDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <button className={cx("container")} onClick={() => { setIsOpen((prev) => { return !prev; }); }}>
      <div className={cx("textWrapper")}>
        <span>2023년 8월</span>
        <div className={cx("handleWrapper")}>
          <DropdownHandleUI white direction={isOpen ? "up" : "down"} />
        </div>
      </div>
      {isOpen && (
        <Popover onClose={() => { setIsOpen(false); }}>
          {/* <MonthPicker /> */}
          <div>년/월 선택 UI</div>
        </Popover>
      )}
    </button>
  );
};

export default MonthPickerDropdown;
