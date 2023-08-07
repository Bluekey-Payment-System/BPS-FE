import classNames from "classnames/bind";

import styles from "./DropdownUI.module.scss";
import DropdownListWithInput from "./DropdownWithInput/DropdownListWithInput";

const cx = classNames.bind(styles);

interface DropdownListProps {
  dropdownListData: string[],
  onClickDropdownItem: React.MouseEventHandler<HTMLInputElement>,
  withInput: boolean
}

const DropdownList = ({ dropdownListData, onClickDropdownItem, withInput }: DropdownListProps) => {
  return (
    <>
      {withInput && (
        <DropdownListWithInput
          dropdownListData={dropdownListData}
          onClickDropdownItem={onClickDropdownItem}
        />
      )}
      {!withInput && dropdownListData.map((dropdownItem) => {
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
