import classNames from "classnames/bind";

import { MonthString, YearString } from "./MonthPicker.type";
import styles from "./PickerItem.module.scss";

const cx = classNames.bind(styles);

interface PickerItemProps {
  textContent: YearString | MonthString;
  selected: boolean;
  onSelect: (arg1: YearString | MonthString) => void;
}
/**
 * @author [SeyoungCho](https://github.com/seyoungcho)
 * @param textContent {YearStirng | MonthString} 연, 월 선택 버튼 내용(연, 월)
 * @param selected {boolean} 아이템 선택 여부
 * @param onSelect {Funtion} 아이템 선택 시 호출할 콜백함수
 */
const PickerItem = ({ textContent, selected = false, onSelect }: PickerItemProps) => {
  const handleSelectOption = () => {
    onSelect(textContent);
  };
  return (
    <button
      className={cx("container", { selected })}
      onClick={handleSelectOption}
    >
      {textContent}
    </button>
  );
};

export default PickerItem;
