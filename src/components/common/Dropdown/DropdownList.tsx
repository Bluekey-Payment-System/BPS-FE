import classNames from "classnames/bind";

import { IHasSearchBarData } from "./Dropdown.type";
import styles from "./DropdownUI.module.scss";
import DropdownListWithSearchBar from "./DropdownWithSearchBar/DropdownListWithSearchBar";

const cx = classNames.bind(styles);

interface DropdownListProps<T> {
  dropdownListData: T[],
  onClickDropdownItem: React.MouseEventHandler<HTMLInputElement>,
  hasSearchBar: boolean
}

const DropdownList = <T extends string | IHasSearchBarData>({
  dropdownListData,
  onClickDropdownItem,
  hasSearchBar = false,
}: DropdownListProps<T>) => {
  return (
    <>
      {hasSearchBar && (
        <DropdownListWithSearchBar
          dropdownListData={dropdownListData as IHasSearchBarData[]}
          onClickDropdownItem={onClickDropdownItem}
        />
      )}
      {!hasSearchBar && (dropdownListData as string[]).map((dropdownItem: string) => {
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

export default DropdownList;
