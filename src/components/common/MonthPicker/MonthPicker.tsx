import { useState } from "react";

import classNames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { YEAR_OPTIONS, MONTH_OPTIONS } from "@/constants/monthPicker";
import getParentPathFromUrl from "@/utils/getParentPathFromUrl";

import Button from "../CommonBtns/Button/Button";

import styles from "./MonthPicker.module.scss";
import { MonthString, YearString } from "./MonthPicker.type";
import { getMonthPath, isYearString } from "./MonthPicker.util";
import PickerItemList from "./PickerItemList";

const cx = classNames.bind(styles);

interface MonthPickerProps {
  selectedYear: YearString;
  selectedMonth: MonthString;
  onClose: () => void;
}
/**
 * @author [SeyoungCho](https://github.com/seyoungcho)
 * @param selectedYear {YearString} 현재 선택된 년도
 * @param selectedMonth {MonthString} 현재 선택된 월 ("01" 포맷)
 * @param onClose {Function} MonthPicker 팝오버 닫기 클릭 시 호출할 함수
 * @returns
 */
const MonthPicker = ({ selectedYear, selectedMonth, onClose }: MonthPickerProps) => {
  const router = useRouter();
  const [currentSelectedYear, setCurrentSelectedYear] = useState(selectedYear);
  const [currentSelectedMonth, setCurrentSelectedMonth] = useState(selectedMonth);

  const handleSelectOption = (option: YearString | MonthString) => {
    if (isYearString(option)) {
      setCurrentSelectedYear(option);
    } else {
      setCurrentSelectedMonth(option);
    }
  };

  const getHref = () => {
    const currentPath = router.asPath;
    const basePath = getParentPathFromUrl(currentPath);
    return `${basePath}/${getMonthPath(currentSelectedYear, currentSelectedMonth)}`;
  };

  return (
    <div className={cx("container")}>
      <button className={cx("closeBtn")} onClick={onClose}>
        <Image src="/images/btn-close-normal.svg" fill alt="닫기 버튼" />
      </button>
      <div className={cx("pickSection")}>
        <h2>년도 선택</h2>
        <PickerItemList
          optionList={YEAR_OPTIONS}
          selectedOption={currentSelectedYear}
          onSelect={handleSelectOption}
        />
        <div className={cx("spacing")} />
      </div>
      <div className={cx("pickSection")}>
        <h2>월 선택</h2>
        <PickerItemList
          optionList={MONTH_OPTIONS}
          selectedOption={currentSelectedMonth}
          onSelect={handleSelectOption}
        />
        <div className={cx("spacing")} />
      </div>
      <Link href={getHref()}>
        <Button style={{ width: "100%" }} size="large" theme="dark" onClick={onClose}>
          선택 완료
        </Button>
      </Link>
    </div>
  );
};

export default MonthPicker;
