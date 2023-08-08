import classNames from "classnames/bind";

import styles from "./DropdownUI.module.scss";
import DropdownListWithInput from "./DropdownWithInput/DropdownListWithInput";

const cx = classNames.bind(styles);

interface DropdownListProps {
  dropdownListData: string[],
  onClickDropdownItem: React.MouseEventHandler<HTMLInputElement>,
  hasSearchBar: boolean
}

const DropdownList = ({
  dropdownListData,
  onClickDropdownItem,
  hasSearchBar,
}: DropdownListProps) => {
  return (
    <>
      {hasSearchBar && (
        <DropdownListWithInput
          dropdownListData={dropdownListData}
          onClickDropdownItem={onClickDropdownItem}
        />
      )}
      {!hasSearchBar && dropdownListData.map((dropdownItem) => {
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
