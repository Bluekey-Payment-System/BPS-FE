import React from "react";

import styles from "./Dropdown.module.scss";

interface DropdownListProps {
  dropdownData: string[],
  onClickDropdownItem: React.MouseEventHandler<HTMLInputElement>
}

const DropdownList = ({ dropdownData, onClickDropdownItem }: DropdownListProps) => {
  return (
    <div>
      {dropdownData.map((dropdownItem) => {
        return (
          <div className={styles.select} key={dropdownItem}>
            <input
              id={dropdownItem}
              type="radio"
              value={dropdownItem}
              className={styles.content}
              onClick={onClickDropdownItem}
            />
            <label htmlFor={dropdownItem}>
              {dropdownItem}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default DropdownList;
