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
