import { useState } from "react";

import classNames from "classnames/bind";

import styles from "../DropdownUI.module.scss";

const cx = classNames.bind(styles);

interface DropdownListProps {
  dropdownListData: string[],
  onClickDropdownItem: React.MouseEventHandler<HTMLInputElement>,
}

const DropdownListWithInput = ({ dropdownListData, onClickDropdownItem }: DropdownListProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // eslint-disable-next-line max-len
  const filteredDropDownList = dropdownListData.filter((dropdownItem) => { return dropdownItem.includes(inputValue); });

  return (
    <>
      <input className={cx("searchDropdownList")} value={inputValue} onChange={handleChangeValue} />
      {inputValue === "" && dropdownListData.map((dropdownItem) => {
        return (
          <div className={cx("select")} key={dropdownItem}>
            <input
              id={dropdownItem}
              type="radio"
              value={dropdownItem}
              className={cx("content")}
              onClick={onClickDropdownItem}
            />
            <label htmlFor={dropdownItem}>
              {dropdownItem}
            </label>
          </div>
        );
      })}
      {inputValue && filteredDropDownList.map((dropdownItem) => {
        return (
          <div className={cx("select")} key={dropdownItem}>
            <input
              id={dropdownItem}
              type="radio"
              value={dropdownItem}
              className={cx("content")}
              onClick={onClickDropdownItem}
            />
            <label htmlFor={dropdownItem}>
              {dropdownItem}
            </label>
          </div>
        );
      })}
    </>
  );
};

export default DropdownListWithInput;
