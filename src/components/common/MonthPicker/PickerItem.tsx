import classNames from "classnames/bind";

import { MonthString, YearString } from "./MonthPicker.type";
import styles from "./PickerItem.module.scss";

const cx = classNames.bind(styles);

interface PickerItemProps {
  textContent: YearString | MonthString;
  selected: boolean;
  onSelect: (arg1: YearString | MonthString) => void;
}

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
