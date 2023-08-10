import { useState } from "react";

import classNames from "classnames/bind";
import Image from "next/image";

import styles from "../DropdownUI.module.scss";

const cx = classNames.bind(styles);

interface DropdownListProps {
  dropdownListData: string[],
  onClickDropdownItem: React.MouseEventHandler<HTMLInputElement>,
}

const DropdownListWithSearchBar = ({
  dropdownListData,
  onClickDropdownItem,
}: DropdownListProps) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const filteredDropDownList = dropdownListData.filter((dropdownItem) => {
    return dropdownItem.includes(inputValue);
  });

  return (
    <>
      <div className={cx("searchBarContainer")}>
        <input className={cx("searchDropdownSearchInput")} value={inputValue} onChange={handleChangeValue} placeholder="검색어를 입력해주세요" />
        <Image src="/images/search-bar.svg" alt="검색창" width={13} height={15} className={cx("searchDropdownSearchImage")} />
      </div>
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

export default DropdownListWithSearchBar;
