import classNames from "classnames/bind";

import { MonthString, YearString } from "./MonthPicker.type";
import PickerItem from "./PickerItem";
import styles from "./PickerItemList.module.scss";

const cx = classNames.bind(styles);

interface PickerItemListProps {
  optionList: (YearString | MonthString)[];
  selectedOption: (YearString | MonthString);
  onSelect: (arg1: YearString | MonthString) => void;
}
/**
 * @author [SeyoungCho](https://github.com/seyoungcho)
 * @param optionList {(YearString | MonthString)[]} 월 선택창에 들어갈 연 또는 월 리스트
 * @param selectedOption {YearString | MonthString} 현재 선택된 연, 월 아이템 텍스트("2023", "01" 포맷)
 * @param onSelect {Function} 각 옵션에 prop으로 전달될 선택 시 호출할 콜백함수
 * @returns
 */
const PickerItemList = ({ optionList, selectedOption, onSelect }: PickerItemListProps) => {
  return (
    <ul className={cx("container")}>
      {optionList.map((option) => {
        return (
          <PickerItem
            key={option}
            onSelect={onSelect}
            selected={option === selectedOption}
            textContent={option}
          />
        );
      })}
    </ul>
  );
};

export default PickerItemList;
