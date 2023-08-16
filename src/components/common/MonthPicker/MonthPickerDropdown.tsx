import { useState } from "react";

import classNames from "classnames/bind";
import { useRouter } from "next/router";

import DropdownHandleUI from "@/components/common/Dropdown/DropdownHandleUI";
import Popover from "@/components/common/Popover/Popover";
import getLastSegmentFromUrl from "@/utils/getLastSegmentFromUrl";
import getMonthFromUrl from "@/utils/getMonthFromUrl";
import getYearFromUrl from "@/utils/getYearFromUrl";

import MonthPicker from "./MonthPicker";
import { MonthString, YearString } from "./MonthPicker.type";
import { convertToYearMonthFormat } from "./MonthPicker.util";
import styles from "./MonthPickerDropdown.module.scss";

const cx = classNames.bind(styles);

const MonthPickerDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const currentYear = getYearFromUrl(router.asPath) as YearString;
  const currentMonth = getMonthFromUrl(router.asPath) as MonthString;
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <button className={cx("container")} onClick={() => { setIsOpen((prev) => { return !prev; }); }}>
      <div className={cx("textWrapper")}>
        <span>{convertToYearMonthFormat(getLastSegmentFromUrl(router.asPath))}</span>
        <div className={cx("handleWrapper")}>
          <DropdownHandleUI white direction={isOpen ? "up" : "down"} />
        </div>
      </div>
      {isOpen && (
        <Popover onClose={handleClose}>
          <MonthPicker
            selectedYear={currentYear}
            selectedMonth={currentMonth}
            onClose={handleClose}
          />
        </Popover>
      )}
    </button>
  );
};

export default MonthPickerDropdown;
